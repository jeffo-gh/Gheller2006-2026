// Image Preloader  v1.0.1
// documentation: http://www.dithered.com/javascript/image_preloader/index.html
// license: http://creativecommons.org/licenses/by/1.0/
// code by Chris Nott (chris[at]dithered[dot]com)


function preloadImages() {
if (document.images) {
for (var i = 0; i < preloadImages.arguments.length; i++) {
	(new Image()).src = preloadImages.arguments[i];
}
}
}

// Rollover  v2.0.1
// documentation: http://www.dithered.com/javascript/rollover/index.html
// license: http://creativecommons.org/licenses/by/1.0/
// code by Chris Nott (chris[at]dithered[dot]com)


function isDefined(property) {
return (typeof property != 'undefined');
}

var rolloverInitialized = false;
function rolloverInit() {
if (!rolloverInitialized && isDefined(document.images)) {

// get all images (including all <input type="image">s)
// use getElementsByTagName() if supported
var images = new Array();
if (isDefined(document.getElementsByTagName)) {
images = document.getElementsByTagName('img');
var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) {
if (inputs[i].type == 'image') {
images[images.length] = inputs[i];
}
}
}

// otherwise, use document.images and document.forms collections
// remove if not supporting IE4, Opera 4-5
else {
images = document.images;
inputs = new Array();
for (var formIndex = 0; formIndex < document.forms.length; formIndex++) {
for (var elementIndex = 0; elementIndex < document.forms.elements.length; elementIndex++) {
if (isDefined(document.forms.elements[i].src)) {
inputs[inputs.length] = document.forms.elements[i];
}
}
}
}

// get all images with '_off.' in src value
for (var i = 0; i < images.length; i++) {
if (images[i].src.indexOf('_off.') != -1) {
var image = images[i];

// store the off state filename in a property of the image object
image.offImage = new Image();
image.offImage.src = image.src;

// store the on state filename in a property of the image object
// (also preloads the on state image)
image.onImage = new Image();
image.onImage.imageElement = image;

// add onmouseover and onmouseout event handlers once the on state image has loaded
// Safari's onload is screwed up for off-screen images; temporary fix
if (navigator.userAgent.toLowerCase().indexOf('safari') != - 1) {
image.onmouseover = function() {
this.src = this.onImage.src;
};
image.onmouseout = function() {
this.src = this.offImage.src;
};
}
else {
image.onImage.onload = function() {
this.imageElement.onmouseover = function() {
this.src = this.onImage.src;
};
this.imageElement.onmouseout = function() {
this.src = this.offImage.src;
};
};
}

// set src of on state image after defining onload event handler
// so cached images (that load instantly in IE) will trigger onload
image.onImage.src = image.src.replace(/off\./, 'on.');
}
}
}
rolloverInitialized = true;
}

// call rolloverInit when document finishes loading
if (isDefined(window.addEventListener)) {
window.addEventListener('load', rolloverInit, false);
}
else if (isDefined(window.attachEvent)) {
window.attachEvent('onload', rolloverInit);
}

function toggle( targetId ){
if (document.getElementById){
target = document.getElementById( targetId );
if (target.style.display == "none"){
target.style.display = "";
} else {
target.style.display = "none";
}
}
}
function setActiveStyleSheet(title) {
var i, a, main;
for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
a.disabled = true;
if(a.getAttribute("title") == title) a.disabled = false;
}
}
}

function getActiveStyleSheet() {
var i, a;
for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
}
return null;
}

function getPreferredStyleSheet() {
var i, a;
for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
if(a.getAttribute("rel").indexOf("style") != -1
&& a.getAttribute("rel").indexOf("alt") == -1
&& a.getAttribute("title")
) return a.getAttribute("title");
}
return null;
}

function createCookie(name,value,days) {
if (days) {
var date = new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires = "; expires="+date.toGMTString();
}
else expires = "";
document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
var c = ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
}

window.onload = function(e) {
var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);
}

window.onunload = function(e) {
var title = getActiveStyleSheet();
createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);