//https://github.com/ivmello/easeScroll
//Ease Scroll all pages

$("html").easeScroll();
// $("html").easeScroll({
//   frameRate: 60,
//   animationTime: 1000,
//   stepSize: 120,
//   pulseAlgorithm: !0,
//   pulseScale: 8,
//   pulseNormalize: 1,
//   accelerationDelta: 20,
//   accelerationMax: 1,
//   keyboardSupport: !0,
//   arrowScroll: 50
// });

//Wave Background
//motivation
//https://codepen.io/DirkTester/pen/BJLgEx?editors=1010

if (document.getElementById("canv")) {
  var c = document.getElementById("canv");
  var $ = c.getContext("2d");

  var w = (c.width = window.innerWidth);
  var h = (c.height = window.innerHeight);

  var intLines = 15;
  var draw = function (a, b, t) {
    $.lineWidth = 0.2;
    //background color
    $.fillStyle = "white";
    $.fillRect(0, 0, w, h);
    //i sets the number of lines
    for (var i = 0; i < intLines; i++) {
      $.strokeStyle = "#B1B1B1";
      $.beginPath();
      $.moveTo(-0, h / 2);
      for (var j = 0; j < w; j += 10) {
        $.lineTo(
          60 * Math.sin(i / 7) + j + 0.008 * j * j,
          Math.floor(
            h / 1.7 +
            (j / 3) * Math.sin(j / 50 - t / 50 - i / 118) +
            i * 0.9 * Math.sin(j / 25 - (i + t) / 65)
          )
        );
      }
      $.stroke();
    }
  };

  var t = 0;
  var run = function () {
    //note the self-calling function via callback window.requestAnimationFrame
    //window.requestAnimationFrame(run);
    t += 0.5;
    draw(33, 52 * Math.sin(t / 2400), t);
    // txt();
  };
}

// aos scroll Animation
//https://github.com/michalsnik/aos

AOS.init();

//basic UI
// function changeLines() {
//   var L = document.getElementById("lineCount").value;
//   intLines = L;
//   //console.log("test");
// }
// document.getElementById("lineCount").value = intLines;
// document.getElementById("lineCount").onchange = function () {
//   changeLines();
// };

window.setInterval(run, 50); //interval instead of using callback in run() function
//run();

// Blog Filter

if (document.getElementById("myBtnContainer")) {
  filterSelection("all");

  function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("article-container");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
  }

  function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }

  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }

  // Add active class to the current button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
}

// var menu = $(".wrapper a");

// menu.on("click", function () {
//   var menuNum = $(this).data("menu");
//   $(this).toggleClass("menu-" + menuNum + "-active");
//   $(".block2").toggleClass("block2-active");
//   $(".block2").fadeIn(200);
// });

//scroll bar get disabled after pressing f11, in full screen mode.
//clear web view
$(window).resize(function () {
  if (
    window.fullScreen ||
    (window.innerWidth == screen.width && window.innerHeight == screen.height)
  ) {
    $("html").css("overflow", "hidden");
  } else {
    $("html").css("overflow", "auto");
  }
});

$(document).ready(function () {
  $(window).resize();
  // trigger the function when the page loads
  // if you have another $(document).ready(), simply add this line to it
});