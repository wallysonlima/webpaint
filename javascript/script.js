/* Desenvolvido por Wallyson Nunes
  Este código utiliza uma parte do 
  © 2009 ROBO Design
 http://www.robodesign.ro
*/

// Keep everything in anonymous function, called on window load.
if(window.addEventListener) {
window.addEventListener('load', function () {
  var canvas, context, canvaso, contexto;

  // The active tool instance.
  var tool;
  var tool_default = 'caneta';

  function init () {
    // Find the canvas element.
    canvaso = document.getElementById('imageView');
    if (!canvaso) {
      alert('Error: I cannot find the canvas element!');
      return;
    }

    if (!canvaso.getContext) {
      alert('Error: no canvas.getContext!');
      return;
    }

    // Get the 2D canvas context.
    contexto = canvaso.getContext('2d');
    if (!contexto) {
      alert('Error: failed to getContext!');
      return;
    }

    // Add the temporary canvas.
    var container = canvaso.parentNode;
    canvas = document.createElement('canvas');
    if (!canvas) {
      alert('Error: I cannot create a new canvas element!');
      return;
    }

    canvas.id     = 'imageTemp';
    canvas.width  = canvaso.width;
    canvas.height = canvaso.height;
    container.appendChild(canvas);

    context = canvas.getContext('2d');
    var tool_select = document.getElementById('btCaneta');
    // Get the tool select input.
    //var tool_select = document.getElementById('dtool');
    if (!tool_select) {
      alert('Error: failed to get the dtool element!');
      return;
    }
    //tool_select.addEventListener('click', ev_tool_change, false);
    document.getElementById("btCaneta").addEventListener("click", ev_tool_change, false);
    document.getElementById("btLinha").addEventListener("click", ev_tool_change, false);
    document.getElementById("btRetangulo").addEventListener("click", ev_tool_change, false);
    document.getElementById("btElipse").addEventListener("click", ev_tool_change, false);
    document.getElementById("btTriangulo").addEventListener("click", ev_tool_change, false);
    document.getElementById("btCoracao").addEventListener("click", ev_tool_change, false);
    document.getElementById("btTexto").addEventListener("click", ev_tool_change, false);
    document.getElementById("btMao").addEventListener("click", ev_tool_change, false);
    document.getElementById("btBorracha").addEventListener("click", ev_tool_change, false);
    document.getElementById("btLimpar").addEventListener("click", ev_tool_change, false);

    // Activate the default tool.
    if (tools[tool_default]) {
      tool = new tools[tool_default]();
      tool_select.value = tool_default;
    }

    // Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);
  }

  // The general-purpose event handler. This function just determines the mouse 
  // position relative to the canvas element.
  function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    // Call the event handler of the tool.
    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }

  // The event handler for any changes made to the tool selector.
  function ev_tool_change (ev) {
    
    if (tools[this.value]) {
      //alert(this.value);
      tool = new tools[this.value]();
    }
  }

  // This function draws the #imageTemp canvas on top of #imageView, after which 
  // #imageTemp is cleared. This function is called each time when the user 
  // completes a drawing operation.
  function img_update () {
		contexto.drawImage(canvas, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // This object holds the implementation of each drawing tool.
  var tools = {};

  // The drawing pencil.
  tools.caneta = function () {
    var tool = this;
    this.started = false;

    // This is called when you start holding down the mouse button.
    // This starts the pencil drawing.
    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };

    // This function is called every time you move the mouse. Obviously, it only 
    // draws if the tool.started state is set to true (when you are holding down 
    // the mouse button).
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
        context.stroke();
      }
    };

    // This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };

  // The rectangle tool.
  tools.retangulo = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      var x = Math.min(ev._x,  tool.x0),
          y = Math.min(ev._y,  tool.y0),
          w = Math.abs(ev._x - tool.x0),
          h = Math.abs(ev._y - tool.y0);

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (!w || !h) {
        return;
      }

      context.strokeRect(x, y, w, h);
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };

  // The line tool.
  tools.linha = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      //var linha = new Linha(context, ev._x, ev._y, black, black);
      //linha.Desenhar();
      context.beginPath();
      context.moveTo(tool.x0, tool.y0);
      context.lineTo(ev._x,   ev._y);
      context.stroke();
      context.closePath();
      
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };

  tools.borracha = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      var centerX = ev._x;
      var centerY = ev._y;
      var height  = 20;
      var width   = 20;
      
      context.beginPath();
      context.moveTo(centerX, centerY - height/2); // A1
      context.bezierCurveTo(
      centerX + width/2, centerY - height/2, // C1
      centerX + width/2, centerY + height/2, // C2
      centerX, centerY + height/2); // A2

      context.bezierCurveTo(
      centerX - width/2, centerY + height/2, // C3
      centerX - width/2, centerY - height/2, // C4
      centerX, centerY - height/2); // A1
       //context.clearRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "white";
      context.fill();
      context.closePath();  

      if (!w || !h) {
        return;
      }

      //context.beginPath();
      //context.arc(x, y, w, h,2*Math.PI);
      //context.stroke();

      //context.strokeRect(x, y, w, h);
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };

  tools.limpar = function () {
    context.fillStyle = "white";
    context.fillRect(0, 0, 1000, 400);
    img_update();
  };

  tools.elipse = function () {
    var x = Math.floor((Math.random() * 970) + 30);
    var y = Math.floor((Math.random() * 370));
    var r = Math.floor((Math.random() * 255));
    var g = Math.floor((Math.random() * 255));
    var b = Math.floor((Math.random() * 255));
    context.beginPath();
    context.arc( x, y, 50, 0, 2*Math.PI);
    context.fillStyle = 'rgb('+ r + ',' + g + ',' + b + ')';
    context.fill();
    context.stroke();
    context.closePath();
  };

  tools.triangulo = function () {
    var x = Math.floor((Math.random() * 10000)%1000);
    var y = Math.floor((Math.random() * 1000)%100);
    var r = Math.floor((Math.random() * 255));
    var g = Math.floor((Math.random() * 255));
    var b = Math.floor((Math.random() * 255));
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + 150);
    context.lineTo(x + 150, y + 150 );
    context.fillStyle = 'rgb('+ r + ',' + g + ',' + b + ')';
    context.fill();
    context.closePath();
  };

  tools.coracao  = function () {
    context.beginPath();
    context.moveTo(75,40);
    context.bezierCurveTo(75,37,70,25,50,25);
    context.bezierCurveTo(20,25,20,62.5,20,62.5);
    context.bezierCurveTo(20,80,40,102,75,120);
    context.bezierCurveTo(110,102,130,80,130,62.5);
    context.bezierCurveTo(130,62.5,130,25,100,25);
    context.bezierCurveTo(85,25,75,37,75,40);
    context.fillStyle = "#ff0000";
    context.fill();
    img_update();
  };

  tools.texto = function () {
    var texto = prompt("Digite o texto que você quer escrever !");    
    var r = Math.floor((Math.random() * 255));
    var g = Math.floor((Math.random() * 255));
    var b = Math.floor((Math.random() * 255));
    context.font = "60px Verdana";
    context.fillStyle = 'rgb('+ r + ',' + g + ',' + b + ')';
    context.fillText(texto, 350, 200);
  };

  tools.mao = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      var centerX = ev._x;
      var centerY = ev._y;
      var height  = 20;
      var width   = 20;
      
      context.beginPath();
      context.moveTo(centerX, centerY - height/2); // A1
      context.bezierCurveTo(
      centerX + width/2, centerY - height/2, // C1
      centerX + width/2, centerY + height/2, // C2
      centerX, centerY + height/2); // A2

      context.bezierCurveTo(
      centerX - width/2, centerY + height/2, // C3
      centerX - width/2, centerY - height/2, // C4
      centerX, centerY - height/2); // A1
       //context.clearRect(0, 0, canvas.width, canvas.height);
      var r = Math.floor((Math.random() * 255));
      var g = Math.floor((Math.random() * 255));
      var b = Math.floor((Math.random() * 255));
      context.fillStyle = 'rgb('+ r + ',' + g + ',' + b + ')';
      context.fill();
      context.closePath();  


      if (!w || !h) {
        return;
      }
      
      //context.beginPath();
      //context.arc(x, y, w, h,2*Math.PI);
      //context.stroke();

      //context.strokeRect(x, y, w, h);
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };

  init();

}, false); }

