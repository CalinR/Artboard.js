var artboardjs = artboardjs || {};

artboardjs.fps = 50;
artboardjs.lastFrameTick = (new Date).getTime();
artboardjs.lastUpdate = (new Date).getTime();
artboardjs.lastFixedUpdate = (new Date).getTime();
artboardjs.updateFrames = 0;
artboardjs.fixedUpdateFrames = 0;


/*==============================================================================
#CALCULATE FRAMES PER SECOND
==============================================================================*/
artboardjs.calculateUpdateFPS = function(){
  artboardjs.updateFrames++;
  var d = new Date().getTime(),
  currentTime = ( d - artboardjs.lastUpdate ) / 1000,
  result = Math.floor((artboardjs.updateFrames / currentTime));
  if(currentTime > 1 ){
      artboardjs.lastUpdate = new Date().getTime();
      artboardjs.updateFrames = 0;
      if(document.getElementById('artboardjs-update-fps')!=null){
        document.getElementById('artboardjs-update-fps').innerHTML ='Update FPS '+updateFPS;
      }
    }
    return result;
}

artboardjs.calculateFixedFPS = function(){
  artboardjs.fixedUpdateFrames++;
  var d = new Date().getTime(),
  currentTime = ( d - artboardjs.lastFixedUpdate ) / 1000,
  result = Math.floor((artboardjs.fixedUpdateFrames / currentTime));
  if(currentTime > 1 ){
    artboardjs.lastFixedUpdate = new Date().getTime();
    artboardjs.fixedUpdateFrames = 0;
    if(document.getElementById('artboardjs-fixed-fps')!=null){
      document.getElementById('artboardjs-fixed-fps').innerHTML ='Fixed FPS '+fixedFPS;
    }
  }
  return result;
}

/*==============================================================================
#SCENE
==============================================================================*/
artboardjs.Scene = function(element, debug){
  if(debug==true){
    document.getElementById(element).parentNode.innerHTML += '<div id="artboardjs-update-fps">Update FPS:</div><div id="artboardjs-fixed-fps">Fixed FPS:</div>';
  }
  this.canvas = document.getElementById(element);
  this.context = this.canvas.getContext('2d');
  this.height = this.canvas.clientHeight;
  this.width = this.canvas.clientWidth;
  var _this = this;
  this.canvasLoop = setInterval(function(){_this.UpdateLoop()}, 0);
  this.objects = [];
}


/*==============================================================================
#SCENE UPDATE
==============================================================================*/
artboardjs.Scene.prototype.UpdateLoop = (function(){
  artboardjs.frameNumber++;
  var skipTicks = 1000/artboardjs.fps;
  var nextFrameTick = (new Date).getTime();

  return function() {
    updateFPS = artboardjs.calculateUpdateFPS();

    while ((new Date).getTime() > nextFrameTick) {
      fixedFPS = artboardjs.calculateFixedFPS();

      nextFrameTick += skipTicks;
      if(typeof(this.FixedUpdate)=="function"){
        this.FixedUpdate();
      }
    }
    if(typeof(this.Update)=="function"){
      this.Update();
    }
    this.Draw();
  }

})();


/*==============================================================================
#SCENE DRAW
==============================================================================*/
artboardjs.Scene.prototype.Draw = function(){
  this.context.clearRect(0, 0, this.width, this.height);
  var objects = this.objects;
  var context = this.context;
  for(var i=0; i<this.objects.length; i++){
    var object = objects[i];
    context.beginPath();
    context.arc(object.transform.position.x,object.transform.position.y,object.transform.width/2,0,2*Math.PI);
    context.fillStyle = 'green';
    context.fill();
  }
}


/*==============================================================================
#SCENE Add
* Adds object to scene
==============================================================================*/
artboardjs.Scene.prototype.Add = function(object){
  this.objects.push(object);
  return this;
}


artboardjs.Transform = {
  position: {
    x: 0,
    y: 0
  },
  rotation: 0,
  width: 0,
  height: 0
}


/*==============================================================================
#SCENEOBJECT
==============================================================================*/
artboardjs.SceneObject = function(){
  this.type = '';
  this.transform = artboardjs.Transform;
  return this;
}

// artboardjs.SceneObject.prototype.transform = function(){
//   this.position = {
//     x: 0,
//     y: 0
//   }
//   this.rotation = 0;
//   this.width = 0;
//   this.height = 0;
//   return this;
// }


/*==============================================================================
#CREATE PRIMITIVE
==============================================================================*/
artboardjs.SceneObject.prototype.CreatePrimitive = function(type){
  this.type = type;
  return this;
}
