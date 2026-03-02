// Credits : Irakli Kverenchkhiladze.

//////////////////////////////////////////////////////////////////////////////////
///   Nuclear Engineering Center at Georgian Technical University
///   TRACER Framework
///////////////////////////////////////////////////////   Creation History
///   Name:     tracer.js
///   Subsystems: CORE
///   Path: tracer-tmp\resources\tracerLib\tracer.js
///   Description: es aris biblioteka romelic gvexmareba gavamartivot threejs is scenis shekmna
// 	  selekcia geometriebis an loading,  geometriebis shekmna da ase shemdeg
/// Functions:
// bind ()
// mapToArray ()
// checkEquality ()
// getVerticesFromGeometry ()
// worldPositionOfVertex ()
// createScene ()
// createControl ()
// createAmbientLight ()
// createDirectionalLight ()
// createPointLight ()
// createBoxGeometry ()
// createSphereGeometry ()
// createLine ()
// switchCamera ()
// switchControl ()
// cut ()
// loadGeometry ()
// loadAllGeometry ()
// getLoadedGeometries ()
// getActiveGeometries ()
// getActiveGeometry ()
// getGeometry ()
// deleteAllGeometries ()
// deleteGeometries ()
// deleteGeometry ()
// preLoad ()
// snapLoader ()
// getFirstIntersectedGeometry ()
// getIntersectedGeometries ()
// ray ()
// mouseDown ()
// mouseUp ()
// activateRayCaster ()
// disposeRayCaster ()
// selection ()
// localTransparency ()
// worldTransparency ()
// localWireframe ()
// worldWireframe ()
// axesHekoer ()
// gridHelper ()
// resize ()
// restrictDamping ()
// stopDamping ()
// disposeOrbitEventListener ()
// update ()
// animate ()
// launch ()
///   Author: <ირაკლი კვერენჩხილაძე>
///   Date: <მაისი 2021>
///////////////////////////////////////////////////////   Change History
///   Name: <პროგრამისტის სახელი>
///   Date:  <მოდიფიკაციის თარიღი>
///   Description: <მოდიფიკაციის აღწერა>

const TRACER = function (container_id) {
  let scope = this;

  this.renderer; // scenis renderer, is rac scenas arenderirebs
  this.scene; // scena
  this.camera; // scenis kamera
  this.control; // scenis controli

  this.raycaster = new THREE.Raycaster(); // raycaster, selekeciistvis gankutvnili cvladi.
  this.cameraPosition = new THREE.Vector3(); // imaxsovrebs kameris pozicias
  this.mouse = new THREE.Vector2(); // 2D vectori rom shevinaxot mausis pozicia.
  this.intersects = undefined; // cvladi romelic gvibrunebs geometrias razec selekcia moxda. tu ar moxdeba selekcia geometriaze mashin -1-is toli ikneba.
  this.testRay = false; // tu trues gavxdit am cvlads sashvalebas mogvcems gavigot mushaobs tu ara selekcia THREEJS-is geometriebze
  this.geometrySelected = false; // gavigot aris tu ara monishnuli geometria.
  this.getAnnotation = false; // core-stvis gankutvnili anotaciis fanjara

  this.geometriesPath = undefined; // geometriebis PATH, anu sad aris geometriebis failebi.
  this.loading = false; // rom gavigot geometriebis chatvirtva xdeba tu ara
  this.snapLoad = false; // rom gavigot snap loading xdeba tu ara
  this.geometriesLoaded = false; // rom gavigot yvela geometria chaitvirta tu ara PRELOAD funqciis sashualebit

  this._onResize; // gadideba dapatareva fanjris <- am tipis eventis msmeneli funkcia.
  this._onMouseUp; // mausis - upis msmeneli funkcia
  this._onMousedown; // mausze dacheris msmeneli funkcia

  this.globalTransparency = 100; // globaluri gamchirvaloba
  this.globalWireframe = false; // globaluri wireframe

  // geometriebis chrebistvis gankutvnili vektorebi
  this.clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
  ];

  let container; // containeri tu rashicaa scena
  let id = container_id; // container-is id

  let globalCut = undefined; // globaluri chra
  let globalCutWas = undefined; // globaluri chra romelic iyo geometriis selekciamde.

  let activeGeometries = new Map(); // scenashi myofi geometriebis masivi
  let loadedGeometries = new Map(); // inaxavs yvela im geometrias romelmac momxmarebelma chatvirtva, mnishvneloba ar akvs aris scenashi tu ara es geometria
  let loader = new THREE.GLTFLoader(); // glb/gltf loaderi.

  let disableRay = false; // gavaaktiurot/gavacherot raycaster romelic sachiroa selekciistvis
  let doSelection = true; // chavrott an gamovrtot selekcia
  let intersectionWas = ""; // amit varkvevt xdeba tu ara erti da igive geometriaze selekcia, tu xdeba mashin selekcia itisheba

  let geometries_cuttype = ""; // tvirtavs am tipis chris geometriebs
  let geometries_cuttypeWas = ""; // amowmebs ra iyo selekciamde chris tipi
  let allgeometry = [
    "Barrel-Toroid",
    "End-Cap-Toroid-SideA",
    //	"Tower-Turret-SideA",
    "End-Cap-Toroid-SideC",
    //	"Tower-Turret-SideC",
    "Pixel",
    "SCT-BAR",
    "SCT-SideA",
    "SCT-SideC",
    "TRT-BAR",
    "TRT-SideA",
    "TRT-SideC",
    "Lar-Barrel",
    "Lar-EMEC-SideA",
    "Lar-HEC-SideA",
    "Lar-FCAL-SideA",
    "Lar-EMEC-SideC",
    "Lar-HEC-SideC",
    "Lar-FCAL-SideC",
    "Tile-Barrel",
    "Tile-End-Cap-SideA",
    "Tile-End-Cap-SideC",
    "Muon-Barrel-Inner",
    "Muon-Barrel-Middle",
    "Muon-Barrel-Outer",
    "Small-Wheel-Chambers-SideA",
    //	"Small-Wheel-NJD-SideA",
    //	"Small-Wheel-Hub-SideA",
    //	"TGC-SideA",
    //	"Muon-Big-Wheel-MDT-SideA",
    //	"TGC2-SideA",
    "TGC3-SideA",
    "Extra-Wheel-SideA",
    "Outer-Wheel-SideA",
    "Small-Wheel-Chambers-SideC",
    //	"Small-Wheel-NJD-SideC",
    //	"Small-Wheel-Hub-SideC",
    //	"TGC-SideC",
    //	"Muon-Big-Wheel-MDT-SideC",
    //	"TGC2-SideC",
    "TGC3-SideC",
    "Extra-Wheel-SideC",
    "Outer-Wheel-SideC",
    //	"Forward-Shielding-SideA",
    //	"Forward-Shielding-SideC",
    "Beam",
    //	"Feet",
    //	"Warm-Structure",
    //	"UX15",
    //	"US15",
    //	"USA15",
    //	"PX14",
    //	"PX15",
    //	"PX16",
    //	"PM15",
  ];
  this.allGeomNames = [...allgeometry];

  //es funkcia aris gankutvnili Event-listenerebistvis, aris shemtxvevebi rodesac eventListener ar ismineba im mizezis gamo rom globalurad ar xdeba agkma raime funkciis, es funkcia ki globalurs xdis funkcias EVENT LISTENERISTVIS
  this.bind = function (scope, fn) {
    //scope tavis tavs moisazrebs
    // fn - funkcia s
    return function () {
      fn.apply(scope, arguments);
    };
  };

  // igebs map tipis masividan geometriebs an geometriebis saxelebs da yris klasikur masivshi.
  this.mapToArray = function (mp, name = false) {
    // mp - map tipis masivi
    // name - tu name gansazgvruli ar aris es nishanvs imas rom pirdapir geometriebs amoigebs map masividan da gadayris meore klasikur masivshi, tu aris gansazgvruli mashin geometriebis saxelebs amoigebs.

    let array = []; //maisivi

    if (name) {
      // uvlis argumentad minichebul map tipis masivs
      mp.forEach((value, key) => {
        let mesh = mp.get(key); // igebs am masividan meshs

        if (mesh.name.indexOf("cut") > -1) {
          let name = mesh.name.slice(0, -5); // geometriis saxeli
          array.push(name);
        } else {
          array.push(mesh.name);
        }
      });
    } else {
      mp.forEach((value, key) => {
        let mesh = mp.get(key); // igebs meshs masividan
        array.push(mesh); // chagdeba meshis
      });
    }
    return array;
  };

  // amowmebs kameris pozicia emtxveva tu ara im pozicias rasac argumentad mivanichebt funkcias
  this.checkEquality = function (arg) {
    // argumentad shemodis pozicia anu 3D vectori
    if (
      parseFloat(this.camera.position.x.toFixed(5)) ==
        parseFloat(arg.x.toFixed(5)) &&
      parseFloat(this.camera.position.y.toFixed(5)) ==
        parseFloat(arg.y.toFixed(5)) &&
      parseFloat(this.camera.position.z.toFixed(5)) ==
        parseFloat(arg.z.toFixed(5))
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Abrunebs geometriebis shemkmnel wertilebs
  this.getVerticesFromGeometry = function (geometry) {
    let array = []; // masivi
    let vertices = geometry.attributes.position.array; // geometriis shemkmneli wertilebi.

    for (var i = 0; i < vertices.length; i += 3) {
      // vektorshi yris am geometriis wertilebs da abrunebs masivs 3D vectorebis saxit
      let vector = new THREE.Vector3(
        vertices[i],
        vertices[i + 1],
        vertices[i + 2]
      );
      array.push(vector);
    }

    return array;
  };

  // abrunebs geometriis wertilebis GLOBALUR pozicias masivis saxit
  this.worldPositionOfVertex = function (object) {
    let array = []; // masivi
    let geometry = object.geometry; // igebs meshis geometrias
    let positionAttribute = geometry.getAttribute("position"); // geometris atributi ppozicia

    for (var i = 0; i < positionAttribute.count; i++) {
      let vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);

      let point = object.localToWorld(vertex); // localuri poziciis globalurshi gadayvana
      array.push(point);
    }

    return array;
  };

  // Aketebs scenas threejs-is
  this.createScene = function () {
    // vigebt konteiners tu rashic unda davamatot es scena
    container = document.getElementById(id);

    // sigrdze sigane konteineris
    this.width = container.offsetWidth;
    this.height = container.offsetHeight;

    // avgwerot scene
    this.scene = new THREE.Scene();

    // avgwerot camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.set(3, 3, 3);
    this.camera.lookAt(0, 0, 0);
    this.camera.name = "perspective";

    // avgwerot renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.localClippingEnabled = false;

    // vamatebt renderers konteinershi
    container.appendChild(this.renderer.domElement);
  };

  // Kontrolis shekmna
  this.createControl = function (controltype) {
    if (controltype == "orbit") {
      this.control = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.control.enableDamping = true;
      this.control.dampingFactor = 0.025;
      this.control.min = -1;
      this.control.max = 1000;
      this.control.name = "orbit";

      if ($(".ObjSpeedSlider").val() != undefined) {
        this.control.rotateSpeed = $(".ObjSpeedSlider").val();
      }
    } else if (controltype == "fly") {
      this.control = new THREE.FlyControls(
        this.camera,
        this.renderer.domElement
      );
      this.control.movementSpeed = 0.1;
      this.control.enableKeys = false;
      this.control.name = "fly";
    }
  };

  // Ambient light- tipis ganatebis shekmna.
  this.createAmbientLight = function (color, intensity) {
    let ambientLight = new THREE.AmbientLight(color, intensity);
    ambientLight.name = "ambientLight";

    return ambientLight;
  };

  // Flash-is tipis sinatlis shekmna
  this.createDirectionalLight = function (color, intensity) {
    let directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.name = "directionalLight";

    return directionalLight;
  };

  // Naturis msgavsi tipis ganatebis shekmna
  this.createPointLight = function (color, intensity, distance) {
    // distance -- maksimumi distancia tu sadamde unda gaanatos sinatlem

    let pointLight = new THREE.PointLight(color, intensity, distance);
    pointLight.name = "pointLight";

    return pointLight;
  };

  // Shekmna yutis geometriis, vanichebt: sigane sigrdze sigrme feri da materialis tips
  this.createBoxGeometry = function (
    width,
    height,
    depth,
    color = 0x00ff00,
    materialtype
  ) {
    let geometry = new THREE.BoxGeometry(width, height, depth);
    let material;

    switch (materialtype) {
      case "meshPhong":
        material = new THREE.MeshPhongMaterial({ color: color });
        break;

      default:
        material = new THREE.MeshBasicMaterial({ color: color });
    }

    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = "boxGeometry";

    return mesh;
  };

  // Kmnis wris geometrias, vanichebt : radius siganisSegmentebis sigrdzisSegmentebs fers da materialis tips
  this.createSphereGeometry = function (
    radius,
    widthSegments,
    heightSegments,
    color = 0x00ff00,
    materialtype
  ) {
    let geometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );
    let material;

    switch (materialtype) {
      case "meshPhong":
        material = new THREE.MeshPhongMaterial({
          color: color,
          transparent: true,
        });
        break;

      default:
        material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
        });
    }

    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = "sphereGeometry";

    return mesh;
  };

  // Linis geometriis shekmna, vanichet masivs rashic yria 3D vectorebi da fers
  // es 3D vektorebi arian "WERTILEBI" da am WERTILEBIS dakavshirebit ikmneba Line
  this.createLine = function (pointsarray, color = 0x0000ff) {
    let geometry = new THREE.BufferGeometry().setFromPoints(pointsarray);
    let material = new THREE.LineBasicMaterial({ color: color });
    let mesh = new THREE.Line(geometry, material);
    mesh.name = "lineGeometry";

    return mesh;
  };

  // Cvlis kameras da argumentad vanichebt perspective an orthographic -uls
  this.switchCamera = function (cameratype) {
    if (this.camera.name == cameratype) return;

    container = document.getElementById(id);
    this.width = container.offsetWidth; // konteineris  sigane
    this.height = container.offsetHeight; // konteineris sigrdze

    if (cameratype == "perspective") {
      let position = this.camera.position;
      let rad2 =
        position.distanceTo(new THREE.Vector3(0, 0, 0)) / this.camera.zoom;

      this.camera = new THREE.PerspectiveCamera(
        75,
        this.width / this.height,
        0.1,
        1000
      );
      this.camera.position.copy(position);

      let sphere = new THREE.Spherical(); // ThreeJS klasi romelic itvlis kutxis phi,thetas micemuli 3D vectoris mixedvit
      sphere.setFromVector3(this.camera.position); // 0-dan kameris poziciamda

      this.camera.position.x =
        rad2 * Math.sin(sphere.theta) * Math.sin(sphere.phi);
      this.camera.position.y = rad2 * Math.cos(sphere.phi);
      this.camera.position.z =
        rad2 * Math.cos(sphere.theta) * Math.sin(sphere.phi);

      this.camera.lookAt(0, 0, 0);
      this.camera.name = "perspective";
    } else {
      // clonireba xdweba mtlianad kameris
      let cameraPosition = this.camera.position.clone();
      let cameraMatrix = this.camera.matrix.clone();
      let objectCamera = this.camera.position;
      // akamde
      let objectPosition = new THREE.Vector3(0, 0, 0);
      let lineOfSight = new THREE.Vector3();
      this.camera.getWorldDirection(lineOfSight); // igebs mimartulebas sait ixedeba kamera

      // gadadis yvelaferi orthographiul dimensionshi
      let objectDistance = objectPosition.clone().sub(objectCamera);
      let depth = objectDistance.dot(lineOfSight);
      let aspect = this.width / this.height;
      let heightOrtho = depth * 2 * Math.atan((75 * (Math.PI / 180)) / 2);
      let widthOrtho = heightOrtho * aspect;

      this.camera = new THREE.OrthographicCamera(
        widthOrtho / -2,
        widthOrtho / 2,
        heightOrtho / 2,
        heightOrtho / -2,
        -10000,
        10000
      );
      this.camera.position.copy(cameraPosition);
      this.camera.matrix.copy(cameraMatrix);
      this.camera.lookAt(0, 0, 0);
      this.camera.name = "orthographic";
    }

    this.switchControl(this.control.name);
    this.camera.updateProjectionMatrix();
  };

  // Vcvlit kontrolis tips da argumentad vanichebt orbit an fly - is
  this.switchControl = function (controltype) {
    this.control.dispose();

    if (controltype == "orbit") {
      this.control = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.control.enableDamping = true; // rtavs inercias kontrolze
      this.control.dampingFactor = 0.025; // inerciis maregulirebeli
      this.control.min = -1; // minimaluri distancia sadamde sheidzleba mizumva
      this.control.max = 1000; // maximaluri distancia sadamde sheidzleba unzoom? :D
      this.control.name = "orbit";

      // selekciis gaukmeba
      disableRay = false;

      // kameraze inerciis gachereba ertjeradad. ertjaradad nishnavs : es funkcia aris integrirebuli eventListenershi romelic triggerdeba mausis klikze.
      this.stopDampingEffect();

      if ($(".ObjSpeedSlider").val() != undefined) {
        this.control.rotateSpeed = $(".ObjSpeedSlider").val(); // rotate speed is daaupdateba settings menushi html documentshi
      }
    } else if (controltype == "fly") {
      // Orbit Controlis msmsneli funkcia romelic usmens mausis kliks, tu kliki xdeba mashin kameris inercias tishavs.
      this.disposeOrbitEventListener();

      this.control = new THREE.FlyControls(
        this.camera,
        this.renderer.domElement
      );
      this.control.movementSpeed = 0.1;
      this.control.enableKeys = false;
      this.control.dragToLook = true;
      this.control.autoForward = true;
      this.control.movementSpeed = 0.00003;
      this.control.rollSpeed = Math.PI / 200000;
      this.control.name = "fly";

      // selekciis gaukmeba
      disableRay = true;
    }
  };

  // cvlis geometriis chris tips, ctype nishnavs romel chrazea saubari.
  this.cut = function (ctype) {
    geometries_cuttypeWas = geometries_cuttype;
    geometries_cuttype = "-cut" + ctype;

    //  tu meore chra iyo chartuli da isev meore chras daachira userma mashin geometriis chris tipi xdeba carieli ->"" da tvirtavs shesabamisad geometrias romelic unda iyos chris gareshe
    // magalitistvis : Pixel + geometries_cuttype chatvirtavs am shemtxvevashi mtlian chris gareshe geometrias
    // tu geometries_cuttype iqneba cut3 mashin Pixel+geometries_cuttype eqvivalenti ikneba rom directory-shi modzebnos file shesabamisi saxelit da wamoigos
    if (geometries_cuttype == geometries_cuttypeWas) {
      geometries_cuttype = "";
    }

    if (this.geometrySelected == false) {
      globalCutWas = globalCut;
      globalCut = ctype; // globaluri chris machvenebeli rac nishnavs shemdegs: tu userma erti geometria amoirchia da imas sheucvala chra globaluri chra ar icvleba swored es cvladi achvenebs romeli chra aris globalurad gaaktiurebuli

      if (globalCutWas == globalCut) {
        // globaluri chris machvenebeli
        globalCut = 0;
      }
    }

    if (this.geometrySelected) {
      let selectedGeometry = this.getFirstIntersectedGeometry(); // selekciis shemdeg abrunebs geometrias
      let geometryname = selectedGeometry.name; // geometriis saxeli

      this.deleteGeometry(geometryname);
      this.loadGeometry(geometryname, true);
    } else {
      let geometrynames = this.mapToArray(activeGeometries, true); // geometriebis saxelebis maisvi

      this.deleteAllGeometries();
      this.loadAllGeometry(geometrynames, true);
    }
  };

  // Tvirtavs geometrias, vanichebt geometiis saxels da fromCut nishnavs rom Selekciis dros tu xdeba geometriis chatvirtva mashin unda iyos true rogorc wesia.
  this.loadGeometry = function (name, fromcut = false) {
    let geo; // geometriis cvladi
    let geometry; // sxva geometriis cvladi
    let geometryname = name; // geometriis saxeli
    let wireframe = scope.globalWireframe; // wireframe

    this.loaiding = true;
    disableRay = true;

    // tu geometris chris tipi carielia anu chra ar aris
    if (geometries_cuttype == "") {
      geometry = scope.getGeometry(geometryname, "-cut0"); // igebs geometrias saxelit, da chris tipit
    } else {
      geometry = scope.getGeometry(geometryname, geometries_cuttype); // igebs geometrias saxelit da christ tipit
    }

    // tu geometria arsebobs da scenashi aris chagdebuli mashin ukan dabrundees
    if (geometry != undefined && activeGeometries.get(geometry.uuid)) {
      this.loading = false;
      return;
    } else if (geometry != undefined) {
      // tu geometria ar aris scenashi magram odesgac iyo chatvirtuli

      // igebs am geometrias da uketebs updates wireframe rogor unda kondes da gamchirvaloba
      loadedGeometries.get(geometry.uuid).traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = scope.globalTransparency / 100;
          child.material.wireframe = wireframe;
        }
      });

      // aapdeitebs parametrebs, es tviton geometrias ar exeba. es ubralo parametrebia romelic gvexmareba console.logidan gavigot esa tu es geometria ra mdgomareobashia
      // aseve es parametrebi gamoiyeneba snapLoading-s dros
      loadedGeometries.get(geometry.uuid).opacity =
        scope.globalTransparency / 100;
      loadedGeometries.get(geometry.uuid).wireframe = wireframe;

      if (geometries_cuttype == "") {
        loadedGeometries.get(geometry.uuid).cut = "-cut0";
      } else {
        loadedGeometries.get(geometry.uuid).cut = geometries_cuttype;
      }

      loadedGeometries.get(geometry.uuid).loaded = true;
      activeGeometries.set(geometry.uuid, loadedGeometries.get(geometry.uuid));
      this.scene.add(loadedGeometries.get(geometry.uuid));

      if (this.geometrySelected) {
        // igebs selekecia geomtrias
        let intersectedgeometry = this.getFirstIntersectedGeometry();

        if (intersectedgeometry.name == geometryname) {
          // im masivshi sadac aris motavsebuli geometriebi razec moxda intersekcia
          // misi pirveli elementi xdeba shemdegi geometria romelic aris minichebuli kvevit
          this.intersects[0].object = loadedGeometries.get(geometry.uuid);

          if (loadedGeometries.get(intersectedgeometry.uuid).wireframe) {
            $(".wirefram-btn").addClass("active");
          } else {
            $(".wirefram-btn").removeClass("active");
          }

          if (this.getAnnotation)
            annotation(true, loadedGeometries.get(geometry.uuid));
        }
      }

      // tu selekcirebuli geometriis shecvla ar moxda mashin moxdeba shemdegi
      if (fromcut == false) {
        this.geometrySelected = false;
        this.intersects = null;
        this.selection();
      }

      this.loading = false;
    } else {
      // tu geometria arasdros yofila chatvirtuli mashin moxdes shemdegi
      loader.load(
        scope.geometriesPath + geometryname + geometries_cuttype + ".glb",
        function (glb) {
          geo = glb.scene;
          geo.name = geometryname;
          geo.opacity = scope.globalTransparency / 100;
          geo.wireframe = wireframe;
          geo.loaded = true;
          geo.selected = false;

          if (geometries_cuttype == "") {
            geo.cut = "-cut0";
          } else {
            geo.cut = geometries_cuttype;
          }

          geo.traverse(function (child) {
            if (child.isMesh) {
              child.material.metalness = null;
              child.material.transparent = true;
              child.material.opacity = scope.globalTransparency / 100;
              child.material.wireframe = wireframe;
            }
          });

          activeGeometries.set(geo.uuid, geo);
          loadedGeometries.set(geo.uuid, geo);

          scope.scene.add(geo);
          scope.scene.updateMatrix();

          if (scope.geometrySelected) {
            let intersectedgeometry = scope.getFirstIntersectedGeometry();

            if (intersectedgeometry.name == geometryname) {
              scope.intersects[0].object = activeGeometries.get(geo.uuid);

              if (loadedGeometries.get(intersectedgeometry.uuid).wireframe) {
                $(".wirefram-btn").addClass("active");
              } else {
                $(".wirefram-btn").removeClass("active");
              }

              if (scope.getAnnotation)
                annotation(true, activeGeometries.get(geo.uuid));
            }
          }
        }
      );

      if (fromcut == false) {
        scope.geometrySelected = false;
        scope.intersects = null;
        scope.selection();
      }

      scope.loading = false;
    }

    disableRay = false;
  };

  // Tvirtavs yvela geometrias vanichebt masivs sadac aris geometriebis saxelebi chayrili, fromcut nishanvs rom tu selekcia aris momxdari geometriaze da mashin itvirteba geometriebi unda gaxddes true
  this.loadAllGeometry = function (geometriesnames, fromcut = false) {
    let geometry; // geometria
    let geometryName; // geometriis saxeli
    let geometriesArray = geometriesnames; // geometris saxelebi masivis saxit
    let wireframe = scope.globalWireframe; // wireframe
    let geometriesCounter = 0; // geometriebis damtvleli
    let tobeLoaded = geometriesArray.length; // geometriebis raodenoba
    let percent = 0; // procenti romelic aris gankutvnili procentis datvlistvis

    disableRay = true;

    // loader progress procentuli machvenebeli xdeba 0 da mtlian HTML elementebs edeba bloki rom users wvdoma sheezgudos yvelaferze.
    document.getElementById("loading-text").textContent = "0%";
    $(".control-panel").addClass("blockClick");
    $(".tracer-tree").addClass("blockClick");
    $(".coreContainer").addClass("blockClick");
    $(".axisContainer").addClass("blockClick");
    $("#loading-wrapper").removeClass("load-hidden");

    if (this.geometrySelected) {
      this.geometrySelected = false;
      this.selection();
    }

    function load() {
      if (geometriesArray.length) {
        geometryName = geometriesArray[0];
      } else {
        scope.loading = false;
        disableRay = false;

        if (tobeLoaded == 0) {
          $(".control-panel").removeClass("blockClick");
          $(".tracer-tree").removeClass("blockClick");
          $(".coreContainer").removeClass("blockClick");
          $(".axisContainer").removeClass("blockClick");
          $("#loading-wrapper").addClass("load-hidden");

          return;
        }

        // tu yvela geometria chaitvirta mashin funkcia xsnis loadingbars naxevar wamshi
        function removeLoadBar() {
          $(".control-panel").removeClass("blockClick");
          $(".tracer-tree").removeClass("blockClick");
          $(".coreContainer").removeClass("blockClick");
          $(".axisContainer").removeClass("blockClick");
          $("#loading-wrapper").addClass("load-hidden");
        }

        setTimeout(removeLoadBar, 500);

        return;
      }

      if (geometries_cuttype == "") {
        geometry = scope.getGeometry(geometryName, "-cut0");
      } else {
        geometry = scope.getGeometry(geometryName, geometries_cuttype);
      }

      if (geometry != undefined && activeGeometries.get(geometry.uuid)) {
        geometriesCounter++;
        percent = (geometriesCounter / tobeLoaded) * 100;
        spherePercent = 440 - (((percent * 2) / 100) * 440) / 2;
        document.getElementById("loading-text").textContent =
          percent.toFixed(0) + "%";

        geometriesArray.shift();
        load();
      } else if (geometry != undefined) {
        loadedGeometries.get(geometry.uuid).traverse(function (child) {
          if (child.isMesh) {
            child.material.opacity = scope.globalTransparency / 100;
            child.material.wireframe = wireframe;
          }
        });

        loadedGeometries.get(geometry.uuid).opacity =
          scope.globalTransparency / 100;
        loadedGeometries.get(geometry.uuid).wireframe = scope.wireframe;

        if (geometries_cuttype == "") {
          loadedGeometries.get(geometry.uuid).cut = "-cut0";
        } else {
          loadedGeometries.get(geometry.uuid).cut = geometries_cuttype;
        }

        loadedGeometries.get(geometry.uuid).loaded = true;
        activeGeometries.set(
          geometry.uuid,
          loadedGeometries.get(geometry.uuid)
        );
        scope.scene.add(loadedGeometries.get(geometry.uuid));

        geometriesArray.shift();
        load();

        if (scope.geometrySelected) {
          // pirveli geometria razec moxda selekcia
          let intersectedgeometry = scope.getFirstIntersectedGeometry();

          if (intersectedgeometry.name == geometryName) {
            scope.intersects[0].object = loadedGeometries.get(geometry.uuid);
          }
        }

        if (fromcut == false) {
          scope.geometrySelected = false;
          scope.intersects = null;
          scope.selection();
        }

        geometriesCounter++;
        percent = (geometriesCounter / tobeLoaded) * 100;
        spherePercent = 440 - (((percent * 2) / 100) * 440) / 2;

        document.getElementById("loading-text").textContent =
          percent.toFixed(0) + "%";
      } else {
        loader.load(
          scope.geometriesPath + geometryName + geometries_cuttype + ".glb",
          function (glb) {
            geometry = glb.scene;
            geometry.name = geometryName;
            geometry.opacity = scope.globalTransparency / 100;
            geometry.wireframe = wireframe;
            geometry.loaded = true;
            geometry.selected = false;

            if (geometries_cuttype == "") {
              geometry.cut = "-cut0";
            } else {
              geometry.cut = geometries_cuttype;
            }

            geometry.traverse(function (child) {
              if (child.isMesh) {
                child.material.metalness = null;
                child.material.transparent = true;
                child.material.opacity = scope.globalTransparency / 100;
                child.material.wireframe = wireframe;

                if (
                  geometry.name != "UX15" &&
                  geometry.name != "US15" &&
                  geometry.name != "USA15" &&
                  geometry.name != "PX14" &&
                  geometry.name != "PX15" &&
                  geometry.name != "PX15" &&
                  geometry.name != "PM15"
                ) {
                  if ($("#clipping-slider").val() > 0) {
                    child.material.clipIntersection = false;
                  } else {
                    child.material.clipIntersection = true;
                  }
                  child.material.clippingPlanes = scope.clipPlanes;
                }
              }
            });

            geometriesCounter++;
            percent = (geometriesCounter / tobeLoaded) * 100;
            spherePercent = 440 - (((percent * 2) / 100) * 440) / 2;

            document.getElementById("loading-text").textContent =
              percent.toFixed(0) + "%";

            activeGeometries.set(geometry.uuid, geometry);
            loadedGeometries.set(geometry.uuid, geometry);

            scope.scene.add(geometry);
            scope.scene.updateMatrix();

            geometriesArray.shift();
            load();

            if (scope.geometrySelected) {
              // pirveli geometria razec moxda selekcia
              let intersectedgeometry = scope.getFirstIntersectedGeometry();

              if (intersectedgeometry.name == geometryName) {
                scope.intersects[0].object = activeGeometries.get(
                  geometry.uuid
                );
              }
            }

            if (fromcut == false) {
              scope.geometrySelected = false;
              scope.intersects = null;
              scope.selection();
            }
          }
        );
      }
    }

    load();
  };

  // Vigebt yvela CHATVIRTUL geometrias abrunebs masivs
  this.getLoadedGeometries = function () {
    // geometriebis da geometriis statebis masivi
    let geometries = [];

    loadedGeometries.forEach((value, key) => {
      let obj = new Object();

      obj.name = value.name;
      obj.id = value.uuid;
      obj.cut = value.cut;
      obj.opacity = value.opacity;
      obj.wireframe = value.wireframe;
      obj.value = value; // tviton geometria

      geometries.push(obj);
    });

    return geometries;
  };

  // Vigebt yvela geometrias romelic scenashi imyofeba masivis sxit
  this.getActiveGeometries = function () {
    let geometries = []; // geometriebis masivi

    activeGeometries.forEach((value, key) => {
      let obj = new Object();

      obj.name = value.name;
      obj.cut = value.cut;
      obj.opacity = value.opacity;
      obj.wireframe = value.wireframe;
      obj.value = value; // tviton geometria

      geometries.push(obj);
    });

    return geometries;
  };

  // Vigebt geometrias romelic aris scenashi saxelis mixedvit, argumentad vanichebt geometriis saxels, tu aseti geometria ver moidzebna ukan brundeba unefined
  this.getActiveGeometry = function (name) {
    let geometry;

    activeGeometries.forEach((value, key) => {
      if (value.name == name) {
        geometry = value;
      }
    });

    return geometry;
  };

  // Vigebt konkretul geometrias romelic chatvirtulia, ar akvs mnishvneloba scenashia tu chatvirtvis shemdeg wavshalet scenidan
  // vadzlevt argumentebad geometriis saxels da geometriis chris tips
  this.getGeometry = function (name, cuttype) {
    let geometry;

    loadedGeometries.forEach((value, key) => {
      if (value.name == name && value.cut == cuttype) {
        geometry = value;
      }
    });

    return geometry;
  };

  // Shlis yvela geometrias scenidan
  this.deleteAllGeometries = function () {
    // temporarulad shekmnili activeGeometries cvladi
    // aris sachiro imistvis rom rodesac geometriebis shlis processhia masivi
    // im masivis im momentshi dapataravea amoyra im geometriebis romelic waishala aris araswori
    // amitom temporarul masividan vyrit a geometriebs da shemdeg tavidan vanichnebt activeGeometries
    let temp_activeGeometries = activeGeometries;
    this.geometrySelected = false;
    this.selection();

    activeGeometries.forEach((value, key) => {
      scope.scene.remove(value);
      temp_activeGeometries.delete(key);
      loadedGeometries.get(key).loaded = false;
    });

    activeGeometries = temp_activeGeometries;
  };

  // Shlis yvela geometrias masivis mixedvit. vanichebt masivs sadac aris motavsebuli geometriis saxelebi.
  this.deleteGeometries = function (array) {
    this.geometrySelected = false;
    this.selection(); // gaukmdes selekcia

    let geometries = array;
    let temp_activeGeometries = activeGeometries;

    for (var i = 0; i < geometries.length; i++) {
      let geometry = this.getActiveGeometry(geometries[i]);
      temp_activeGeometries.delete(geometry.uuid);
      loadedGeometries.get(geometry.uuid).loaded = false;
      this.scene.remove(geometry);
    }

    activeGeometries = temp_activeGeometries;
  };

  // shlis geometrias saxelis mixedvit
  this.deleteGeometry = function (name) {
    let geometry = this.getActiveGeometry(name); // igebs aktiur geometrias

    if (geometry == undefined) return;

    this.scene.remove(activeGeometries.get(geometry.uuid));

    activeGeometries.delete(geometry.uuid);
    loadedGeometries.get(geometry.uuid).loaded = false;
  };

  // winaswar tvirtavs yvela geometrias
  this.preLoad = function () {
    if (this.geometriesLoaded) return;

    this.loading = true;
    disableRay = true;

    let geo;
    let geoName;
    let allGeometries = allgeometry; // yvela geometriis saxeli
    let geoCounter = 0; // geometriebis damtvleli ramdeni chaitvirta
    let toLoad = allGeometries.length * 5; // geometriebis fiksirebuli raodenoba

    document.getElementById("loading-text").textContent = "0%";
    $("#loading-wrapper").removeClass("load-hidden");
    $(".tracer-tree").addClass("blockClick");

    function load1() {
      // tu geometriebi agar darcha chasatvirti mashin gamodis funkciidan
      geoName = allGeometries[0];

      if (geoName == undefined) {
        scope.loading = false;
        disableRay = false;
        scope.geometriesLoaded = true;

        $(".tracer-tree").removeClass("blockClick");
        $("#geometry-preload").attr("disabled", true);
        $("#loading-wrapper").addClass("load-hidden");

        function removeLoadBar() {
          $(".control-panel").removeClass("blockClick");
          $(".tracer-tree").removeClass("blockClick");
          $(".coreContainer").removeClass("blockClick");
          $(".axisContainer").removeClass("blockClick");
          $("#loading-wrapper").addClass("load-hidden");
        }

        setTimeout(removeLoadBar, 500);

        return;
      }

      loader.load(scope.geometriesPath + geoName + ".glb", function (glb) {
        geo = glb.scene;
        geo.name = geoName;
        geo.cut = "-cut0";
        geo.wireframe = false;
        geo.opacity = 1;
        geo.loaded = false;

        geo.traverse(function (child) {
          if (child.isMesh) {
            child.material.metalness = null;
            child.material.transparent = true;
          }
        });

        geoCounter++;
        percent = (geoCounter / toLoad) * 100;
        document.getElementById("loading-text").textContent =
          percent.toFixed(0) + "%";

        let checkGeometry = scope.getGeometry(geo.name, "");

        if (checkGeometry == undefined) {
          loadedGeometries.set(geo.uuid, geo);

          let newName = geoName + "-cut1";
          load2(newName);
        } else {
          let newName = geoName + "-cut1";
          load2(newName);
        }
      });
    }
    // argumentad enicheba geometriis saxeli romelic unda chaitvirtos
    function load2(geoName) {
      loader.load(scope.geometriesPath + geoName + ".glb", function (glb) {
        geo = glb.scene;
        geo.name = geoName.slice(0, -5);
        geo.cut = "-cut1";
        geo.wireframe = false;
        geo.opacity = 1;
        geo.loaded = false;

        geo.traverse(function (child) {
          if (child.isMesh) {
            child.material.metalness = null;
            child.material.transparent = true;
          }
        });

        geoCounter++;
        percent = (geoCounter / toLoad) * 100;
        document.getElementById("loading-text").textContent =
          percent.toFixed(0) + "%";

        let checkGeometry = scope.getGeometry(geo.name, "-cut1");

        if (checkGeometry == undefined) {
          loadedGeometries.set(geo.uuid, geo);

          let newName = geoName.slice(0, -5) + "-cut2";
          load3(newName);
        } else {
          let newName = geoName.slice(0, -5) + "-cut2";
          load3(newName);
        }
      });
    }

    // argumentad enicheba geometriis saxeli romelic unda chaitvirtos
    function load3(geoName) {
      loader.load(scope.geometriesPath + geoName + ".glb", function (glb) {
        geo = glb.scene;
        geo.name = geoName.slice(0, -5);
        geo.cut = "-cut2";
        geo.wireframe = false;
        geo.opacity = 1;
        geo.loaded = false;

        geo.traverse(function (child) {
          if (child.isMesh) {
            child.material.metalness = null;
            child.material.transparent = true;
          }
        });

        geoCounter++;
        percent = (geoCounter / toLoad) * 100;
        document.getElementById("loading-text").textContent =
          percent.toFixed(0) + "%";

        let checkGeometry = scope.getGeometry(geo.name, "-cut2");

        if (checkGeometry == undefined) {
          loadedGeometries.set(geo.uuid, geo);

          let newName = geoName.slice(0, -5) + "-cut3";
          load4(newName);
        } else {
          let newName = geoName.slice(0, -5) + "-cut3";
          load4(newName);
        }
      });
    }

    // argumentad enicheba geometriis saxeli romelic unda chaitvirtos
    function load4(geoName) {
      loader.load(scope.geometriesPath + geoName + ".glb", function (glb) {
        geo = glb.scene;
        geo.name = geoName.slice(0, -5);
        geo.cut = "-cut3";
        geo.wireframe = false;
        geo.opacity = 1;
        geo.loaded = false;

        geo.traverse(function (child) {
          if (child.isMesh) {
            child.material.metalness = null;
            child.material.transparent = true;
          }
        });

        geoCounter++;
        percent = (geoCounter / toLoad) * 100;
        document.getElementById("loading-text").textContent =
          percent.toFixed(0) + "%";

        let checkGeometry = scope.getGeometry(geo.name, "-cut3");

        if (checkGeometry == undefined) {
          loadedGeometries.set(geo.uuid, geo);

          let newName = geoName.slice(0, -5) + "-cut4";
          load5(newName);
        } else {
          let newName = geoName.slice(0, -5) + "-cut4";
          load5(newName);
        }
      });

      // argumentad enicheba geometriis saxeli romelic unda chaitvirtos
      function load5(geoName) {
        loader.load(scope.geometriesPath + geoName + ".glb", function (glb) {
          geo = glb.scene;
          geo.name = geoName.slice(0, -5);
          geo.cut = "-cut4";
          geo.wireframe = false;
          geo.opacity = 1;
          geo.loaded = false;

          geo.traverse(function (child) {
            if (child.isMesh) {
              child.material.metalness = null;
              child.material.transparent = true;
            }
          });

          geoCounter++;
          percent = (geoCounter / toLoad) * 100;
          document.getElementById("loading-text").textContent =
            percent.toFixed(0) + "%";

          let checkGeometry = scope.getGeometry(geo.name, "-cut4");

          if (checkGeometry == undefined) {
            loadedGeometries.set(geo.uuid, geo);

            allGeometries.shift();
            load1();
          } else {
            allGeometries.shift();
            load1();
          }
        });
      }
    }

    load1();
  };

  // Snap-is geometriebis chatvirtva, igebs arguments SNAP-idan
  this.snapLoader = function (arr) {
    //argumentad mienicheba geometriis saxelebis masivi
    let array = arr; // masivi
    let tempArr = []; // temporaruli masivi

    this.snapLoad = true;
    disableRay = true;
    this.loading = true;

    this.deleteAllGeometries();

    activeGeometries.clear(); // xdeba ganuleba aktiuri geometriebis
    loadedGeometries.clear(); // xdeba ganuleba aktiuri geometriebis

    if ($(".tree-parent").hasClass("child-is-active")) {
      $(".tree-parent").trigger("click");
      $(".tree-parent").trigger("click");
    } else if ($(".tree-parent").hasClass("active-tree-item")) {
      $(".tree-parent").trigger("click");
    }

    // xdeba am masividan saxelebis chayra temporarrul masivshi
    for (var i = 0; i < array.length; i++) {
      tempArr.push(array[i].name);
    }

    // unique aris am tempArr masividan tu saxelebi ganmorda amoshalos da miigos mtliani masivi unikaluri saxelebit romlebic ar meordebian
    let unique = [...new Set(tempArr)];

    let geoName; // geometriis saxeli
    let geo; // geometria
    let op; // gamchirvaloba
    let wrfm; // wireframe
    let cut; // chris tipi

    document.getElementById("loading-text").textContent = "0%";
    $("#loading-wrapper").removeClass("load-hidden");

    let toLoad = tempArr.length;
    let geoCounter = 0;
    let percent = 0;

    function load() {
      if (array.length) {
        geoName = array[0].name;
        cut = array[0].cutType;
        op = array[0].opacity;
        wrfm = array[0].wireframe;

        geoCounter++;
        percent = (geoCounter / toLoad) * 100;
        document.getElementById("loading-text").textContent =
          percent.toFixed(0) + "%";

        if (unique.length) {
          $("span[name=" + unique[0] + "]").click();
          $(".tracer-tree").addClass("blockClick");
          unique.shift();
        }
      } else {
        scope.snapLoad = false;
        scope.loading = false;
        disableRay = false;

        $("#loading-wrapper").addClass("load-hidden");

        return;
      }

      loader.load(
        scope.geometriesPath + geoName + cut + ".glb",
        function (glb) {
          geo = glb.scene;
          geo.name = geoName;
          geo.loaded = true;
          geo.cut = cut;

          geo.traverse(function (child) {
            if (child.isMesh) {
              child.material.metalness = null;
              child.material.transparent = true;
              child.material.opacity = op;
              child.material.wireframe = wrfm;
            }
          });

          geo.opacity = op;
          geo.wireframe = wrfm;

          scope.scene.add(geo);

          activeGeometries.set(geo.uuid, geo);
          loadedGeometries.set(geo.uuid, geo);

          array.shift();
          $(".tracer-tree").removeClass("blockClick");

          load();
        }
      );
    }

    load();
  };

  // vigebt pirvel geometrias selekciis shemdeg
  this.getFirstIntersectedGeometry = function () {
    if (this.intersects.length < 1) return;

    let geometry = this.intersects[0].object; // igebs geometrias selekcirebuli meshebidan

    function checkparent() {
      if (geometry.parent == null) {
        return;
      } else if (geometry.parent.name) {
        geometry = geometry.parent;
        checkparent();
      } else {
        return;
      }
    }

    checkparent();
    return geometry;
  };

  // Vigebt yvela geometrias romelzec selekcia moxda masivis saxit
  this.getIntersectedGeometries = function () {
    let array = []; // masivi sadac chavardeba yvela geometria romelzec moxda intersekcia

    if (this.intersects.length < 1) return array;
    else {
      for (var i = 0; i < this.intersects.length; i++) {
        // masivshi vardeba yvela is obieqtebi romelzec moxda selekcia
        array.push(this.intersects[i].object);
      }
    }

    return array;
  };

  // es aris funkcia romelic aketebs Selekcias
  this.ray = function () {
    // axdens selekcias kameris pozicidaan mausamde
    this.raycaster.setFromCamera(this.mouse, this.camera);

    if (this.testRay === true) {
      this.intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true
      );

      if (this.intersects.length > 0) {
        this.geometrySelected = true;
      } else {
        this.geometrySelected = false;
      }
    } else {
      // igebs aktiur geometriebs masivis asaxit
      let actives = this.mapToArray(activeGeometries, false);
      this.intersects = this.raycaster.intersectObjects(actives, true);

      if (this.intersects.length > 0) {
        this.geometrySelected = true;

        if (this.getFirstIntersectedGeometry().name == intersectionWas) {
          intersectionWas = "";
          this.geometrySelected = false;
          this.selection();
        } else {
          intersectionWas = this.getFirstIntersectedGeometry().name;
          this.selection();
        }
      } else {
        this.geometrySelected = false;
        this.selection();
      }
    }
  };

  // inaxavs mausis dacheris dros pozicias kameris
  this.mousedown = function (event) {
    if (event.target.parentElement == null) return;
    if (event.target.parentElement.id != "mainScene") return;

    this.cameraPosition.copy(this.camera.position);
  };

  // adarebs poziciebs kameris, mausis DACHERIS da ASHVEBIS shemdeg. tu emtxvevian poziciebi selekcia moxdeba.
  this.mouseup = function (event) {
    if (event.target.parentElement == null) return;
    if (event.target.parentElement.id != "mainScene") return;
    if (disableRay == true) return;

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (this.checkEquality(this.cameraPosition)) {
      this.ray();
    }
  };

  // aktiurs xdis selekcias
  this.activateRayCaster = function () {
    this._onMouseDown = this.bind(this, this.mousedown);
    this._onMouseUp = this.bind(this, this.mouseup);

    window.addEventListener("pointerdown", this._onMouseDown);
    window.addEventListener("pointerup", this._onMouseUp);
  };

  // aukmenbs selekcias
  this.disposeRayCaster = function () {
    window.removeEventListener("pointerdown", this._onMouseDown);
    window.removeEventListener("pointerup", this._onMouseUp);
  };

  // funkcia sadac xdeba selekciis dros procesebi
  this.selection = function () {
    if (this.geometrySelected) {
      // pirveli geometria razec moxda intersection
      let geometry = this.getFirstIntersectedGeometry();

      geometry.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = 1;
        }
      });

      activeGeometries.forEach((value, key) => {
        if (value.name != geometry.name) {
          value.traverse(function (child) {
            if (child.isMesh) {
              child.material.opacity = 0.1;
            }
          });
        }
      });

      $("#opacity-slider").val(geometry.opacity * 100);

      if (geometry.wireframe) {
        $(".wirefram-btn").addClass("active");
      } else {
        $(".wirefram-btn").removeClass("active");
      }

      $(".cut-1-btn").removeClass("active");
      $(".cut-2-btn").removeClass("active");
      $(".cut-3-btn").removeClass("active");
      $(".cut-4-btn").removeClass("active");

      let cut_slider = false;

      if ($("#cut-slider-icon").hasClass("active")) {
        cut_slider = true;
      } else {
        cut_slider = false;
      }

      $(".cut-1-g").hide();
      $(".cut-2-g").hide();
      $(".cut-3-g").hide();
      $(".cut-4-g").hide();
      $(".cut-5-g").hide();

      $(".cut-g").hide();
      $(".no-cut-g").hide();

      if (geometry.cut.indexOf(1) != -1) {
        $(".cut-1-btn").addClass("active");
        $(".cut-1-g").show();

        geometries_cuttype = "-cut1";
      } else if (geometry.cut.indexOf(2) != -1) {
        $(".cut-2-btn").addClass("active");
        $(".cut-2-g").show();

        geometries_cuttype = "-cut2";
      } else if (geometry.cut.indexOf(3) != -1) {
        $(".cut-3-btn").addClass("active");
        $(".cut-3-g").show();

        geometries_cuttype = "-cut3";
      } else if (geometry.cut.indexOf(4) != -1) {
        $(".cut-4-btn").addClass("active");
        $(".cut-4-g").show();

        geometries_cuttype = "-cut4";
      } else {
        if (cut_slider) {
          $(".cut-5-g").show();
        } else {
          $(".cut-g").hide();
          $(".no-cut-g").show();
        }
      }

      if (this.getAnnotation) annotation(true, geometry);
    } else {
      annotation(false);
      activeGeometries.forEach((value, key) => {
        value.traverse(function (child) {
          if (child.isMesh) {
            child.material.opacity = value.opacity;
          }
        });
      });

      $("#opacity-slider").val(scope.globalTransparency);

      if (scope.globalWireframe) {
        $(".wirefram-btn").addClass("active");
      } else {
        $(".wirefram-btn").removeClass("active");
      }

      geometries_cuttype = "-cut" + globalCut;

      if (geometries_cuttype == "-cut0") {
        geometries_cuttype = "";
      }

      if (doSelection == false) return;

      $(".cut-1-btn").removeClass("active");
      $(".cut-2-btn").removeClass("active");
      $(".cut-3-btn").removeClass("active");
      $(".cut-4-btn").removeClass("active");

      $(".cut-1-g").hide();
      $(".cut-2-g").hide();
      $(".cut-3-g").hide();
      $(".cut-4-g").hide();
      $(".cut-5-g").hide();

      $(".cut-g").hide();
      $(".no-cut-g").hide();

      let cut_slider = false;
      if ($("#cut-slider-icon").hasClass("active")) {
        cut_slider = true;
      } else {
        cut_slider = false;
      }

      if (globalCut == 1) {
        $(".cut-1-btn").addClass("active");
        $(".cut-1-g").show();
      } else if (globalCut == 2) {
        $(".cut-2-btn").addClass("active");
        $(".cut-2-g").show();
      } else if (globalCut == 3) {
        $(".cut-3-btn").addClass("active");
        $(".cut-3-g").show();
      } else if (globalCut == 4) {
        $(".cut-4-btn").addClass("active");
        $(".cut-4-g").show();
      } else {
        if (cut_slider) {
          $(".cut-5-g").show();
        } else {
          $(".cut-g").hide();
          $(".no-cut-g").show();
        }
      }
    }
  };

  //cvlis geometriis gamchirvalobas argumentad enicheba ricxvi 0dan 100 mde
  this.localTransparency = function (arg) {
    // pirveli geometria razec moxda selekcia
    let geometry = this.getFirstIntersectedGeometry();

    geometry.traverse(function (child) {
      if (child.isMesh) {
        child.material.opacity = arg / 100;
      }
    });

    geometry.opacity = arg / 100;
    if (this.getAnnotation) annotation(true, geometry);
  };

  // Cvlis yvela geometriis gamchirvalobas. argumentad enicheba ricxvi 0-dan 100-mde
  this.worldTransparency = function (arg) {
    activeGeometries.forEach((value, key) => {
      value.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = arg / 100;
        }

        value.opacity = arg / 100;
      });
    });

    scope.globalTransparency = arg;
  };

  // cvlis geometriis wireframes argumentad enicheba TRUE/False
  this.localWireframe = function (val) {
    if (this.geometrySelected) {
      // geometria razec moxda intersekcia
      let geometry = this.getFirstIntersectedGeometry();

      geometry.traverse(function (child) {
        if (child.isMesh) {
          child.material.wireframe = val;
        }
      });

      geometry.wireframe = val;

      if (this.getAnnotation) annotation(true, geometry);
    }
  };

  // cvlis yvela geometriis wireframes, argumentad enicheba True, False
  this.worldWireframe = function (val) {
    activeGeometries.forEach((value, key) => {
      value.traverse(function (child) {
        if (child.isMesh) {
          child.material.wireframe = val;
        }

        value.wireframe = val;
      });
    });

    scope.globalWireframe = val;
  };

  // Kmnis Axes argumentad enicheba Ricxvi 0 dan ++
  this.axesHelper = function (size) {
    // axis helperi
    let axes = new THREE.AxesHelper(size);
    axes.name = "axes";

    return axes;
  };

  // Kmnis miwas, argumentad enicheba zoma am miwis da danayofebi orive unda iyos ricxvi 1 dan ++
  this.gridHelper = function (size, divisions) {
    let grid = new THREE.GridHelper(size, divisions);
    grid.name = "grid";

    return grid;
  };

  // Fanjris dapataraveba gazrdis shemtxvevashi rom scena ar dairgves da daapdeitdes
  this.resize = function () {
    container = document.getElementById(id);

    if (this.camera.name == "perspective") {
      this.camera.aspect = container.offsetWidth / container.offsetHeight;
    } else {
      // axdens klonirebas mtliani kameris akedan
      let cameraPosition = this.camera.position.clone();
      let cameraMatrix = this.camera.matrix.clone();
      let controlTarget = this.control.target.clone();
      let objectCamera = this.camera.position;
      // akamde

      // 3D vekorebi
      let objectPosition = new THREE.Vector3(0, 0, 0);
      let lineOfSight = new THREE.Vector3(); // mimartuleba sait iyureba kemar

      this.camera.getWorldDirection(lineOfSight);

      // zustad ar vici ak ra xdeba magram amas gadayavs perspectiuli ortografiulshi
      let objectDistance = objectPosition.clone().sub(objectCamera);
      let depth = objectDistance.dot(lineOfSight);
      let aspect = container.offsetWidth / container.offsetHeight;
      let heightOrtho = depth * 2 * Math.atan((75 * (Math.PI / 180)) / 2);
      let widthOrtho = heightOrtho * aspect;

      this.camera = new THREE.OrthographicCamera(
        widthOrtho / -2,
        widthOrtho / 2,
        heightOrtho / 2,
        heightOrtho / -2,
        -10000,
        10000
      );
      this.camera.position.copy(cameraPosition);
      this.camera.matrix.copy(cameraMatrix);
      this.camera.lookAt(0, 0, 0);
      this.camera.name = "orthographic";

      this.switchControl("orbit");
      this.control.target.copy(controlTarget);
    }

    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.camera.updateProjectionMatrix();
    this.scene.updateMatrix();
  };

  this._onResize = this.bind(this, this.resize);
  window.addEventListener("resize", this._onResize);

  // mausis klikze gacherdes inercia
  this.restrictDamping = function (event) {
    if (
      event.target.parentElement != undefined &&
      event.target.parentElement.id == "mainScene"
    ) {
      doSelection = true;
    } else {
      doSelection = false;
    }

    if (drone.droneIsActive) return;
    if (this.control.name != "orbit") return;

    this.control.enabled = false;
    this.control.enableDamping = false;
    this.control.update();
    this.control.enableDamping = true;
    this.control.enabled = true;
  };

  // vamatebt mausze klikis shemdeg gacherebas inerciis Orbit controls
  this.stopDampingEffect = function () {
    this._damping = this.bind(this, this.restrictDamping);
    window.addEventListener("pointerdown", this._damping);
  };

  // Washla inerciis gacherebis
  this.disposeOrbitEventListener = function () {
    window.removeEventListener("pointerdown", this._damping);
  };

  // Daapdeideba kontrolis
  this.update = function () {
    if (this.control != undefined) {
      if (this.control.name == "orbit") {
        if (this.control.enableDamping) {
          this.control.update();
        }
      } else if (this.control.name == "fly") {
        this.control.update(500);
      }
    }
  };

  // Applikaciis funkcia sadac iwyebs scena mushaobas
  function animate() {
    window.requestAnimationFrame(animate);

    scope.renderer.render(scope.scene, scope.camera);
    scope.update();
  }

  // Aplikaciis gashveba
  this.launch = function () {
    animate();
  };
};
