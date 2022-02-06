var addZoom = function (target) {
  var container = document.getElementById(target),
      imgsrc = container.currentStyle || window.getComputedStyle(container, false),
      imgsrc = imgsrc.backgroundImage.slice(4, -1).replace(/"/g, ""),
      img = new Image();

  img.src = imgsrc;
  img.onload = function () {
    var imgWidth = img.naturalWidth,
        imgHeight = img.naturalHeight,
        ratio = imgHeight / imgWidth,
        percentage = ratio * 100 + '%';

    container.onmousemove = function (e) {
      var boxWidth = container.clientWidth,
          rect = e.target.getBoundingClientRect(),
          xPos = e.clientX - rect.left,
          yPos = e.clientY - rect.top,
          xPercent = xPos / (boxWidth / 100) + "%",
          yPercent = yPos / ((boxWidth * ratio) / 100) + "%";

      Object.assign(container.style, {
        backgroundPosition: xPercent + ' ' + yPercent,
        backgroundSize: imgWidth + 'px'
      });
    };

    container.onmouseleave = function (e) {
      Object.assign(container.style, {
        backgroundPosition: 'left',
        backgroundSize: 'cover'
      });
    };
  }
};

window.addEventListener("load", function(){
  addZoom("zoom-img");
});