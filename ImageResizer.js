var ImageFactory;
var resizeIfNecessary = function(blob, imageSize, quality) {
    if (!ImageFactory)
		ImageFactory = require('ti.imagefactory');
		
	var quality = quality || 0.5;
	var maxSize = 600;

	if (imageSize) {
		maxSize = imageSize;
	}

	if (OS_ANDROID){
		return resizeCompressAndroid(blob, maxSize, quality);
	}

	
	var width = blob.width;
	var height = blob.height;
	var maxWidth = maxSize;
	var maxHeight = maxSize;

	var ratio = width / height;

	var newWidth = width,
	    newHeight =
	    height;

	if (width > maxWidth) {
		newWidth = maxWidth;
		newHeight = +((newWidth / ratio).toFixed());
		if (newHeight > maxHeight) {
			newHeight = maxHeight;
			newWidth = +((newHeight * ratio).toFixed());
		}
	} else if (height > maxHeight) {
		newHeight = maxHeight;
		newWidth = +((newHeight * ratio).toFixed());
	}

	if (width != newWidth || height != newHeight || quality !== 1) {
		var blob = ImageFactory.imageAsResized(blob, {
			width : newWidth,
			height : newHeight,
			format : ImageFactory.JPEG
		});
		if (!blob) return;
		var blob = ImageFactory.compress(blob, quality);
	}

	return blob;
};

function resizeCompressAndroid(blob, size, quality){	
	var filename = 'android_resize_image.jpg';
	var path = Ti.Filesystem.applicationCacheDirectory;
	var file = Ti.Filesystem.getFile(path, filename);
	file.write(blob);
	var nativePath = file.nativePath;
	file = null;
	
	quality = Math.round(quality*100) ? Math.round(quality*100) : 60;
	
	var fh = require('fh.imagefactory');
	
	fh.rotateResizeImage(nativePath, size, quality);
	
	fh = null;
	var file = Ti.Filesystem.getFile(path, filename);
	var returnFile = file.read();
	return returnFile;
};

module.exports = {
	resizeIfNecessary: resizeIfNecessary
};
