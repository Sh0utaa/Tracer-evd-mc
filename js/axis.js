//////////////////////////////////////////////////////////////////////////////////
///   Nuclear Engineering Center at Georgian Technical University
///   TRACER Framework
///////////////////////////////////////////////////////   Creation History
///   Name:     axis.js
///   Subsystems: CORE
///   Path: \tracer-tmp\subsystem\core\r4.0\js\axis.js
///   Description: Axi-is shekmneli klasi romelic aketebs Axis

/// Functions:
// BuildAxis()
// createLinex()
// createLiney()
// createLinez()
// createTextForCoord()
//drawCoord
//restrictDamp()
//resizeAxis()
//stopDampEffect()
//launcAxisScene()

///   Author: <ირაკლი კვერენჩხილაძე>
///   Date: <მაისი 2021>
///////////////////////////////////////////////////////   Change History
///   Name: <პროგრამისტის სახელი>
///   Date:  <მოდიფიკაციის თარიღი>
///   Description: <მოდიფიკაციის აღწერა>
//////////////////////////////////////////////////////////////////////////////////

class createAxis {
   // adgens Axis gerdzs migebuli argumenetebis meshveobit.
   // src aris vektori
   // dst aris vektori
   // colorHex aris Feri axisis gerdzis
   buildAxis(src, dst, colorHex, dashed) {
      let geo = new THREE.BufferGeometry();
      let mat;

      if (dashed) {
         mat = new THREE.LineDashedMaterial({
            linewidth: 3,
            color: colorHex,
            dashSize: 3,
            gapSize: 3,
         });
      } else {
         mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
      }

      let vec1 = src.clone(); // aketebs klonirebs src vektoris
      let vec2 = dst.clone(); // aketebs klonirebas dst vektoris

      // vertice aris masivi rac moicavs vec1 vec2-is wertilebis x.y.z -ebs
      let vertices = new Float32Array([vec1.x, vec1.y, vec1.z, vec2.x, vec2.y, vec2.z]);

      // geometriebs adzlevs am wertilebs
      geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

      // igeba meshi mowodebuli materiali da geometriis meshveobit
      let axis = new THREE.Line(geo, mat, THREE.LineSegments);
      axis.computeLineDistances();
      return axis;
   }

   // kmnis axisis X gerdzs arguments vanichebt ricxvs. es ricxvi gansazgvravs 0-dan sadamde ikneba dashorebuli y gerdzi
   createLinex(num) {
      return this.buildAxis(
         new THREE.Vector3(num, 0, 0),
         new THREE.Vector3(num, 0.1, 0),
         0x892727,
         false
      ); // +Y
   }

   // kmnis axisis Y gerdzrs arguments vanichebt ricxvs. es ricxvi gansazgvravs 0-dan sadamde ikneba dashorebuli y gerdzi
   createLiney(num) {
      return this.buildAxis(
         new THREE.Vector3(0, num, 0),
         new THREE.Vector3(0.1, num, 0),
         0x278927,
         false
      ); // +Y
   }

   // kmnis axisis Y gerdzrs arguments vanichebt ricxvs. es ricxvi gansazgvravs 0-dan sadamde ikneba dashorebuli z gerdzi
   createLinez(num) {
      return this.buildAxis(
         new THREE.Vector3(0, 0, num),
         new THREE.Vector3(0, 0.1, num),
         0x272789,
         false
      ); // +Y
   }

   // kmnis Asoebs axissi gerdzebistvis (x,y,z)
   // text1 unda mivanichot argumenti stringi rasac shekmnis da daawers gerdzs
   // color1 shi vutitebt fers stringis
   // fontGrid vanichebt chatvirtul fonts
   createTextForCoord(text1, color1, fontGrid) {
      let height = 0.1; // textis simagle
      let size = 1; // textis zoma
      let material = new THREE.MeshBasicMaterial({ color: color1 }); // textis materiali

      let textGeo = new THREE.TextGeometry(text1, {
         font: fontGrid,
         size: size,
         height: height,
         bevelSize: 10,
      });
      let textMesh = new THREE.Mesh(textGeo, material);

      this.createLinex(1);
      this.createLiney(1);
      this.createLinez(1);

      return textMesh;
   }
   // xatavs koordinants
   drawCoord() {
      let loader = new THREE.FontLoader();
      let scope = this;
      loader.load("/resources/fonts/optimer_regular.typeface.json", function (font) {
         let Ytheta = new THREE.Object3D(); // vkmnit 3D objects
         let fontGrid = font; // fontis stili

         let x1 = scope.createTextForCoord("x", 0xff0000, fontGrid);
         let y1 = scope.createTextForCoord("y", 0x00ff12, fontGrid);
         let z1 = scope.createTextForCoord("z", 0x001eff, fontGrid);

         x1.position.x = 4;
         x1.position.y = 0.4;

         y1.position.x = 0.4;
         y1.position.y = 4;

         z1.position.y = 0.4;
         z1.position.z = 4;
         z1.rotation.y = 90 * (Math.PI / 180);

         Ytheta.add(x1);
         Ytheta.add(y1);
         Ytheta.add(z1);

         scope.scene.add(Ytheta);
      });

      let worldAxis = new THREE.AxesHelper(4);
      let colors = worldAxis.geometry.attributes.color;
      worldAxis.name = "axes";

      colors.setXYZ(0, 1, 0, 0); // index, R, G, B
      colors.setXYZ(1, 1, 0, 0); // red
      colors.setXYZ(2, 0, 1, 0);
      colors.setXYZ(3, 0, 1, 0); // green
      colors.setXYZ(4, 0, 0, 1);
      colors.setXYZ(5, 0, 0, 1); // blue

      this.scene.add(worldAxis);
   }
   constructor(scen) {
      this.scene = scen;
      this.drawCoord();
   }
}

let Axis = new Object(); // ikmenba objecti
Axis.container = document.getElementById("axisScene"); // kontaineri sadac axisis scena unda chavardes

// Axisis scenis kamera
Axis.camera = new THREE.PerspectiveCamera(
   75,
   Axis.container.offsetWidth / Axis.container.offsetHeight,
   0.1,
   1000
);
Axis.camera.position.set(5, 5, 5);
Axis.camera.lookAt(0, 0, 0);
Axis.camera.name = "perspective";

// axissis scena
Axis.scene = new THREE.Scene();

// Axisis renderer
Axis.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
Axis.renderer.setSize(Axis.container.offsetWidth, Axis.container.offsetHeight);
Axis.renderer.setPixelRatio(window.devicePixelRatio);

// containershi chagdeba scenis
Axis.container.appendChild(Axis.renderer.domElement);

// axisis orbit kontroli
Axis.control = new THREE.OrbitControls(Axis.camera, core.renderer.domElement);
Axis.control.enableDamping = true; // inerciis chartva
Axis.control.enablePan = false; // panis gamortva
Axis.control.enableZoom = false; // zumis gamortva
Axis.control.dampingFactor = 0.025; // inerciis gazrda/shecmireba
Axis.control.name = "orbit";

// igebs axis romelic mzaddeba createAxis klasshi
let compass = new createAxis(Axis.scene);

// mausis klikis dacheris shemdeg acherebs kontrolis inercias anu dampings
let restrictDamp = function () {
   // tu droni romelime funkcia aktiuria an kontrrolis tipi ar aris orbit mashin ar aktiurdeba es funckia
   if (drone.droneIsActive) return;
   if (core.control.name != "orbit") return;

   Axis.control.enabled = false; // gamortva kontrolis
   Axis.control.enableDamping = false; // gamortva inerciis
   Axis.control.update(); // daapdeiteba kontrolis
   Axis.control.enableDamping = true; // chartva inerciis
   Axis.control.enabled = true; // chartva kontrolis
};

// es funkcia kmnis mausis-dacheris momsmen funkcias romelic usmens maus da yovel dacheraze aaktiurebs chveni dampingis shemcherebel funkcias
let stopDampEffect = function () {
   // damp xdeba globaluri cvladi restrictDamp funkciis
   let damp = core.bind(this, restrictDamp);
   window.addEventListener("pointerdown", damp);
};

// tu fanjri gadidda an dapataravda aaupdatebs axisis scenis zomebs
let resizeAxis = function () {
   // fanjrus zomis shecvlis shemdeg apdeitdeba zoma axisis konteineris
   Axis.camera.aspect =
      document.getElementById("axisScene").offsetWidth /
      document.getElementById("axisScene").offsetHeight;
};

stopDampEffect();
window.addEventListener("resize", resizeAxis);

// iwyeba axisis scenis renderingi anu eshveba scena
function launchAxisScene() {
   // iwyebs sakutari tavis gamodzaxebas FPS -is mixedvit, magalitad tu FPS gvak 30 es es funkcia launchAxisScene-s gamoidzaxebs wamshi 30 jer
   window.requestAnimationFrame(launchAxisScene);
   // axdens renderirebas scenis da kameris
   Axis.renderer.render(Axis.scene, Axis.camera);

   // tu axisis kontroli aris chartuli mashin aapdeitebs axisis kontrols da asworebs gerdzs axisis
   if (Axis.control.enabled) {
      Axis.control.update(1);
      drone.correctAxis();
   }
}

// gashveba animaciis
launchAxisScene();
