document.addEventListener('DOMContentLoaded', function(){
  scene = new artboardjs.Scene('canvas-stage', true);
  circle = new artboardjs.SceneObject().CreatePrimitive('Circle');
  // circle.transform.position(50,50);
  circle.transform.position.x = 50;
  circle.transform.position.y = 50;
  circle.transform.width = 20;
  circle.transform.height = 20;
  scene.Add(circle);

  scene.Update = function(){
    circle.transform.position.x+=0.1;
    circle.transform.width+=0.01;
  }

  console.log(circle);
});
