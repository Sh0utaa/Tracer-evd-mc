//////////////////////////////////////////////////////////////////////////////////
///   Nuclear Engineering Center at Georgian Technical University
///   TRACER Framework
///////////////////////////////////////////////////////   Creation History
///   Name:    main.js
///   Subsystems: CORE
///   Path: \tracer-tmp\subsystem\core\r4.0\js\main.js
///   Description: es aris mtavari file sadac xdeba gamodzaxeba im agwerili klasebis an funkciebis rac sxva filebshia motavsebuli
// es aris ase vtkvat tvini sadac xdeba yvelafris gamodzaxeba
/// Functions:  s

///   Author: <ირაკლი კვერენჩხილაძე>
///   Date: <მაისი 2021>
///////////////////////////////////////////////////////   Change History
///   Name: <პროგრამისტის სახელი>
///   Date:  <მოდიფიკაციის თარიღი>
///   Description: <მოდიფიკაციის აღწერა>

// ikmenba TRACER tipis klasi sadac argumentad vanichebt div-is ID-s sadac unda gaishvas scena
let core = new TRACER("mainScene");
core.createScene(); // kmnis scenas
core.createControl("orbit"); // kmnis kontrols

let grid = core.gridHelper(50, 50); // kmnis grids
let ambLight = core.createAmbientLight(0xffffff, 0.6); // kmnis ganatebas
let dirLight = core.createDirectionalLight(0xffffff, 0.45); // kmnis ganatebas

let eventMaxNumber = 50;

core.scene.add(ambLight); // amatebs scenashi ganatebas
core.scene.add(dirLight); // amatebs scenashi ganatebas

core.geometriesPath = "../resources/geo/glb/desktop/"; // Path geometriebis
core.cut(3); // romeli tipis chra iyos aktiuri

$("#trackPTFilter").val("1");
core.globalTransparency = 10;
core.globalWireframe = false;

core.camera.position.set(
  5.31315820211552,
  3.8469888110718418,
  3.8795653115756035
);
core.switchCamera("perspective"); // cvlils kameras

core.stopDampingEffect(); // mausze klikis shemdeg acherebs orbit controlis inercias
core.launch(); // ushvebs aplikacias

let particleAnimation = new particleSystem(
  core.renderer,
  core.scene,
  core.camera
); // particlebis animaciistvis gankutvnili klasi, miewodeba argumentad rendereri scena camera
let snap = new snapSaver(); // kmnis SNAP klass sadac shemdeg moxdeba file-s wakitxva an scenis damaxsovreba
let drone = new droneModes(core.scene, core.camera); // kmnis DRONIS klass saidanac eshveba dronis funkciebi, argumentad vanichebt scenas da kameras sadac gaaktiurdeba es droni

followCamera(); // sheicvalos ganatebebma pozicia kameris poziciis shesabamisad

// let evdGeos = [
//   "SCT-BAR",
//   "SCT-SideA",
//   "SCT-SideC",
//   "TRT-BAR",
//   "Lar-Barrel",
//   "Lar-FCAL-SideA",
//   "Lar-FCAL-SideC",
//   "Beam",
// ]; // evd-is sawyisi chatvirtuli geometriebi

//evd-mc-info
// let current_date_time = new Date();


