var container;
var camera, controls, scene, renderer;
var w, h;

setTimeout(() => {
  document.querySelector(".loader").style.display = "none";
  document.querySelector(".landing-page").style.display = "block";
}, 7000);

init();
// render();
// skrollr.init();

function init() {
  container = document.getElementById("canvas");
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  w = container.offsetWidth;
  h = container.offsetHeight;

  /*conatainer Screen */

  renderer.setSize(w, h);

  /*Append to HTML */
  container.appendChild(renderer.domElement);
  var onRenderFcts = [];
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(25, w / h, 0.01, 1000);

  /*Camera Positioning*/

  camera.position.z = 15;
  camera.position.y = 2;

  /* Fog Provides depth to the landscape*/

  scene.fog = new THREE.Fog(0x000, 0, 45);
  (function () {
    var light = new THREE.AmbientLight(0x202020);
    scene.add(light);
    var light = new THREE.DirectionalLight("white", 5);
    light.position.set(0.5, 0.0, 2);
    scene.add(light);
    var light = new THREE.DirectionalLight("white", 0.75 * 2);
    light.position.set(-0.5, -0.5, -2);
    scene.add(light);
  })();

  var heightMap = THREEx.Terrain.allocateHeightMap(256, 256);
  THREEx.Terrain.simplexHeightMap(heightMap);

  var geometry = THREEx.Terrain.heightMapToPlaneGeometry(heightMap);
  THREEx.Terrain.heightMapToVertexColor(heightMap, geometry);

  /*Wireframe*/

  var material = new THREE.MeshBasicMaterial({
    wireframe: true,
  });

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  mesh.lookAt(new THREE.Vector3(0, 1, 0));

  mesh.scale.y = 3.5;
  mesh.scale.x = 3;
  mesh.scale.z = 0.2;
  mesh.scale.multiplyScalar(10);

  onRenderFcts.push(function (delta, now) {
    mesh.rotation.z += 0.03 * delta;
  });
  onRenderFcts.push(function () {
    renderer.render(scene, camera);
  });

  var lastTimeMsec = null;
  requestAnimationFrame(function animate(nowMsec) {
    requestAnimationFrame(animate);
    lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
    lastTimeMsec = nowMsec;
    onRenderFcts.forEach(function (onRenderFct) {
      onRenderFct(deltaMsec / 1000, nowMsec / 1000);
    });
  });
}

// var onRenderFcts = [];
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, 0.01,1000);

/*Camera Positioning*/

// camera.position.z=15;
// camera.position.y=2;

/* Fog Provides depth to the landscape*/

// scene.fog = new THREE.Fog(0x000, 0, 45);
// ;(function(){
//   var light = new THREE.AmbientLight(0x202020)
//   scene.add(light)
//   var light = new THREE.DirectionalLight('white',5);
//   light.position.set(0.5,0.0,2);
//   scene.add(light);
//   var light	= new THREE.DirectionalLight('white', 0.75*2);
// light.position.set(-0.5, -0.5, -2);
// scene.add( light );
// })()

// var heightMap = THREEx.Terrain.allocateHeightMap(256,256)
// THREEx.Terrain.simplexHeightMap(heightMap);

// var geometry = THREEx.Terrain.heightMapToPlaneGeometry(heightMap);
// THREEx.Terrain.heightMapToVertexColor(heightMap,geometry);

/*Wireframe*/

// var material = new THREE.MeshBasicMaterial({
//   wireframe:true
// });

// var mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// mesh.lookAt(new THREE.Vector3(0,1,0));

// mesh.scale.y	= 3.5;
// mesh.scale.x	= 3;
// mesh.scale.z	= 0.20;
// mesh.scale.multiplyScalar(10);

// onRenderFcts.push(function(delta, now){
//   mesh.rotation.z += 0.03 * delta;
// })
// onRenderFcts.push(function(){
//   renderer.render( scene, camera );
// })

// onRenderFcts.push(function(){
//     renderer.render( scene, camera );
// })
// var lastTimeMsec= null
// requestAnimationFrame(function animate(nowMsec){
//   requestAnimationFrame( animate );
//   lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
//   var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
//   lastTimeMsec	= nowMsec
//   onRenderFcts.forEach(function(onRenderFct){
//       onRenderFct(deltaMsec/1000, nowMsec/1000)
//   })
// })
