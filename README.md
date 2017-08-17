# ImageResizer
CommonJS library to scale images and maintain aspect ratio.

## Dependencies

For iOS `ti.imagefactory` is required, for Android `fh.imagefactory` is required. 

The reason `fh.imagefactory` is used on Android is that `ti.imagefactory` doesn't take rotation into account when resizing the image as the rotation EXIF information is lost.

## Installation

Download the `js` file and add them to the `app/lib/` directory. 

## Usage

Require the JS file anywhere in your project and just call the resize function with the quality and dimensions you want. 
