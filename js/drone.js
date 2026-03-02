//////////////////////////////////////////////////////////////////////////////////
///   Nuclear Engineering Center at Georgian Technical University
///   TRACER Framework
///////////////////////////////////////////////////////   Creation History
///   Name:     drone.js
///   Subsystems: CORE
///   Path: \tracer-tmp\subsystem\core\r4.0\js\drone.js
///   Description: es aris klasi romelic aaktiurebs dronis funkciebs

/// Functions:  
// circle()
// helix()
// rocket()
// freeFly()
// cinema()
// stop()
// disposeFreeFly()
// correctAXis()

///   Author: <ირაკლი კვერენჩხილაძე>                    
///   Date: <მაისი 2021>
///////////////////////////////////////////////////////   Change History
///   Name: <პროგრამისტის სახელი>          
///   Date:  <მოდიფიკაციის თარიღი>      
///   Description: <მოდიფიკაციის აღწერა>
//////////////////////////////////////////////////////////////////////////////////



class droneModes {
    // ushvebs dronis circle funkcias
    circle() {

        // tu dronis romelime sxva funkcia aktiuria ukan brundeba
        if (this.droneIsActive) return;

        // tishavs axis 
        $("#axisScene").css("display", "none");

        this.circleModeIsActive = true;
        this.droneIsActive = true;

        if (core.camera.name == "orthographic") {
            core.switchCamera("perspective");
            $(".camera-mode").val("Perspective");
        }

        // tishavs controlis gamoyenebas 
        // rtavs kontrolis rotacias 
        // tishavs axisis controlis gamoyenebas
        core.control.enabled = false;
        core.control.autoRotate = true;
        Axis.control.enabled = false;

    }

    // ushvebs dronis helix funkcias
    helix() {

        if (this.droneIsActive) return;

        $("#axisScene").css("display", "none");

        this.helixModeIsActive = true;
        this.droneIsActive = true;

        if (core.camera.name == "orthographic") {
            core.switchCamera("perspective");
            $(".camera-mode").val("Perspective");
        }

        core.camera.position.set(3, 3, 3);

        // tishavs kontrolis gamoyenebas axisis da mtavari scenis 
        core.control.enabled = false;
        Axis.control.enabled = false;

        // target aris 3D vektori 
        let target = new THREE.Vector3(0, 0, 0);
        // maximaluri radiusi sadamde unda wavides helixis dros kamera 
        let helixMax_Radius = 15;
        // maksimaluri simagle 
        let helixMax_Height = 5;
        // radiusis damtvleli 
        let radiusIterator = 0;

        // hipotenuza
        let targetedRadius = Math.sqrt(Math.pow(core.camera.position.x, 2) + Math.pow(core.camera.position.z, 2));

        // simaglis iteratori ramdenit unda moematos kameras yovel jerze
        let heightItr = (helixMax_Height - parseFloat(core.camera.position.y.toFixed(0))) / 1000;
        // radiusis iteratori ramdenit unda moematos kameras yovel jerze 
        let radiusItr = (helixMax_Radius - targetedRadius) / 1000;
        // tangesnsi romelic igebs mnishvnelobas shesabamisad 
        let helixAlpha = Math.atan(core.camera.position.z / core.camera.position.x);

        // kmnis yutis geometrias 
        let fGeo = new THREE.BoxGeometry();
        // materiali
        let fMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

        // ikmneba fake camera romelic igebs identur pozicias rogoric akvs realur kameras 
        // magram simagle aris 0
        this.fakeCamera = new THREE.Mesh(fGeo, fMaterial);
        this.fakeCamera.position.copy(core.camera.position);
        this.fakeCamera.position.y = 0;
        this.fakeCamera.name = "fake";

        this.scene.add(this.fakeCamera);

        let scope = this;
        function rotate() {
            scope.helixAnimation = requestAnimationFrame(rotate);
            // tu distancia mivida maksimalurze mashin tishavs distanciis cvlilebas
            if (parseFloat(Math.abs(scope.fakeCamera.position.distanceTo(target) - helixMax_Radius).toFixed(0)) == 0) {
                radiusItr = 0;
            }
            // ti simagle avida maksimalurze tishavs simaglis cvlilebas
            if (parseFloat(Math.abs(parseFloat((core.camera.position.y.toFixed(0) - helixMax_Height).toFixed(0)))) == 0) {
                heightItr = 0;
            }
            // tu simagle da radiusi maksimaluria tishavs funkcias da shlit fakeCameras
            if (heightItr == 0 && radiusItr == 0) {
                scope.scene.remove(scope.fakeCamera);
                scope.stop();
                return;
            }

            // poziciebis minicheba shesabamisi formulit
            scope.fakeCamera.position.x = (targetedRadius + radiusIterator) * Math.cos(helixAlpha);
            scope.fakeCamera.position.z = (targetedRadius + radiusIterator) * Math.sin(helixAlpha);

            core.camera.position.x = (targetedRadius + radiusIterator) * Math.cos(helixAlpha);
            core.camera.position.z = (targetedRadius + radiusIterator) * Math.sin(helixAlpha);

            core.camera.position.y += heightItr;

            radiusIterator += radiusItr;
            helixAlpha += 0.01;

            // shexedos yoveltvis centrs kameram
            core.camera.lookAt(target);
        }
        rotate();
    }

    // ushvebs dronis rocket fukcias 
    rocket() {
        if (this.droneIsActive) return;

        $("#axisScene").css("display", "none");

        this.rocketModeIsActive = true;
        this.droneIsActive = true;

        if (core.camera.name == "orthographic") {
            core.switchCamera("perspective");
            $(".camera-mode").val("Perspective");
        }

        core.camera.position.set(3, 3, 3);

        // tishavs coris da axisis kontrols
        core.control.enabled = false;
        Axis.control.enabled = false;

        // maksimaluri simagle
        // maksimaluri simaglis iteratori
        let maxHeight = parseFloat(core.camera.position.y.toFixed(0)) + 15;
        let heightItr = 15 / 1000;

        // x gerdzis iteratori 
        // z gerdzis iteratori 
        let xItr = (0 - parseFloat(core.camera.position.x.toFixed(0))) / 1000;
        let zItr = (0 - parseFloat(core.camera.position.z.toFixed(0))) / 1000;

        let scope = this;
        function fly() {
            scope.rocketAnimation = requestAnimationFrame(fly);

            // tu maksimaluri simaglis iteratori metia maximalur simagleze tishavs funkcias 
            if (parseFloat(core.camera.position.y.toFixed(0)) + heightItr > maxHeight) {
                scope.stop();
                return;
            }

            // cvlis poziciebs zemot agwerili cvladebis meshveobit
            core.camera.position.x += xItr;
            core.camera.position.z += zItr;
            core.camera.position.y += heightItr;

        }
        fly();
    }
    // ushvebs dronis dollyzoom funkcias 
    dollyZoom() {
        if (this.droneIsActive) return;

        $("#axisScene").css("display", "none");

        if (core.camera.name == "orthographic") {
            core.switchCamera("perspective");
            $(".camera-mode").val("Perspective");
        }


        // tu ortografiuli kamera aris mashin ar sheyavs funkciashi 2x dacvaa shecdomisgan tavis asarideblad
        // radgan ui.js -shi ukve arsi shesabamisi funkcia romelic avtomaturad ucvlis kameras perspectivshi
        // magram tu ramenairad gaipara shecdoma ui.js dan ak gaacherebs 
        if (core.camera.name == "orthographic") {
            alert("On orthographic camera DollyZoom has no effect. Please change camera.");
            return;
        }

        core.camera.position.set(5, 1, 0);
        this.dollyModeIsActive = true;
        this.droneIsActive = true;

        // tishavs controlebs axisis da coris
        core.control.enabled = false;
        Axis.control.enabled = false;

        // xedvis arealis iteratori
        let fovIterator = (core.camera.fov - 120) / 500;
        // 3D vektori anu targeti vin aris 
        let target = new THREE.Vector3(0, 0, 0);
        // distanciis iteratori
        let distanceIterator = 0;
        let j = -1;

        // x gerdzis da y gerdzis iteratori
        let xItr = (parseFloat(target.x.toFixed(0)) - parseFloat(core.camera.position.x.toFixed(0))) / 1000;
        let zItr = (parseFloat(target.z.toFixed(0)) - parseFloat(core.camera.position.z.toFixed(0))) / 1000;

        let scope = this;
        function dolly() {
            scope.dollyAnimation = requestAnimationFrame(dolly);
            // tu distanceIteratori > 450 mashin itisheba funkcia
            if (distanceIterator > 450) {
                scope.stop();
                return;
            }

            // icvleba kameris poziciebi zemot agwerili cvladebis meshveobit
            core.camera.position.x += j * xItr;
            core.camera.position.z += j * zItr;

            // icvleba xedvis areali xedvisArealis iteratoris mixedvit
            core.camera.fov += fovIterator;
            // distanciis iteratoris zrda erti erteulit
            distanceIterator++;

            // uyuros centrs da daapdeitdes kameris matrica
            core.camera.lookAt(0, 0, 0);
            core.camera.updateProjectionMatrix();
        }
        dolly();
    }
    // ushvebs dronis z0 funkcias 
    cinema() {
        if (this.droneIsActive) return;

        $("#axisScene").css("display", "none");

        this.z0ModeIsActive = true;
        this.droneIsActive = true;

        if (core.camera.name == "orthographic") {
            core.switchCamera("perspective");
            $(".camera-mode").val("Perspective");
        }

        // ganaxldes kamera 
        core.camera.lookAt(0, 0.01, 0);

        // sheeizgudos axis kontrolze da coris controlze wvdoma 
        core.control.enabled = false;
        Axis.control.enabled = false;

        // gaketdes Curve razec unda gaiaros kameram
        let curve = new THREE.CatmullRomCurve3([new THREE.Vector3(22, 16, 14), new THREE.Vector3(12, 3, 28), new THREE.Vector3(0, 0, 22)]);
        let camSpeed = 40 / 500; // kameris sichkare 

        // igebs curve-dan 700 wertils razec unda gaiaros kameram 
        this.cinemaPointsArray = curve.getPoints(700);
        let scope = this;

        function move() {
            scope.cinemaAnimation = requestAnimationFrame(move);
            core.camera.lookAt(0, 0.01, 0);

            // iwyebs kamera modzraobs winaswar gaweril gzaze
            if (!scope.cinemaRotationStatus && scope.cinemaZpoint == false) {
                core.camera.position.set(scope.cinemaPointsArray[scope.cinemaItr].x, scope.cinemaPointsArray[scope.cinemaItr].y, scope.cinemaPointsArray[scope.cinemaItr].z);
                scope.cinemaItr += scope.cinmeaItrMinus;

                if (core.camera.position.z > 21.99 && scope.cinemaItr == scope.cinemaPointsArray.length) {
                    scope.cinemaZpoint = true;
                    scope.cinemaItr -= 1;
                }
                if (scope.firstStep && scope.cinemaItr == 0) {
                    scope.stop();
                    return;
                }
            }

            // vamodzraot kamera z koordinatze 
            if (scope.cinemaZpoint) {
                core.camera.position.z -= camSpeed * scope.cinmeaItrMinus;
                // amowmebs sachiroa tu ara rotaciis dawyeba
                if (scope.firstStep == false && parseFloat(Math.abs(core.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)).toFixed(2))) < 0.15) {
                    scope.cinemaRotationDistance = parseFloat(core.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)).toFixed(2));
                    scope.cinemaZpoint = false;
                    scope.cinemaRotationStatus = true;
                }
                if (scope.firstStep && parseFloat(Math.abs(core.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)).toFixed(2))) > 21.99) scope.cinemaZpoint = false;
            }
            // iwyebs rotacias
            if (scope.cinemaRotationStatus) {
                core.camera.lookAt(0, 0.01, 0);
                core.camera.position.x = scope.cinemaRotationDistance * Math.cos(scope.cinemaAlpha);
                core.camera.position.z = scope.cinemaRotationDistance * Math.sin(scope.cinemaAlpha);
                scope.cinemaAlpha -= 0.01;

                // tu rotacia agar aris sachiro mashin iwyebs Z kordinantis inkrements
                if (parseFloat(scope.cinemaAlpha.toFixed(3)) < (-3 / 2) * Math.PI) {
                    scope.cinmeaItrMinus = -scope.cinmeaItrMinus;
                    scope.firstStep = true;
                    scope.cinemaZpoint = true;
                    scope.cinemaRotationStatus = false;
                }
            }
            scope.cinemaZ.copy(core.camera.position);
        }
        move();
    }
    // eshveba dronis funkcia freeFly
    freeFly() {
        if (this.droneIsActive) return;

        $("#axisScene").css("display", "none");

        if (core.camera.name == "orthographic") {
            core.switchCamera("perspective");
            $(".camera-mode").val("Perspective");
        }

        // cvlis kontrolis tips FlyControlze
        core.switchControl("fly");
        // tishavs axisis kontrols
        Axis.control.enabled = false;

        this.flyModeIsActive = true;
        this.droneIsActive = true;

        document.getElementById("axisScene").style.display = "none";
        document.getElementById("infoGraph").style.display = "block";
        document.getElementById("sIndicator").style.display = "block";
        document.getElementById("trinScene").style.display = "block";

        // sichkaris indikatori 
        let speedIndicator = document.getElementById("sIndicator");
        // mimartulebis machvenebeli 
        let triangleScene = document.getElementById("trinScene");

        triangleScene.style.display = "block";
        speedIndicator.style.display = "block";

        let scope2 = new Object();
        // mimartulis machveneblistvis aris sachiro
        scope2.start = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        // ikmneba scena mimartulebi machvenebeli sadac unda chavardes
        this.flyScene = new THREE.Scene();
        this.flyCamera = new THREE.PerspectiveCamera(75, $(triangleScene).width() / $(triangleScene).height(), 0.0001, 1000);
        this.flyCamera.position.set(0, 0, 5);

        this.flyRenderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.flyRenderer.setSize($(triangleScene).width(), $(triangleScene).height());

        triangleScene.appendChild(this.flyRenderer.domElement);

        // ikmneba sinatleebi
        let aLight = new THREE.AmbientLight(0xffffff, 0.6); // soft white light
        let pLight = new THREE.PointLight(0xffffff, 0.45);
        pLight.position.set(50, 50, 50);

        // ikmneba mimartulebis machvenebeli
        let triangleShape = new THREE.Shape();
        triangleShape.moveTo(0, 14);
        triangleShape.lineTo(-20, 10);
        triangleShape.lineTo(-40, 0);
        triangleShape.lineTo(0, 70);
        triangleShape.lineTo(40, 0); // close path
        triangleShape.lineTo(20, 10);
        triangleShape.lineTo(0, 14);

        let extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 12, steps: 2, bevelSize: 1, bevelThickness: 2 };
        let geometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);

        this.arTriangle = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x6900d1 }));
        this.arTriangle.position.set(0, 0, 0);
        this.arTriangle.scale.set(0.04, 0.04, 0.04);

        // iyreba scenashi yvelaferi rac shevkmenit
        this.flyScene.add(aLight);
        this.flyScene.add(pLight);
        this.flyScene.add(this.arTriangle);

        // funkci romelsac vawvdit FlyControlis Sichkares da shignit shesabamisi formulit mushavdeba 
        // es ricxvi da gamodis ekranze 
        function updateSpeedIndicator(value) {
            speedIndicator.innerHTML = (parseFloat(value.toFixed(6)) * 100000).toFixed(1).toString();
        }

        updateSpeedIndicator(core.control.movementSpeed);

        let scope = this;
        // eshveba freeFly funkcia
        var animate = function () {
            scope.flyAnimation = window.requestAnimationFrame(animate);
            scope.flyRenderer.render(scope.flyScene, scope.flyCamera);
        };

        animate();

        // mausis mgrdznobeloba 
        let mouseTolerance = 0.7;
        // centraluri X da Y -is migeba shesabamisi formulit
        let centerX = window.innerWidth * 0.5;
        let centerY = -window.innerHeight * 0.9;

        // daapdeiteba mimartulebis machveneblis  shesabamisi formulit
        let updateArrowFly = function (event) {
            if (core.control.movementSpeed < 0) {
                scope.arTriangle.rotation.y = ((event.clientX - centerX) / centerX) * mouseTolerance + 20;
                scope.arTriangle.rotation.x = ((event.clientY - centerY) / centerY) * mouseTolerance;
                scope.arTriangle.rotation.z = Math.PI;
            } else {
                scope.arTriangle.rotation.y = ((event.clientX - centerX) / centerX) * mouseTolerance;
                scope.arTriangle.rotation.x = ((event.clientY - centerY) / centerY) * mouseTolerance;
                scope.arTriangle.rotation.z = Math.PI / 360;
            }
        };
        updateArrowFly({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

        // mausis marcxena klikis dacheraze aktiurdeba es funkcia
        this.onmousedown = function (event) {
            // tu marcxena kliki iyo ukan brundeba 
            if (event.button >= 1) {
                flyFocus();
                return 0;
            }

            // apdeitdeba x-y gerdzebi 
            scope2.start.x = window.innerWidth / 2;
            scope2.start.y = window.innerHeight / 2;

            // rodesac marcxena kliks vaketebt controls win miyavs kamera 
            core.control.autoForward = true;
            // afdeitdeba kontroli
            core.control.updateMovementVector();

            // apdeitdeba mimartulebis machvenebeli
            updateArrowFly(event);
            // iwyeba mosmena mausis modzraobis
            window.addEventListener("pointermove", scope.mousemove);
        };

        // mausis modzraoba aafdeitebs mimartuldebas
        this.mousemove = function (event) {
            updateArrowFly(event);
        };
        // maus rodesac avushvebt chrdeba modzraoba 
        this.mouseup = function (event) {
            // tu marjvena klikia ar chrdeba da ukan brundeba 
            if (event.button >= 1) return 0;

            // itisheba avtomaturad winsvlis funkcia
            core.control.autoForward = false;
            // afdeitdeba kontroli
            core.control.updateMovementVector();

            // afdeitdeba mimartulebis machvenebeli 
            updateArrowFly({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

            // itisheba mausis modzraobis msmeneli
            window.removeEventListener("pointermove", scope.mousemove);
        };

        // rodesac fanjris zoma sheicvleba
        // icvleba mimartulebis machvenebeli
        this.resize = function (event) {
            scope.arTriangle.rotation.y = scope.resizeX;
            scope.arTriangle.rotation.x = scope.resizeY;
            scope.arTriangle.rotation.z = scope.resizeZ;
        };

        // 87 zrdis sichkares da afdeitdeba mimartulebis machvenebeli 
        // 83 amcirebs sichkares da afdeitdeba mimartulebis machvenebeli
        // 32 0 xdeba sichkare afdeitdeba mimartulebis machvenebeli
        // 27 tishavs funkcias
        this.flySpeed = function (event) {
            switch (event.keyCode) {
                case 87: // W
                    if (core.control.movementSpeed > 0.0005) {
                        return;
                    }
                    core.control.movementSpeed += 0.000001;
                    updateSpeedIndicator(core.control.movementSpeed);
                    break;
                case 83: // S
                    if (core.control.movementSpeed < -0.0005) {
                        return;
                    }
                    core.control.movementSpeed -= 0.000001;
                    updateSpeedIndicator(core.control.movementSpeed);
                    break;
                case 32: // SPACE
                    core.control.movementSpeed = 0;
                    updateSpeedIndicator(core.control.movementSpeed);
                    break;
                case 27: // ESC
                    scope.stop();
                    break;
            }
        };

        // amatebs mmausze dacheris ashvebis mausis modzraobis da klaviaturis eventListenrebs
        window.addEventListener("pointerdown", this.onmousedown);
        window.addEventListener("pointerup", this.mouseup);
        window.addEventListener("keydown", this.flySpeed);
        window.addEventListener("resize", this.resize);

        // xdeba orientaciis update zustad ar vici ras rogor aketebs radgan es levanis funkciaa da kargad ver gaverkvie
        function getLookValue(x, y, z, bool) {
            let q1 = new THREE.Quaternion();

            let bak = core.camera.getWorldQuaternion(q1);
            let val = core.camera.getWorldQuaternion(q1);
            let cur = core.camera;

            let m1 = new THREE.Matrix4();
            let target = new THREE.Vector3();
            let position = new THREE.Vector3();

            let parent = core.camera.parent;

            position.setFromMatrixPosition(cur.matrixWorld);

            if (cur.isCamera) {
                m1.lookAt(position, target, cur.up);
            } else {
                m1.lookAt(target, position, cur.up);
            }

            val.setFromRotationMatrix(m1);
            if (parent) {
                m1.extractRotation(parent.matrixWorld);
                q1.setFromRotationMatrix(m1);
                cur.quaternion.premultiply(q1.inverse());
            }
            if (bool) {
                val.x = parseFloat(val.x.toFixed(3));
                val.y = parseFloat(val.y.toFixed(3));
                val.z = parseFloat(val.z.toFixed(3));
                val.w = parseFloat(val.w.toFixed(3));
                bak.x = parseFloat(bak.x.toFixed(3));
                bak.y = parseFloat(bak.y.toFixed(3));
                bak.z = parseFloat(bak.z.toFixed(3));
                bak.w = parseFloat(bak.w.toFixed(3));
            }
            return { target: val, current: bak, rotation: val.rotation };
        }
        function flyFocus(x = 0, y = 0, z = 0) {
            if (arguments.length == 1) {
                x = arguments[0].x;
                y = arguments[0].y;
                z = arguments[0].z;
            }

            let targetRotation = getLookValue(x, y, z).target;
            let speed = 1;
            let clock = new THREE.Clock();

            function animate1() {
                let request = window.requestAnimationFrame(animate1);
                let delta = clock.getDelta();

                let w0 = targetRotation.w.toFixed(4),
                    x0 = targetRotation.x.toFixed(4),
                    y0 = targetRotation.y.toFixed(4),
                    z0 = targetRotation.z.toFixed(4);

                let w1 = core.camera.quaternion.w.toFixed(4),
                    x1 = core.camera.quaternion.x.toFixed(4),
                    y1 = core.camera.quaternion.y.toFixed(4),
                    z1 = core.camera.quaternion.z.toFixed(4);

                if (x0 == x1 && y0 == y1 && z0 == z1 && w0 == w1) {
                    window.cancelAnimationFrame(request);
                } else {
                    let step = speed * delta;
                    core.camera.quaternion.rotateTowards(targetRotation, step);
                }
            }
            animate1();
        }
    }
    // acherebs dronis im funkcias romelic aris chartuli da aaupdatebs scenas
    stop() {
        if (this.circleModeIsActive) {

            this.droneIsActive = false;

            core.control.autoRotate = false;
            core.control.enabled = false;
            core.control.enableDamping = false;
            core.control.update();
            core.control.enableDamping = true;
            core.control.enabled = true;

            this.correctAxis();
            Axis.control.enabled = true;

            this.circleModeIsActive = false;
            $(".circle-icon").removeClass("dronoModeColor");
        }

        if (this.helixModeIsActive) {
            cancelAnimationFrame(this.helixAnimation);
            this.correctAxis();

            core.control.enabled = true;
            Axis.control.enabled = true;

            if (this.scene.getObjectByName("fake") != undefined) {
                this.scene.remove(this.scene.getObjectByName("fake"));
                this.fakeCamera = undefined;
                // helix funkciashi shekmnili fakeCamera ishleba
            }

            this.helixModeIsActive = false;
            this.droneIsActive = false;

            $(".helix-icon").removeClass("dronoModeColor");
        }

        if (this.rocketModeIsActive) {
            cancelAnimationFrame(this.rocketAnimation);
            this.correctAxis();

            core.control.enabled = true;
            Axis.control.enabled = true;

            this.rocketModeIsActive = false;
            this.droneIsActive = false;

            $(".rocket-icon").removeClass("dronoModeColor");
        }

        if (this.dollyModeIsActive) {
            cancelAnimationFrame(this.dollyAnimation);

            core.camera.position.set(3, 3, 3);
            core.camera.fov = 75;
            core.camera.lookAt(0, 0, 0);

            core.camera.updateProjectionMatrix();

            core.control.enabled = true;
            Axis.control.enabled = true;

            this.dollyModeIsActive = false;
            this.droneIsActive = false;

            $(".dollyZoom-icon").removeClass("dronoModeColor");
        }

        if (this.z0ModeIsActive) {
            cancelAnimationFrame(this.cinemaAnimation);
            this.correctAxis();

            core.control.enabled = true;
            Axis.control.enabled = true;

            this.cinemaRotationStatus = false;
            this.cinemaZpoint = false;
            this.firstStep = false;
            this.cinemaInterupted = false;

            this.cinemaZ = new THREE.Vector3();
            this.cinemaPointsArray = [];

            this.cinemaAlpha = Math.PI / 2;
            this.cinmeaItrMinus = 1;
            this.cinemaItr = 0;

            this.z0ModeIsActive = false;
            this.droneIsActive = false;

            $(".animation-icon").removeClass("dronoModeColor");
        }

        if (this.flyModeIsActive) {
            cancelAnimationFrame(this.flyAnimation);
            this.disposeFreeFly();

            core.switchControl("orbit");

            this.flyModeIsActive = false;
            this.droneIsActive = false;

            $(".tracer-tree").removeClass("blockClick");
            $(".navigate-icon").removeClass("dronoModeColor");

            Axis.control.enabled = true;
            this.correctAxis();
        }

        $(".drone-btn").removeClass("droneActivated");
        $("#axisScene").css("display", "block");
        $(".drone-btn").removeClass("droneActivated");
    }
    // aukmenbs freeFly-istvis gankutvnil eventListeners romlebic pasuxismgeblebi arian mousminon mausis modzraobas dacheras ashveba klaviaturis gilakze dacheras
    disposeFreeFly() {
        // yvela event Listeners rac gamocxadebula an yvela cvladi romelic aigwera
        // FreeFly rejimshi anulebs
        window.removeEventListener("pointerdown", this.onmousedown);
        window.removeEventListener("keydown", this.flySpee);
        window.removeEventListener("pointerup", this.mouseup);
        window.removeEventListener("resize", this.resize);

        document.getElementById("axisScene").style.display = "block";
        document.getElementById("infoGraph").style.display = "none";
        document.getElementById("sIndicator").style.display = "none";
        document.getElementById("trinScene").style.display = "none";
        document.getElementById("trinScene").innerHTML = "";

        this.flyCamera = null;
        this.flyScene = null;
        this.flyRenderer = null;

    }

    // asworebs Axis amjamindeli kameris poziciis mixedvit
    correctAxis() {
        // xdeba korekcia Axisi
        // THREEJS klasi Spherical romelic abrunebs thetas phi radius da msgavs statusebs
        let sphere = new THREE.Spherical();
        // nulovani wertilidan aketebs vektors kameris poziciamde
        sphere.setFromVector3(core.camera.position);

        // radiusi axisis kameris poziciidan nulovan werilemda 
        let radius = Axis.camera.position.distanceTo(new THREE.Vector3(0, 0, 0));

        // dayeneba axisis kameris poziciss shesabamisi formulit
        Axis.camera.position.x = radius * Math.sin(sphere.theta) * Math.sin(sphere.phi);
        Axis.camera.position.y = radius * Math.cos(sphere.phi);
        Axis.camera.position.z = radius * Math.cos(sphere.theta) * Math.sin(sphere.phi);
        Axis.camera.lookAt(0, 0, 0);
    }


    constructor(scen) {
        this.scene = scen;
        // Circle funkciistvis gankutvnili cvladebi
        this.circleAnimation; // rtavs animationFrames 
        this.circleModeIsActive = false; // gveubneba aktiuria tu ara am tipis funkcia

        // Helix Mode
        this.helixAnimation; // rtavs animation frames
        this.helixModeIsActive = false; // gveubneba aktiuria tu ara am tipis funkcia

        // Rocket Mode
        this.rocketAnimation; // rtavs animation frames 
        this.rocketModeIsActive = false; // gveubneba aktiuria tu ara am tipis funkcia

        // Helix Mode
        this.dollyAnimation; // rtavs animation frames 
        this.dollyModeIsActive = false; // gveubneba aktiuria tu ara am tipis funkcia

        // Z0 Mode
        this.cinemaAnimation; // rtavs animation frames 
        this.z0ModeIsActive = false; // gveubneba aktiuria tu ara am tipis funkcia

        this.cinemaRotationStatus = false; // Rotaciis status aris tu ara sachiro daiwyos triali
        this.cinemaInterupted = false; // z0 funkciis gamortva tu moxda shua procesis dros
        this.cinemaZpoint = false; // iyo tu ara dawyebuli Z-koordinantze modzraoba 
        this.firstStep = false; // iyo tu ara damtavrebuli winaswar gaweril gzaze modzraoba 

        this.cinemaZ = new THREE.Vector3(); // vector Z koordinantistvis z0 funkciistvis 
        this.cinemaPointsArray = []; // z0 funkciis winaswar gzaa risi meshveobitac igeba, ak tavsdeba 3D vectorebi romelic asaxaven wertilebs risi dakavshirebac shemdeg xdeba 

        this.cinemaAlpha = Math.PI / 2; // rotaciistvis sachiro gradusi 
        this.cinmeaItrMinus = 1; // win wavides da ukan wamovides Z- koordinantze amistvis aris sachiro 
        this.cinemaItr = 0; // winaswar gaweril gzaze MASIVSHI romel indexze imyofeba kamera 

        this.cinemaRotationDistance; //  
        this.numberOfCinemaArrayPoints; // ramdeni wertilisgan shedgeba gza 

        // FreeFly Mode
        this.flyAnimation; // rtavs animation frames 
        this.flyModeIsActive = false; // // gveubneba aktiuria tu ara am tipis funkcia
        this.flyCamera; // freeFlystvis kamera 
        this.flyScene; // FreeFlystvis scena 
        this.flyRenderer; // FreeFlystvis renderer 
        this.onmousedown; //1  // 1-2-3-4 es aris eventListenerebi romelebic usmenen FreeFlys dros shemdegs : mousis dacheras ashveba fanjris zomis cvlilebas da mausis modzraobas
        this.mousemove;//2
        this.mouseup;//3
        this.resize;//4
        this.flySpeed; // ra sichkare aris freeFlys dros 
        this.resizeX = -1.08888; // asworebs triangles 
        this.resizeY = 0; // asworebs triangles 
        this.resizeZ = 0.0087266; // asworebs triangles 

        // tu romelime dronis funkcia ikneba aktiuri mashin droni aktiuria da shesabamisad es cvladi ikneba TRUE, winaagmdeg shemtxvevashi FALSE 
        this.droneIsActive = false;

    }
}
