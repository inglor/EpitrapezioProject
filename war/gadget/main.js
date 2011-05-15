var img;
var canvas;
var ctx;
var gridDrawn;
var modeColours = new Array(new Array(0, 0, 255, 0.3));
var modeNames = new Array('Normal');
var modeDisplay = new Array(true);
var modeDefValue = new Array(true);
var modeMasks = new Array(1);
var numModes = 1;
var curMode = 0;
var maxi;
var maxj;
var x;
var y;
var grida;
var offx;
var offy;
var pen = false;
var penx;
var peny;
var peni;
var penj;
var coords;
var canvasOffsetX;
var canvasOffsetY;
var penMode;
var canvasBorder = 2;
var canvasFont = '11px sans-serif';
var canvasFontSize = 11;
var dbgDiv;
function initSpinBt() {
			$.spin.imageBasePath = 'http://iniju-board-game-maps.googlecode.com/svn/trunk/gadget/img/spin/';
			$.spin.timeInterval = 100;
			$.spin.btnCss = {cursor: 'pointer', padding: 0, margin: 0, verticalAlign: 'top'};
			$('.spin').spin({
					changed: function(n) {
						spinVarChanged(n, this[0].id);
					}
			});
			$('.spin_pos').spin({
					min: 10,
					changed: function(n) {
						spinVarChanged(n, this[0].id);
					}
			});
}
function main(img_src) {
   gridDrawn = false;
   img=new Image();
   canvas = document.getElementById('canvas');
   coords = document.getElementById('coords');
   ctx = canvas.getContext('2d');
   img.src = img_src; //'http://iniju-board-game-maps.googlecode.com/svn/trunk/gadget/img/map.jpg';
	initSpinBt();
	img.onload = function() {
		canvas.width = img.width;
		canvas.height = img.height;
		grida = parseFloat(document.getElementById('grida').value);
		offx = parseFloat(document.getElementById('offx').value);
		offy = parseFloat(document.getElementById('offy').value);
		canvasOffsetX = 0;
		canvasOffsetY = 0;
		ctx.drawImage(img, 0, 0);
		maxi=1;
		maxj=1;
		modeMasks[0] = createMask(true);
		resizeGrid();
		var obj = canvas;
		if (obj.offsetParent) {
			do {
				canvasOffsetX += obj.offsetLeft;
				canvasOffsetY += obj.offsetTop;
				obj = obj.offsetParent;
         } while (obj);
      }
		gadgets.window.adjustHeight();
   }
   gridDrawn = false;
	dbgDiv = document.getElementById('debugDiv');
   listModes();
}
function rgbaStyle(mc) {
   return "rgba("+mc[0]+','+mc[1]+','+mc[2]+','+mc[3]+")";
}
function canvasRefresh() {
   ctx.strokeStyle = 'rgba(255,0,0,0.5)';
   ctx.lineWidth = 1;
   ctx.drawImage(img, 0, 0);
   if (gridDrawn) {
      for (var m = 0; m < numModes; ++m) {
         for (var i = 0; i < maxi; ++i ) {
            y = i * grida + 0.5 + offy;
            for (var j = 0; j < maxj; ++j ) {
               x = j * grida + 0.5 + offx;
               if (m===0) {
                  ctx.strokeRect(x, y, grida , grida);
               }
               if (modeDisplay[m] && modeMasks[m][i][j]) {
                  ctx.fillStyle = rgbaStyle(modeColours[m]);
                  ctx.fillRect(x, y, grida , grida);
               }
            }
         }
      }
   }
}
function toggleGrid(btn) {
   gridDrawn = !gridDrawn;
   if (gridDrawn) {
      btn.className="on";
   } else {
      btn.className="off";
   }
   canvasRefresh();
}
function inpVarChanged(v) {
	if (isNaN(document.getElementById(v).value) || !document.getElementById(v).value.length) {
		eval("document.getElementById('"+v+"').value = "+v);
	} else {
		eval(v+" = parseFloat(document.getElementById('"+v+"').value)");
	}
	canvasRefresh();
}
function inpVarChanged_wFloor(v, minv) {
	var elval = document.getElementById(v).value;
	if (isNaN(elval) || !elval.length || elval < minv) {
		eval("document.getElementById('"+v+"').value = "+v);
	} else {
		eval(v+" = parseFloat(document.getElementById('"+v+"').value)");
	}
	canvasRefresh();
}

function spinVarChanged(numval, varname) {
	eval(varname+" = "+numval);
	canvasRefresh();
}
function toggleModeDisplay(m) {
	modeDisplay[m]=!modeDisplay[m];
	canvasRefresh();
}
function toggleDefValue(m) {
	modeDefValue[m]=!modeDefValue[m];
	if (modeDefValue[m]) {
		document.getElementById('modFill'+m).value = "Fill";
	} else {
      document.getElementById('modFill'+m).value = "Clear";
   }
   canvasRefresh();
}
function startEditModeColour(m) {
	document.getElementById('modCcv'+m).style.visibility = 'hidden';
	var el = document.getElementById('modCtb'+m);
	el.style.visibility = 'visible';
	el.focus();
}
function endEditModeColour(m, c) {
   modeColours[m][0] = parseInt(c.substr(0, 2), 16);
   modeColours[m][1] = parseInt(c.substr(2, 2), 16);
   modeColours[m][2] = parseInt(c.substr(4, 2), 16);
   canvasRefresh();
   listModes();
}
function listModes() {
   var modeTable = document.getElementById('modeTable');
   for (var i = modeTable.rows.length-1; i >= 0; --i) {
      modeTable.deleteRow(i);
   }
   for (var i = 0; i < numModes; ++i) {
      modeTable.insertRow(i);
      modeTable.rows[i].insertCell(0);
      var el = document.createElement('input');
      el.name = 'selectMode';
      el.type = 'radio';
      el.value = i;
      el.checked = (i == curMode);
      el.addEventListener('change', function() { curMode = this.value }, false);
      modeTable.rows[i].cells[0].appendChild(el);

      modeTable.rows[i].insertCell(1);
      el = document.createElement('input');
      el.name = 'modChk'+i;
      el.type = 'checkbox';
      el.value = i;
      el.checked = modeDisplay[i];
      el.addEventListener('change', function() { toggleModeDisplay(this.value) }, false);
      modeTable.rows[i].cells[1].appendChild(el);

      modeTable.rows[i].insertCell(2);
      el = document.createElement('input');
      el.name = i;
      el.type = "text";
      el.value = modeNames[i];
      el.size = 8;
      el.addEventListener('change', function() { modeNames[this.name] = this.value }, false);
      modeTable.rows[i].cells[2].appendChild(el);

      modeTable.rows[i].insertCell(3);
      var divel = document.createElement('div');
		divel.style.position = 'relative';
      modeTable.rows[i].cells[3].appendChild(divel);
      el = document.createElement('input');
      el.id = 'modCtb'+i;
		el.name = i;
      el.type = "text";
      el.value = (toHex(modeColours[i][0])+toHex(modeColours[i][1])+toHex(modeColours[i][2])).toUpperCase();
      el.addEventListener('blur', function() { endEditModeColour(this.name, this.value) }, false);
      el.size = 4;
		divel.appendChild(el);
      el = document.createElement('canvas');
      var elctx = el.getContext('2d');
		var txtcol = document.getElementById('modCtb'+i);
      el.width = txtcol.offsetWidth-2*canvasBorder;
      el.height = txtcol.offsetHeight-2*canvasBorder;
		el.id = 'modCcv'+i;
		el.name = i;
      elctx.fillStyle = rgbaStyle(modeColours[i]);
      elctx.fillRect(0, 0, el.width, el.height);
		elctx.font = canvasFont;
      elctx.fillStyle = '#000000';
		elctx.fillText(txtcol.value, 1.5, canvasFontSize+0.5);
      el.addEventListener('mouseup', function() { startEditModeColour(this.name) }, false);
		txtcol.style.visibility = 'hidden';
		divel.appendChild(el);
		el = document.getElementById('modCcv'+i);
		el.style.position = 'absolute';
		el.style.top = 0;
		el.style.left = 0;

      modeTable.rows[i].insertCell(4);
      el = document.createElement('input');
      el.name = 'modDefV'+i;
      el.type = "checkbox";
      el.value = i;
      el.checked = modeDefValue[i];
      el.addEventListener('change', function() { toggleDefValue(this.value) }, false);
      modeTable.rows[i].cells[4].appendChild(el);

      modeTable.rows[i].insertCell(5);
      el = document.createElement('input');
      el.id = 'modFill'+i;
      el.name = i;
      el.type = "button";
      if (modeDefValue[i]) {
         el.value = "Fill";
      } else {
         el.value = "Clear";
      }
      el.addEventListener('mouseup', function() { fillMask(this.name, modeDefValue[this.name]) }, false);
      modeTable.rows[i].cells[5].appendChild(el);

      modeTable.rows[i].insertCell(6);
      el = document.createElement('input');
      el.id = 'modRem'+i;
      el.name = i;
      el.type = "button";
      el.value = "Remove";
      el.checked = modeDefValue[i];
      el.addEventListener('mouseup', function() { removeMode(this.name) }, false);
      modeTable.rows[i].cells[6].appendChild(el);
   }
}
function toHex(n) {
   var str = n.toString(16);
   if (str.length < 2) {
      str = '0' + str;
   }
   return str;
}
function fillMask(m, v) {
   for (var i = 0; i < modeMasks[m].length; ++i) {
      for (var j = 0; j < modeMasks[m][i].length; ++j) {
         modeMasks[m][i][j] = v;
      }
   }
   canvasRefresh();
}
function resizeGrid() {
   maxi = Math.round(canvas.height/grida+0.5);
   maxj = Math.round(canvas.width/grida+0.5);
   for(var m=0; m < numModes; ++m) {
      modeMasks[m] = resizeMask(modeMasks[m], modeDefValue[m]);
   }
   canvasRefresh();
}
function resizeMask(oldMask, defValue) {
   var oldmaxi = oldMask.length;
   var oldmaxj = oldMask[0].length;
   var offi = Math.round((offy-offy%grida)/grida);
   var offj = Math.round((offx-offx%grida)/grida);
   var newMask = new Array(1);
   for (var i = 0; i < maxi; ++i) {
      newMask[i] = new Array(maxj);
      for (var j = 0; j < maxj; ++j) {
         if (i-offi >= 0 && i-offi < oldmaxi && j-offj >= 0 && j-offj < oldmaxj) {
            newMask[i][j] = oldMask[i-offi][j-offj];
         } else {
            newMask[i][j] = defValue;
         }
      }
   }
   offx = offx % grida;
   document.getElementById('offx').value = offx;
   offy = offy % grida;
   document.getElementById('offy').value = offy;
   return newMask;
}
function createMask(defValue) {
   var newMask = new Array(1);
   for (var i = 0; i < maxi; ++i) {
      newMask[i] = new Array(maxj);
      for (var j = 0; j < maxj; ++j) {
         newMask[i][j] = defValue;
      }
   }
   return newMask;
}
function addMode() {
   ++numModes;
   modeColours.push(new Array(0, 0, 255, 0.3));
   modeNames.push('New Mode');
   modeDisplay.push(true);
   modeDefValue.push(false);
   modeMasks.push(createMask(false));
   listModes();
}
function removeMode(m) {
   if (numModes > 1) {
      --numModes;
      modeColours.splice(m , 1);
      modeNames.splice(m, 1);
      modeDisplay.splice(m, 1);
      modeDefValue.splice(m, 1);
      modeMasks.splice(m, 1);
      listModes();
      canvasRefresh();
   }
}
function penDown(event) {
   if (gridDrawn) {
      pen = true;
		if (event.pageX) {
			penx = event.pageX-canvasOffsetX;
			peny = event.pageY-canvasOffsetY;
		} else {
			penx = event.clientX+document.body.scrollLeft-canvasOffsetX;
			peny = event.clientY+document.body.scrollTop-canvasOffsetY;
		}
      peni = Math.round((peny-offy)/grida-0.5);
      penj = Math.round((penx-offx)/grida-0.5);
      if (peni >= 0 && peni < maxi && penj >= 0 && penj < maxj) {
         penMode = !modeMasks[curMode][peni][penj];
         modeMasks[curMode][peni][penj] = penMode;
         if (penMode) {
            coords.innerHTML = 'Setting '+modeNames[curMode]+' at '+peni+','+penj;
         } else {
            coords.innerHTML = 'Clearing '+modeNames[curMode]+' at '+peni+','+penj;
         }
      }
      canvasRefresh();
   }
}
function penUp() {
   pen = false;
   coords.innerHTML = 'Pen up';
}
function toggleMode(event) {
   if (pen) {
      penx = event.pageX-canvasOffsetX;
      peny = event.pageY-canvasOffsetY;
      peni = Math.round((peny-offy)/grida-0.5);
      penj = Math.round((penx-offx)/grida-0.5);
      if (peni >= 0 && peni < maxi && penj >= 0 && penj < maxj) {
         modeMasks[curMode][peni][penj] = penMode;
         if (penMode) {
            coords.innerHTML = 'Setting '+modeNames[curMode]+' at '+peni+','+penj;
         } else {
            coords.innerHTML = 'Clearing '+modeNames[curMode]+' at '+peni+','+penj;
         }
      }
   }
   canvasRefresh();
}
function autoDetect(x0, y0, x1, y1, amin, amax) {
	var dx = 0.0;
	var dy = 0.0;
	var lineOffset = img.width*4;
	var r1, r2, g1, g2, b1, b2;
	var imgData = ctx.getImageData(x0, y0, x1-x0, y1-y0).data;
	if (y1-y0 > x1-x0) {
		dy = 1.0;
	} else {
		dx = 1.0;
	}
	var dist = new Array();
	for (var a = amin; a < amax; a++) {
		dist[a] = 0;
	}
	for (var x = x0; x <= x1; ++x) {
		for (var y = y0; y <= y1; ++y) {
			r1 = imgData[y*lineOffset + x*4];
			g1 = imgData[y*lineOffset + x*4+1];
			b1 = imgData[y*lineOffset + x*4+2];
			for (var a = amin; a < amax; a+=1) {
				r2 = imgData[(y+a)*lineOffset + x*4];
				g2 = imgData[(y+a)*lineOffset + x*4+1];
				b2 = imgData[(y+a)*lineOffset + x*4+2];
				dist[a] += sqrt(2*(r2-r1)*(r2-r1)+4*(g2-g1)*(g2-g1)+3*(b2-b1)*(b2-b1));
			}
		}
	}
	for (var a = amin; a < amax; a+=1) {
		debugDiv(a+' '+dist[a]);
	}
}
function debugDiv(txt) {
	dbgDiv.innerHTML += txt;
}

