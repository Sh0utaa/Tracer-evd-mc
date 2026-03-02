//////////////////////////////////////////////////////////////////////////////////
///   Nuclear Engineering Center at Georgian Technical University
///   TRACER Framework
///////////////////////////////////////////////////////   Creation History
///   Name:     snap.js
///   Subsystems: CORE
///   Path: \tracer-tmp\subsystem\core\r4.0\js\drone.js
///   Description: kmnis snapFiles anu imaxsovrebs scenis mdgomareobas JSON-is formatshi ra geometriebi chatvirtuli ra ganatebaa ra chra aris da ase shemdeg
// aseve kitxulobs am snapFiles da scenas shesabamisad aaupdeitebs
/// Functions:  
// createArrayOfGeometrys()
// getData()
// readText()
// jsonStringify()
// jsonParse()
// clearInputFile()
// displayContents()

///   Author: Luka Todua                  
///   Date: 26/04/2021
///////////////////////////////////////////////////////   Change History
///   Name: Irakli Kverenchkhiladze         
///   Date:  12/05/2021      
///   Description: geoemtriis klasis update, createArrayOfGeometrys funkciis update 
//////////////////////////////////////////////////////////////////////////////////


class Geometry {
    // JSon formatistvis gankutvnili klasi romelic gvexmareba geometriis identificirebashi
    // saxeli gamchirvaloba wireframe da chris tipi am otx status imaxsovrebs geometriis.
    constructor() {
        this.name;
        this.opacity;
        this.wireframe;
        this.cutType;
    }
}

class snapSaver {
    // igebs aktiur geometriebs scenidan da imaxsovrebs am geometriebs 'arr' masivshi
    createArrayOfGeometrys() {

        let arr = [];
        let geometries = core.getActiveGeometries();

        geometries.forEach((value, key) => {

            let a = new Geometry();
            a.name = value.name;
            a.cutType = value.cut;
            a.opacity = value.opacity;
            a.wireframe = value.wireframe;

            arr.push(a);

        });

        return arr;

    }
    // igebs yvela informacias scenis shesaxeb, ra aris chatvirtuli ra ganateba aris ra gamchirvalobaa aris tu ara wireframe chartuli
    // romeli kameraa chartuli da ase shemdeg 
    getData() {
        let geometries = this.createArrayOfGeometrys();

        let axisSwitch = true;
        let selected = false;
        let selectName = "";
        let isoView = "";

        for (var i = 0; i < document.getElementsByClassName("view-btn")[0].children[1].children.length; i++) {

            if (document.getElementsByClassName("view-btn")[0].children[1].children[i].classList.contains("active")) {
                isoView = document.getElementsByClassName("view-btn")[0].children[1].children[i].id;
                break;
            }

        }

        if (core.geometrySelected) {

            selected = true;
            selectedGeometry = core.getFirstIntersectedGeometry();
            selectName = selectedGeometry.name;

        }

        if (document.getElementById("axisScene").style.display == "none") {
            axisSwitch = false;
        }

        this.snap.scene = {

            brightness: ambLight.intensity,
            contrast: dirLight.intensity,
            axis: axisSwitch,
            stats: $(".show-stats").prop("checked"),
            preload: $(".geometry-preload").prop("checked"),
            ground: $("#show-ground").prop("checked"),
            activeCut: core.activeCut,
            activeView: isoView
            //	font
            //	dark-mode
        };

        this.snap.camera = {

            name: core.camera.name,
            position: core.camera.position,
            quaternion: core.camera.quaternion
            //axisPosition: axisScene.camera.position,
            // axisQuaternion: axisScene.camera.quaternion,

        };

        this.snap.controls = {

            name: core.control.name,
            target: core.control.target,
            rotateSpeed: core.control.rotateSpeed
            //axisRotateSpeed: axisControl.type.rotateSpeed,

        };

        this.snap.geometry = {

            activeGeometry: geometries,
            activeCut: core.activeCut,

        };

        this.snap.selection = {

            isSelected: selected,
            selectionName: selectName,

        };

    }

    // kitxulos SNAPFILES
    readText(filePath) {
        let scope = this;

        let reader = new FileReader();
        let output = "";

        if (filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                output = e.target.result;
                scope.displayContents(output);
            };
            reader.readAsText(filePath.files[0]);
        } else if (ActiveXObject && filePath) {
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                let file = reader.OpenTextFile(filePath, 1);
                output = file.ReadAll();
                file.Close();
                scope.displayContents(output);
            } catch (e) {
                if (e.number == -2146827859) {
                    console.log("Unable to access local files due to browser security settings");
                }
            }
        } else {
            return false;
        }
        return true;
    }

    // damushavebuli data rac aris migebuli scenidan imis JSON formatshi gadayvana 
    jsonStringify(data) {
        return JSON.stringify(data);
    }

    // JSON formatis parsireba 
    jsonParse(data) {
        return JSON.parse(data);
    }

    // chatvirtul snapfiles shlis romelic quee ar gachndes snapFilebis html documentshi
    clearInputFile(f) {
        if (f.value) {
            try {
                f.value = "";
            } catch (err) { }
            if (f.value) {
                var form = document.createElement("form"),
                    ref = f.nextSibling;
                form.appendChild(f);
                form.reset();
                ref.parentNode.insertBefore(f, ref);
            }
        }
    }

    // aapdeitebs scenas SNAPFILES mixedvit
    displayContents(data) {
        let parser = this.jsonParse(data);

        if (parser != undefined) {

            if (parser.snap.camera.name != "perspective") {

                $(".camera-mode").val("Orthographic");
                core.switchCamera("orthographic");


            } else {

                $(".camera-mode").val("Perspective");
                core.switchCamera("perspective");

            }

            //view gilakebis gaaqtiureba user interfaceshi snap datas mixedvit
            if (parser.snap.scene.activeView == "iso-view-btn") {

                $(".front-g, .left-g").hide();
                $(".iso-g").show();
                $(".view-icon").removeClass("active");
                $(".iso-view-btn").addClass("active");

            } else if (parser.snap.scene.activeView == "front-view-btn") {

                $(".iso-g, .left-g").hide();
                $(".front-g").show();
                $(".view-icon").removeClass("active");
                $(".front-view-btn").addClass("active");

            } else if (parser.snap.scene.activeView == "left-view-btn") {

                $(".iso-g, .front-g").hide();
                $(".left-g").show();
                $(".view-icon").removeClass("active");
                $(".left-view-btn").addClass("active");

            }

            //cut gilakebis gaaqtiureba user interfaceshi snap datas mixedvit
            if (parser.snap.geometry.activeCut == 1) {

                $(".cut-2-btn").removeClass("active");
                $(".cut-3-btn").removeClass("active");
                $(".cut-4-btn").removeClass("active");
                $(".cut-1-btn").addClass("active");
                $(".cut-g").hide();
                $(".cut-1-g").show();

            } else if (parser.snap.geometry.activeCut == 2) {

                $(".cut-1-btn").removeClass("active");
                $(".cut-3-btn").removeClass("active");
                $(".cut-4-btn").removeClass("active");
                $(".cut-2-btn").addClass("active");
                $(".cut-g").hide();
                $(".cut-2-g").show();

            } else if (parser.snap.geometry.activeCut == 3) {

                $(".cut-1-btn").removeClass("active");
                $(".cut-2-btn").removeClass("active");
                $(".cut-4-btn").removeClass("active");
                $(".cut-3-btn").addClass("active");
                $(".cut-g").hide();
                $(".cut-3-g").show();

            } else if (parser.snap.geometry.activeCut == 4) {

                $(".cut-1-btn").removeClass("active");
                $(".cut-2-btn").removeClass("active");
                $(".cut-3-btn").removeClass("active");
                $(".cut-4-btn").addClass("active");
                $(".cut-g").hide();
                $(".cut-4-g").show();

            }

            // //geometriis xeze geometriebis gasaaqtiureblad
            // for (let i in parser.snap.geometry.activeGeometry) {

            //     let activeGeoName = parser.snap.geometry.activeGeometry[i].name;

            //     $("span[name=" + activeGeoName + "]").addClass("active-tree-item");

            //     //	console.log(activeGeoName)
            //     if ($("span[name=" + activeGeoName + "]").hasClass("active-tree-item")) {

            //         $("span[name=" + activeGeoName + "]")
            //             .closest(".tree-2-li")
            //             .find(".tree-1-child, .tree-2-child, .tree-3-child, .tree-4-child, .tree-5-child, .tree-6-child")
            //             .addClass("active-tree-item");
            //         $("span[name=" + activeGeoName + "]")
            //             .closest(".tree-1-li")
            //             .find(".tree-1-child, .tree-2-child, .tree-3-child, .tree-4-child, .tree-5-child, .tree-6-child")
            //             .addClass("active-tree-item");
            //     }

            // }

            core.camera.position.copy(parser.snap.camera.position);
            // core.camera.quaternion.copy(parser.snap.camera.quaternion);
            // axisScene.camera.position.copy(parser.snap.camera.axisPosition);
            // axisScene.camera.quaternion.copy(parser.snap.camera.axisQuaternion);

            core.control.target.copy(parser.snap.controls.target);
            core.control.rotateSpeed = parser.snap.controls.rotateSpeed;

            document.getElementById("ObjSpeedSlider").value = parser.snap.controls.rotateSpeed;
            $(".ObjSpeed-value").html(parser.snap.controls.rotateSpeed);

            //axisControl.type.rotateSpeed = parser.snap.controls.axisRotateSpeed;

            ambLight.intensity = parser.snap.scene.brightness;
            document.getElementById("AmbLightSlider").value = parser.snap.scene.brightness;
            $(".AmbLight-value").html((parser.snap.scene.brightness * 100).toFixed(0) + "%");

            dirLight.intensity = parser.snap.scene.contrast;
            document.getElementById("DirLightSlider").value = parser.snap.scene.contrast;
            $(".DirLight-value").html((parser.snap.scene.contrast * 100).toFixed(0) + "%");

            if (parser.snap.scene.stats != true) {

                $(".trc-stats").addClass("hidden");
                document.getElementById("show-stats").checked = false;

            } else {

                $(".trc-stats").removeClass("hidden");
                document.getElementById("show-stats").checked = true;

            }

            if (parser.snap.scene.axis != true) {

                document.getElementById("axisScene").style.display = "none";
                document.getElementById("show-axis").checked = false;

            }

            for (let i in parser.snap.geometry.activeGeometry) {

                if (parser.snap.geometry.activeGeometry[i].wireframe == true) {

                    document.getElementById("wireframe-btn").classList.add("active");
                    core.worldWireframe(true);

                } else {

                    document.getElementById("wireframe-btn").classList.remove("active");
                    core.worldWireframe(false);

                }

            }

            let geoArr = [];

            for (let i in parser.snap.geometry.activeGeometry) {

                let geoName = parser.snap.geometry.activeGeometry[i];
                geoArr.push(geoName);

            }

            core.snapLoader(geoArr);

        }

    }

    constructor() {
        this.snap = new Object();
    }

}

// snap.event = {
// 	active: ,
// 	name:
// }

// snap.tracks = {
// 	active: $("#track-btn").prop("checked"),
// 	phi: $("#trackPhiFilter").val(),
// 	eta: $("#trackEtaFilter").val(),
// 	pt: $("#trackPTFilter").val(),
// 	theta: $("#trackThetaFilter").val(),
// 	muon:,
// 	electron:
// }
// snap.jets = {
// 	active: $("#jet-btn").prop("checked"),
// 	phi: $("#jetPhiFilter").val(),
// 	eta: $("#jetEtaFilter").val(),
// 	et: $("#jetETFilter").val(),
// 	theta: $("#jetThetaFilter").val()
// }
// snap.met = {
// 	active: $("#met-btn").prop("checked")
// }
// snap.cells = {
// 	active: $("").prop("checked")
// }
// snap.clusters = {
// 	active: $("").prop("checked")
// }
// snap.hits = {
// 	active: $("").prop("checked")
// }
// snap.vertices = {
// 	active: $("").prop("checked")
// }
