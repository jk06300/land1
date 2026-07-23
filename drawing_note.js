// shared/drawing_note.js - 캔버스 높이 완전 해결 버전
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
let scrollSyncInterval = null;

// 현재 활성 레이어 관리 (layer1 ~ layer5)
let currentLayerId = 'layer1';

window.setCurrentLayer = function(layerId) {
    if (['layer1', 'layer2', 'layer3', 'layer4', 'layer5'].includes(layerId)) {
        currentLayerId = layerId;
        console.log(`현재 레이어 변경: ${layerId}`);
    } else {
        console.warn('알 수 없는 레이어 ID:', layerId);
    }
};

window.setContentAreaForIframe = function(wrapper) {
    contentArea = wrapper;
    if (canvas) resizeCanvas();
};

window.addEventListener('DOMContentLoaded', () => {
    contentArea = isInIframe 
        ? document.body
        : document.getElementById('viewTypeSelector');

    if (!contentArea) {
        console.warn("contentArea를 찾을 수 없습니다.");
        return;
    }

    canvas = document.createElement('canvas');
    canvas.id = 'drawingCanvas';
    contentArea.insertBefore(canvas, contentArea.firstChild);

    signaturePad = new SignaturePad(canvas, {
        minWidth: 1,
        maxWidth: 2,
        penColor: "rgba(255, 0, 0, 1)"
    });
    window.signaturePad = signaturePad; // ◀ 이 코드를 바로 아래에 꼭 추가해주세요!
    signaturePad.off();

    window.isCanvasEmpty = function() {
    // 1. 부모창(메인)에 그림이 있는지 확인
    if (window.signaturePad && !window.signaturePad.isEmpty()) {
        return false; 
    }
    // 2. 현재 열려있는 자식창(iframe) 내부도 확인 (예: currentLayerId 활용)
    if (typeof currentLayerId !== 'undefined' && currentLayerId) {
        var layerIframe = document.getElementById(currentLayerId);
        if (layerIframe && layerIframe.contentWindow) {
            var childWin = layerIframe.contentWindow;
            // 자식창 내부의 signaturePad가 비어있지 않다면 false 반환
            if (childWin.signaturePad && !childWin.signaturePad.isEmpty()) {
                return false;
            }
        }
    }
    return true; // 부모, 자식 모두 깨끗하다면 true
    };

    // 초기 크기 설정 + 지연 실행
    setTimeout(() => resizeCanvas(), 100);
    setTimeout(() => resizeCanvas(), 500);

    window.addEventListener("resize", resizeCanvas);
    if (isInIframe && window.parent) {
        window.parent.addEventListener("resize", resizeCanvas);
    }

    contentArea.addEventListener('scroll', syncCanvasPosition, { passive: true });

    // Pointer Events
    canvas.addEventListener('pointerdown', (event) => {
        if (!isPenMode) return;

        activePointersMap.set(event.pointerId, event.clientY);

        if (activePointersMap.size >= 2) {
            isTwoFingerScrolling = true;
            canvas.style.pointerEvents = 'none';
            signaturePad.off();

            let sumY = 0;
            activePointersMap.forEach(y => sumY += y);
            lastScrollY = sumY / activePointersMap.size;

            removeLastStroke();
            clearTimeout(longClickTimer);
            isLongClickDetected = false;

            event.stopPropagation();
            event.stopImmediatePropagation();

            //functin.js에서 전역변수 값을 전달받아 layer가 show인 상태면 스크롤 시 그림 이탈을 사전 방지를 위해 미리 그림 삭제
            if (window.layerVisble == "t") {
                signaturePad.clear();
            }
        } else if (!isTwoFingerScrolling) {
            canvas.style.pointerEvents = 'auto';
            signaturePad.on();

            isLongClickDetected = false;
            touchStartPos = { x: event.clientX, y: event.clientY };

            longClickTimer = setTimeout(() => {
                isLongClickDetected = true;
                signaturePad.off();
                removeLastStroke();
            }, 300);
        }
    }, { capture: true });

    canvas.addEventListener('pointermove', (event) => {
        if (!isPenMode) return;

        if (activePointersMap.has(event.pointerId)) {
            activePointersMap.set(event.pointerId, event.clientY);
        }

        if (longClickTimer && !isLongClickDetected) {
            const moveX = Math.abs(touchStartPos.x - event.clientX);
            const moveY = Math.abs(touchStartPos.y - event.clientY);
            if (moveX > 5 || moveY > 5) clearTimeout(longClickTimer);
        }

        if (isLongClickDetected) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            return;
        }

        if (activePointersMap.size >= 2 || isTwoFingerScrolling) {
            event.stopPropagation();
            event.stopImmediatePropagation();

            let sumY = 0;
            activePointersMap.forEach(y => sumY += y);
            const currentScrollY = sumY / activePointersMap.size;
            const deltaY = lastScrollY - currentScrollY;

            window.scrollBy(0, deltaY);
            if (isInIframe) {
                window.scrollBy(0, deltaY);
            } else {
                const layerIframe = document.getElementById(currentLayerId);
                if (layerIframe && layerIframe.contentWindow) {
                    layerIframe.contentWindow.scrollBy(0, deltaY);
                } else {
                    // currentLayerId를 못 찾았을 때 현재 켜져 있는 iframe을 찾아 스크롤해 주는 예외 처리
                    const allIframes = document.querySelectorAll('iframe.if_pd');
                    allIframes.forEach(iframe => {
                        if (iframe.contentWindow) {
                            iframe.contentWindow.scrollBy(0, deltaY);
                        }
                    });
                }
            }

            lastScrollY = currentScrollY;
            syncCanvasPosition();
        }
    }, { capture: true });

    const handlePointerUp = (event) => {
        if (!isPenMode) return;
        clearTimeout(longClickTimer);
        activePointersMap.delete(event.pointerId);

        if (activePointersMap.size === 0) {
            isTwoFingerScrolling = false;
            isLongClickDetected = false;
            canvas.style.pointerEvents = 'auto';
            signaturePad.on();
            setTimeout(syncCanvasPosition, 50);
        } else if (activePointersMap.size === 1) {
            activePointersMap.forEach(y => lastScrollY = y);
        }
    };

    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
});

// ==================== 핵심 함수 ====================
function syncCanvasPosition() {
    if (!canvas || !contentArea) return;
    const scrollTop = contentArea.scrollTop || 0;
    canvas.style.top = `-${scrollTop}px`;
}

function startScrollSync() {
    if (scrollSyncInterval) clearInterval(scrollSyncInterval);
    scrollSyncInterval = setInterval(syncCanvasPosition, 16);
}

function removeLastStroke() {
    if (!signaturePad) return;
    const data = signaturePad.toData();
    if (data && data.length > 0) {
        data.pop();
        signaturePad.fromData(data);
    }
}

function resizeCanvas() {
    // 런타임에 현재 펜 모드가 켜진 곳이 iframe 자식창 내부인지 부모 메인창인지 정확히 감지
    const isInsideChildIframe = (window !== window.parent);
    
    if (isInsideChildIframe) {
        contentArea = document.body;
    } else {
        contentArea = document.getElementById('viewTypeSelector');
    }

    if (!canvas || !contentArea) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const targetWidth = contentArea.clientWidth;
    
    // 💡 [핵심 대수술]: 부모창이든 자식창이든, 펜 모드 여부와 관계없이 
    // 무조건 억지 2배 늘림 없이 "현재 화면 문서의 순수 스크롤 전체 높이"를 칼같이 가져옵니다.
    let targetHeight = contentArea.scrollHeight; 

    // 💡 만약 자식창 내부인데 CSS(height:100% 등)나 브라우저 오동작으로 
    // scrollHeight가 가짜로 작게 리턴될 경우를 대비한 '실측 크로스 체크' 안전장치만 가동합니다.
    if (isInsideChildIframe) {
        const docElem = document.documentElement;
        const docBody = document.body;
        
        // 자식창 내부의 모든 태그 요소를 전수조사하여 진짜 글자와 테이블이 끝나는 최하단 물리 좌표를 구합니다.
        const allElements = docBody.getElementsByTagName('*');
        let maxBottomPos = 0;
        for (let i = 0; i < allElements.length; i++) {
            const el = allElements[i];
            if (el.id !== 'drawingCanvas' && el.id !== 'nativeCaptureGlueImage' && el.offsetHeight > 0) {
                const bottomPos = el.offsetTop + el.offsetHeight;
                if (bottomPos > maxBottomPos) {
                    maxBottomPos = bottomPos;
                }
            }
        }
        // 브라우저 기본 값과 내부 요소 실측 값 중 '진짜 문서 끝인 가장 큰 값'을 최종 높이로 결정합니다.
        targetHeight = Math.max(targetHeight, docElem.scrollHeight, maxBottomPos) + 10;
    }

    // 캔버스 크기 재할당 시 필기 데이터 유실 방지 백업
    const backupData = signaturePad ? signaturePad.toData() : null;

    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = targetWidth + "px";
    
    // 🎯 [완벽한 1:1 매핑]: 부모창이든 자식창이든 딱 실제 내용물 높이만큼만 도화지 세로 길이를 설정합니다.
    canvas.style.height = targetHeight + "px"; 
    
    canvas.style.zIndex = '999';
    canvas.style.pointerEvents = isPenMode ? 'auto' : 'none';
    
    canvas.width = targetWidth * ratio;
    canvas.height = targetHeight * ratio;
    
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    
    if (backupData && signaturePad) {
        signaturePad.fromData(backupData);
    }
    
    syncCanvasPosition();
}



function setPenModeFromApp(modeNum) {
    if (!canvas || !signaturePad) return;
    currentModeNum = modeNum;
    clearTimeout(longClickTimer);
    isLongClickDetected = false;

    if (modeNum === 0) {
        isPenMode = false;
        canvas.classList.remove('active');
        canvas.style.pointerEvents = 'none';
        signaturePad.off();
    } else if (modeNum === 1) {
        isPenMode = true;
        canvas.classList.add('active');
        canvas.style.pointerEvents = 'auto';
        signaturePad.minWidth = 1.0;
        signaturePad.maxWidth = 2.0;
        signaturePad.penColor = "rgba(255, 0, 0, 0.45)";
        signaturePad.on();
    } else if (modeNum === 2) {
        isPenMode = true;
        canvas.classList.add('active');
        canvas.style.pointerEvents = 'auto';
        signaturePad.minWidth = 7.5;
        signaturePad.maxWidth = 15.0;
        signaturePad.penColor = "rgba(255, 255, 0, 0.5)";
        signaturePad.on();
    }
    activePointersMap.clear();
}

function destroyAllPenFunctions() {
    if (scrollSyncInterval) clearInterval(scrollSyncInterval);
    if (signaturePad) signaturePad.clear();
    isPenMode = false;
    currentModeNum = 0;
    if (canvas) {
        canvas.classList.remove('active');
        canvas.style.pointerEvents = 'none';
    }
    signaturePad?.off();
}

function clearCanvasFromApp() {
    removeLastStroke();
}

window.addEventListener('beforeunload', () => {
    if (scrollSyncInterval) clearInterval(scrollSyncInterval);
});

// 자바가 캡처하기 직전에 그림을 이미지 스티커로 구워 본문에 붙이는 함수
window.lockAndPrepareCapture = function() {
    if (!canvas || !signaturePad || signaturePad.isEmpty()) return "empty";
    
    // 현재 캔버스에 그려진 모든 내용을 PNG 이미지 데이터로 추출
    var imgData = canvas.toDataURL("image/png");
    
    let tempImg = document.getElementById("nativeCaptureGlueImage");
    if (!tempImg) {
        tempImg = document.createElement("img");
        tempImg.id = "nativeCaptureGlueImage";
        tempImg.style.position = "absolute";
        tempImg.style.left = "0";
        tempImg.style.top = "0";
        tempImg.style.width = "100%";
        tempImg.style.height = canvas.style.height; // 현재 캔버스 높이와 1:1 일치
        tempImg.style.zIndex = "1000"; // 글자와 캔버스 맨 위에 강제 고정
        tempImg.style.mixBlendMode = "multiply"; // 형광펜 투명 효과 보존
        contentArea.appendChild(tempImg);
    }
    tempImg.src = imgData;
    return "success";
};

// 캡처가 끝나면 가짜 스티커 이미지를 제거하는 복구 함수
window.unlockAndReleaseCapture = function() {
    var tempImg = document.getElementById("nativeCaptureGlueImage");
    if (tempImg) {
        tempImg.remove();
    }
};
