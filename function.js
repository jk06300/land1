var bcm, dHeight, fColor, fName, pValue, tdColor, trColor;
var qNum = "";
var objVisible = 0;
var preName = "";

function setReSize() { 
var width = document.body.clientWidth;
var height = document.body.clientHeight;
var objWidth = width - 40;
var objHeight = height - 60;
if (document.getElementById("layer1")) {
document.getElementById("layer1").width = objWidth;
document.getElementById("layer1").height = objHeight;
}
if (document.getElementById("layer2")) {
document.getElementById("layer2").width = objWidth;
document.getElementById("layer2").height = objHeight;
}
if (document.getElementById("layer3")) {
document.getElementById("layer3").width = objWidth;
document.getElementById("layer3").height = objHeight;
}
if (document.getElementById("layer4")) {
document.getElementById("layer4").width = objWidth;
document.getElementById("layer4").height = objHeight;
}
if (document.getElementById("layer5")) {
document.getElementById("layer5").width = objWidth;
document.getElementById("layer5").height = objHeight;
}
if (document.getElementById("layer6")) {
document.getElementById("layer6").width = objWidth;
document.getElementById("layer6").height = objHeight;
}
if (document.getElementById("layer7")) {
document.getElementById("layer7").width = objWidth;
document.getElementById("layer7").height = objHeight;
}
if (document.getElementById("layer8")) {
document.getElementById("layer8").width = objWidth;
document.getElementById("layer8").height = objHeight;
}
}
function MM_findObj(n, d) {
var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_showHideLayers() {
	var i,p,v,obj,args=MM_showHideLayers.arguments;
	for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) {p=args[i+1]; v=args[i+2];
	fName = args[i].toLowerCase();
	pValue = p;
	switch (v) {
		case "show":
			objVisible++;
			if (preName == "") {preName = fName;}
			document.documentElement.style.overflow = 'scroll';
			document.documentElement.style.overflowX = 'hidden';
			document.documentElement.style.overflowY = 'hidden';
			document.body.scroll = "no";
			break;
		case "hide":
			objVisible--;
			if (preName != "") {
				fName = preName;
				switch ((qNum.match(/_/g) || []).length) {
					case 2:
						qNum = qNum.split('_')[0];
						break;
					case 1:
						qNum = "";
						break;
				}
			}
			document.documentElement.style.overflow = 'scroll';
			document.documentElement.style.overflowX = 'hidden';
			document.documentElement.style.overflowY = 'auto';
			document.body.scroll = "auto";
			break;
	}
	if (objVisible > 0) {
		if (p != '') {
			if (qNum == "") {
				qNum = "_" + p.split("/")[2].split(".")[0];
			} else {
				qNum = qNum + "_" + p.split("/")[2].split(".")[0];
			}
		} else {
			if (qNum == "") {
				qNum = "_" + document.getElementById(fName).getAttribute("src").split("/")[2].split(".")[0];
			} else {
				qNum = qNum + "_" + document.getElementById(fName).getAttribute("src").split("/")[2].split(".")[0];
			}
		}
	}
	if (obj.style) {obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v;}
	obj.visibility=v;
}
	if (p != '') {document.getElementById("layer1").src = p;}
	if (bcm == "dark") {
		obj.backgroundColor="#575757";
	} else {
		obj.backgroundColor="#FFFFFF";
	}
}
function autoResize(i) {
	var iframeHeight =	(i).contentWindow.document.body.scrollHeight;
	if ((i).contentWindow.document.getElementById('br') && (i).contentWindow.document.getElementById('br').style.display=="none") {
		(i).height = iframeHeight;
	} else {
		(i).height = iframeHeight + 23 + "px";
	}
}
function lineSpaceReduce() {
	if(document.body.innerHTML.indexOf('id="e1"') >= 0) {
		document.body.innerHTML = document.body.innerHTML.replace(/<\/span><\/p>\n<br>\n<br>\n<p/g, "</span></p>\n<br>\n<br>\n<br>\n<p");
		document.body.innerHTML = document.body.innerHTML.replace(/<\/span><\/p>\n<br><br>\n<p/g, "</span></p>\n<br>\n<br>\n<br>\n<p");
		document.body.innerHTML = document.body.innerHTML.replace(/<\/span><\/p><br><br><p/g, "</span></p>\n<br>\n<br>\n<br>\n<p");
		document.body.innerHTML = document.body.innerHTML.replace(/<br>\n<p/g, "<p");
		document.body.innerHTML = document.body.innerHTML.replace(/<br><p/g, "<p");
		document.body.innerHTML = document.body.innerHTML.replace(/p>\n<br>/g, "p>");
		document.body.innerHTML = document.body.innerHTML.replace(/p><br>/g, "p>");
		document.body.innerHTML = document.body.innerHTML.replace(/mb15/g, "mb5");
		document.body.innerHTML = document.body.innerHTML.replace(/<p><b>/g, "<p class='mb10'><b>");
		document.body.innerHTML = document.body.innerHTML.replace(/<p id/g, "<p class='mb5' id");
		document.body.innerHTML = document.body.innerHTML.replace(/<table class="tb f16 mb10"/g, '<table class="tb f16 mb10" style="margin-top:10px"');
		document.body.innerHTML = document.body.innerHTML.replace(/class="mt"/g, "style='margin-top:-15px'");
		document.getElementById("viewTypeSelector").style.lineHeight = 1;
		var p = document.getElementsByTagName('p');
		for (var i=0; i<p.length; i++) {
			p[i].style.lineHeight = 1.5;
		}
	}
}
function bc(i, t) {
	try{
		var frameName=window.frames[i];
		frameName.document.getElementById(t).style.backgroundColor="#F3F7F8";
	} catch(e) {}
}
function lbg(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.backgroundColor="#FFFCF6";
frameName.document.getElementById(t).style.color="#000000";
frameName.document.getElementById(t).style.marginRight="2px";
} catch(e) {}
}
function obg(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#FFFAF0";
} catch(e) {}
}
function ebg(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#F8FFED";
} catch(e) {}
}
function mbg(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#FFFADB";
	frameName.document.getElementById(t).style.color="#000000";
	frameName.document.getElementById(t).style.marginRight="2px";
	frameName.document.getElementById(t).style.fontSize="16px";
} catch(e) {}
}
function gbg(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#EFFFDB";
	frameName.document.getElementById(t).style.color="#000000";
	frameName.document.getElementById(t).style.marginRight="2px";
	frameName.document.getElementById(t).style.fontSize="16px";
} catch(e) {}
}
function bbg(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#E6FFFC";
	frameName.document.getElementById(t).style.color="#000000";
	frameName.document.getElementById(t).style.marginRight="2px";
	frameName.document.getElementById(t).style.fontSize="16px";
} catch(e) {}
}
function ybg(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#FFFCCC";
	frameName.document.getElementById(t).style.color="#000000";
	frameName.document.getElementById(t).style.marginRight="2px";
	frameName.document.getElementById(t).style.fontSize="16px";
} catch(e) {}
}
function rgbg(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#FAFFF1";
	frameName.document.getElementById(t).style.color="#CF0000";
	frameName.document.getElementById(t).style.marginRight="2px";
	frameName.document.getElementById(t).style.fontSize="16px";
} catch(e) {}
}
function bgbg(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#FFFFFF";
	frameName.document.getElementById(t).style.color="#0022FF";
	frameName.document.getElementById(t).style.marginRight="2px";
	frameName.document.getElementById(t).style.fontSize="16px";
} catch(e) {}
}
function grbg(i, t)
{
try{
var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#EFFFDB";
	frameName.document.getElementById(t).style.color="#BF0000";
	frameName.document.getElementById(t).style.marginRight="2px";
	frameName.document.getElementById(t).style.fontSize="16px";
} catch(e) {}
}
function bbbg(i, t)
{
try{
var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#F2FFFD";
	frameName.document.getElementById(t).style.color="#0000FF";
	frameName.document.getElementById(t).style.marginRight="2px";
	frameName.document.getElementById(t).style.fontSize="16px";
} catch(e) {}
}
function bybg(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.backgroundColor="#FFFDDD";
frameName.document.getElementById(t).style.color="#0022FF";
frameName.document.getElementById(t).style.marginRight="2px";
} catch(e) {}
}
function line(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.borderBottomStyle="solid";
frameName.document.getElementById(t).style.borderBottomWidth="1px"
frameName.document.getElementById(t).style.borderBottomColor="#FF0000"
} catch(e) {}
}
function bline(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.backgroundColor="#F5FFFF";
frameName.document.getElementById(t).style.color="#0000FF";
frameName.document.getElementById(t).style.borderBottomStyle="solid";
frameName.document.getElementById(t).style.borderBottomWidth="1px"
frameName.document.getElementById(t).style.borderBottomColor="#FF0000"
} catch(e) {}
}
function ocolor(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.color="#000000";
frameName.document.getElementById(t).style.fontSize="16px";
} catch(e) {}
}
function ncolor(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.color="#FF5555";
} catch(e) {}
}
function acolor(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.color="#BB00BB";
frameName.document.getElementById(t).style.marginRight="2px";
} catch(e) {}
}
function bcolor(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.color="#0022FF";
frameName.document.getElementById(t).style.marginRight="2px";
} catch(e) {}
}
function dcolor(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.color="#7200FF";
frameName.document.getElementById(t).style.marginRight="2px";
} catch(e) {}
}
function gcolor(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.color="#00574E";
frameName.document.getElementById(t).style.marginRight="2px";
} catch(e) {}
}
function hcolor(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.color="#005A84";
frameName.document.getElementById(t).style.marginRight="2px";
} catch(e) {}
}
function pcolor(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.color="#BF0000";
frameName.document.getElementById(t).style.marginRight="2px";
} catch(e) {}
}
function scolor(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#FFF0F0";
} catch(e) {}
}
function tcolor(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#FFFDDD";
} catch(e) {}
}
function xcolor(i, t)
{
try{
	var frameName=window.frames[i];
	frameName.document.getElementById(t).style.backgroundColor="#F8FFED";
} catch(e) {}
}
function tmove(i, t, f, s)
{
try{
var frameName=window.frames[i];
var table = frameName.document.getElementById (t);
var tbody= table.tBodies[0];
var currentRow = tbody.rows[f-1];
var toRow = tbody.rows[s-1];
currentRow.parentNode.insertBefore (currentRow, toRow);
} catch(e) {}
}
function ins(i, t, n)
{
	try{
		var frameName=window.frames[i];
		fName = i;
		frameName.document.getElementById(t).innerHTML = n + " " + frameName.document.getElementById(t).innerHTML;
		if (n.indexOf('span') < 0 && n != "") {qNum = " " + n;}
	} catch(e) {}
}
function tag(i, t, n)
{
try{
var frameName=window.frames[i];
if (frameName.document.getElementById(t).innerHTML != "") {
frameName.document.getElementById(t).innerHTML = frameName.document.getElementById(t).innerHTML + " " + "<span class='f16 pink'>"+ n + "</span>";
} else {
frameName.document.getElementById(t).innerHTML = "<span class='f16 pink'>"+ n + "</span>";
}
} catch(e) {}
}
function tag2(i, t, n)
{
try{
var frameName=window.frames[i];
if (frameName.document.getElementById(t).innerHTML != "") {
frameName.document.getElementById(t).innerHTML = frameName.document.getElementById(t).innerHTML + " " + "<span class='f16 hcolor'>"+ n + "</span>";
} else {
frameName.document.getElementById(t).innerHTML = "<span class='f16 hcolor'>"+ n + "</span>";
}
} catch(e) {}
}
function tag3(i, t, n)
{
try{
var frameName=window.frames[i];
if (frameName.document.getElementById(t).innerHTML != "") {
frameName.document.getElementById(t).innerHTML = frameName.document.getElementById(t).innerHTML + " " + "<span class='f16 blue'>"+ n + "</span>";
} else {
frameName.document.getElementById(t).innerHTML = "<span class='f16 green'>"+ n + "</span>";
}
} catch(e) {}
}
function change(i, t, n)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).innerHTML = n;
} catch(e) {}
}
function hide(i, t)
{
try{
var frameName=window.frames[i];
frameName.document.getElementById(t).style.display="none";
} catch(e) {}
}
function ifsize(i, b, n)
{
var frameName=window.frames[i];
frameName.document.getElementById(b).style.fontSize= n;
}
function t(a,b,c,d,e) {
ta = a;
tb = b;
tc = c;
td = d;
te = e;
}
function s(a,b,c,d,e) {
sa = a;
sb = b;
sc = c;
sd = d;
se = e;
}
function p(a,b,c,d,e) {
pa = a;
pb = b;
pc = c;
pd = d;
pe = e;
}
function a(a,b,c,d,e) {
aa = a;
ab = b;
ac = c;
ad = d;
ae = e;
}
function b(a,b,c,d,e) {
ba = a;
bb = b;
bc = c;
bd = d;
be = e;
}
function d(a,b,c,d,e) {
da = a;
db = b;
dc = c;
dd = d;
de = e;
}
function g(a,b,c,d,e,f) {
ga = a;
gb = b;
gc = c;
gd = d;
ge = e;
gf = f;
}
function i(a,b,c,e,g) {
ia = a;
ib = b;
ic = c;
ie = e;
ig = g;
}
var PopLayer = {
	nowLayer : "",
	openLayer : "",
	Xpos : "",
	Ypos : "",
	Action : function(strAnchor, strLayer){
		this.nowLayer = strLayer;
		if(this.openLayer != ""){
			var objOpenLayer = document.getElementById(this.openLayer);
			objOpenLayer.style.display = "none";
			this.openLayer = "";
		}
		this.openLayer = strLayer;
		try{
			strAnchor.onmouseup = PopLayer.Open;
		} catch(e) {}
	},
	Open : function(e){
		if(document.all){
			this.Xpos = event.clientX + (document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);
			this.Ypos = event.clientY + (document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);
		} else {
			this.Xpos = e.clientX + (document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);
			this.Ypos = e.clientY + (document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);
		}
		var objNowLayer = document.getElementById(PopLayer.nowLayer);
		var layerId = objNowLayer.getAttribute('id');
		objNowLayer.style.position = "absolute";
		objNowLayer.style.display = "block";
		objNowLayer.style.color = "#df0000";
		if (layerId == "layer1") {
			objNowLayer.style.top = document.body.scrollTop + this.Ypos + 15 + "px";
			objNowLayer.style.left = 140 + "px";
			objNowLayer.style.marginRight = 20 + "px";
		} else {
			objNowLayer.style.top = document.body.scrollTop + this.Ypos - 65 + "px";
			objNowLayer.style.left = 20 + "px";
			objNowLayer.style.fontWeight = "bold";
		}
	},
	Close : function(){
		this.openLayer = "";
		var objNowLayer = document.getElementById(PopLayer.nowLayer);
		objNowLayer.style.display = "none";
	}
}
function marking(i, n)	{
	document.getElementById(i).innerHTML = n;
	document.getElementById(i).style.position="absolute";
	document.getElementById(i).style.left= 0 + "px";
	document.getElementById(i).style.fontWeight="bold";
	if (bcm == "dark") {
		document.getElementById(i).style.color="#FFBBBB";
	} else {
		switch (n) {
			case "Ｏ":
				document.getElementById(i).style.color="#FF0000";
				break;
			case "Ｘ":
				document.getElementById(i).style.color="#FF0000";
				break;
			case "Ｖ":
				document.getElementById(i).style.color="#FF0000";
				break;
			case "？":
				document.getElementById(i).style.color="#339900";
				break;
			case "☆":
				document.getElementById(i).style.color="#0099FF";
				break;
		}
	}
	if (document.getElementById("markName")) {
		document.getElementById("markName").innerHTML = i;
		document.getElementById("markType").innerHTML = n;
	} else {
		document.getElementById("layer").innerHTML = document.getElementById("layer").innerHTML + "<span style='color:#FFFFFF;opacity:0'><span id='markName'>" + i + "</span>" + "<span id='markType'>" + n + "</span></span>";
	}
	window.android.setMessage(i, n, '');
}
function setMessageGreen(i, n) {
	document.getElementById(i).innerHTML = n;
	document.getElementById(i).style.position="absolute";
	document.getElementById(i).style.left= 0 + "px";
	document.getElementById(i).style.fontWeight="bold";
	if (bcm == "dark") {
		document.getElementById(i).style.color="#7FC95B";
	} else {
		document.getElementById(i).style.color="#339900";
	}
}
function setMessageBlue(i, n) {
	document.getElementById(i).innerHTML = n;
	document.getElementById(i).style.position="absolute";
	document.getElementById(i).style.left= 0 + "px";
	document.getElementById(i).style.fontWeight="bold";
	if (bcm == "dark") {
		document.getElementById(i).style.color="#95C5DB";
	} else {
		document.getElementById(i).style.color="#0099FF";
	}
}
function setMessageRed(i, n) {
	document.getElementById(i).innerHTML = n;
	document.getElementById(i).style.position="absolute";
	document.getElementById(i).style.left= 0 + "px";
	document.getElementById(i).style.fontWeight="bold";
	if (bcm == "dark") {
		document.getElementById(i).style.color="#FFBBBB";
	} else {
		document.getElementById(i).style.color="#DF0000";
	}
}
function memoBox(i) {
	var ID = "m" + i;
	window.android.setMessage(ID, 'memoBox', '');
}
function memoAdd(i, n) {
	if (n == '') {
		document.getElementById(i).innerHTML = '';
		document.getElementById(i).style.display="none";
	} else {
		n = n.replaceAll('(0/','<span style="color:black">');
		n = n.replaceAll('(1/','<span style="color:red">');
		n = n.replaceAll('(2/','<span style="color:blue">');
		n = n.replaceAll('(3/','<span style="color:green">');
		n = n.replaceAll('(4/','<span style="color:purple">');
		n = n.replaceAll('(*/','<span style="font-weight:bold">');
		n = n.replaceAll('(*0/','<span style="color:black; font-weight:bold">');
		n = n.replaceAll('(*1/','<span style="color:red; font-weight:bold">');
		n = n.replaceAll('(*2/','<span style="color:blue; font-weight:bold">');
		n = n.replaceAll('(*3/','<span style="color:green; font-weight:bold">');
		n = n.replaceAll('(*4/','<span style="color:purple; font-weight:bold">');
		n = n.replaceAll('(0*/','<span style="color:black; font-weight:bold">');
		n = n.replaceAll('(1*/','<span style="color:red; font-weight:bold">');
		n = n.replaceAll('(2*/','<span style="color:blue; font-weight:bold">');
		n = n.replaceAll('(3*/','<span style="color:green; font-weight:bold">');
		n = n.replaceAll('(4*/','<span style="color:purple; font-weight:bold">');
		n = n.replaceAll('/)','</span>');
		document.getElementById(i).innerHTML = n;
		if (i != 'memo') {
			document.getElementById(i).style.fontSize= 16 + "px";
			document.getElementById(i).style.position="relative";
			document.getElementById(i).style.marginLeft = 15 + "px";
			document.getElementById(i).style.paddingTop = 3 + "px";
			document.getElementById(i).style.paddingBottom = 3 + "px";
			document.getElementById(i).style.borderWidth = 1 + "px";
			document.getElementById(i).style.borderStyle = "solid";
			document.getElementById(i).style.borderRadius = 5 + "px";
			if (n == "···") {
				document.getElementById(i).style.display="inline-block";
				document.getElementById(i).style.width = "auto";
				document.getElementById(i).style.lineHeight = 0.8;
				document.getElementById(i).style.marginTop = 0 + "px";
				document.getElementById(i).style.paddingLeft = 3 + "px";
				document.getElementById(i).style.paddingRight = 3 + "px";
			} else {
				document.getElementById(i).style.display="block";
				document.getElementById(i).style.lineHeight = 1.6;
				document.getElementById(i).style.marginTop = 15 + "px";
				document.getElementById(i).style.paddingLeft = 7 + "px";
				document.getElementById(i).style.paddingRight = 7 + "px";
			}
			if (bcm == "dark") {
				document.getElementById(i).style.backgroundColor="#A3AA9F";
				document.getElementById(i).style.color="#000000";
				document.getElementById(i).style.borderColor = "#A3AA9F";
			} else {
				document.getElementById(i).style.backgroundColor="#edfced";
				document.getElementById(i).style.color="#254625";
				document.getElementById(i).style.borderColor = "#9cce9c";
			}
		}
	}
}
function memoEdit() {
	var ID = window.event.target.id;
	if (document.getElementById(ID).innerHTML == "···") {
		window.android.setMessage(ID, 'memoShow', '');
	} else {
		window.android.setMessage(ID, 'memoEdit', '');
	}
}
function setMessage(i, t, m) {
	if (t == '') {
		document.getElementById(i).innerHTML = m;
		if (bcm == "dark") {
			if (fColor == "white" || document.getElementById(i).style.color == "rgb(255, 255, 255)" || document.getElementById(i).style.color == "rgb(255, 187, 187)") {
				document.getElementById(i).style.color="#FFFFFF";
				fColor = "white";
			} else {
				document.getElementById(i).style.color="#606000";
				fColor = "black";
			}
		} else {
			document.getElementById(i).style.color="#404000";
		}
	} else {
		document.getElementById(i).innerHTML = t;
		if (bcm == "dark") {
			if (fColor == "white" || document.getElementById(i).style.color == "rgb(255, 255, 255)") {
				document.getElementById(i).style.color="#FFBBBB";
				fColor = "white";
			} else {
				document.getElementById(i).style.color="#CF0000";
				fColor = "black";
			}
		} else {
			document.getElementById(i).style.backgroundColor="#FAFFF1";
			document.getElementById(i).style.color="#CF0000";
		}
		if (document.getElementById(i).title == "e") {
			document.getElementById(i).style.display="compact";
			document.getElementById(i).style.paddingLeft = 10 + "px";
		}
	}
	if (document.getElementById("markName")) {
		document.getElementById("markName").innerHTML = i;
		if (t == '') {
			document.getElementById("markType").innerHTML = m;
		} else {
			document.getElementById("markType").innerHTML = t;
		}
	} else {
		var mType
		if (t == '') {
			mType = m
		} else {
			mType = t
		}
		document.getElementById("layer").innerHTML = document.getElementById("layer").innerHTML + "<span style='color:#FFFFFF;opacity:0'><span id='markName'>" + i + "</span>" + "<span id='markType'>" + mType + "</span></span>";
	}
	window.android.setMessage(i, t, '');
}
function markShow(i, m) {
	if (m == "v") {
		if (bcm == "dark") {
			document.getElementById(i).style.backgroundColor="#938E75";
		} else {
			document.getElementById(i).style.backgroundColor="#FFFDDD";
		}
 } else {
		document.getElementById(i).style.backgroundColor="transparent";
	}
}
function example(t1, t2, t3, t4, t5, t6, i) {
	var ID = "m" + i;
	document.getElementById('td1').innerHTML = '&nbsp;';
	document.getElementById('td2').innerHTML = '&nbsp;';
	document.getElementById('td3').innerHTML = '&nbsp;';
	document.getElementById('td4').innerHTML = '&nbsp;';
	document.getElementById('td5').innerHTML = '&nbsp;';
	document.getElementById('td6').innerHTML = '&nbsp;';
	if (t1 != '') {
		document.getElementById('td1').style.display = "table-cell";
		document.getElementById('td1').innerHTML = t1;
	} else {
		document.getElementById('td1').style.display = "none";
	}
	if (t2 != '') {
		document.getElementById('td2').style.display = "table-cell";
		document.getElementById('td2').innerHTML = t2;
	} else {
		document.getElementById('td2').style.display = "none";
	}
	if (t3 != '') {
		document.getElementById('td3').style.display = "table-cell";
		document.getElementById('td3').innerHTML = t3;
	} else {
		document.getElementById('td3').style.display = "none";
	}
	if (t4 != '') {
		document.getElementById('td4').style.display = "table-cell";
		document.getElementById('td4').innerHTML = t4;
	} else {
		document.getElementById('td4').style.display = "none";
	}
	if (t5 != '') {
		document.getElementById('td5').style.display = "table-cell";
		document.getElementById('td5').innerHTML = t5;
	} else {
		document.getElementById('td5').style.display = "none";
	}
	if (t6 != '') {
		document.getElementById('td6').style.display = "table-cell";
		document.getElementById('td6').innerHTML = t6;
	} else {
		document.getElementById('td6').style.display = "none";
	}
	if (document.getElementById(ID)) {
		document.getElementById('td8').style.display = "table-cell";
	} else {
		document.getElementById('td8').style.display = "none";
	}
}
function setNum(i1, n1, i2, n2, c) {
	switch (bcm) {
		case "dark":
			document.getElementById(i1).style.backgroundColor = "#BFBFBF";
			document.getElementById(i1).style.color = "#000000";
			document.getElementById(i2).style.color = "#BFBFBF";
		break;
		default:
			document.getElementById(i1).style.backgroundColor = "#707070";
			document.getElementById(i1).style.color = "#FFFFFF";
			document.getElementById(i2).style.color = "#404000";
	}	
	document.getElementById(i1).style.fontSize = 14 + "px";
	document.getElementById(i1).style.fontWeight = "bold";
	document.getElementById(i1).innerHTML = "&nbsp;" + n1 + " "
	document.getElementById(i2).style.fontSize = 14 + "px";
	document.getElementById(i2).innerHTML = "&nbsp; " + n2;
	if (c == "change") {
		setTimeout("window.android.setMessage('', 'change', '')", 200);
	} else if (c == "capture") {
		setTimeout("window.android.setMessage('', 'capture', '')", 200);
	}
}
function deleteNum(i1, i2) {
	document.getElementById(i1).innerHTML = "";
	document.getElementById(i2).innerHTML = "";
}
function domHeight() {
	dHeight = document.body.clientHeight;
}
function layerCapture() {
	if (objVisible > 0) {
		var frameName=window.frames[fName];
		document.getElementById(fName).style.height = frameName.document.body.scrollHeight + "px";
		document.getElementById("viewTypeSelector").style.display="none";
		document.body.style.height = frameName.document.body.scrollHeight + 10 + "px";
		if (qNum.indexOf('<br>') >= 0) {qNum = qNum.replace('<br>','');}
	} else {
		qNum = "";
	}
	setTimeout("window.android.setMessage('', 'capture', '" + qNum + "')", 200);
}
function layerRestroe() {
	if (objVisible > 0) {
		document.getElementById("viewTypeSelector").style.display="block";
		document.body.style.height = dHeight + "px";
		document.getElementById(fName).style.height = dHeight - 60 + "px";
	}
}
function pageView(i, n, w) {
	var pageUrl = i;
	var tag = n;
	var keyword = w;
	window.android.setMessage(pageUrl, tag, keyword);
}
function findResult(w) {
	var keyword = w;
	if (document.getElementById("viewTypeSelector").innerHTML == '') {
		document.getElementById("viewTypeSelector").innerHTML = "<p><span style='color:#ff0000'>&quot;" + keyword + "&quot;</span>에 대한 검색결과가 없습니다.</p>"
	}
}
function highlight(i, v) {
	var regEx = new RegExp("(" + v + ")(?!([^<]+)?>)", "gim");
	var output;
	if (bcm == "dark") {
		output = "<span class='tcolor' style='color:#000000'><b>$1</b></span>";
	} else {
		output = "<span style='color:#FFFFFF;background-color:#758697'><b>$1</b></span>";
	}
	if (i == '') {
		var p = document.getElementsByTagName('p');
			for (var i=0; i<p.length; i++) {
				p[i].innerHTML = p[i].innerHTML.replace(regEx, output);
			}
			var iframe = document.getElementsByTagName('iframe');
			for (var i=0; i<iframe.length; i++) {
				iframe[i].contentWindow.document.body.innerHTML = iframe[i].contentWindow.document.body.innerHTML.replace(regEx, output);
			}
		//document.body.innerHTML = document.body.innerHTML.replace(regEx, output);
	} else {
		var frameName=window.frames[i];
		frameName.document.body.innerHTML = frameName.document.body.innerHTML.replace(regEx, output);
	}
}
function ad(i) {
	document.getElementById(i).innerHTML = "<iframe src='../ad.html' frameborder='0' width='100%' height='0px' onload='autoResize(this)' scrolling='no'></iframe>";
}
function bcmDeclear(v) {
	bcm = v;
}
function backgroundColorMode() {
	try{
		if (bcm == "dark") {
			document.body.style.color="#FFFFFF";
			document.body.style.backgroundColor="#575757";
			var p = document.getElementsByTagName('p');
			for (var i=0; i<p.length; i++) {
				if (p[i].classList.contains('gbg') || p[i].classList.contains('abg') || p[i].classList.contains('bbg') || p[i].classList.contains('mbg') || p[i].classList.contains('ybg') || p[i].classList.contains('green')) {
					p[i].style.color="#D5EBCC";
				} else {
					p[i].style.color="#FFFFFF";
				}
				p[i].style.backgroundColor="transparent";
			}
			var b = document.getElementsByTagName('b');
			for (var i=0; i<b.length; i++) {
				b[i].style.color="#F9FFFD";
			}
			var s = document.getElementsByTagName('span');
			for (var i=0; i<s.length; i++) {
				if (s[i].classList.contains('qrs')) {
					s[i].style.color="#BFBFBF";
				} else if (s[i].id == "snum") {
					s[i].style.color="#000000";
					s[i].style.backgroundColor="#BFBFBF";
				} else if (s[i].id == "tag") {
					s[i].style.color="#BFBFBF";
				} else if (s[i].style.backgroundColor == "rgb(170, 0, 170)" || s[i].style.backgroundColor == "rgb(187, 0, 187)" || s[i].classList.contains('c88') || s[i].classList.contains('pink')) {
					s[i].style.color="#FFD8FF";
				} else if (s[i].classList.contains('c99') || s[i].classList.contains('rgbg') || s[i].classList.contains('grbg')) {
					s[i].style.color="#FFBBBB";
					s[i].style.backgroundColor="transparent";
				} else if (s[i].classList.contains('blue') || s[i].classList.contains('bbbg')) {
					s[i].style.color="#C5C7FE";
					s[i].style.backgroundColor="transparent";
				} else if (s[i].classList.contains('gbg') || s[i].classList.contains('abg') || s[i].classList.contains('bbg') || s[i].classList.contains('mbg') || s[i].classList.contains('ybg') || s[i].classList.contains('green')) {
					s[i].style.color="#D5EBCC";
					s[i].style.backgroundColor="transparent";
				} else if (s[i].classList.contains('ncolor')) {
					s[i].style.color="#FF9999";
				} else if (s[i].classList.contains('sb') || s[i].classList.contains('sb1') || s[i].classList.contains('sb2') || s[i].classList.contains('hcolor')) {
					s[i].style.color="#95C5DB";
				} else if (s[i].classList.contains('trs') || s[i].classList.contains('mrs') || s[i].classList.contains('rs') ) {
					s[i].style.color="#DDD5AE";
				} else {
					s[i].style.color="#FFFFFF";
				}
			}
			var a = document.getElementsByTagName('a');
			for (var i=0; i<a.length; i++) {
				a[i].style.color="#95C5DB";
			}
			var img = document.getElementsByTagName('img');
			for (var i=0; i<img.length; i++) {
				if (img[i].src.indexOf('allteaching') == -1 && img[i].src.indexOf('m_') == -1 && img[i].src.indexOf('menu') == -1) {
					img[i].src = img[i].src.split(".")[0] + "_d." + img[i].src.split(".")[1];
				}
			}
			var tb = document.getElementsByTagName('table');
			for (var i=0; i<tb.length; i++) {
				tb[i].style.borderColor="#FFFFFF";
				if (tb[i].style.backgroundColor == "rgb(255, 253, 221)") {
					tb[i].style.backgroundColor="#C3BC9A";
				}
			}
			var tr = document.getElementsByTagName('tr');
			for (var i=0; i<tr.length; i++) {
				if (tr[i].classList.contains('tcolor')) {
					tr[i].style.backgroundColor="#C3BC9A";
					trColor = "o";
					} else if (tr[i].classList.contains('obg')) {
					tr[i].style.backgroundColor="#B8B2AB";
					trColor = "o";
					} else if (tr[i].classList.contains('ebg') || tr[i].classList.contains('xcolor')) {
					tr[i].style.backgroundColor="#A3AA9F";
					trColor = "o";
					} else if (tr[i].classList.contains('bc')) {
					tr[i].style.backgroundColor="#A1A5AF";
					trColor = "o";
					} else {
					trColor = "x";
					}
					var td = tr[i].getElementsByTagName('td');
					for (var j=0; j<td.length; j++) {
						var p = td[j].getElementsByTagName('p');
						var s = td[j].getElementsByTagName('span');
						td[j].style.borderColor="#FFFFFF";
						if (td[j].style.backgroundColor == "rgb(255, 253, 221)" || td[j].classList.contains("tcolor")) {
							td[j].style.backgroundColor="#C3BC9A";
							tdColor = "o";
						} else if (td[j].style.backgroundColor == "rgb(255, 250, 240)" || td[j].classList.contains("obg")) {
							td[j].style.backgroundColor="#B8B2AB";
							tdColor = "o";
						} else if (td[j].style.backgroundColor == "rgb(248, 255, 237)" || td[j].classList.contains("ebg") || td[j].classList.contains("xcolor")) {
							td[j].style.backgroundColor="#A3AA9F";
							tdColor = "o";
						} else if (td[j].style.backgroundColor == "rgb(230, 255, 252)" || td[j].classList.contains("abg") || td[j].classList.contains("bbg")) {
							td[j].style.backgroundColor="#A1A5AF";
							tdColor = "o";
						} else if (td[j].style.backgroundColor == "rgb(255, 250, 219)" || td[j].classList.contains("mbg")) {
							td[j].style.backgroundColor="#C3BC9A";
							tdColor = "o";
						} else if (td[j].style.color == "rgb(64, 64, 0)" || td[j].classList.contains('trs') || td[j].classList.contains('mrs') || td[j].classList.contains('rs')) {
							td[j].style.color="#DDD5AE";
							tdColor = "x";
						} else if (td[j].style.backgroundColor == "rgb(243, 247, 248)" || td[j].classList.contains("bc")) {
							td[j].style.backgroundColor="#A1A5AF";
							tdColor = "o";
						} else if (td[j].classList.contains("rgbg")) {
							td[j].style.color="#AF0000";
							td[j].style.backgroundColor="#C3BC9A";
							tdColor = "o";
						} else {
							if (trColor=="o") {
							tdColor = "o";
							} else {
							tdColor = "x";
							}
						}
						switch (tdColor) {
							case "o":
								switch (td[j].style.color) {
									case "rgb(117, 134, 151)": //#758697
										td[j].style.color="#9FC4E9";
									break;
									case "rgb(255, 187, 187)": //#FFBBBB
									case "rgb(191, 0, 0)": //#BF0000
									case "rgb(207, 0, 0)": //#CF0000
										td[j].style.color="#AF0000";
									break;
									default:
										if (td[j].style.color == "rgb(255, 255, 255)" || td[j].style.color == "") {
											td[j].style.color="#000000";
										}
								}
								for (var k=0; k<p.length; k++) {
									if (p[k].style.color == "rgb(64, 64, 0)" || p[k].classList.contains('trs') || p[k].classList.contains('mrs') || p[k].classList.contains('rs')) {
										p[k].style.color="#606000";
									} else {
										p[k].style.color="#000000";
									}
								}
								for (var k=0; k<s.length; k++) {
									if (s[k].style.color == "rgb(255, 187, 187)" || s[k].classList.contains('c99')) {
										s[k].style.color="#AF0000"
									} else if (s[k].style.color == "rgb(197, 199, 254)" || s[k].classList.contains('blue') || s[k].classList.contains('bbbg')) {
										s[k].style.color="#0000BF"
									} else if (s[k].style.color == "rgb(255, 216, 255)" || s[k].classList.contains('c88') || s[k].classList.contains('pink')) {
										s[k].style.color="#AA00AA"
									} else if (s[k].style.color == "rgb(213, 235, 204)" || s[k].classList.contains('gbg') || s[k].classList.contains('abg') || s[k].classList.contains('bbg') || s[k].classList.contains('mbg') || s[k].classList.contains('ybg')) {
										s[k].style.color="#1C6000";
									} else if (s[k].style.color == "rgb(221, 213, 174)" || s[k].style.color == "rgb(64, 64, 0)" || s[k].classList.contains('trs') || s[k].classList.contains('mrs') || s[k].classList.contains('rs')) {
										s[k].style.color="#606000";
									} else if (s[k].style.color == "rgb(255, 153, 153)" || s[k].classList.contains('ncolor')) {
										s[k].style.color="#B54A4A";
									} else if (s[k].style.color == "rgb(117, 134, 151)" || s[k].classList.contains('sb') || s[k].classList.contains('sb1') || s[k].classList.contains('sb2')) {
										s[k].style.color="#505861";
									} else if (s[k].style.color == "rgb(149, 197, 219)" || s[k].classList.contains('hcolor')) {
										s[k].style.color="#005A84"
									} else {
										s[k].style.color="#000000"
									}
								}
								var a = td[j].getElementsByTagName('a');
								for (var k=0; k<a.length; k++) {
									a[k].style.color="#005A84"
								}
							break;
							case "x":
								if (td[j].style.color == "rgb(191, 0, 0)" || td[j].style.color == "rgb(207, 0, 0)") {
									td[j].style.color="#FFBBBB";  //#BF0000 #CF0000
								} else if (td[j].style.color == "rgb(255, 85, 85)") {
									td[j].style.color="#FF9999";  //ncolor #FF5555
								} else if (td[j].style.color == "rgb(0, 90, 132)" || td[j].classList.contains('hcolor')) {
									td[j].style.color="#95C5DB"; //hcolor #005A84
								} else if (td[j].classList.contains('sb1')) {
									td[j].style.color="#A3BBD2";
								}
								for (var k=0; k<s.length; k++) {
									if (s[k].style.color == "rgb(0, 90, 132)" || s[k].classList.contains('hcolor')) {
										s[k].style.color="#95C5DB"; //hcolor #005A84
									} else if (s[k].style.color == "rgb(255, 216, 255)" || s[k].classList.contains('c88') || s[k].classList.contains('pink')) {
										if (td[j].style.color == "rgb(0, 0, 0)") {
											s[k].style.color="#AA00AA"
										} else {
											s[k].style.color="#FFD8FF"
										}
									}
								}
							break;
						}
					}
			}
		
			var iframe = document.getElementsByTagName('iframe');
			for (var i=0; i<iframe.length; i++) {
				var doWork = "o";
				var ib = iframe[i].contentWindow.document.body;
				if (ib.style.backgroundColor=="") {
					ib.style.color="#FFFFFF";
					ib.style.backgroundColor="#575757";
				} else {
					switch (ib.style.backgroundColor) {
						case "rgb(255, 253, 221)": //tcolor
						case "rgb(255, 250, 219)": //mbg
						ib.style.backgroundColor="#C3BC9A";
						break;
						case "rgb(255, 250, 240)": //obg
						ib.style.backgroundColor="#B8B2AB";
						break;
						case "rgb(248, 255, 237)": //obg
						ib.style.backgroundColor="#A3AA9F";
						break;
					}
					doWork = "x";
				}
				if (doWork == "o") {
					var p = iframe[i].contentWindow.document.getElementsByTagName('p');
					for (var j=0; j<p.length; j++) {
						if (p[j].classList.contains('trs') || p[j].classList.contains('mrs') || p[j].classList.contains('rs') ) {
							p[j].style.color="#DDD5AE";
						} else if (p[j].classList.contains('gbg') || p[j].classList.contains('abg') || p[j].classList.contains('bbg') || p[j].classList.contains('mbg') || p[j].classList.contains('ybg') || p[j].classList.contains('green')) {
							p[j].style.color="#D5EBCC";
						}
						p[j].style.backgroundColor = "transparent";
					}
					var s = iframe[i].contentWindow.document.getElementsByTagName('span');
					for (var j=0; j<s.length; j++) {
						if (s[j].classList.contains('lrs')) {
							s[j].style.color="#BFBFBF";
						} else if (s[j].classList.contains('trs') || s[j].classList.contains('mrs') || s[j].classList.contains('rs') ) {
							s[j].style.color="#DDD5AE";
						} else if (s[j].style.color == "rgb(255, 85, 85)" || s[j].classList.contains('ncolor')) {
							s[j].style.color="#FF9999";
						} else if (s[j].classList.contains('sb') || s[j].classList.contains('sb1') || s[j].classList.contains('sb2') || s[j].classList.contains('hcolor')) {
							s[j].style.color="#95C5DB"; 
						} else if (s[j].style.backgroundColor == "rgb(170, 0, 170)" || s[j].style.backgroundColor == "rgb(187, 0, 187)" || s[j].classList.contains('c88') || s[j].classList.contains('pink')) {
							s[j].style.color="#FFD8FF";
						} else if (s[j].style.color == "rgb(207, 0, 0)" || s[j].style.color == "rgb(191, 0, 0)" || s[j].classList.contains('c99') || s[j].classList.contains('rgbg')) {
							s[j].style.color="#FFBBBB";
						} else if (s[j].style.color == "rgb(0, 0, 255)" || s[j].style.color == "rgb(0, 34, 255)" || s[j].classList.contains('blue') || s[j].classList.contains('bbbg')) {
							s[j].style.color="#C5C7FE"
						} else if (s[j].style.backgroundColor == "rgb(239, 255, 219)" || s[j].style.backgroundColor == "rgb(230, 255, 252)" || s[j].style.backgroundColor == "rgb(255, 252, 204)" || s[j].style.backgroundColor == "rgb(255, 250, 219)" || s[j].classList.contains('gbg') || s[j].classList.contains('abg') || s[j].classList.contains('bbg') || s[j].classList.contains('mbg') || s[j].classList.contains('ybg') || s[j].classList.contains('green')) {
							s[j].style.color="#D5EBCC"
						}
						s[j].style.backgroundColor = "transparent";
					}
					var a = iframe[i].contentWindow.document.getElementsByTagName('a');
					for (var j=0; j<a.length; j++) {
						a[j].style.color="#95C5DB";
					}
					var img = iframe[i].contentWindow.document.getElementsByTagName('img');
					for (var j=0; j<img.length; j++) {
						if (img[j].src.indexOf('allteaching') == -1 && img[j].src.indexOf('m_') == -1 && img[j].src.indexOf('menu') == -1) {
							img[j].src = img[j].src.split(".")[0] + "_d." + img[j].src.split(".")[1];
						}
					}
					var d = iframe[i].contentWindow.document.getElementsByTagName('div');
					for (var j=0; j<d.length; j++) {
						if (d[j].style.backgroundColor == "rgb(255, 253, 221)") {
							d[j].style.backgroundColor="#C3BC9A";
							d[j].style.color="#000000"
							var s = d[j].getElementsByTagName('span');
							for (var k=0; k<s.length; k++) {
								if (s[k].classList.contains('gbg') || s[k].classList.contains('abg') || s[k].classList.contains('bbg') || s[k].classList.contains('mbg') || s[k].classList.contains('ybg')) {
									s[k].style.color="#000000";
									s[k].style.backgroundColor="transparent";
								} else if (s[k].classList.contains('trs') || s[k].classList.contains('mrs') || s[k].classList.contains('rs')) {
									s[k].style.color="#606000";
								} else if (s[k].style.color == "rgb(197, 199, 254)" || s[k].classList.contains('blue') || s[k].classList.contains('bbbg')) {
									s[k].style.color="#0000BF"
								} else if (s[k].classList.contains('lrs')) {
									s[k].style.color="#7d7d7d";
								}
							}
						}
					}
					var tb = iframe[i].contentWindow.document.getElementsByTagName('table');
					for (var j=0; j<tb.length; j++) {
						tb[j].style.borderColor="#FFFFFF";
					}
					var tr = iframe[i].contentWindow.document.getElementsByTagName('tr');
					for (var j=0; j<tr.length; j++) {
						if (tr[j].style.backgroundColor == "rgb(255, 253, 221)" || tr[j].classList.contains('tcolor')) {
							tr[j].style.backgroundColor="#C3BC9A";
							trColor = "o";
						} else if (tr[j].style.backgroundColor == "rgb(255, 250, 240)" || tr[j].classList.contains('obg')) {
							tr[j].style.backgroundColor="#B8B2AB";
							trColor = "o";
						} else if (tr[j].style.backgroundColor == "rgb(248, 255, 237)" || tr[j].classList.contains('ebg') || tr[j].classList.contains('xcolor')) {
							tr[j].style.backgroundColor="#A3AA9F";
							trColor = "o";
						} else if (tr[j].style.backgroundColor == "rgb(243, 247, 248)" || tr[j].classList.contains('bc')) {
							tr[j].style.backgroundColor="#A1A5AF";
							trColor = "bc";
						} else {
							trColor = "x";
						}
						var td = tr[j].getElementsByTagName('td');
						for (var k=0; k<td.length; k++) {
							var p = td[k].getElementsByTagName('p');
							var s = td[k].getElementsByTagName('span');
							td[k].style.borderColor="#FFFFFF";
							tdColor = "o";
							if (td[k].style.backgroundColor == "rgb(195, 188, 154)" || td[k].style.backgroundColor == "rgb(255, 250, 219)" || td[k].style.backgroundColor == "rgb(255, 253, 221)" || td[k].classList.contains('tcolor') || td[k].classList.contains('mbg')) {
								switch (td[k].style.backgroundColor) {
									case "rgb(255, 250, 240)": //obg
										td[k].style.backgroundColor="#B8B2AB";
									break;
									case "rgb(248, 255, 237)": //ebg xcolor
										td[k].style.backgroundColor="#A3AA9F";
									break;
									case "rgb(230, 255, 252)": //bbg
									case "rgb(243, 247, 248)": //bc
										td[k].style.backgroundColor="#A1A5AF";
									break;
									default:
										td[k].style.backgroundColor="#C3BC9A";
								}
							} else if (td[k].style.backgroundColor == "rgb(255, 250, 240)" || td[k].classList.contains('obg')) {
								switch (td[k].style.backgroundColor) {
									case "rgb(255, 253, 221)": //tcolor
									case "rgb(255, 250, 219)": //mbg
										td[k].style.backgroundColor="#C3BC9A";
									break;
									case "rgb(248, 255, 237)": //ebg xcolor
										td[k].style.backgroundColor="#A3AA9F";
									break;
									case "rgb(230, 255, 252)": //bbg
									case "rgb(243, 247, 248)": //bc
										td[k].style.backgroundColor="#A1A5AF";
									break;
									default:
										td[k].style.backgroundColor="#B8B2AB";
								}
							} else if (td[k].style.backgroundColor == "rgb(248, 255, 237)" || td[k].classList.contains('ebg') || td[k].classList.contains('xcolor')) {
								switch (td[k].style.backgroundColor) {
									case "rgb(255, 253, 221)": //tcolor
									case "rgb(255, 250, 219)": //mbg
										td[k].style.backgroundColor="#C3BC9A";
									break;
									case "rgb(255, 250, 240)": //obg
										td[k].style.backgroundColor="#B8B2AB";
									break;
									case "rgb(230, 255, 252)": //bbg
									case "rgb(243, 247, 248)": //bc
										td[k].style.backgroundColor="#A1A5AF";
									break;
									default:
										td[k].style.backgroundColor="#A3AA9F";
								}
							} else if (td[k].style.backgroundColor == "rgb(230, 255, 252)" || td[k].style.backgroundColor == "rgb(243, 247, 248)" || td[k].classList.contains("abg") || td[k].classList.contains("bbg") || td[k].classList.contains("bc")) {
								switch (td[k].style.backgroundColor) {
									case "rgb(255, 253, 221)": //tcolor
									case "rgb(255, 250, 219)": //mbg
										td[k].style.backgroundColor="#C3BC9A";
									break;
									case "rgb(255, 250, 240)": //obg
										td[k].style.backgroundColor="#B8B2AB";
									break;
									case "rgb(248, 255, 237)": //ebg xcolor
										td[k].style.backgroundColor="#A3AA9F";
									break;
									default:
										td[k].style.backgroundColor="#A1A5AF";
								}
							} else {
								if (trColor=="o") {
									tdColor = "o";
								} else {
									tdColor = "x";
								}
							}
							switch (tdColor) {
								case "o":
									switch (td[k].style.color) {
										case "rgb(117, 134, 151)": //#758697
											td[k].style.color="#9FC4E9";
										break;
										case "rgb(255, 187, 187)": //#FFBBBB
										case "rgb(191, 0, 0)": //#BF0000
										case "rgb(207, 0, 0)": //#CF0000
											td[k].style.color="#AF0000";
										break;
										default:
											if (td[k].style.color == "rgb(255, 255, 255)" || td[k].style.color == "") {
												td[k].style.color="#000000";
											}
									}
									for (var l=0; l<p.length; l++) {
										if (p[l].style.color == "rgb(64, 64, 0)" || p[l].classList.contains('trs') || p[l].classList.contains('mrs') || p[l].classList.contains('rs')) {
											p[l].style.color="#606000";
										} else {
											p[l].style.color="#000000";
										}
									}
									for (var l=0; l<s.length; l++) {
										if (s[l].style.color == "rgb(255, 187, 187)" || s[l].classList.contains('c99') || s[l].classList.contains('rgbg')) {
											s[l].style.color="#AF0000";
										} else if (s[l].style.color == "rgb(197, 199, 254)" || s[l].classList.contains('blue') || s[l].classList.contains('bbbg')) {
											s[l].style.color="#0000BF"
										} else if (s[l].style.color == "rgb(213, 235, 204)" || s[l].classList.contains('gbg') || s[l].classList.contains('abg') || s[l].classList.contains('bbg') || s[l].classList.contains('mbg') || s[l].classList.contains('ybg')) {
											s[l].style.color="#000000";
										} else if (s[l].style.color == "rgb(221, 213, 174)" || s[l].style.color == "rgb(64, 64, 0)" || s[l].classList.contains('trs') || s[l].classList.contains('mrs') || s[l].classList.contains('rs')) {
											s[l].style.color="#606000";
										} else if (s[l].style.color == "rgb(255, 153, 153)" || s[l].classList.contains('ncolor')) {
											s[l].style.color="#B54A4A";
										} else if (s[l].style.color == "rgb(117, 134, 151)" || s[l].classList.contains('sb') || s[l].classList.contains('sb1') || s[l].classList.contains('sb2')) {
											s[l].style.color="#505861";
										} else if (s[l].style.color == "rgb(149, 197, 219)" || s[l].classList.contains('hcolor')) {
											s[l].style.color="#005A84"
										} else if (s[l].parentElement.style.backgroundColor == "" && s[l].style.color == "rgb(0, 0, 0)") {
											s[l].style.color="#FFFFFF";
										} else if (s[l].style.color == "rgb(255, 216, 255)" || s[l].style.color == "rgb(187, 0, 187)" || s[l].classList.contains('c88') || s[l].classList.contains('pink')) {
											s[l].style.color="#AA00AA"
										}
									}
									var a = td[k].getElementsByTagName('a');
									for (var l=0; l<a.length; l++) {
										a[l].style.color="#005A84"
									}
								break;
								case "x":
									if (td[k].style.color == "rgb(191, 0, 0)" || td[k].style.color == "rgb(207, 0, 0)") {
										td[k].style.color="#FFBBBB";  //#BF0000 #CF0000
										td[k].style.backgroundColor="transparent";
									} else if (td[k].style.color == "rgb(255, 85, 85)") {
										td[k].style.color="#FF9999";  //ncolor #FF5555
									} else if (td[k].style.color == "rgb(0, 90, 132)" || td[k].classList.contains('hcolor')) {
										td[k].style.color="#95C5DB"; //hcolor #005A84
									} else if (td[k].classList.contains('sb1')) {
										td[k].style.color="#A3BBD2";
									}
									for (var l=0; l<s.length; l++) {
										if (s[l].style.color == "rgb(0, 90, 132)" || s[l].classList.contains('hcolor')) {
											s[l].style.color="#95C5DB"; //hcolor #005A84
										} else if (s[l].style.color == "rgb(170, 0, 170)" || s[l].style.color == "rgb(187, 0, 187)" || s[l].classList.contains('c88') || s[l].classList.contains('pink')) {
											if (td[k].style.color == "rgb(0, 0, 0)") {
												s[l].style.color="#AA00AA"
											} else {
												s[l].style.color="#FFD8FF"
											}
										}
									}
								break;
							}
							if (td[k].classList.contains('td_2')) {
								td[k].style.color="#BFBFBF";
							}
						}
					}
					var iframeChild = iframe[i].contentWindow.document.getElementsByTagName('iframe');
					for (var j=0; j<iframeChild.length; j++) {
						iframeChild[j].contentWindow.document.body.style.color="#FFFFFF";
						iframeChild[j].contentWindow.document.body.style.backgroundColor="#575757";
						var p = iframeChild[j].contentWindow.document.getElementsByTagName('p');
						for (var k=0; k<p.length; k++) {
							if (p[k].classList.contains('trs') || p[k].classList.contains('mrs') || p[k].classList.contains('rs') ) {
								p[k].style.color="#DDD5AE";
							} else if (p[k].classList.contains('gbg') || p[k].classList.contains('abg') || p[k].classList.contains('bbg') || p[k].classList.contains('mbg') || p[k].classList.contains('ybg') || p[k].classList.contains('green')) {
								p[k].style.color="#D5EBCC";
							}
							p[k].style.backgroundColor = "transparent";
						}
						var s = iframeChild[j].contentWindow.document.getElementsByTagName('span');
						for (var k=0; k<s.length; k++) {
							if (s[k].classList.contains('lrs')) {
								s[k].style.color="#BFBFBF";
							} else if (s[k].classList.contains('trs') || s[k].classList.contains('mrs') || s[k].classList.contains('rs') ) {
								s[k].style.color="#DDD5AE";
							} else if (s[k].style.color == "rgb(255, 85, 85)" || s[k].classList.contains('ncolor')) {
								s[k].style.color="#FF9999";
							} else if (s[k].classList.contains('sb') || s[k].classList.contains('sb1') || s[k].classList.contains('sb2') || s[k].classList.contains('hcolor')) {
								s[k].style.color="#95C5DB";
							} else if (s[k].style.color == "rgb(207, 0, 0)" || s[k].style.color == "rgb(191, 0, 0)" || s[k].classList.contains('c99') || s[k].classList.contains('rgbg')) {
								s[k].style.color="#FFBBBB";
							} else if (s[k].style.color == "rgb(0, 0, 255)" || s[k].style.color == "rgb(0, 34, 255)" || s[k].classList.contains('blue') || s[k].classList.contains('bbbg')) {
								s[k].style.color="#C5C7FE"
							} else if (s[k].style.backgroundColor == "rgb(239, 255, 219)" || s[k].style.backgroundColor == "rgb(230, 255, 252)" || s[k].style.backgroundColor == "rgb(255, 252, 204)" || s[k].style.backgroundColor == "rgb(255, 250, 219)") {
								s[k].style.color="#D5EBCC"
							}
							s[k].style.backgroundColor = "transparent";
						}
						var a = iframeChild[j].contentWindow.document.getElementsByTagName('a');
						for (var k=0; k<a.length; k++) {
							a[k].style.color="#95C5DB";
						}
						var d = iframeChild[j].contentWindow.document.getElementsByTagName('div');
						for (var k=0; k<d.length; k++) {
							if (d[k].style.backgroundColor == "rgb(255, 253, 221)") {
								d[k].style.backgroundColor="#C3BC9A";
								d[k].style.color="#000000"
								var s = d[k].getElementsByTagName('span');
								for (var l=0; l<s.length; l++) {
									if (s[l].classList.contains('gbg') || s[l].classList.contains('abg') || s[l].classList.contains('bbg') || s[l].classList.contains('mbg') || s[l].classList.contains('ybg')) {
										s[l].style.color="#000000";
										s[l].style.backgroundColor="transparent";
									} else if (s[l].classList.contains('trs') || s[l].classList.contains('mrs') || s[l].classList.contains('rs')) {
										s[l].style.color="#606000";
									} else if (s[l].classList.contains('lrs')) {
										s[l].style.color="#7d7d7d";
									}
								}
							}
						}
						var tb = iframeChild[j].contentWindow.document.getElementsByTagName('table');
						for (var k=0; k<tb.length; k++) {
							tb[k].style.borderColor="#FFFFFF";
						}
						var tr = iframeChild[j].contentWindow.document.getElementsByTagName('tr');
						for (var k=0; k<tr.length; k++) {
							if (tr[k].style.backgroundColor == "rgb(255, 253, 221)" || tr[k].classList.contains('tcolor')) {
								tr[k].style.backgroundColor="#C3BC9A";
								trColor = "o";
							} else if (tr[k].style.backgroundColor == "rgb(255, 250, 240)" || tr[k].classList.contains('obg')) {
								tr[k].style.backgroundColor="#B8B2AB";
								trColor = "o";
							} else if (tr[k].style.backgroundColor == "rgb(248, 255, 237)" || tr[k].classList.contains('ebg') || tr[k].classList.contains('xcolor')) {
								tr[k].style.backgroundColor="#A3AA9F";
								trColor = "o";
							} else if (tr[k].style.backgroundColor == "rgb(243, 247, 248)" || tr[k].classList.contains('bc')) {
								tr[k].style.backgroundColor="#A1A5AF";
								trColor = "bc";
							} else {
								trColor = "x";
							}
							var td = tr[k].getElementsByTagName('td');
							for (var l=0; l<td.length; l++) {
								var p = td[l].getElementsByTagName('p');
								var s = td[l].getElementsByTagName('span');
								td[l].style.borderColor="#FFFFFF";
								if (td[l].style.backgroundColor == "rgb(195, 188, 154)" || td[l].style.backgroundColor == "rgb(255, 253, 221)" || td[l].classList.contains('tcolor')) {
									td[l].style.backgroundColor="#C3BC9A";
									tdColor = "o";
								} else if (td[l].style.backgroundColor == "rgb(255, 250, 240)" || td[l].classList.contains('obg')) {
									td[l].style.backgroundColor="#B8B2AB";
									tdColor = "o";
								} else if (td[l].style.backgroundColor == "rgb(248, 255, 237)" || td[l].classList.contains('ebg') || td[l].classList.contains('xcolor')) {
									td[l].style.backgroundColor="#A3AA9F";
									tdColor = "o";
								} else if (td[l].style.backgroundColor == "rgb(230, 255, 252)" || td[l].classList.contains("abg") || td[l].classList.contains("bbg")) {
									td[l].style.backgroundColor="#A1A5AF";
									tdColor = "o";
								} else if (td[l].style.backgroundColor == "rgb(255, 250, 219)" || td[l].classList.contains("mbg")) {
									td[l].style.backgroundColor="#C3BC9A";
									tdColor = "o";
								} else if (td[l].style.backgroundColor == "rgb(243, 247, 248)" || td[l].classList.contains('bc')) {
									td[l].style.backgroundColor="#A1A5AF";
									tdColor = "o";
								} else {
									if (trColor=="o") {
										tdColor = "o";
									} else {
										tdColor = "x";
									}
								}
								switch (tdColor) {
									case "o":
										switch (td[l].style.color) {
											case "rgb(117, 134, 151)": //#758697
												td[l].style.color="#9FC4E9";
											break;
											case "rgb(255, 187, 187)": //#FFBBBB
											case "rgb(191, 0, 0)": //#BF0000
											case "rgb(207, 0, 0)": //#CF0000
												td[l].style.color="#AF0000";
											break;
											default:
												if (td[l].style.color == "rgb(255, 255, 255)" || td[l].style.color == "") {
													td[l].style.color="#000000";
												}
										}
										for (var m=0; m<p.length; m++) {
											if (p[m].style.color == "rgb(64, 64, 0)" || p[m].classList.contains('trs') || p[m].classList.contains('mrs') || p[m].classList.contains('rs')) {
												p[m].style.color="#606000";
											} else {
												p[m].style.color="#000000";
											}
										}
										for (var m=0; m<s.length; m++) {
											if (s[m].style.color == "rgb(255, 187, 187)" || s[m].classList.contains('c99') || s[m].classList.contains('rgbg')) {
												s[m].style.color="#AF0000";
											} else if (s[m].style.color == "rgb(197, 199, 254)" || s[m].classList.contains('blue') || s[m].classList.contains('bbbg')) {
												s[m].style.color="#0000BF"
											} else if (s[m].style.color == "rgb(213, 235, 204)" || s[m].classList.contains('gbg') || s[m].classList.contains('abg') || s[m].classList.contains('bbg') || s[m].classList.contains('mbg') || s[m].classList.contains('ybg')) {
												s[m].style.color="#000000";
											} else if (s[m].style.color == "rgb(221, 213, 174)" || s[m].style.color == "rgb(64, 64, 0)" || s[m].classList.contains('trs') || s[m].classList.contains('mrs') || s[m].classList.contains('rs')) {
												s[m].style.color="#606000";
											} else if (s[m].style.color == "rgb(255, 153, 153)" || s[m].classList.contains('ncolor')) {
												s[m].style.color="#B54A4A";
											} else if (s[m].style.color == "rgb(117, 134, 151)" || s[m].classList.contains('sb') || s[m].classList.contains('sb1') || s[m].classList.contains('sb2')) {
												s[m].style.color="#505861";
											} else if (s[m].style.color == "rgb(149, 197, 219)" || s[m].classList.contains('hcolor')) {
												s[m].style.color="#005A84"
											} else if (s[m].style.color == "rgb(0, 0, 0)") {
												s[m].style.color="#FFFFFF";
											} else if (s[m].style.color == "rgb(255, 216, 255)" || s[m].style.color == "rgb(187, 0, 187)" || s[m].classList.contains('c88') || s[m].classList.contains('pink')) {
												s[m].style.color="#AA00AA"
											}
										}
										var a = td[l].getElementsByTagName('a');
										for (var m=0; m<a.length; m++) {
											a[m].style.color="#005A84"
										}
									break;
									case "x":
										if (td[l].style.color == "rgb(191, 0, 0)" || td[l].style.color == "rgb(207, 0, 0)") {
											td[l].style.color="#FFBBBB";  //#BF0000 #CF0000
										} else if (td[l].style.color == "rgb(255, 85, 85)") {
											td[l].style.color="#FF9999";  //ncolor #FF5555
										} else if (td[l].style.color == "rgb(0, 90, 132)" || td[l].classList.contains('hcolor')) {
											td[l].style.color="#95C5DB"; //hcolor #005A84
										} else if (td[l].classList.contains('sb1')) {
											td[l].style.color="#A3BBD2";
										}
										for (var m=0; m<s.length; m++) {
											if (s[m].style.color == "rgb(0, 90, 132)" || s[m].classList.contains('hcolor')) {
												s[m].style.color="#95C5DB"; //hcolor #005A84
											} else if (s[m].style.color == "rgb(170, 0, 170)" || s[m].style.color == "rgb(187, 0, 187)" || s[m].classList.contains('c88') || s[m].classList.contains('pink')) {
												if (td[l].style.color == "rgb(0, 0, 0)") {
													s[m].style.color="#AA00AA"
												} else {
													s[m].style.color="#FFD8FF"
												}
											}
										}
									break;
								}
								if (td[l].classList.contains('td_2')) {
									td[l].style.color="#BFBFBF";
								}
							}
						}
					}
				}
			}
		}
	} catch(e) {}
}
function bcMode()
{
	try{
		if (bcm == "dark") {
			var frameName=window.frames[fName];
			frameName.document.body.style.color="#FFFFFF";
			frameName.document.body.style.backgroundColor="#575757";
			var p = frameName.document.getElementsByTagName('p');
			for (var i=0; i<p.length; i++) {
				if (p[i].classList.contains('gbg') || p[i].classList.contains('abg') || p[i].classList.contains('bbg') || p[i].classList.contains('mbg') || p[i].classList.contains('ybg') || p[i].classList.contains('green')) {
				p[i].style.color="#D5EBCC";
			} else {
				p[i].style.color="#FFFFFF";
			}
			p[i].style.backgroundColor="transparent";
			}
			var s = frameName.document.getElementsByTagName('span');
			for (var i=0; i<s.length; i++) {
				if (s[i].style.color == "rgb(255, 85, 85)" || s[i].classList.contains('ncolor')) {
					s[i].style.color="#FF9999";
				} else if (s[i].classList.contains('sb') || s[i].classList.contains('sb1') || s[i].classList.contains('sb2') || s[i].classList.contains('hcolor')) {
					s[i].style.color="#95C5DB";
				} else if (s[i].classList.contains('trs') || s[i].classList.contains('mrs') || s[i].classList.contains('rs') ) {
					s[i].style.color="#DDD5AE";
				} else if (s[i].style.backgroundColor == "rgb(239, 255, 219)" || s[i].style.backgroundColor == "rgb(230, 255, 252)" || s[i].style.backgroundColor == "rgb(255, 250, 219)" || s[i].style.backgroundColor == "rgb(255, 252, 204)" || s[i].classList.contains('gbg') || s[i].classList.contains('abg') || s[i].classList.contains('bbg') || s[i].classList.contains('mbg') || s[i].classList.contains('ybg') || s[i].classList.contains('green')) {
					s[i].style.color="#D5EBCC";
				} else if (s[i].style.color == "rgb(191, 0, 0)" || s[i].style.color == "rgb(207, 0, 0)" || s[i].classList.contains('c99') || s[i].classList.contains('rgbg')) {
					s[i].style.color="#FFBBBB";
				} else if (s[i].style.color == "rgb(0, 0, 255)" || s[i].style.color == "rgb(0, 34, 255)" || s[i].classList.contains('blue') || s[i].classList.contains('bbbg')) {
					s[i].style.color="#C5C7FE";
				} else if (s[i].classList.contains('lrs')) {
					s[i].style.color="#BFBFBF";
				}
				s[i].style.backgroundColor="transparent";
				/* else {
					s[i].style.color="#FFFFFF";
				}*/
			}
			var a = frameName.document.getElementsByTagName('a');
			for (var i=0; i<a.length; i++) {
				a[i].style.color="#95C5DB";
			}
			var img = frameName.document.getElementsByTagName('img');
			for (var i=0; i<img.length; i++) {
				if (img[i].src.indexOf('allteaching') == -1 && img[i].src.indexOf('m_') == -1 && img[i].src.indexOf('menu') == -1) {
					img[i].src = img[i].src.split(".")[0] + "_d." + img[i].src.split(".")[1];
				}
			}
			var tb = frameName.document.getElementsByTagName('table');
			for (var i=0; i<tb.length; i++) {
				tb[i].style.borderColor="#FFFFFF";
			}
			var tr = frameName.document.getElementsByTagName('tr');
			for (var i=0; i<tr.length; i++) {
				if (tr[i].style.backgroundColor == "rgb(255, 253, 221)" || tr[i].classList.contains('tcolor')) {
					tr[i].style.backgroundColor="#C3BC9A";
					trColor = "o";
				} else if (tr[i].style.backgroundColor == "rgb(255, 250, 240)" || tr[i].classList.contains('obg')) {
					tr[i].style.backgroundColor="#B8B2AB";
					trColor = "o";
				} else if (tr[i].style.backgroundColor == "rgb(248, 255, 237)" || tr[i].classList.contains('ebg') || tr[i].classList.contains('xcolor')) {
					tr[i].style.backgroundColor="#A3AA9F";
					trColor = "o";
				} else if (tr[i].style.backgroundColor == "rgb(243, 247, 248)" || tr[i].classList.contains('bc')) {
					tr[i].style.backgroundColor="#A1A5AF";
							if (tr[i].style.color == "rgb(207, 0, 0)" || tr[i].style.color == "rgb(191, 0, 0)") {
								tdColor = "x";
							} else {
								tdColor = "o";
							}
				} else {
					trColor = "x";
				}
				var td = tr[i].getElementsByTagName('td');
				for (var j=0; j<td.length; j++) {
					var p = td[j].getElementsByTagName('p');
					var s = td[j].getElementsByTagName('span');
					td[j].style.borderColor="#FFFFFF";
					if (td[j].style.backgroundColor == "rgb(255, 253, 221)" || td[j].classList.contains("tcolor")) {
						td[j].style.backgroundColor="#C3BC9A";
						tdColor = "o";
					} else if (td[j].style.backgroundColor == "rgb(255, 250, 240)" || td[j].classList.contains("obg")) {
						td[j].style.backgroundColor="#B8B2AB";
						tdColor = "o";
					} else if (td[j].style.backgroundColor == "rgb(248, 255, 237)" || td[j].classList.contains("ebg") || td[j].classList.contains("xcolor")) {
						td[j].style.backgroundColor="#A3AA9F";
						tdColor = "o";
					} else if (td[j].style.backgroundColor == "rgb(230, 255, 252)" || td[j].classList.contains("abg") || td[j].classList.contains("bbg")) {
						td[j].style.backgroundColor="#A1A5AF";
						tdColor = "o";
					} else if (td[j].style.backgroundColor == "rgb(255, 250, 219)" || td[j].classList.contains("mbg")) {
						td[j].style.backgroundColor="#C3BC9A";
						tdColor = "o";
					} else if (td[j].style.backgroundColor == "rgb(243, 247, 248)" || td[j].classList.contains("bc")) {
						td[j].style.backgroundColor="#A1A5AF";
						tdColor = "o";
					} else if (td[j].style.backgroundColor == "rgb(250, 255, 241)" && td[j].style.color == "rgb(207, 0, 0)") {
						td[j].style.color="#AF0000";
						td[j].style.backgroundColor="#C3BC9A";
						tdColor = "o";
					} else {
						if (trColor=="o") {
							tdColor = "o";
						} else {
							tdColor = "x";
						}
					}
					switch (tdColor) {
						case "o":
							switch (td[j].style.color) {
								case "rgb(117, 134, 151)": //#758697
									td[j].style.color="#9FC4E9";
								break;
								case "rgb(255, 187, 187)": //#FFBBBB
								case "rgb(191, 0, 0)": //#BF0000
								case "rgb(207, 0, 0)": //#CF0000
									td[j].style.color="#AF0000";
								break;
								default:
									if (td[j].style.color == "rgb(255, 255, 255)" || td[j].style.color == "") {
										td[j].style.color="#000000";
									}
							}
							for (var k=0; k<p.length; k++) {
								if (p[k].style.color == "rgb(64, 64, 0)" || p[k].classList.contains('trs') || p[k].classList.contains('mrs') || p[k].classList.contains('rs')) {
									p[k].style.color="#606000";
								} else {
									p[k].style.color="#000000";
								}
							}
							for (var k=0; k<s.length; k++) {
								if (s[k].style.color == "rgb(255, 187, 187)" || s[k].classList.contains('c99') || s[k].classList.contains('rgbg')) {
									s[k].style.color="#AF0000";
								} else if (s[k].style.color == "rgb(197, 199, 254)" || s[k].classList.contains('blue')) {
									s[k].style.color="#0000BF";
								} else if (s[k].style.color == "rgb(213, 235, 204)" || s[k].classList.contains('gbg') || s[k].classList.contains('abg') || s[k].classList.contains('bbg') || s[k].classList.contains('mbg') || s[k].classList.contains('ybg')) {
									s[k].style.color="#1C6000";
								} else if (s[k].style.color == "rgb(221, 213, 174)" || s[k].style.color == "rgb(64, 64, 0)" || s[k].classList.contains('trs') || s[k].classList.contains('mrs') || s[k].classList.contains('rs')) {
									s[k].style.color="#606000";
								} else if (s[k].style.color == "rgb(255, 153, 153)" || s[k].classList.contains('ncolor')) {
									s[k].style.color="#B54A4A";
								} else if (s[k].style.color == "rgb(117, 134, 151)" || s[k].classList.contains('sb') || s[k].classList.contains('sb1') || s[k].classList.contains('sb2') || s[k].classList.contains('hcolor')) {
									s[k].style.color="#505861";
								} else if (s[k].style.color == "rgb(149, 197, 219)" || s[k].classList.contains('hcolor')) {
									s[k].style.color="#005A84";
								}
							}
							var a = td[j].getElementsByTagName('a');
							for (var k=0; k<a.length; k++) {
								a[k].style.color="#005A84";
							}
						break;
						case "x":
							if (td[j].style.color == "rgb(255, 85, 85)") {
								td[j].style.color="#FF9999";  //ncolor #FF5555
							} else if (td[j].style.color == "rgb(0, 90, 132)") {
								td[j].style.color="#95C5DB"; //hcolor #005A84
							} else if (td[j].classList.contains('sb1')) {
								td[j].style.color="#A3BBD2";
							}
							for (var k=0; k<s.length; k++) {
								if (s[k].style.color == "rgb(0, 90, 132)" || s[k].classList.contains('hcolor')) {
									s[k].style.color="#95C5DB"; //hcolor #005A84
								} else if (s[k].style.color == "rgb(170, 0, 170)" || s[k].style.color == "rgb(187, 0, 187)" || s[k].classList.contains('c88') || s[k].classList.contains('pink')) {
									if (td[j].style.color == "rgb(0, 0, 0)") {
										s[k].style.color="#AA00AA"
									} else {
										s[k].style.color="#FFD8FF"
									}
								}
							}
						break;
					}
					if (td[j].classList.contains('td_2')) {
						td[j].style.color="#BFBFBF";
					}
				}
			}
			var iframe = frameName.document.getElementsByTagName('iframe');
			for (var i=0; i<iframe.length; i++) {
				iframe[i].contentWindow.document.body.style.color="#FFFFFF";
				iframe[i].contentWindow.document.body.style.backgroundColor="#575757";
				var p = iframe[i].contentWindow.document.getElementsByTagName('p');
				for (var j=0; j<p.length; j++) {
					if (p[j].classList.contains('trs') || p[j].classList.contains('mrs') || p[j].classList.contains('rs') ) {
						p[j].style.color="#DDD5AE";
					} else	if (p[j].classList.contains('gbg') || p[j].classList.contains('abg') || p[j].classList.contains('bbg') || p[j].classList.contains('mbg') || p[j].classList.contains('ybg') || p[j].classList.contains('green')) {
						p[j].style.color="#D5EBCC";
				}
					p[j].style.backgroundColor = "transparent";
				}
				var s = iframe[i].contentWindow.document.getElementsByTagName('span');
				for (var j=0; j<s.length; j++) {
					if (s[j].classList.contains('lrs')) {
						s[j].style.color="#BFBFBF";
					} else if (s[j].style.color == "rgb(64, 64, 0)" || s[j].classList.contains('trs') || s[j].classList.contains('mrs') || s[j].classList.contains('rs') ) {
						s[j].style.color="#DDD5AE";
					} else if (s[i].style.color == "rgb(255, 85, 85)" || s[i].classList.contains('ncolor')) {
						s[i].style.color="#FF9999";
					} else if (s[j].style.color == "rgb(117, 134, 151)" || s[j].classList.contains('sb') || s[j].classList.contains('sb1') || s[j].classList.contains('sb2') || s[j].classList.contains('hcolor')) {
						s[j].style.color="#95C5DB";
					} else if (s[j].style.color == "rgb(207, 0, 0)" || s[j].style.color == "rgb(191, 0, 0)") {
						s[j].style.color="#FFBBBB";
					} else if (s[j].style.color == "rgb(0, 0, 255)" || s[j].style.color == "rgb(0, 34, 255)") {
						s[j].style.color="#C5C7FE";
					} else if (s[j].style.backgroundColor == "rgb(239, 255, 219)" || s[j].style.backgroundColor == "rgb(230, 255, 252)" || s[j].style.backgroundColor == "rgb(255, 252, 204)" || s[j].style.backgroundColor == "rgb(255, 250, 219)") {
						s[j].style.color="#D5EBCC";
					}
					s[j].style.backgroundColor = "transparent";
				}
				var a = iframe[i].contentWindow.document.getElementsByTagName('a');
				for (var j=0; j<a.length; j++) {
					a[j].style.color="#95C5DB";
				}
				var img = iframe[i].contentWindow.document.getElementsByTagName('img');
				for (var j=0; j<img.length; j++) {
					if (img[j].src.indexOf('allteaching') == -1 && img[j].src.indexOf('m_') == -1 && img[j].src.indexOf('menu') == -1) {
						img[j].src = img[j].src.split(".")[0] + "_d." + img[j].src.split(".")[1];
					}
				}
				var tb = iframe[i].contentWindow.document.getElementsByTagName('table');
				for (var j=0; j<tb.length; j++) {
					tb[j].style.borderColor="#FFFFFF";
				}
				var tr = iframe[i].contentWindow.document.getElementsByTagName('tr');
				for (var j=0; j<tr.length; j++) {
					if (tr[j].style.backgroundColor == "rgb(255, 253, 221)" || tr[j].classList.contains('tcolor')) {
						tr[j].style.backgroundColor="#C3BC9A";
						trColor = "o";
					} else if (tr[j].style.backgroundColor == "rgb(255, 250, 240)" || tr[j].classList.contains('obg')) {
						tr[j].style.backgroundColor="#B8B2AB";
						trColor = "o";
					} else if (tr[j].style.backgroundColor == "rgb(248, 255, 237)" || tr[j].classList.contains('ebg') || tr[j].classList.contains('xcolor')) {
						tr[j].style.backgroundColor="#A3AA9F";
						trColor = "o";
					} else if (tr[j].style.backgroundColor == "rgb(243, 247, 248)" || tr[j].classList.contains('bc')) {
						tr[j].style.backgroundColor="#A1A5AF";
						trColor = "o";
					} else {
						trColor = "x";
					}
					var td = tr[j].getElementsByTagName('td');
					for (var k=0; k<td.length; k++) {
						var p = td[k].getElementsByTagName('p');
						var s = td[k].getElementsByTagName('span');
						td[k].style.borderColor="#FFFFFF";
						if (td[k].style.backgroundColor == "rgb(255, 253, 221)" || td[k].classList.contains('tcolor')) {
							td[k].style.backgroundColor="#C3BC9A";
							tdColor = "o";
						} else if (td[k].style.backgroundColor == "rgb(255, 250, 240)" || td[k].classList.contains('obg')) {
							td[k].style.backgroundColor="#B8B2AB";
							tdColor = "o";
						} else if (td[k].style.backgroundColor == "rgb(248, 255, 237)" || td[k].classList.contains('ebg') || td[k].classList.contains('xcolor')) {
							td[k].style.backgroundColor="#A3AA9F";
							tdColor = "o";
						} else if (td[k].style.backgroundColor == "rgb(243, 247, 248)" || td[k].classList.contains('bc')) {
							td[k].style.backgroundColor="#A1A5AF";
							tdColor = "o";
						} else {
							if (trColor=="o") {
								tdColor = "o";
							} else {
								tdColor = "x";
							}
						}
						switch (tdColor) {
							case "o":
								switch (td[k].style.color) {
									case "rgb(117, 134, 151)": //#758697
										td[k].style.color="#9FC4E9";
									break;
									case "rgb(255, 187, 187)": //#FFBBBB
									case "rgb(191, 0, 0)": //#BF0000
									case "rgb(207, 0, 0)": //#CF0000
										td[k].style.color="#AF0000";
									break;
									default:
										if (td[k].style.color == "rgb(255, 255, 255)" || td[k].style.color == "") {
											td[k].style.color="#000000";
										}
								}
								for (var l=0; l<p.length; l++) {
									if (p[l].style.color == "rgb(64, 64, 0)" || p[l].classList.contains('trs') || p[l].classList.contains('mrs') || p[l].classList.contains('rs')) {
										p[l].style.color="#606000";
									} else {
										p[l].style.color="#000000";
									}
								}
								for (var l=0; l<s.length; l++) {
									if (s[l].style.backgroundColor == "rgb(239, 255, 219)" || s[l].style.backgroundColor == "rgb(230, 255, 252)" || s[l].style.backgroundColor == "rgb(255, 250, 219)" || s[l].style.backgroundColor == "rgb(255, 252, 204)" || s[l].classList.contains('gbg') || s[l].classList.contains('abg') || s[l].classList.contains('bbg') || s[l].classList.contains('mbg') || s[l].classList.contains('ybg')) {
										s[l].style.color="#000000";
									} else if (s[l].style.color == "rgb(64, 64, 0)" || s[l].classList.contains('trs') || s[l].classList.contains('mrs') || s[l].classList.contains('rs')) {
										s[l].style.color="#606000";
									} else if (s[l].style.color == "rgb(255, 187, 187)" || s[l].classList.contains('c99') || s[l].classList.contains('rgbg')) {
										s[l].style.color="#AF0000";
									} else if (s[l].style.color == "rgb(197, 199, 254)" || s[l].classList.contains('blue') || s[l].classList.contains('bbbg')) {
										s[l].style.color="#0000BF";
									} else if (s[l].style.color == "rgb(255, 153, 153)" || s[l].classList.contains('ncolor')) {
										s[l].style.color="#B54A4A";
									} else if (s[l].style.color == "rgb(117, 134, 151)" || s[l].classList.contains('sb') || s[l].classList.contains('sb1') || s[l].classList.contains('sb2') || s[l].classList.contains('hcolor')) {
										s[l].style.color="#505861";
									} else if (s[l].style.color == "rgb(149, 197, 219)" || s[l].classList.contains('hcolor')) {
										s[l].style.color="#005A84";
									} else if (s[l].style.color == "rgb(0, 0, 0)") {
										s[l].style.color="#FFFFFF";
									}
								}
								var a = td[k].getElementsByTagName('a');
								for (var l=0; l<a.length; l++) {
									a[l].style.color="#005A84";
								}
							break;
							case "x":
								if (td[k].style.color == "rgb(255, 85, 85)") {
									td[k].style.color="#FF9999";  //ncolor #FF5555
								} else if (td[k].style.color == "rgb(0, 90, 132)") {
									td[k].style.color="#95C5DB"; //hcolor #005A84
								} else if (td[k].classList.contains('sb1')) {
									td[k].style.color="#A3BBD2";
								}
								for (var l=0; l<s.length; l++) {
									if (s[l].style.color == "rgb(0, 90, 132)" || s[l].classList.contains('hcolor')) {
										s[l].style.color="#95C5DB"; //hcolor #005A84
									} else if (s[l].style.color == "rgb(170, 0, 170)" || s[l].style.color == "rgb(187, 0, 187)" || s[l].classList.contains('c88') || s[l].classList.contains('pink')) {
										if (td[k].style.color == "rgb(0, 0, 0)") {
											s[l].style.color="#AA00AA"
										} else {
											s[l].style.color="#FFD8FF"
										}
									}
								}
							break;
						}
						if (td[k].classList.contains('td_2')) {
							td[k].style.color="#BFBFBF";
						}
					}
				}
				var iframeChild = iframe[i].contentWindow.document.getElementsByTagName('iframe');
				for (var j=0; j<iframeChild.length; j++) {
					iframeChild[j].contentWindow.document.body.style.color="#FFFFFF";
					iframeChild[j].contentWindow.document.body.style.backgroundColor="#575757";
					var p = iframeChild[j].contentWindow.document.getElementsByTagName('p');
					for (var k=0; k<p.length; k++) {
						if (p[k].classList.contains('trs') || p[k].classList.contains('mrs') || p[k].classList.contains('rs') ) {
							p[k].style.color="#DDD5AE";
						} else if (p[k].classList.contains('gbg') || p[k].classList.contains('abg') || p[k].classList.contains('bbg') || p[k].classList.contains('mbg') || p[k].classList.contains('ybg') || p[k].classList.contains('green')) {
							p[k].style.color="#D5EBCC";
						}
						p[k].style.backgroundColor = "transparent";
					}
					var s = iframeChild[j].contentWindow.document.getElementsByTagName('span');
					for (var k=0; k<s.length; k++) {
						if (s[k].classList.contains('lrs')) {
							s[k].style.color="#BFBFBF";
						} else if (s[k].classList.contains('trs') || s[k].classList.contains('mrs') || s[k].classList.contains('rs') ) {
							s[k].style.color="#DDD5AE";
						} else if (s[k].style.color == "rgb(255, 85, 85)" || s[k].classList.contains('ncolor')) {
							s[k].style.color="#FF9999";
						} else if (s[k].classList.contains('sb') || s[k].classList.contains('sb1') || s[k].classList.contains('sb2') || s[k].classList.contains('hcolor')) {
							s[k].style.color="#95C5DB";
						} else if (s[k].style.color == "rgb(207, 0, 0)" || s[k].style.color == "rgb(191, 0, 0)" || s[k].classList.contains('c99') || s[k].classList.contains('rgbg')) {
							s[k].style.color="#FFBBBB";
						} else if (s[k].style.color == "rgb(0, 0, 255)" || s[k].style.color == "rgb(0, 34, 255)" || s[k].classList.contains('blue') || s[k].classList.contains('bbbg')) {
							s[k].style.color="#C5C7FE"
						} else if (s[k].style.backgroundColor == "rgb(239, 255, 219)" || s[k].style.backgroundColor == "rgb(230, 255, 252)" || s[k].style.backgroundColor == "rgb(255, 252, 204)" || s[k].style.backgroundColor == "rgb(255, 250, 219)") {
							s[k].style.color="#D5EBCC"
						}
						s[k].style.backgroundColor = "transparent";
					}
					var a = iframeChild[j].contentWindow.document.getElementsByTagName('a');
					for (var k=0; k<a.length; k++) {
						a[k].style.color="#95C5DB";
					}
					var d = iframeChild[j].contentWindow.document.getElementsByTagName('div');
					for (var k=0; k<d.length; k++) {
						if (d[k].style.backgroundColor == "rgb(255, 253, 221)") {
							d[k].style.backgroundColor="#C3BC9A";
							d[k].style.color="#000000"
							var s = d[k].getElementsByTagName('span');
							for (var l=0; l<s.length; l++) {
								if (s[l].classList.contains('gbg') || s[l].classList.contains('abg') || s[l].classList.contains('bbg') || s[l].classList.contains('mbg') || s[l].classList.contains('ybg')) {
									s[l].style.color="#000000";
									s[l].style.backgroundColor="transparent";
								} else if (s[l].classList.contains('trs') || s[l].classList.contains('mrs') || s[l].classList.contains('rs')) {
									s[l].style.color="#606000";
								} else if (s[l].classList.contains('lrs')) {
									s[l].style.color="#7d7d7d";
								}
							}
						}
					}
					var tb = iframeChild[j].contentWindow.document.getElementsByTagName('table');
					for (var k=0; k<tb.length; k++) {
						tb[k].style.borderColor="#FFFFFF";
					}
					var tr = iframeChild[j].contentWindow.document.getElementsByTagName('tr');
					for (var k=0; k<tr.length; k++) {
						if (tr[k].style.backgroundColor == "rgb(255, 253, 221)" || tr[k].classList.contains('tcolor')) {
							tr[k].style.backgroundColor="#C3BC9A";
							trColor = "o";
						} else if (tr[k].style.backgroundColor == "rgb(255, 250, 240)" || tr[k].classList.contains('obg')) {
							tr[k].style.backgroundColor="#B8B2AB";
							trColor = "o";
						} else if (tr[k].style.backgroundColor == "rgb(248, 255, 237)" || tr[k].classList.contains('ebg') || tr[k].classList.contains('xcolor')) {
							tr[k].style.backgroundColor="#A3AA9F";
							trColor = "o";
						} else if (tr[k].style.backgroundColor == "rgb(243, 247, 248)" || tr[k].classList.contains('bc')) {
							tr[k].style.backgroundColor="#A1A5AF";
							trColor = "bc";
						} else {
							trColor = "x";
						}
						var td = tr[k].getElementsByTagName('td');
						for (var l=0; l<td.length; l++) {
							var p = td[l].getElementsByTagName('p');
							var s = td[l].getElementsByTagName('span');
							td[l].style.borderColor="#FFFFFF";
							if (td[l].style.backgroundColor == "rgb(195, 188, 154)" || td[l].style.backgroundColor == "rgb(255, 253, 221)" || td[l].classList.contains('tcolor')) {
								td[l].style.backgroundColor="#C3BC9A";
								tdColor = "o";
							} else if (td[l].style.backgroundColor == "rgb(255, 250, 240)" || td[l].classList.contains('obg')) {
								td[l].style.backgroundColor="#B8B2AB";
								tdColor = "o";
							} else if (td[l].style.backgroundColor == "rgb(248, 255, 237)" || td[l].classList.contains('ebg') || td[l].classList.contains('xcolor')) {
								td[l].style.backgroundColor="#A3AA9F";
								tdColor = "o";
							} else if (td[l].style.backgroundColor == "rgb(230, 255, 252)" || td[l].classList.contains("abg") || td[l].classList.contains("bbg")) {
								td[l].style.backgroundColor="#A1A5AF";
								tdColor = "o";
							} else if (td[l].style.backgroundColor == "rgb(255, 250, 219)" || td[l].classList.contains("mbg")) {
								td[l].style.backgroundColor="#C3BC9A";
								tdColor = "o";
							} else if (td[l].style.backgroundColor == "rgb(243, 247, 248)" || td[l].classList.contains('bc')) {
								td[l].style.backgroundColor="#A1A5AF";
								tdColor = "o";
							} else {
								if (trColor=="o") {
									tdColor = "o";
								} else {
									tdColor = "x";
								}
							}
							switch (tdColor) {
								case "o":
									switch (td[l].style.color) {
										case "rgb(117, 134, 151)": //#758697
											td[l].style.color="#9FC4E9";
										break;
										case "rgb(255, 187, 187)": //#FFBBBB
										case "rgb(191, 0, 0)": //#BF0000
										case "rgb(207, 0, 0)": //#CF0000
											td[l].style.color="#AF0000";
										break;
										default:
											if (td[l].style.color == "rgb(255, 255, 255)" || td[l].style.color == "") {
												td[l].style.color="#000000";
											}
									}
									for (var m=0; m<p.length; m++) {
										if (p[m].style.color == "rgb(64, 64, 0)" || p[m].classList.contains('trs') || p[m].classList.contains('mrs') || p[m].classList.contains('rs')) {
											p[m].style.color="#606000";
										} else {
											p[m].style.color="#000000";
										}
									}
									for (var m=0; m<s.length; m++) {
										if (s[m].style.color == "rgb(255, 187, 187)" || s[m].classList.contains('c99') || s[m].classList.contains('rgbg')) {
											s[m].style.color="#AF0000";
										} else if (s[m].style.color == "rgb(197, 199, 254)" || s[m].classList.contains('blue') || s[m].classList.contains('bbbg')) {
											s[m].style.color="#0000BF"
										} else if (s[m].style.color == "rgb(213, 235, 204)" || s[m].classList.contains('gbg') || s[m].classList.contains('abg') || s[m].classList.contains('bbg') || s[m].classList.contains('mbg') || s[m].classList.contains('ybg')) {
											s[m].style.color="#000000";
										} else if (s[m].style.color == "rgb(221, 213, 174)" || s[m].style.color == "rgb(64, 64, 0)" || s[m].classList.contains('trs') || s[m].classList.contains('mrs') || s[m].classList.contains('rs')) {
											s[m].style.color="#606000";
										} else if (s[m].style.color == "rgb(255, 153, 153)" || s[m].classList.contains('ncolor')) {
											s[m].style.color="#B54A4A";
										} else if (s[m].style.color == "rgb(117, 134, 151)" || s[m].classList.contains('sb') || s[m].classList.contains('sb1') || s[m].classList.contains('sb2')) {
											s[m].style.color="#505861";
										} else if (s[m].style.color == "rgb(149, 197, 219)" || s[m].classList.contains('hcolor')) {
											s[m].style.color="#005A84"
										} else if (s[m].style.color == "rgb(0, 0, 0)") {
											s[m].style.color="#FFFFFF";
										} else if (s[m].style.color == "rgb(255, 216, 255)" || s[m].style.color == "rgb(187, 0, 187)" || s[m].classList.contains('c88') || s[m].classList.contains('pink')) {
											s[m].style.color="#AA00AA"
										}
									}
									var a = td[l].getElementsByTagName('a');
									for (var m=0; m<a.length; m++) {
										a[m].style.color="#005A84"
									}
								break;
								case "x":
									if (td[l].style.color == "rgb(191, 0, 0)" || td[l].style.color == "rgb(207, 0, 0)") {
										td[l].style.color="#FFBBBB";  //#BF0000 #CF0000
									} else if (td[l].style.color == "rgb(255, 85, 85)") {
										td[l].style.color="#FF9999";  //ncolor #FF5555
									} else if (td[l].style.color == "rgb(0, 90, 132)" || td[l].classList.contains('hcolor')) {
										td[l].style.color="#95C5DB"; //hcolor #005A84
									} else if (td[l].classList.contains('sb1')) {
										td[l].style.color="#A3BBD2";
									}
									for (var m=0; m<s.length; m++) {
										if (s[m].style.color == "rgb(0, 90, 132)" || s[m].classList.contains('hcolor')) {
											s[m].style.color="#95C5DB"; //hcolor #005A84
										} else if (s[m].style.color == "rgb(170, 0, 170)" || s[m].style.color == "rgb(187, 0, 187)" || s[m].classList.contains('c88') || s[m].classList.contains('pink')) {
											if (td[l].style.color == "rgb(0, 0, 0)") {
												s[m].style.color="#AA00AA"
											} else {
												s[m].style.color="#FFD8FF"
											}
										}
									}
								break;
							}
							if (td[l].classList.contains('td_2')) {
								td[l].style.color="#BFBFBF";
							}
						}
					}
				}
			}
		}
	} catch(e) {}
}
/*$(document).ready(function () {
	$(document).mouseup(function (e){
		var container = $("#layer, #layer1, #layer2");
		if(!$(e.target).hasClass("ei")) {
			container.hide();
			alert('성공');
		}
	});
});*/