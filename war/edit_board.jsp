<!DOCTYPE html>
<html>
<head>
<title>Epitrapezio App Engine v 1.0</title>
<link rel="stylesheet" type="text/css"
	href="gadget/main.css" />
<script type="text/javascript" language="javascript"
	src="gadget/main.js"></script>
<script type="text/javascript" language="javascript"
	src="gadget/jquery.js"></script>
<script src="gadget/jquery-spin.js"></script>
<script>
			$(document).ready(function() {
				$.spin.imageBasePath = 'gadget/img/spin/';
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
				main('/serve?blob-key=' + "<%= request.getParameter("bkg_image") %>");
			});
		</script>
</head>
<body onmouseup="penUp()">
<table>
	<tr>
		<td>
		<table>
			<tr>
				<td><input type="button" value="Toggle Grid" class="off"
					onmouseup="toggleGrid(this)" /></td>
				<td><input type="button" value="Resize Grid"
					onmouseup="resizeGrid()" /></td>
				<td><input type="button" value="Autodetect"
					onmouseup="autoDetect(100, 100, 150, 150, 18, 25)" disabled="true" /></td>
				<td class="filler_width align_right">
				<div id="coords">Pen up</div>
				</td>
			</tr>
			<tr>
				<td colspan="4"><canvas id="canvas"
					onmousedown="penDown(event)" onmousemove="toggleMode(event)">
				Canvas not supported! </canvas></td>
			</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td>
		<table>
			<tr>
				<td class="va_top">
				<table class="framed">
					<tr>
						<td>
						<div>Size:</div>
						</td>
						<td><input id="grida" type="text" class="spin_pos" value="50"
							size="1" onchange="inpVarChanged_wFloor('grida', 10)" /></td>
					</tr>
					<tr>
						<td>
						<div>Offset x:</div>
						</td>
						<td class="va_top"><input id="offx" type="input" class="spin"
							value="0" size="1" onchange="inpVarChanged('offx')" /></td>
					</tr>
					<tr>
						<td>
						<div>Offset y:</div>
						</td>
						<td class="va_top"><input id="offy" type="input" class="spin"
							value="0" size="1" onchange="inpVarChanged('offy')" /></td>
					</tr>
				</table>
				</td>
				<td class="va_top filler_width">
				<table class="framed">
					<tr>
						<td width="20%">
						<div>&nbsp;</div>
						</td>
						<td>
						<div class="align_center">Terrains</div>
						</td>
						<td class="align_right" width="20%"><input type="button"
							value="Add..." onmouseup="addMode()" /></td>
					</tr>
					<tr>
						<td colspan="3">
						<table id='modeTable' width="100%">
						</table>
						</td>
					</tr>
				</table>
				</td>
			</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td>
		<div id="debugDiv">Debugging:</div>
		</td>
	</tr>
</table>
</body>
</html>