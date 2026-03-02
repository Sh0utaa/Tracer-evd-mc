//////////////////////////////////////////////////////////////////////////////////
///   Nuclear Engineering Center at Georgian Technical University
///   TRACER Framework
///////////////////////////////////////////////////////   Creation History
///   Name:     functions.js
///   Subsystems: CORE
///   Path: \tracer\subsystem\evd\r3.0\js\functions.js
///   Description: es aris funkciata ertoblioba romelic aris damatebiti damxmare funkciebi corestvis 

/// Functions:  
// followCamera()
// checkForParent()
// annotation()
// refreshLoop()
// setInterval()
// globalClip()
// drawEvent()
// showEventStatus()

///   Author: <ირაკლი კვერენჩხილაძე, Nino Zurashvili>                    
///   Date: <მაისი 2021>
///////////////////////////////////////////////////////   Change History
///   Name: <პროგრამისტის სახელი>          
///   Date:  <მოდიფიკაციის თარიღი>      
///   Description: <მოდიფიკაციის აღწერა>
//////////////////////////////////////////////////////////////////////////////////

// core-is mimartuli sinatlis pozicia icvlebakameris poziciis shesabamisad
function followCamera() {

    window.requestAnimationFrame(followCamera);
    // mimartuli sinatlis poziciis dayeneba shesabamisi formulit
    dirLight.position.set(

        core.camera.position.x + core.camera.position.x * 0.5,
        core.camera.position.y + core.camera.position.y * 0.1,
        core.camera.position.z + core.camera.position.z * -0.5

    );

};

// rodesac moxdeba geometriaze selekcia iwyeba dzebna am geometriis Mshobeli vin aris 
// magalitad pixelze tu moxdeba selekcia Parent ikneba innerDetector-i
// argumentad mienicheba HTML elementi
function checkForParent(elem) {
    let element = elem; // html elementi
    function check() {
        // edzebs elementis klasebshi tu aris klasi saxelad parentName
        if (element.classList.contains("parentName")) {
            // a igebs : elementis texti whitespacebis gareshe 
            let a = element.innerText.trim();
            // b igebs : a-s indexs sadac iwyeba axali line
            let b = a.indexOf("\n");
            let c;
            // tu b -s indexi metia -1 -ze 
            if (b != -1) {
                // c xdeba masivi a.split-s mixedvit 
                c = a.split("\n");
                // a xdeba c masivis menole elementi
                a = c[0];
                // shesabamis elementshi wers a s mnisvhnelobas
                $("#gmPr").text(a);
            } else {
                // shesabamis elementshi wers 'element' cvladis shida teksts 
                $("#gmPr").text(element.innerText);
            }
        } else {
            //elementi igebs tavisi mshobelis mnishvnelobas, anu edzebs ikamde sanam ar ipovis klasslistshi klass "parentNames"
            element = element.parentElement;
            check();
        }
    }
    check();
}


// Gamoakvs geometriis mdgomareoba, aris tu ara wireframeshi ra doneze aris gamchirvaloba romel chrashia saxeli da parentis saxeli
// pirveli argumentis mixedvit xdeba anotaciis gamoatana tu true aris gamodis tu falsea kreba 
// geo aris tviton geometria rasac vawodebt rom ipovos misi mshobeli geometriis xeze 
function annotation(show = true, geo) {
    if (show == false) {
        $(".track-info-table").removeClass("d-flex");
        $(".track-jet-info").removeClass("d-flex");
    } else {
        let g = geo; // geometria 
        let name = g.name; // geometriis saxeli 
        let cutType = "none"; // chris tipi 
        let op = g.opacity.toFixed(1); // gamchirvaloba 
        let wrframe = g.wireframe; // wireframe 

        // tu geometriis chris tipi aris 1-chra
        if (g.cut.indexOf(1) != -1) {
            cutType = 1;
        } else if (g.cut.indexOf(2) != -1) { // tu geometriis chris tipi aris 2-chra
            cutType = 2;
        } else if (g.cut.indexOf(3) != -1) { // tu geometriis chris tipi aris 3-chra
            cutType = 3;
        }

        // edzebs HTML documentshi geometriis saxelis meshveobit shesabamis HTML elements 
        let el = document.getElementsByName(name);
        // edzebs am HTML elementis mshobels
        checkForParent(el[0]);

        $("#gmNm").text(name); // wers geometriis saxels HTML elementshi
        $("#gmCt").text(cutType); // chras 
        $("#gmOp").text(op); // gamchirvalobas 
        $("#gmWr").text(wrframe); // wireframes 

        $(".track-info-table").addClass("d-flex");
        $(".justify-content-center").addClass("d-flex");
    }
}

// FPS
let times = []; // drois masivi 
let fps; // fps 

// itvlis ramdeni frame aris wamshi	
function refreshLoop() {
    // iwyebs animaciis loops
    window.requestAnimationFrame(function () {
        const now = performance.now(); // gvibrunebs DOMHighResTimeStamp ramdenia wamshi
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }

        times.push(now); // yris time masivshi now-s 
        fps = times.length; // fps aris times masivis sigrdze 
        // rekursia 
        refreshLoop();
    });
}
// yovel 1 wamshi aapdeitebs FPS-is da Samkutxedebis raodenobas scenashi 
setInterval(function () {
    $(".stats_fps").html("FPS: " + fps);
    $(".stats_triangles").html("TRIANGLES: " + core.renderer.info.render.triangles);
}, 1000);


refreshLoop();

// abrunebs true/false 
// materialis clipIntersection statusi chartuli aris tu ar aris
function getMaterialIntersectionStatus() {
    // a aris aktiuri geometriebi
    let a = core.getActiveGeometries();
    let status = false; // statusi 
    // a-s menole elementis shvilebis chamovla xdeba 
    a[0].value.traverse(function (child) {
        if (child.isMesh) {
            // tu materialis clipIntersection chartulia abrunebs trues 
            if (child.material.clipIntersection) {
                status = true;
            }
        }
    });
    return status;
};

// dayeneba yvela aktiuri geometriis materialIntersectionis statusi
// igebs argumentad true/false
function setMaterialIntersectionStatus(status) {
    // igebs yvela aktiur geometrias 
    let a = core.getActiveGeometries();
    // uvlis yvela am geometrias ciklis meshveobit 
    for (var i = 0; i < a.length; i++) {
        // uvlis am geometriis shvilebs 
        a[i].value.traverse(function (child) {
            if (child.isMesh) {
                // adzlevs arguments materialisClipintersections
                child.material.clipIntersection = status;
            }
        });
    }
};

// usmens klaviaturas, tu ESC-pze moxda dachera mashin tishavs drons
function listenKeys(event) {
    // event.keyCode nishnavs : klaviaturaze yvela gilaks tavisi cifruli mnishvneloba gaachnia
    // 27 aris ESC da tu ESC davachert gatishavs drunis funkcias romelic aris chartuli
    if (event.keyCode == 27) {
        if (drone.droneIsActive) {
            drone.stop();
        }
        if (particleAnimation.animateParticles) {
            particleAnimation.stop();
            drawEvent("skip");
        }

    }
    // tu gaaktiurebulia selekcia unselekts aketebs 
    if (core.geometrySelected) {
        core.geometrySelected = false; // cvladi gansazgvars aris tu ara geometria monishnuli 
        core.selection(); // tu geometria monishnulia aketebs selekcias da shemdgom etapebs, tu ar aris aukmebs selekcias
    }

}

function drawEvent(reset = false) {

    if (reset == true) {

        for (var i = 0; i < clip_planes.length; i++) {
            clip_planes[i].constant = 0;
        }

        return;
    }

    if (reset == "skip") {

        for (var i = 0; i < clip_planes.length; i++) {
            clip_planes[i].constant = 10;
        }
    }

    if (clip_planes[0].constant > 1) return;
    for (var i = 0; i < clip_planes.length; i++) {
        clip_planes[i].constant += 0.0025;
    }
}

// tu eventis romelime obieqti aris gaaqtiurebuli ainteba eventis gilaki, tu arada chaqreba
function showEventStatus() {
    for (var i = 0; i < $(".event-form-check").length; i++) {
        if ($(".event-form-check")[i].checked) {
            $(".event-menu-btn").addClass("active");
            return;
        }
    }
    $(".event-menu-btn").removeClass("active");
}


window.addEventListener('keydown', listenKeys);