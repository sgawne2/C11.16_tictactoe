/**
 * items - global object
 * @type {{}}
 */
var items = {};
/**
 * api - global object returned by initialize function.
 * @type {{}}
 */
var api = {};
/**
 * item - constructor function that creates the motion controlled cursor. Paramaters are set by the initialize function
 * @param imgSrc
 * @param height
 * @param width
 * @param sensitivity
 * @constructor
 */
var Item = function(imgSrc, height, width, sensitivity) {
    var item = this;
    var img = document.createElement('img');
    img.src = imgSrc;

    img.style.position = 'absolute';
    img.style.height = height;
    img.style.width = width;
    item.position = [];
    img.onload = function () {
        item.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
        document.body.appendChild(img);
    }

    item.setTransform = function(position, rotation) {


       /* item.position[0] = position[0] * sensitivity;
        item.position[1] = position[1] * sensitivity;*/

        img.style.left = position[0]*sensitivity - img.width  / 2 + 'px';
        img.style.top  = position[1]*sensitivity - img.height / 2 + 'px';

        /*    img.style.left = position[0] - img.width / 2 + 'px';
         img.style.top = position[1] - img.height / 2 + 'px';
         img.style.transform = 'rotate(' + -rotation + 'rad)';*/

        item.position[0] = parseFloat(img.style.left);
        item.position[1] = parseFloat(img.style.top);

        img.style.transform = 'rotate(' + -rotation + 'rad)';

        img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
            img.style.OTransform = img.style.transform;

    };


};

var controllerOptions = {enableGestures: true};

var initialize = function(imgSrc, width, height, sensitivity, imgSrc2, width2, height2) {



    Leap.loop(controllerOptions, function(frame) {

        if(frame.valid && frame.gestures.length > 0){
            frame.gestures.forEach(function(gesture){
                switch (gesture.type){
                    case "circle":
                        api.circle ? api.circle() : console.log('no circle gesture function created');
                        break;
                    case "keyTap":
                        api.keyTap ? api.keyTap() : console.log('no key tap gesture function created');
                        break;
                    case "screenTap":
                        api.screenTap ? api.screenTap() : console.log('no screen tap gesture function created');
                        break;
                    case "swipe":
                        api.swipe ? api.swipe() : console.log('no swipe gesture function created');
                        break;
                }
            });
        }


        frame.hands.forEach(function(hand, index) {

            if (imgSrc2) {
                var item = ( items[index] || (items[index] = new Item(imgSrc2, width2, height2, sensitivity)) );
            } else {
                var item = ( items[index] || (items[index] = new Item()) );
            }
            item.setTransform(hand.screenPosition(), hand.roll());

        });

    }).use('screenPosition', {scale: 0.25});

    items[0] = new Item(imgSrc, width, height, sensitivity);
    api.items = items;
    Leap.loopController.setBackground(true);
    return api;
};



