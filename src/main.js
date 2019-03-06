require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK();

var ImageURL,Font1,Font1Size,Font1Color,textinputBtmLft,textinputBtmrgt,textinputTopLft,textinputTopRgt,textinputCenter;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function ContentBlockSettings () {
	document.getElementById('ImageURL').value 				= ImageURL;
	document.getElementById('Font1').value 						= Font1;
	document.getElementById('Font1Size').value 				= Font1Size;
	document.getElementById('Font1Color').value 			= Font1Color;
	document.getElementById('textinputBtmLft').value 	= textinputBtmLft;
	document.getElementById('textinputBtmrgt').value 	= textinputBtmrgt;
	document.getElementById('textinputTopLft').value 	= textinputTopLft;
	document.getElementById('textinputTopRgt').value 	= textinputTopRgt;
	document.getElementById('textinputCenter').value 	= textinputCenter;
}

function paintContentBlock() {
	ImageURL 			= document.getElementById('ImageURL').value;
	Font1 				= document.getElementById('Font1').value;
	Font1Size 			= document.getElementById('Font1Size').value;
	Font1Color 		= document.getElementById('Font1Color').value;
	textinputBtmLft 	= document.getElementById('textinputBtmLft').value;
	textinputBtmrgt 	= document.getElementById('textinputBtmrgt').value;
	textinputTopLft 	= document.getElementById('textinputTopLft').value;
	textinputTopRgt 	= document.getElementById('textinputTopRgt').value;
	textinputCenter 	= document.getElementById('textinputCenter').value;
	if (!ImageURL) {
		return;
	}
	var content = '<div class="container" style="position: relative;text-align: center;font-family:'+Font1+';font-size:'+Font1Size+';color:'+Font1Color+'"> <img src="'+ImageURL+'" style="width:100%;"> <div class="bottom-left" style="position: absolute;bottom: 8px;left: 16px;">'+textinputBtmLft+'</div> <div class="top-left" style="position: absolute;top: 8px;left: 16px;">'+textinputTopLft+'</div> <div class="top-right" style="position: absolute;top: 8px;right: 16px;">'+textinputTopRgt+'</div> <div class="bottom-right" style="position: absolute;bottom: 8px;right: 16px">'+textinputBtmrgt+'</div> <div class="centered" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">'+textinputCenter+'</div></div>';
	sdk.setContent('<a>' +content + '</a>');
	sdk.setData({
		ImageURL: ImageURL,
		Font1: Font1,
		Font1Size: Font1Size,
		Font1Color: Font1Color,
		textinputBtmLft: textinputBtmLft,
		textinputBtmrgt:textinputBtmrgt,
		textinputTopLft:textinputTopLft,
		textinputTopRgt:textinputTopRgt,
		textinputCenter : textinputCenter
	});
}

sdk.getData(function (data) {
	ImageURL = data.ImageURL || 'https://images.template.net/wp-content/uploads/2015/11/25194649/Basketball-Pool-Reflection-Wallpaper-Background-Full-HD.jpg';
	Font1 				= data.Font1 || 'Arial';
	Font1Size 			= data.Font1Size || 16;
	Font1Color 		= data.Font1Color || 'White';
	textinputBtmLft 	= data.textinputBtmLft || '';
	textinputBtmrgt 	= data.textinputBtmrgt || '';
	textinputTopLft 	= data.textinputTopLft || '';
	textinputTopRgt 	= data.textinputTopRgt || '';
	textinputCenter 	= data.textinputCenter || '';
	ContentBlockSettings();
	paintContentBlock();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintContentBlock, 500)();
});
