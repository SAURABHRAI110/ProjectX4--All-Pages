//https://github.com/ivmello/easeScroll
//Ease Scroll all pages

//$("html").easeScroll();
$("html").easeScroll({
  frameRate: 60,
  animationTime: 1000,
  stepSize: 120,
  pulseAlgorithm: !0,
  pulseScale: 8,
  pulseNormalize: 1,
  accelerationDelta: 20,
  accelerationMax: 1,
  keyboardSupport: !0,
  arrowScroll: 50
});


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
            j / 3 * Math.sin(j / 50 - t / 50 - i / 118) +
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


// smooth scroll
// $("html").easeScroll();
///aos scrolling animation

AOS.init();



// Blog Filter

if (document.getElementById("myBtnContainer")) {
  filterSelection("all")

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

(function () {

  var pi = Math.PI;
  var pi2 = 2 * Math.PI;

  this.Waves = function (holder, options) {
    var Waves = this;

    Waves.options = extend(options || {}, {
      resize: false,
      rotation: 45,
      waves: 5,
      width: 100,
      hue: [11, 14],
      amplitude: 0.5,
      background: true,
      preload: true,
      speed: [0.004, 0.008],
      debug: false,
      fps: false,
    });

    Waves.waves = [];

    Waves.holder = document.querySelector(holder);
    Waves.canvas = document.createElement('canvas');
    Waves.ctx = Waves.canvas.getContext('2d');
    Waves.holder.appendChild(Waves.canvas);

    Waves.hue = Waves.options.hue[0];
    Waves.hueFw = true;
    Waves.stats = new Stats();

    Waves.resize();
    Waves.init(Waves.options.preload);

    if (Waves.options.resize)
      window.addEventListener('resize', function () {
        Waves.resize();
      }, false);

  };

  Waves.prototype.init = function (preload) {
    var Waves = this;
    var options = Waves.options;

    for (var i = 0; i < options.waves; i++)
      Waves.waves[i] = new Wave(Waves);

    if (preload) Waves.preload();
  };

  Waves.prototype.preload = function () {
    var Waves = this;
    var options = Waves.options;

    for (var i = 0; i < options.waves; i++) {
      Waves.updateColor();
      for (var j = 0; j < options.width; j++) {
        Waves.waves[i].update();
      }
    }
  };

  Waves.prototype.render = function () {
    var Waves = this;
    var ctx = Waves.ctx;
    var options = Waves.options;

    Waves.updateColor();
    Waves.clear();

    if (Waves.options.debug) {
      ctx.beginPath();
      ctx.strokeStyle = '#f00';
      ctx.arc(Waves.centerX, Waves.centerY, Waves.radius, 0, pi2);
      ctx.stroke();
    }

    if (Waves.options.background) {
      Waves.background();
    }

    each(Waves.waves, function (wave, i) {
      wave.update();
      wave.draw();
    });
  };

  Waves.prototype.animate = function () {
    var Waves = this;

    Waves.render();

    if (Waves.options.fps) {
      Waves.stats.log();
      Waves.ctx.font = '12px Arial';
      Waves.ctx.fillStyle = '#fff';
      Waves.ctx.fillText(Waves.stats.fps() + ' FPS', 10, 22);
    }

    window.requestAnimationFrame(Waves.animate.bind(Waves));
  };

  Waves.prototype.clear = function () {
    var Waves = this;
    Waves.ctx.clearRect(0, 0, Waves.width, Waves.height);
  };

  Waves.prototype.background = function () {
    var Waves = this;
    var ctx = Waves.ctx;

    var gradient = Waves.ctx.createLinearGradient(0, 0, 0, Waves.height);
    gradient.addColorStop(0, '#000');
    gradient.addColorStop(1, Waves.color);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, Waves.width, Waves.height);
  };

  Waves.prototype.resize = function () {
    var Waves = this;
    var width = Waves.holder.offsetWidth;
    var height = Waves.holder.offsetHeight;
    Waves.scale = window.devicePixelRatio || 1;
    Waves.width = width * Waves.scale;
    Waves.height = height * Waves.scale;
    Waves.canvas.width = Waves.width;
    Waves.canvas.height = Waves.height;
    Waves.canvas.style.width = width + 'px';
    Waves.canvas.style.height = height + 'px';
    Waves.radius = Math.sqrt(Math.pow(Waves.width, 2) + Math.pow(Waves.height, 2)) / 2;
    Waves.centerX = Waves.width / 2;
    Waves.centerY = Waves.height / 2;
    //Waves.radius /= 2; // REMOVE FOR FULLSREEN
  };

  Waves.prototype.updateColor = function () {
    var Waves = this;

    Waves.hue += (Waves.hueFw) ? 0.01 : -0.01;

    if (Waves.hue > Waves.options.hue[1] && Waves.hueFw) {
      Waves.hue = Waves.options.hue[1];
      Waves.Waves = false;
    } else if (Waves.hue < Waves.options.hue[0] && !Waves.hueFw) {
      Waves.hue = Waves.options.hue[0];
      Waves.Waves = true;
    }

    var a = Math.floor(127 * Math.sin(0.3 * Waves.hue + 0) + 128);
    var b = Math.floor(127 * Math.sin(0.3 * Waves.hue + 2) + 128);
    var c = Math.floor(127 * Math.sin(0.3 * Waves.hue + 4) + 128);

    Waves.color = 'rgba(' + a + ',' + b + ',' + c + ', 0.1)';
  };

  function Wave(Waves) {
    var Wave = this;
    var speed = Waves.options.speed;

    Wave.Waves = Waves;
    Wave.Lines = [];

    Wave.angle = [
      rnd(pi2),
      rnd(pi2),
      rnd(pi2),
      rnd(pi2)
    ];

    Wave.speed = [
      rnd(speed[0], speed[1]) * rnd_sign(),
      rnd(speed[0], speed[1]) * rnd_sign(),
      rnd(speed[0], speed[1]) * rnd_sign(),
      rnd(speed[0], speed[1]) * rnd_sign(),
    ];

    return Wave;
  }

  Wave.prototype.update = function () {
    var Wave = this;
    var Lines = Wave.Lines;
    var color = Wave.Waves.color;

    Lines.push(new Line(Wave, color));

    if (Lines.length > Wave.Waves.options.width) {
      Lines.shift();
    }
  };

  Wave.prototype.draw = function () {
    var Wave = this;
    var Waves = Wave.Waves;

    var ctx = Waves.ctx;
    var radius = Waves.radius;
    var radius3 = radius / 3;
    var x = Waves.centerX;
    var y = Waves.centerY;
    var rotation = dtr(Waves.options.rotation);
    var amplitude = Waves.options.amplitude;
    var debug = Waves.options.debug;

    var Lines = Wave.Lines;

    each(Lines, function (line, i) {
      if (debug && i > 0) return;

      var angle = line.angle;

      var x1 = x - radius * Math.cos(angle[0] * amplitude + rotation);
      var y1 = y - radius * Math.sin(angle[0] * amplitude + rotation);
      var x2 = x + radius * Math.cos(angle[3] * amplitude + rotation);
      var y2 = y + radius * Math.sin(angle[3] * amplitude + rotation);
      var cpx1 = x - radius3 * Math.cos(angle[1] * amplitude * 2);
      var cpy1 = y - radius3 * Math.sin(angle[1] * amplitude * 2);
      var cpx2 = x + radius3 * Math.cos(angle[2] * amplitude * 2);
      var cpy2 = y + radius3 * Math.sin(angle[2] * amplitude * 2);

      ctx.strokeStyle = (debug) ? '#fff' : line.color;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
      ctx.stroke();

      if (debug) {
        ctx.strokeStyle = '#fff';
        ctx.globalAlpha = 0.3;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(cpx1, cpy1);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(cpx2, cpy2);
        ctx.stroke();

        ctx.globalAlpha = 1;
      }
    });
  };

  function Line(Wave, color) {
    var Line = this;

    var angle = Wave.angle;
    var speed = Wave.speed;

    Line.angle = [
      Math.sin(angle[0] += speed[0]),
      Math.sin(angle[1] += speed[1]),
      Math.sin(angle[2] += speed[2]),
      Math.sin(angle[3] += speed[3])
    ];

    Line.color = color;
  }

  function Stats() {
    this.data = [];
  }

  Stats.prototype.time = function () {
    return (performance || Date)
      .now();
  };

  Stats.prototype.log = function () {
    if (!this.last) {
      this.last = this.time();
      return 0;
    }

    this.new = this.time();
    this.delta = this.new - this.last;
    this.last = this.new;

    this.data.push(this.delta);
    if (this.data.length > 10)
      this.data.shift();
  };

  Stats.prototype.fps = function () {
    var fps = 0;
    each(this.data, function (data, i) {
      fps += data;
    });

    return Math.round(1000 / (fps / this.data.length));
  };

  function each(items, callback) {
    for (var i = 0; i < items.length; i++) {
      callback(items[i], i);
    }
  }

  function extend(options, defaults) {
    for (var key in options)
      if (defaults.hasOwnProperty(key))
        defaults[key] = options[key];
    return defaults;
  }

  function dtr(deg) {
    return deg * pi / 180;
  }

  function rtd(rad) {
    return rad * 180 / pi;
  }

  function diagonal_angle(w, h) {
    var a = Math.atan2(h, w) * 1.27325;
    return a;
  }

  function rnd(a, b) {
    if (arguments.length == 1)
      return Math.random() * a;
    return a + Math.random() * (b - a);
  }

  function rnd_sign() {
    return (Math.random() > 0.5) ? 1 : -1;
  }

})();

// var waves = new Waves('#holder', {
//   fps: true,
//   waves: 3,
//   width: 200,
// });

// waves.animate();


//


//hjh


// $(function () {
//   $("body").mousewheel(function (event, delta) {
//     this.scrollLeft -= delta * 30;

//     event.preventDefault();
//   });
// });

// //Horizontal Scroll
// //https://codepen.io/karlovidek/pen/LzgYYd?editors=1010
// //--------------------------------------------------------------------
// (function ($) {
//   var types = ["DOMMouseScroll", "mousewheel"];

//   if ($.event.fixHooks) {
//     for (var i = types.length; i;) {
//       $.event.fixHooks[types[--i]] = $.event.mouseHooks;
//     }
//   }

//   $.event.special.mousewheel = {
//     setup: function () {
//       if (this.addEventListener) {
//         for (var i = types.length; i;) {
//           this.addEventListener(types[--i], handler, false);
//         }
//       } else {
//         this.onmousewheel = handler;
//       }
//     },

//     teardown: function () {
//       if (this.removeEventListener) {
//         for (var i = types.length; i;) {
//           this.removeEventListener(types[--i], handler, false);
//         }
//       } else {
//         this.onmousewheel = null;
//       }
//     }
//   };

//   $.fn.extend({
//     mousewheel: function (fn) {
//       return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
//     },

//     unmousewheel: function (fn) {
//       return this.unbind("mousewheel", fn);
//     }
//   });

//   function handler(event) {
//     var orgEvent = event || window.event,
//       args = [].slice.call(arguments, 1),
//       delta = 0,
//       returnValue = true,
//       deltaX = 0,
//       deltaY = 0;
//     event = $.event.fix(orgEvent);
//     event.type = "mousewheel";

//     // Old school scrollwheel delta
//     if (orgEvent.wheelDelta) {
//       delta = orgEvent.wheelDelta / 120;
//     }
//     if (orgEvent.detail) {
//       delta = -orgEvent.detail / 3;
//     }

//     // New school multidimensional scroll (touchpads) deltas
//     deltaY = delta;

//     // Gecko
//     if (
//       orgEvent.axis !== undefined &&
//       orgEvent.axis === orgEvent.HORIZONTAL_AXIS
//     ) {
//       deltaY = 0;
//       deltaX = -1 * delta;
//     }

//     // Webkit
//     if (orgEvent.wheelDeltaY !== undefined) {
//       deltaY = orgEvent.wheelDeltaY / 120;
//     }
//     if (orgEvent.wheelDeltaX !== undefined) {
//       deltaX = (-1 * orgEvent.wheelDeltaX) / 120;
//     }

//     // Add event and delta to the front of the arguments
//     args.unshift(event, delta, deltaX, deltaY);

//     return ($.event.dispatch || $.event.handle).apply(this, args);
//   }
// })(jQuery);

// // EXTEND jQuery
// $.js = function (el) {
//   return $("[data-js=" + el + "]");
// };

// var mainWrapper = $.js("main-wrapper");
// var sectionWrapper = $.js("sections-wrapper");

// var vW = $(window).width();

// mainWrapper.mousewheel(function (event, delta) {
//   this.scrollLeft -= delta * 50;

//   event.preventDefault();
// });

// Draggable.create(mainWrapper, {
//   type: "scrollLeft",
//   throwProps: true,
//   cursor: "ew-resize"
// });

// function setWidth() {
//   var section = $.js("section");
//   var totalWidth = 0;

//   section.each(function () {
//     totalWidth += parseInt($(this).width(), 10);
//   });

//   sectionWrapper.css("width", "" + (totalWidth + 1) + "px");
// }

// setWidth();

// $(window).on("resize", function () {
//   setWidth();
// });

// //Smooth mouse Scrolling
// //https://codepen.io/ejingfx/pen/EVvPwz?editors=0010
// //--------------------------------------------------------------

// $(document).ready(function () {
//   // $fn.scrollSpeed(step, speed, easing);
//   jQuery.scrollSpeed(200, 800);
// });

// // Custom scrolling speed with jQuery
// // Source: github.com/ByNathan/jQuery.scrollSpeed
// // Version: 1.0.2

// (function ($) {
//   jQuery.scrollSpeed = function (step, speed, easing) {
//     var $document = $(document),
//       $window = $(window),
//       $body = $("html, body"),
//       option = easing || "default",
//       root = 0,
//       scroll = false,
//       scrollY,
//       scrollX,
//       view;

//     if (window.navigator.msPointerEnabled) return false;

//     $window
//       .on("mousewheel DOMMouseScroll", function (e) {
//         var deltaY = e.originalEvent.wheelDeltaY,
//           detail = e.originalEvent.detail;
//         scrollY = $document.height() > $window.height();
//         scrollX = $document.width() > $window.width();
//         scroll = true;

//         if (scrollY) {
//           view = $window.height();

//           if (deltaY < 0 || detail > 0)
//             root = root + view >= $document.height() ? root : (root += step);

//           if (deltaY > 0 || detail < 0) root = root <= 0 ? 0 : (root -= step);

//           $body.stop().animate({
//               scrollTop: root
//             },
//             speed,
//             option,
//             function () {
//               scroll = false;
//             }
//           );
//         }

//         if (scrollX) {
//           view = $window.width();

//           if (deltaY < 0 || detail > 0)
//             root = root + view >= $document.width() ? root : (root += step);

//           if (deltaY > 0 || detail < 0) root = root <= 0 ? 0 : (root -= step);

//           $body.stop().animate({
//               scrollLeft: root
//             },
//             speed,
//             option,
//             function () {
//               scroll = false;
//             }
//           );
//         }

//         return false;
//       })
//       .on("scroll", function () {
//         if (scrollY && !scroll) root = $window.scrollTop();
//         if (scrollX && !scroll) root = $window.scrollLeft();
//       })
//       .on("resize", function () {
//         if (scrollY && !scroll) view = $window.height();
//         if (scrollX && !scroll) view = $window.width();
//       });
//   };

//   jQuery.easing.default = function (x, t, b, c, d) {
//     return -c * ((t = t / d - 1) * t * t * t - 1) + b;
//   };
// })(jQuery);

// context = document.getElementById('drawing-canvas').getContext("2d");

// initialize canvas
// $("#drawing-canvas").attr("width", $("#drawing-canvas").width());
// $("#drawing-canvas").attr("height", $("#drawing-canvas").height());

// var xPoints = []; // in percentage of canvas width
// var yPoints = []; // in percentage of canvas height
// var draggedOrNot = [];
// var painting;
// var drawingEnabled = true;

// // initialize clear button
// $("#clear-button").click(function () {
//   xPoints = [];
//   yPoints = [];
//   draggedOrNot = [];
//   draw();
// });

// $("#drawing-canvas").mousedown(function (e) {
//   if (drawingEnabled) {
//     // get initial coordinates
//     var x = e.pageX - $(this).offset().left;
//     var y = e.pageY - $(this).offset().top;

//     // convert to percent
//     x = x / $(this).width();
//     y = y / $(this).height();

//     // add first point
//     addPoint(x, y, false);

//     // they started painting
//     painting = true;

//     // draw at the start
//     draw();
//   }
// });



// $('#desktop-interactive-space').mousemove(function (e) {

//   if (painting && drawingEnabled) {
//     // get current coordinates relative to the section
//     var x = e.pageX - $(this).offset().left;
//     var y = e.pageY - $(this).offset().top;

//     // find canvas coordinates relative to section
//     var xOffset = $("#drawing-canvas").offset().left - $(this).offset().left;
//     var yOffset = $("#drawing-canvas").offset().top - $(this).offset().top;

//     x = x - xOffset;
//     y = y - yOffset;

//     // convert to percent
//     x = x / $("#drawing-canvas").width();
//     y = y / $("#drawing-canvas").height();

//     // add point to array
//     addPoint(x, y, true);

//     // redraw
//     draw();
//   }

// });

// $('#desktop-interactive-space').mouseup(function () {
//   // they stopped
//   painting = false;
// });



// function draw() {

//   var width = $('#drawing-canvas').width();
//   var height = $('#drawing-canvas').height();

//   context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

//   context.strokeStyle = "#3ec7d7";
//   context.lineJoin = "round";
//   context.lineWidth = .015 * width;

//   for (var i = 0; i < xPoints.length; i++) {
//     context.beginPath();
//     if (draggedOrNot[i] && i) {
//       context.moveTo(xPoints[i - 1] * width, yPoints[i - 1] * height);
//     } else {
//       context.moveTo(xPoints[i] * width - 1, yPoints[i] * height);
//     }

//     context.lineTo(xPoints[i] * width, yPoints[i] * height);
//     context.closePath();
//     context.stroke();
//   }

//   // set button state
//   if (drawingEnabled) {
//     if (xPoints.length) {
//       $("#your-drawing").addClass("buttons-visible");
//     } else {
//       $("#your-drawing").removeClass("buttons-visible");
//     }
//   }
// }

// function addPoint(x, y, dragging) {
//   xPoints.push(x);
//   yPoints.push(y);
//   draggedOrNot.push(dragging);
// }


// $(window).resize(function () {
//   $("#drawing-canvas").attr("width", $("#drawing-canvas").width());
//   $("#drawing-canvas").attr("height", $("#drawing-canvas").height());

//   draw();
// });