
var svgns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";
var groups = null;

function setupBubbles(sizes) {
    for (var size=0; size<sizes.length; size++) {
        for (var i=0; i<bubbles.length; i++) {
            var baseName = "bubble-" + sizes[size] + "-" + i + "-";

            var transform = {};
            transform.translate = [10 + Math.random() * 500 + (i%3) * 250, 10 + Math.random() * 50 + (i/3) * 28];
            transform.scale = sizes[size];
            transform.delta = [Math.random() * 2.5 - 1, Math.random() * 2.5];

            createBubble(baseName, transform, bubbles[i]);
        }
    }

    groups = document.getElementsByTagNameNS(svgns, "g");

    // setup the animation timer
    setInterval(doMove, 1);
}

function createBubble(baseName, transform, bubble) {
    var svgdoc = document.getElementById("svg");

    // bubbles are wrapped in a group which has some custom data associated for translation and scaling
    var group = makeSVG("g", {id: baseName + "g"});
    group.vTranslate = transform.translate;
    group.vScale = transform.scale;
    group.vDelta = transform.delta;

    // we make a clipPath so the bubble image doesn't extend beyond the bubble
    var clipPath = makeSVG("clipPath", {id: baseName + "clip"});
    var clip = makeSVG("circle", {cx: "-60", cy: "-60", r: "50"});
    clipPath.appendChild(clip);
    group.appendChild(clipPath);

    // make the bubble image which is shown on mouseover
    var img = makeSVG("image", {id: baseName + "img", x: "-110", y: "-110", width: "100", height: "100", preserveAspectRatio: "xMinYMin slice", svgHref: bubble.img, style: "clip-path: url(#" + baseName + "clip)"});
    group.appendChild(img);

    // make the bubble itself
    var circle = makeSVG("circle", {id: baseName + "circle", cx: "-60", cy: "-60", r: "50"});
    circle.addEventListener("mouseover", doMouseOver, false);
    circle.addEventListener("mouseout", doMouseOut, false);
    group.appendChild(circle);

    // make the bubble label
    var text = makeSVG("text", {id: baseName + "text", x: "-60", y: "-60"});
    text.textContent = bubble.label;
    group.appendChild(text);

    svgdoc.appendChild(group);
}

var ATTR_MAP = {
  "className": "class",
  "svgHref": "href"
}

var NS_MAP = {
    "svgHref": xlinkns
};

function makeSVG(tag, attributes) {
    var elem = document.createElementNS(svgns, tag);
    for (var attribute in attributes) {
        var name = (attribute in ATTR_MAP ? ATTR_MAP[attribute] : attribute);
        var value = attributes[attribute];
        if (attribute in NS_MAP)
            elem.setAttributeNS(NS_MAP[attribute], name, value);
        else
            elem.setAttribute(name, value);
    }
    return elem;
}


var gMouseOver = null;

function doMove() {
    for (var i=0; i<groups.length; i++) {
        var group = groups[i];
        // don't move the bubble under the moouse
        if (gMouseOver == group)
            continue;

        var pos = group.vTranslate;
        group.vTranslate = [pos[0] + group.vDelta[0], pos[1] + group.vDelta[1]];

        // move the bubble back into view
        if (group.vTranslate[0] > 1000 || group.vTranslate[0] < -200 || group.vTranslate[1] > 400)
            group.vTranslate = [10 + Math.random() * 500 + (i%3) * 250, -50];

        // perform the translation and scaling
        group.setAttribute("transform", "translate(" + group.vTranslate[0] + "," + group.vTranslate[1] + ") scale(" + group.vScale + "," + group.vScale + ")");
    }
}

function doMouseOver(event) {
    // on mouseover we hide the bubble fill/label and show the image
    var circle = event.target;
    circle.style.setProperty("fill-opacity", "0", "");
    circle.nextSibling.style.display = "none";
    circle.previousSibling.style.display = "inline";
    gMouseOver = circle.parentNode;
}

function doMouseOut(event) {
    // on mouseout we hide the image and show the bubble fill/label
    var circle = event.target;
    circle.style.setProperty("fill-opacity", "1", "");
    circle.previousSibling.style.display = "none";
    circle.nextSibling.style.display = "inline";
    gMouseOver = null;
}