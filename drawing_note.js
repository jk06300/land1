// shared/drawing_note.js
// 레이어(iframe) 활성 시 부모에서 자식 문서 안으로 캔버스를 직접 주입
// (자식 HTML에 스크립트 추가 불필요)
// 펜 모드 ON/OFF는 네이티브 setPenModeFromApp(n) 호출에 따름
let signaturePad;
let canvas;
let isPenMode = false;
let currentModeNum = 0;
let isTwoFingerScrolling = false;
const activePointersMap = new Map();
let lastScrollY = 0;
let longClickTimer = null;
let touchStartPos = { x: 0, y: 0 };
let isLongClickDetected = false;
const isInIframe = window !== window.parent;
let contentArea = null;
let activeLayerIframe = null;
let boundScrollTargets = [];
let boundPointerUpTargets = [];

let currentLayerId = 'layer1';
window.setCurrentLayer = function (layerId) {
  if (['layer1', 'layer2', 'layer3', 'layer4', 'layer5'].includes(layerId)) {
    currentLayerId = layerId;
    console.log('[pen] 현재 레이어 변경: ' + layerId);
  }
};

window.setContentAreaForIframe = function (wrapper) {
  contentArea = wrapper;
  if (canvas) resizeCanvas();
};

window.getCurrentPenMode = function () {
  return currentModeNum;
};

function resetGestureState() {
  clearTimeout(longClickTimer);
  longClickTimer = null;
  isTwoFingerScrolling = false;
  isLongClickDetected = false;
  activePointersMap.clear();
  lastScrollY = 0;
}

function getScrollTop() {
  if (activeLayerIframe) return 0; // 레이어 주입 캔버스는 문서와 함께 스크롤
  if (contentArea) return contentArea.scrollTop || 0;
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function syncCanvasPosition() {
  if (!canvas) return;
  if (activeLayerIframe) {
    canvas.style.top = '0px';
    return;
  }
  canvas.style.top = '-' + getScrollTop() + 'px';
}

function removeLastStroke() {
  if (!signaturePad) return;
  try {
    const data = signaturePad.toData();
    if (data && data.length > 0) {
      data.pop();
      signaturePad.fromData(data);
    }
  } catch (e) { }
}

function unbindScrollListeners() {
  boundScrollTargets.forEach(function (t) {
    try { t.removeEventListener('scroll', syncCanvasPosition); } catch (e) { }
  });
  boundScrollTargets = [];
}

function bindScrollListeners(doc, win) {
  unbindScrollListeners();
  if (activeLayerIframe) return; // 레이어 안 캔버스는 top 보정 불필요

  [doc, doc && doc.documentElement, doc && doc.body, win, contentArea].forEach(function (t) {
    if (!t) return;
    try {
      t.addEventListener('scroll', syncCanvasPosition, { passive: true });
      boundScrollTargets.push(t);
    } catch (e) { }
  });
}

function handlePointerUp(event) {
  clearTimeout(longClickTimer);
  longClickTimer = null;
  if (event && event.pointerId != null) {
    activePointersMap.delete(event.pointerId);
  }
  if (activePointersMap.size === 0) {
    // 롱클릭 OFF 시 타이머에서 이미 점 제거함 → pointerup에서 또 지우면 기존 그림이 사라짐
    isTwoFingerScrolling = false;
    isLongClickDetected = false;
    if (canvas) {
      canvas.style.pointerEvents = isPenMode ? 'auto' : 'none';
    }
    if (signaturePad) {
      try {
        if (isPenMode) signaturePad.on();
        else signaturePad.off();
      } catch (e) { }
    }
    setTimeout(syncCanvasPosition, 50);
  } else if (activePointersMap.size === 1) {
    activePointersMap.forEach(function (y) { lastScrollY = y; });
  }
}

function unbindPointerUpListeners() {
  boundPointerUpTargets.forEach(function (t) {
    try {
      t.removeEventListener('pointerup', handlePointerUp, true);
      t.removeEventListener('pointercancel', handlePointerUp, true);
    } catch (e) { }
  });
  boundPointerUpTargets = [];
}

function bindPointerUpListeners(doc, win) {
  [win, doc, doc && doc.documentElement, doc && doc.body, canvas].forEach(function (t) {
    if (!t || t === window) return;
    try {
      t.addEventListener('pointerup', handlePointerUp, true);
      t.addEventListener('pointercancel', handlePointerUp, true);
      boundPointerUpTargets.push(t);
    } catch (e) { }
  });
}

function cleanupCanvasAndPad() {
  unbindScrollListeners();
  unbindPointerUpListeners();
  resetGestureState();
  if (signaturePad) {
    try { signaturePad.off(); signaturePad.clear(); } catch (e) { }
  }
  signaturePad = null;
  if (canvas && canvas.parentNode) {
    try { canvas.parentNode.removeChild(canvas); } catch (e) { }
  }
  try {
    const old = document.getElementById('drawingCanvas');
    if (old) old.remove();
  } catch (e) { }
  if (activeLayerIframe) {
    try {
      const doc = activeLayerIframe.contentDocument;
      if (doc) {
        const old2 = doc.getElementById('drawingCanvas');
        if (old2) old2.remove();
        const glue = doc.getElementById('nativeCaptureGlueImage');
        if (glue) glue.remove();
      }
    } catch (e) { }
  }
  canvas = null;
  contentArea = null;
  activeLayerIframe = null;
}

function bindPointerEvents(targetCanvas) {
  if (!targetCanvas) return;

  targetCanvas.addEventListener('pointerdown', function (event) {
    if (!isPenMode) return;
    activePointersMap.set(event.pointerId, event.clientY);

    if (activePointersMap.size >= 2) {
      isTwoFingerScrolling = true;
      targetCanvas.style.pointerEvents = 'none';
      if (signaturePad) try { signaturePad.off(); } catch (e) { }
      let sumY = 0;
      activePointersMap.forEach(function (y) { sumY += y; });
      lastScrollY = sumY / activePointersMap.size;
      removeLastStroke(); // 두 번째 손가락 의도치 않은 획만 제거
      clearTimeout(longClickTimer);
      longClickTimer = null;
      isLongClickDetected = false;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    } else if (!isTwoFingerScrolling) {
      targetCanvas.style.pointerEvents = 'auto';
      if (signaturePad) try { signaturePad.on(); } catch (e) { }
      isLongClickDetected = false;
      touchStartPos = { x: event.clientX, y: event.clientY };
      // 화면 롱프레스: 그림 유지 + 펜 모드만 OFF (롱클릭으로 생긴 점만 제거)
      longClickTimer = setTimeout(function () {
        isLongClickDetected = true;
        // 1) 먼저 그리기 중단
        if (signaturePad) {
          try { signaturePad.off(); } catch (e) { }
        }
        // 2) 이번 롱프레스로 생긴 점/획만 1회 제거 (기존 그림 유지)
        removeLastStroke();
        // 3) 펜 모드 OFF (그림 데이터는 유지)
        // isPenMode = false;
        // currentModeNum = 0;
        // window.currentModeNum = 0;
        // if (canvas) {
        //   canvas.classList.remove('active');
        //   canvas.style.pointerEvents = 'none';
        //   canvas.style.setProperty('pointer-events', 'none', 'important');
        // }
        // activePointersMap.clear();
        // isTwoFingerScrolling = false;
        // console.log('[pen] 화면 롱클릭 → 펜 모드 OFF (그림 유지)');
        // // 4) 네이티브 펜 아이콘 투명(mode 0)으로 맞추도록 알림
        // try {
        //   if (window.android && typeof window.android.setMessage === 'function') {
        //     window.android.setMessage('', 'penMode', '0');
        //   }
        // } catch (e) { }
      }, 300);
    }
  }, { capture: true });

  targetCanvas.addEventListener('pointermove', function (event) {
    if (!isPenMode) return;
    if (activePointersMap.has(event.pointerId)) {
      activePointersMap.set(event.pointerId, event.clientY);
    }
    if (longClickTimer && !isLongClickDetected) {
      const moveX = Math.abs(touchStartPos.x - event.clientX);
      const moveY = Math.abs(touchStartPos.y - event.clientY);
      if (moveX > 10 || moveY > 10) {
        clearTimeout(longClickTimer);
        longClickTimer = null;
      }
    }
    if (isLongClickDetected) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }
    if (activePointersMap.size >= 2 || isTwoFingerScrolling) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      let sumY = 0;
      activePointersMap.forEach(function (y) { sumY += y; });
      const currentScrollY = sumY / activePointersMap.size;
      const deltaY = lastScrollY - currentScrollY;

      if (activeLayerIframe && activeLayerIframe.contentWindow) {
        try { activeLayerIframe.contentWindow.scrollBy(0, deltaY); } catch (e) { }
      } else if (typeof layerVisble !== 'undefined' && layerVisble === 't') {
        const layerIframe = document.getElementById(currentLayerId);
        if (layerIframe && layerIframe.contentWindow) {
          try { layerIframe.contentWindow.scrollBy(0, deltaY); } catch (e) { }
        }
      } else if (contentArea && contentArea.scrollHeight > contentArea.clientHeight + 2) {
        contentArea.scrollTop = (contentArea.scrollTop || 0) + deltaY;
        syncCanvasPosition();
      } else {
        window.scrollBy(0, deltaY);
        syncCanvasPosition();
      }
      lastScrollY = currentScrollY;
    }
  }, { capture: true });
}

function initCanvasInParent() {
  console.log('[pen] initCanvasInParent');
  cleanupCanvasAndPad();
  resetGestureState();

  contentArea = document.getElementById('viewTypeSelector') || document.body;
  if (!contentArea) return;

  canvas = document.createElement('canvas');
  canvas.id = 'drawingCanvas';
  contentArea.insertBefore(canvas, contentArea.firstChild);

  const SP = (typeof SignaturePad !== 'undefined') ? SignaturePad : null;
  if (!SP) {
    console.error('[pen] SignaturePad 없음');
    return;
  }
  signaturePad = new SP(canvas, { minWidth: 1, maxWidth: 2, penColor: 'rgba(255,0,0,1)' });
  window.signaturePad = signaturePad;
  signaturePad.off();

  bindPointerEvents(canvas);
  bindScrollListeners(document, window);
  setTimeout(function () { resizeCanvas(); }, 100);
  setTimeout(function () { resizeCanvas(); }, 500);
  applyPenModeInternal(currentModeNum);
}

window.reinitPenCanvasInLayer = function (layerId) {
  const id = layerId || currentLayerId;
  console.log('[pen] reinitPenCanvasInLayer:', id);

  const iframe = document.getElementById(id);
  if (!iframe) {
    console.warn('[pen] iframe 없음:', id);
    return false;
  }

  let doc, win;
  try {
    doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
    win = iframe.contentWindow;
  } catch (e) {
    console.warn('[pen] iframe 접근 실패:', e);
    return false;
  }
  if (!doc || !doc.body) return false;

  cleanupCanvasAndPad();
  resetGestureState();
  activeLayerIframe = iframe;
  contentArea = doc.body;

  const old = doc.getElementById('drawingCanvas');
  if (old) old.remove();

  canvas = doc.createElement('canvas');
  canvas.id = 'drawingCanvas';
  // top:0 — 문서와 함께 스크롤 (이탈 방지)
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;z-index:999;pointer-events:none;mix-blend-mode:multiply;';
  doc.body.insertBefore(canvas, doc.body.firstChild);

  const SP = (typeof SignaturePad !== 'undefined') ? SignaturePad : null;
  if (!SP) return false;
  signaturePad = new SP(canvas, { minWidth: 1, maxWidth: 2, penColor: 'rgba(255,0,0,1)' });
  window.signaturePad = signaturePad;
  signaturePad.off();

  bindPointerEvents(canvas);
  bindScrollListeners(doc, win);
  bindPointerUpListeners(doc, win);

  setTimeout(function () { resizeCanvas(); }, 50);
  setTimeout(function () { resizeCanvas(); }, 300);
  setTimeout(function () { resizeCanvas(); }, 800);

  applyPenModeInternal(currentModeNum);
  console.log('[pen] 레이어(' + id + ') 캔버스 주입 완료, mode=' + currentModeNum);
  return true;
};

window.reinitPenCanvas = function () {
  console.log('[pen] reinitPenCanvas (isInIframe=' + isInIframe + ')');
  if (isInIframe) {
    // 자식에 스크립트가 있는 경우 폴백
    cleanupCanvasAndPad();
    contentArea = document.body;
    canvas = document.createElement('canvas');
    canvas.id = 'drawingCanvas';
    contentArea.insertBefore(canvas, contentArea.firstChild);
    const SP = (typeof SignaturePad !== 'undefined') ? SignaturePad :
      (window.parent && window.parent.SignaturePad);
    if (!SP) return;
    signaturePad = new SP(canvas, { minWidth: 1, maxWidth: 2, penColor: 'rgba(255,0,0,1)' });
    window.signaturePad = signaturePad;
    signaturePad.off();
    bindPointerEvents(canvas);
    bindScrollListeners(document, window);
    setTimeout(function () { resizeCanvas(); }, 100);
    applyPenModeInternal(currentModeNum);
    return;
  }
  if (typeof layerVisble !== 'undefined' && layerVisble === 't' && currentLayerId) {
    if (window.reinitPenCanvasInLayer(currentLayerId)) return;
  }
  initCanvasInParent();
};

function resizeCanvas() {
  if (!canvas) return;
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  let targetWidth, targetHeight;

  if (activeLayerIframe) {
    try {
      const doc = activeLayerIframe.contentWindow.document;
      const body = doc.body;
      const docElem = doc.documentElement;
      targetWidth = body.clientWidth || activeLayerIframe.clientWidth || window.innerWidth;
      let maxBottom = 0;
      const all = body.getElementsByTagName('*');
      for (let i = 0; i < all.length; i++) {
        const el = all[i];
        if (el.id === 'drawingCanvas' || el.id === 'nativeCaptureGlueImage') continue;
        if (el.offsetHeight > 0) {
          const bottom = el.offsetTop + el.offsetHeight;
          if (bottom > maxBottom) maxBottom = bottom;
        }
      }
      targetHeight = Math.max(
        body.scrollHeight || 0, docElem.scrollHeight || 0,
        body.offsetHeight || 0, maxBottom, activeLayerIframe.clientHeight || 0
      ) + 80;
    } catch (e) {
      targetWidth = window.innerWidth;
      targetHeight = window.innerHeight + 80;
    }
  } else {
    if (!contentArea) contentArea = document.getElementById('viewTypeSelector') || document.body;
    if (!contentArea) return;
    targetWidth = contentArea.clientWidth;
    targetHeight = (contentArea.offsetHeight || contentArea.scrollHeight || 0) + 80;
  }

  const backupData = signaturePad ? signaturePad.toData() : null;
  canvas.style.position = 'absolute';
  canvas.style.left = '0';
  canvas.style.top = activeLayerIframe ? '0' : (canvas.style.top || '0');
  canvas.style.width = targetWidth + 'px';
  canvas.style.height = targetHeight + 'px';
  canvas.style.zIndex = '999';
  canvas.style.pointerEvents = isPenMode ? 'auto' : 'none';
  canvas.style.mixBlendMode = 'multiply';
  canvas.width = Math.floor(targetWidth * ratio);
  canvas.height = Math.floor(targetHeight * ratio);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(ratio, ratio);
  if (backupData && signaturePad) {
    try { signaturePad.fromData(backupData); } catch (e) { }
  }
  syncCanvasPosition();
}

function applyPenModeInternal(modeNum) {
  currentModeNum = modeNum;
  window.currentModeNum = modeNum;
  resetGestureState();

  if (!canvas || !signaturePad) {
    isPenMode = (modeNum === 1 || modeNum === 2);
    return;
  }

  if (modeNum === 0) {
    isPenMode = false;
    canvas.classList.remove('active');
    canvas.style.pointerEvents = 'none';
    try { signaturePad.off(); } catch (e) { }
  } else if (modeNum === 1) {
    isPenMode = true;
    canvas.classList.add('active');
    canvas.style.pointerEvents = 'auto';
    signaturePad.penColor = 'rgba(255, 0, 0, 1)';
    if ((window.parent && window.parent.bcm === 'dark') || window.bcm === 'dark') {
      signaturePad.minWidth = 1.5;
      signaturePad.maxWidth = 3.0;
    } else {
      signaturePad.minWidth = 1.0;
      signaturePad.maxWidth = 2.0;
    }
    try { signaturePad.on(); } catch (e) { }
  } else if (modeNum === 2) {
    isPenMode = true;
    canvas.classList.add('active');
    canvas.style.pointerEvents = 'auto';
    if ((window.parent && window.parent.bcm === 'dark') || window.bcm === 'dark') {
      signaturePad.penColor = 'rgba(255, 255, 120, 0.5)';
      signaturePad.minWidth = 9.0;
      signaturePad.maxWidth = 18.0;
    } else {
      signaturePad.penColor = 'rgba(255, 255, 0, 0.5)';
      signaturePad.minWidth = 8.0;
      signaturePad.maxWidth = 16.0;
    }
    try { signaturePad.on(); } catch (e) { }
  }
}

function setPenModeFromApp(modeNum) {
  console.log('[pen] setPenModeFromApp(' + modeNum + ')');
  currentModeNum = modeNum;
  window.currentModeNum = modeNum;

  // 레이어가 열려 있고 펜을 켤 때만 자식에 캔버스 주입 (미리 주입하지 않음 → 캡처 왜곡 방지)
  if (!isInIframe && modeNum > 0 &&
    typeof layerVisble !== 'undefined' && layerVisble === 't' && currentLayerId) {
    if (!activeLayerIframe || !canvas || !canvas.parentNode) {
      window.reinitPenCanvasInLayer(currentLayerId);
    }
  }
  applyPenModeInternal(modeNum);
}
window.setPenModeFromApp = setPenModeFromApp;

function destroyAllPenFunctions() {
  resetGestureState();
  if (signaturePad) {
    try { signaturePad.clear(); signaturePad.off(); } catch (e) { }
  }
  isPenMode = false;
  if (canvas) {
    canvas.classList.remove('active');
    canvas.style.pointerEvents = 'none';
  }
}

function clearCanvasFromApp() {
  removeLastStroke();
}
window.clearCanvasFromApp = clearCanvasFromApp;

// 네이티브 signaturePadClear() 등에서 전체 삭제 시 사용
window.clearAllStrokes = function () {
  if (signaturePad) {
    try { signaturePad.clear(); } catch (e) { }
  }
};

window.isCanvasEmpty = function () {
  return !(signaturePad && !signaturePad.isEmpty());
};

/**
 * 현재 화면이 레이어인지, 레이어라면 id 조회 (Java evaluateJavascript 용)
 * 반환: JSON 문자열
 *   {"isLayer":false,"layerId":null}           - 부모(일반) 화면
 *   {"isLayer":true,"layerId":"layer1"}        - Layer1 표시 중
 *   {"isLayer":true,"layerId":"layer2"}        - Layer2 표시 중
 * 중첩 시 가장 위(마지막으로 연) 레이어 id 우선
 */
window.getLayerState = function () {
  try {
    function toLayerDivId(id) {
      if (!id) return null;
      // layer1 → Layer1, Layer1 → Layer1
      if (/^layer[1-8]$/i.test(id)) {
        return 'Layer' + id.replace(/^layer/i, '');
      }
      if (/^Layer[1-8]$/.test(id)) return id;
      return null;
    }

    var lv = (typeof window.layerVisble !== 'undefined') ? window.layerVisble
      : (typeof layerVisble !== 'undefined' ? layerVisble : undefined);
    var ov = (typeof window.objVisible !== 'undefined') ? window.objVisible
      : (typeof objVisible !== 'undefined' ? objVisible : 0);
    var fn = (typeof window.fName !== 'undefined') ? window.fName
      : (typeof fName !== 'undefined' ? fName : '');
    var cid = (typeof currentLayerId !== 'undefined') ? currentLayerId : '';

    // DOM: style.visibility === 'visible' 인 Layer
    var visibleIds = [];
    var layerDivs = document.querySelectorAll('[id^="Layer"]');
    for (var i = 0; i < layerDivs.length; i++) {
      var div = layerDivs[i];
      var inlineVis = (div.style && div.style.visibility) ? div.style.visibility : '';
      if (inlineVis !== 'visible') continue;
      var idAttr = div.id || ''; // Layer1
      if (idAttr) visibleIds.push(idAttr);
    }

    var layerId = null;
    var cand = null;
    if (cid && /^layer[1-8]$/i.test(cid) && (lv === 't' || ov > 0 || visibleIds.indexOf(toLayerDivId(cid)) >= 0)) {
      cand = cid;
    } else if (fn && /^layer[1-8]$/i.test(fn) && (lv === 't' || ov > 0 || visibleIds.indexOf(toLayerDivId(fn)) >= 0)) {
      cand = fn;
    } else if (visibleIds.length > 0) {
      cand = visibleIds[visibleIds.length - 1];
    } else if (lv === 't' && cid && /^layer[1-8]$/i.test(cid)) {
      cand = cid;
    } else if (lv === 't' && fn && /^layer[1-8]$/i.test(fn)) {
      cand = fn;
    }

    layerId = toLayerDivId(cand);

    return JSON.stringify({
      isLayer: !!layerId,
      layerId: layerId
    });
  } catch (e) {
    return JSON.stringify({ isLayer: false, layerId: null });
  }
};

window.lockAndPrepareCapture = function () {
  // 캡처용: 캔버스 숨김 + 그림을 img 스티커로 남김
  // 레이어: 스크롤 맨 위 + fixed→absolute (상단 잘림 방지)

  window.__captureLayerBackup = null;

  try {
    var lid = null;
    if (typeof currentLayerId !== 'undefined' && currentLayerId) lid = currentLayerId;
    if (!lid && typeof fName !== 'undefined' && fName) lid = fName;

    var layerMode = (typeof layerVisble !== 'undefined' && layerVisble === 't') ||
      (typeof window.layerVisble !== 'undefined' && window.layerVisble === 't');

    if (layerMode && lid) {
      var ifr = document.getElementById(lid);
      // iframe 스크롤 맨 위
      if (ifr && ifr.contentWindow) {
        try { ifr.contentWindow.scrollTo(0, 0); } catch (e1) { }
        try {
          var idoc = ifr.contentDocument || ifr.contentWindow.document;
          if (idoc) {
            if (idoc.documentElement) idoc.documentElement.scrollTop = 0;
            if (idoc.body) idoc.body.scrollTop = 0;
          }
        } catch (e2) { }
      }
      // Layer div: fixed → absolute
      var layerDiv = null;
      if (ifr) {
        var n = ifr.parentElement;
        while (n && n !== document.body) {
          if (n.id && /^Layer[1-8]$/.test(n.id)) { layerDiv = n; break; }
          n = n.parentElement;
        }
      }
      if (!layerDiv) {
        var cand = document.getElementById('Layer' + String(lid).replace(/^layer/i, ''));
        if (cand) layerDiv = cand;
      }
      if (layerDiv) {
        window.__captureLayerBackup = {
          el: layerDiv,
          position: layerDiv.style.position || '',
          top: layerDiv.style.top || '',
          left: layerDiv.style.left || '',
          width: layerDiv.style.width || '',
          height: layerDiv.style.height || '',
          zIndex: layerDiv.style.zIndex || '',
          overflow: layerDiv.style.overflow || ''
        };
        layerDiv.style.position = 'absolute';
        layerDiv.style.top = '0px';
        layerDiv.style.left = '0px';
        layerDiv.style.width = '100%';
        layerDiv.style.zIndex = '9000';
        layerDiv.style.overflow = 'visible';
      }
    }
    if (activeLayerIframe && activeLayerIframe.contentWindow) {
      try { activeLayerIframe.contentWindow.scrollTo(0, 0); } catch (e3) { }
    }
    try { window.scrollTo(0, 0); } catch (e4) { }
  } catch (e) {
    console.warn('[lockAndPrepareCapture] scroll/layer', e);
  }

  if (!canvas || !canvas.parentNode) return 'empty';

  var doc = canvas.ownerDocument || document;
  var area = doc.body;

  if (signaturePad && !signaturePad.isEmpty()) {
    var imgData = null;
    try { imgData = canvas.toDataURL('image/png'); } catch (e) { }
    if (imgData) {
      var tempImg = doc.getElementById('nativeCaptureGlueImage');
      if (!tempImg) {
        tempImg = doc.createElement('img');
        tempImg.id = 'nativeCaptureGlueImage';
        tempImg.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:auto;z-index:1000;mix-blend-mode:multiply;pointer-events:none;';
        area.insertBefore(tempImg, area.firstChild);
      }
      tempImg.src = imgData;
      canvas.style.visibility = 'hidden';
      canvas.setAttribute('data-capture-hidden', '1');
      return 'success';
    }
  }

  canvas.style.visibility = 'hidden';
  canvas.setAttribute('data-capture-hidden', '1');
  return 'empty';
};

window.unlockAndReleaseCapture = function () {
  console.log('[pen] unlockAndReleaseCapture');
  const docs = [document];
  if (activeLayerIframe) {
    try {
      const d = activeLayerIframe.contentDocument;
      if (d) docs.push(d);
    } catch (e) { }
  }
  docs.forEach(function (doc) {
    try {
      const tempImg = doc.getElementById('nativeCaptureGlueImage');
      if (tempImg) tempImg.remove();
      const cv = doc.getElementById('drawingCanvas');
      if (cv && cv.getAttribute('data-capture-hidden') === '1') {
        cv.style.visibility = '';
        cv.removeAttribute('data-capture-hidden');
      }
    } catch (e) { }
  });
  if (canvas && canvas.getAttribute('data-capture-hidden') === '1') {
    canvas.style.visibility = '';
    canvas.removeAttribute('data-capture-hidden');
  }

  // Layer fixed 복원
  try {
    var b = window.__captureLayerBackup;
    if (b && b.el) {
      b.el.style.position = b.position || 'fixed';
      b.el.style.top = b.top || '0px';
      b.el.style.left = b.left || '';
      b.el.style.width = b.width || '';
      b.el.style.height = b.height || '';
      b.el.style.zIndex = b.zIndex || '';
      b.el.style.overflow = b.overflow || '';
    }
    window.__captureLayerBackup = null;
  } catch (e) { }

  try {
    if (typeof layerRestore === 'function') layerRestore();
    else if (typeof layerRestroe === 'function') layerRestroe();
  } catch (e) { }
};

window.restoreParentPenAfterLayerClose = function () {
  if (isInIframe) return;
  console.log('[pen] restoreParentPenAfterLayerClose, mode=' + currentModeNum);
  activeLayerIframe = null;
  resetGestureState();
  initCanvasInParent();
  if (currentModeNum > 0) applyPenModeInternal(currentModeNum);
};

window.addEventListener('DOMContentLoaded', function () {
  if (!isInIframe) window.reinitPenCanvas();
  window.addEventListener('resize', function () { resizeCanvas(); });
  window.addEventListener('pointerup', handlePointerUp, true);
  window.addEventListener('pointercancel', handlePointerUp, true);
});

window.addEventListener('beforeunload', function () {
  unbindScrollListeners();
  unbindPointerUpListeners();
});
