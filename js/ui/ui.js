//////////////////////////////////////////////////////////////////////////////////
///   Nuclear Engineering Center at Georgian Technical University
///   TRACER Framework
///////////////////////////////////////////////////////   Creation History
///   Name:     ui.js
///   Subsystems: EVD
///   Path: \tracer\subsystem\evd\r3.0\js\ui\ui.js
///   Description: UI-stvis gankutvnili funkciebi
/// Functions:
// is_touch_enabled () { }
// $(".view-btn").on("click", function () {})
// $(".cut-btn").on("click", function () {})
// $(".drone-btn").on("click", function () {})
// $(".opacity-btn").on("click", function () {})
// $(".event-menu-btn").click(function () {})
// $(".settings-btn").click(function () {})
// $(".about-btn").click(function () {})
// $(".event-menu-close-btn").click(function () {})
// $(".settings-menu-close-btn").click(function () {})
// $(".about-menu-close-btn").click(function () {})
// $(".error-warning-menu-close-btn").click(function () {})
// $(".event-folder").click(function () {})
// $("#draggable1").draggable({})
// $("#draggable2").draggable({})
// $("#draggable3").draggable({})
// $("#draggable4").draggable({})
// $(".settings-scene").click(function () {})
// $(".settings-advanced").click(function () {})
// $(".settings-ui").click(function () {} )
// $(".AmbLightSlider").on("input", function () {} )
// $(".DirLightSlider").on("input", function () {} )
// $(".bojSpeedSlider").on("input", function () {} )
// $(".show-axis").on("input", function () {} )
// $(".show-stats").on("input", function () {} )
// $("#lightMode").on("input", function () {} )
// $(".menu-btn").click(function () {} )
// $(".fullScreen-btn").click(function () {} )
// $("#clipping-slider").on("input", function () {} )
// $("#opacity-slider").on("input", function () {} )
// $(".cut-1-btn").click(function () {} )
// $(".cut-2-btn").click(function () {} )
// $(".cut-3-btn").click(function () {} )
// $(".cut-4-btn").click(function () {} )
// $(".cut-slider-icon").click(function () {} )
// $(".view-btn").click(function () {})
// $("#wireframe-btn").click(function (event) {})
// $(".camera-mode").change(function () {})
// $(".left-view-btn").click(function () {})
// $(".front-view-btn").click(function () {})
// $(".iso-view-btn").click(function () {})
// $(".drone-icon").click(function () {})
// $(".navigate-icon").click(function () {})
// $(".circle-icon").click(function () {})
// $(".helix-icon").click(function () {})
// $(".dollyZoom-icon").click(function () {})
// $(".rocket-icon").click(function () {})
// $(".animation-icon").click(function () {})
// $("#geometry-preload").click(function () {})
// $("#prld-a").click(function () {})
// $("#prld-d").click(function () {})
// $("#prld-ok").click(function () {})
// $("#uploadSnap").change(function () {})
// $("#downloadSnap").click(function () {})
// $("#show-ground").click(function () {})

///   Author: Irakli Kverenchkhiladze, Luka Todua, Nino Zurashvili
///   Date: 26/04/2021
///////////////////////////////////////////////////////   Change History
///   Name:
///   Date:
///   Description:
//////////////////////////////////////////////////////////////////////////////////

//to detect which drone mode user chose
let droneMode;

function is_touch_enabled() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
$(document).ready(function () {
  if (core.loading) return;
  if (drone.flyModeIsActive) return;

  $(document).bind("touchend pointerdown", function (e) {
    var containermenu = $(".error-warning-menu");

    if (
      !containermenu.is(e.target) && // if the target of the click isn't the container...
      containermenu.has(e.target).length === 0
    ) {
      // ... nor a descendant of the container
      // $(".error-warning-menu").hide();
    }
    var dropdownmenu1 = $(".view-btn");
    var dropdownmenu2 = $(".cut-btn");
    var dropdownmenu3 = $(".drone-btn");
    var dropdownmenu4 = $(".opacity-btn");

    if (
      !dropdownmenu1.is(e.target) && // if the target of the click isn't the container...
      dropdownmenu1.has(e.target).length === 0
    ) {
      // ... nor a descendant of the container
      $(".view-btn").find(".dropdown").addClass("hidden");
      $(".view-btn").removeClass("noBottomBorderRadius");
    }
    if (
      !dropdownmenu2.is(e.target) && // if the target of the click isn't the container...
      dropdownmenu2.has(e.target).length === 0
    ) {
      // ... nor a descendant of the container
      $(".cut-btn").find(".dropdown").addClass("hidden");
      $(".cut-btn").removeClass("noBottomBorderRadius");
    }
    if (
      !dropdownmenu3.is(e.target) && // if the target of the click isn't the container...
      dropdownmenu3.has(e.target).length === 0
    ) {
      // ... nor a descendant of the container
      $(".drone-btn").find(".dropdown").addClass("hidden");
      $(".drone-btn").removeClass("noBottomBorderRadius");
    }
    if (
      !dropdownmenu4.is(e.target) && // if the target of the click isn't the container...
      dropdownmenu4.has(e.target).length === 0
    ) {
      // ... nor a descendant of the container
      $(".opacity-btn").find(".dropdown").addClass("hidden");
      $(".opacity-btn").removeClass("noBottomBorderRadius");
    }
  });
});
//dropdowns
if (!is_touch_enabled()) {
  $(".view-btn").hover(
    function () {
      if (drone.droneIsActive) return;
      $(this).find(".dropdown").removeClass("hidden");
      $(this).addClass("noBottomBorderRadius");
    },
    function () {
      if (drone.droneIsActive) return;
      $(this).find(".dropdown").addClass("hidden");
      $(this).removeClass("noBottomBorderRadius");
    }
  );
  $(".cut-btn").hover(
    function () {
      if (core.loading) return;
      if (drone.flyModeIsActive) return;
      $(this).find(".dropdown").removeClass("hidden");
      $(this).addClass("noBottomBorderRadius");
    },
    function () {
      if (core.loading) return;
      if (drone.flyModeIsActive) return;
      $(this).find(".dropdown").addClass("hidden");
      $(this).removeClass("noBottomBorderRadius");
    }
  );
  $(".drone-btn").hover(
    function () {
      $(this).find(".dropdown").removeClass("hidden");
      $(this).addClass("noBottomBorderRadius");
      $(".tracer-sidebar").css("z-index", "0");
    },
    function () {
      $(this).find(".dropdown").addClass("hidden");
      $(this).removeClass("noBottomBorderRadius");
      $(".tracer-sidebar").css("z-index", "2000");
    }
  );
  $(".opacity-btn").hover(
    function () {
      if (core.loading) return;
      if (drone.flyModeIsActive) return;
      $(this).find(".dropdown").removeClass("hidden");
      $(this).addClass("noBottomBorderRadius");
    },
    function () {
      if (core.loading) return;
      if (drone.flyModeIsActive) return;
      $(this).find(".dropdown").addClass("hidden");
      $(this).removeClass("noBottomBorderRadius");
    }
  );
}

// Cameris xedvebis sekciis chamoshla/aweva
$(".view-btn").on("click", function () {
  if (drone.droneIsActive) return;
  $(this).find(".dropdown").toggleClass("hidden");
  $(this).toggleClass("noBottomBorderRadius");
});

// Geometriis chrebis sekciis chamoshla/aweva
$(".cut-btn").on("click", function () {
  if (core.loading) return;
  if (drone.flyModeIsActive) return;
  $(this).find(".dropdown").toggleClass("hidden");
  $(this).toggleClass("noBottomBorderRadius");
});

// dronis funkciebis sekciis chamoshla/aweva
$(".drone-btn").on("click", function () {
  $(this).find(".dropdown").toggleClass("hidden");
  $(this).toggleClass("noBottomBorderRadius");
  $(".tracer-sidebar").css("z-index", "0");
});

// gamchirvalobis slideris gamochena/gakroba
$(".opacity-btn").on("click", function () {
  if (core.loading) return;
  if (drone.flyModeIsActive) return;

  $(this).find(".dropdown").toggleClass("hidden");
  $(this).toggleClass("noBottomBorderRadius");
});

//chartva/gamortva eventebis meniusi
$(".event-menu-btn").click(function () {
  if (core.loading) return;

  $(".event-menu").toggle();
  // $(this).toggleClass("active");
  $(".trc-menu").removeClass("high-z-index");
  $(".event-menu").addClass("high-z-index");
  showEventStatus();
});

// menius gamochena/chartva
$(".settings-btn").click(function () {
  if (core.loading) return;
  if (drone.droneIsActive) return;

  $(".settings-menu").toggle();
  $(this).toggleClass("active");
  $(".trc-menu").removeClass("high-z-index");
  $(".settings-menu").addClass("high-z-index");
});

// about menius gamochena chartva
$(".about-btn").click(function () {
  if (drone.droneIsActive) return;

  $(".about-menu").toggle();
  $(this).toggleClass("active");
  $(".trc-menu").removeClass("high-z-index");
  $(".about-menu").addClass("high-z-index");
});

// eventebis menius daxurvis iconaze dacheris shemdeg moxdes gatishva
$(".event-menu-close-btn").click(function () {
  $(".event-menu").toggle();
});
// settingis menius daxurvis iconaze dacheris shemdeg moxdes gatishva
$(".settings-menu-close-btn").click(function () {
  $(".settings-menu").toggle();
  $(".settings-btn").toggleClass("active");
});

// about menius daxurvis iconaze dacheris shemdeg moxdes gatishva
$(".about-menu-close-btn").click(function () {
  $(".about-menu").toggle();
  $(".about-btn").toggleClass("active");
});

// warningis menius daxurvis iconaze dacheris shemdeg moxdes gatishva
$(".error-warning-menu-close-btn").click(function () {
  $(".error-warning-menu").toggle();
});

//EVENT folderebis ganyofilebashi xdeba shesabamisi funkciebi raca ris moyvanili kvemot
// eventis informaciis kvevit chamoweva/aweva
$(".event-folder").click(function () {
  if ($(".event-menu-load").is(":visible")) {
    $(".event-menu-load").slideUp();
  } else {
    $(".event-menu-load").slideDown();
  }
  $(".event-menu-load-top-splitter").slideToggle();
});

$(function () {
  // draggable1-2-3-4 moxdes otxive elementze drag funkcia
  $("#draggable1").draggable({
    start: function (event, ui) {
      $(this).addClass("pos-auto");
    },
    end: function (event, ui) {
      $(this).removeClass("pos-auto");
    },
    handle: "#geometry-menu-handle",
    containment: "window",
  });
  $("#draggable2").draggable({
    start: function (event, ui) {
      $(this).addClass("pos-auto");
    },
    end: function (event, ui) {
      $(this).removeClass("pos-auto");
    },
    handle: "#settings-menu-handle",
    containment: "window",
  });

  $("#draggable3").draggable({
    start: function (event, ui) {
      $(this).addClass("pos-auto");
    },
    end: function (event, ui) {
      $(this).removeClass("pos-auto");
    },
    handle: "#event-menu-handle",
    containment: "window",
  });

  $("#draggable4").draggable({
    start: function (event, ui) {
      $(this).addClass("pos-auto");
    },
    end: function (event, ui) {
      $(this).removeClass("pos-auto");
    },
    handle: "#about-menu-handle",
    containment: "window",
  });

  $("#draggable5").draggable({
    start: function (event, ui) {
      $(this).addClass("pos-auto");
    },
    end: function (event, ui) {
      $(this).removeClass("pos-auto");
    },
    handle: "#evd-mc-handle",
    containment: "window",
  });
});

// settingebis meniushi arsebuli scenis ganyofilebis damushaveba da swori ganlageba
$(".settings-scene").click(function () {
  if ($(".settings-scene").find(".feather-plus").is(":visible")) {
    $(".settings-scene").find(".feather-plus").hide();
    $(".settings-scene").find(".feather-minus").show();
    $(".settings-scene-body").slideDown();
  } else {
    $(".settings-scene").find(".feather-plus").show();
    $(".settings-scene").find(".feather-minus").hide();
    $(".settings-scene-body").slideUp();
  }
});

// settingebis meniushi arsebuli Advanced ganyofilebis damushaveba da swori ganlageba
$(".settings-advanced").click(function () {
  if ($(".settings-advanced").find(".feather-plus").is(":visible")) {
    $(".settings-advanced").find(".feather-plus").hide();
    $(".settings-advanced").find(".feather-minus").show();
    $(".settings-advanced-body").slideDown();
  } else {
    $(".settings-advanced").find(".feather-plus").show();
    $(".settings-advanced").find(".feather-minus").hide();
    $(".settings-advanced-body").slideUp();
  }
});

// settingebis meniushi arsebuli Ui-s ganyofilebis damushaveba da swori ganlageba
$(".settings-ui").click(function () {
  if ($(".settings-ui").find(".feather-plus").is(":visible")) {
    $(".settings-ui").find(".feather-plus").hide();
    $(".settings-ui").find(".feather-minus").show();
    $(".settings-ui-body").slideDown();
  } else {
    $(".settings-ui").find(".feather-plus").show();
    $(".settings-ui").find(".feather-minus").hide();
    $(".settings-ui-body").slideUp();
  }
});

// Sinatlis sliderze valuebis shecvla
$(".AmbLightSlider").on("input", function () {
  $(".AmbLight-value").html((this.value * 100).toFixed(0) + "%");
  ambLight.intensity = parseFloat(this.value);
});

// Sinatlis sliderze valuebis shecvla
$(".DirLightSlider").on("input", function () {
  $(".DirLight-value").html((this.value * 100).toFixed(0) + "%");
  dirLight.intensity = parseFloat(this.value);
});

// controlis sichkaris sliderze valuebis shecvla
$(".ObjSpeedSlider").on("input", function () {
  $(".ObjSpeed-value").html(this.value);
  core.control.rotateSpeed = this.value;
  Axis.control.rotateSpeed = this.value;
});

//Axis chartva/gamortva
$(".show-axis").on("input", function () {
  $("#axisScene").toggle("hidden");
});

// FPS chartva/gamortva
$(".show-stats").on("input", function () {
  $(".trc-stats").toggleClass("hidden");
});

// ar aris dasrulebuli
$("#lightMode").on("input", function () {
  // staff..
});

// do we really need font styles on ui??
// $("#roboto").on("input", function () {

//     $("body").addClass("roboto").removeClass("jura");

// });

// $("#jura").on("input", function () {

//     $("body").addClass("jura").removeClass("roboto");

// });

//geometriis xis chartva/gamortva
$(".menu-btn").click(function () {
  $(".tracer-sidebar").toggle();
  $(this).toggleClass("active");
});

// fanjris gadideba fullsize-ze da dapataraveba
$(".fullScreen-btn").click(function () {
  if (core.loading) return;
  if (drone.droneIsActive) return;

  if (
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)
  ) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }

    return;
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }

    return;
  }
});

// geometrebis chris slideri sadac shemodis valuebi da shesabamisi formulis meshveobit axdens geometriebis chras
$("#clipping-slider").on("input", function () {
  if ($(this).val() <= 0) {
    if (getMaterialIntersectionStatus() == false)
      setMaterialIntersectionStatus(true);
  } else {
    if (getMaterialIntersectionStatus()) setMaterialIntersectionStatus(false);
    if ($(this).val() > 3.14139264) {
      core.clipPlanes[0].normal = new THREE.Vector3(
        -1 * Math.cos(Math.PI),
        -1 * Math.sin(Math.PI),
        0
      );
      return;
    }
  }
  core.clipPlanes[0].normal = new THREE.Vector3(
    -1 * Math.cos($(this).val()),
    -1 * Math.sin($(this).val()),
    0
  );
});

// gamchirvalobis slideri sadac shemodis valuebu
$("#opacity-slider").on("input", function () {
  if ($(this).val() == "99.1") {
    $(".opacity-btn").removeClass("active");
  } else {
    $(".opacity-btn").addClass("active");
  }

  if (this.value < 40) {
    document.getElementById("opacity-slider").step = "0.1";
  } else {
    document.getElementById("opacity-slider").step = "2";
  }

  if (core.geometrySelected) {
    core.localTransparency(this.value);
  } else {
    core.worldTransparency(this.value);
  }
});
//Cut1
//Cut2
//Cut3
//Cut4
//cut-slider-icon
// am chamonatvals yvelas igive struktura akvs amitom Cut1-shi agwerili shinaarsi am funkcionalis, identuria danarchen otxshic.

//tvirtavs geometriebs shesabamis chrashi da chris gilaks anichebs an artmevs 'active' klass
$(".cut-1-btn").click(function () {
  if (core.loading) return;
  //cut1 chraze click-isas xdeba geometriebis naxevar chrashi chamotvirtva
  core.cut(1);
  //amowmebs tu gilaki aris chartuli(anu aqvs tu ara minichebuli 'active' klasi)
  if ($(this).hasClass("active")) {
    //ushlis 'active' klass
    $(this).removeClass("active");
    $(".cut-g").hide();
    $(".no-cut-g").show();
    $(".cut-dropwdown").addClass("hidden");
  } else {
    //tu gilaki gamortulia, xdeba sxva cut gilakebis gatishva('active' klasis washla) da mocemuli cut gilakis chartva 'active' klasis minicheba
    $(".cut-2-btn").removeClass("active");
    $(".cut-3-btn").removeClass("active");
    $(".cut-4-btn").removeClass("active");
    $(this).addClass("active");
    $(".cut-g").hide();
    $(".cut-1-g").show();
    $("#cut-slider-icon").removeClass("active");
    $("#geometry-cut-slider").addClass("hidden");

    core.clipPlanes[0].normal = new THREE.Vector3(0, 0, 0);
    core.renderer.localClippingEnabled = false;
  }
});
//Cut2
$(".cut-2-btn").click(function () {
  if (core.loading) return;
  core.cut(2);

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(".cut-g").hide();
    $(".no-cut-g").show();
    $(".cut-dropwdown").addClass("hidden");
  } else {
    $(".cut-dropwdown").addClass("hidden");
    $(".cut-1-btn").removeClass("active");
    $(".cut-3-btn").removeClass("active");
    $(".cut-4-btn").removeClass("active");
    $(this).addClass("active");
    $(".cut-g").hide();
    $(".cut-2-g").show();
    $("#cut-slider-icon").removeClass("active");
    $("#geometry-cut-slider").addClass("hidden");
    core.clipPlanes[0].normal = new THREE.Vector3(0, 0, 0);
    core.renderer.localClippingEnabled = false;
  }
});
//Cut3
$(".cut-3-btn").click(function () {
  if (core.loading) return;
  core.cut(3);

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(".cut-g").hide();
    $(".no-cut-g").show();
    $(".cut-dropwdown").addClass("hidden");
  } else {
    $(".cut-dropwdown").addClass("hidden");
    $(".cut-1-btn").removeClass("active");
    $(".cut-2-btn").removeClass("active");
    $(".cut-4-btn").removeClass("active");
    $(this).addClass("active");
    $(".cut-g").hide();
    $(".cut-3-g").show();
    $("#cut-slider-icon").removeClass("active");
    $("#geometry-cut-slider").addClass("hidden");
    core.clipPlanes[0].normal = new THREE.Vector3(0, 0, 0);
    core.renderer.localClippingEnabled = false;
  }
});
//Cut4
$(".cut-4-btn").click(function () {
  if (core.loading) return;
  core.cut(4);

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(".cut-g").hide();
    $(".no-cut-g").show();
    $(".cut-dropwdown").addClass("hidden");
    $(".cut-dropwdown").addClass("hidden");
  } else {
    $(".cut-1-btn").removeClass("active");
    $(".cut-2-btn").removeClass("active");
    $(".cut-3-btn").removeClass("active");
    $("#cut-slider-icon").removeClass("active");
    $("#geometry-cut-slider").addClass("hidden");
    $(this).addClass("active");
    $(".cut-g").hide();
    $(".cut-4-g").show();
    $("#cut-slider-icon").removeClass("active");
    $("#geometry-cut-slider").addClass("hidden");
    core.clipPlanes[0].normal = new THREE.Vector3(0, 0, 0);
    core.renderer.localClippingEnabled = false;
  }
});

// Dynamic cut
$("#cut-slider-icon").click(function () {
  if (core.loading) return;

  if ($("#geometry-cut-slider").hasClass("hidden")) {
    $(".cut-1-btn").removeClass("active");
    $(".cut-2 btn").removeClass("active");
    $(".cut-3-btn").removeClass("active");
    $(".cut-4-btn").removeClass("active");
    $(this).addClass("active");
    $(".cut-g").hide();
    $(".cut-5-g").show();
    $("#geometry-cut-slider").removeClass("hidden");
    $(".cut-dropwdown").addClass("hidden");

    core.cut(0);
    core.renderer.localClippingEnabled = true;
  } else {
    $(".cut-dropwdown").addClass("hidden");
    $(".cut-1-btn").removeClass("active");
    $(".cut-2-btn").removeClass("active");
    $(".cut-4-btn").removeClass("active");
    $(this).removeClass("active");
    $(".cut-3-btn").addClass("active");
    $("#geometry-cut-slider").addClass("hidden");
    $(".cut-g").hide();
    $(".cut-3-g").show();

    core.clipPlanes[0].normal = new THREE.Vector3(0, 0, 0);
    core.renderer.localClippingEnabled = false;
    core.cut(3);
  }
});

// aaktiurebs kamera view-s
$(".view-btn").click(function () {
  if (drone.droneIsActive == false) {
    $(".view-btn").removeClass("active");
    $(this).addClass("active");
  }
});

// aaktiurebs an deaktivacias uketebs wireframe buttons, aktivacia nishnavs rom ubralod lurjdeba icona wireframeis
$("#wireframe-btn").click(function (event) {
  event.preventDefault();

  if (core.loading) return;
  if (drone.flyModeIsActive) return;

  if (!$(".wirefram-btn").hasClass("active")) {
    $(this).addClass("active");
    if (core.geometrySelected) {
      core.localWireframe(true);
    } else {
      core.worldWireframe(true);
    }
  } else {
    $(this).removeClass("active");
    if (core.geometrySelected) {
      core.localWireframe(false);
    } else {
      core.worldWireframe(false);
    }
  }
});

// ortograpiuli/perspectivi am ori kameris shecvlebi
$(".camera-mode").change(function () {
  if (core.loading) return;
  if (drone.droneIsActive) return;

  let cameramode = $(".camera-mode option:selected").text().toLowerCase();
  core.switchCamera(cameramode);
});

// ayenebs kameras shesabamis poziciashi rodesac kameri-s view-bs chamovshlit da davachert marcxena xedvis icons
$(".left-view-btn").click(function () {
  core.camera.position.set(
    core.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)),
    0,
    0
  );
  core.camera.lookAt(0, 0, 0);

  $(".iso-g, .front-g").hide();
  $(".left-g").show();
  $(".view-icon").removeClass("active");
  $(this).addClass("active");
});

// ayenebs kameras shesabamis poziciashi rodesac kameri-s view-bs chamovshlit da davachert wina xedvis icons
$(".front-view-btn").click(function () {
  core.camera.position.set(
    0,
    0,
    core.camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
  );
  core.camera.lookAt(0, 0, 0);

  $(".iso-g, .left-g").hide();
  $(".front-g").show();
  $(".view-icon").removeClass("active");
  $(this).addClass("active");
});

// ayenebs kameras shesabamis poziciashi rodesac kameri-s view-bs chamovshlit da davachert iso xedvis icons
$(".iso-view-btn").click(function () {
  core.camera.position.set(
    core.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) / 1.732,
    core.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) / 1.732,
    core.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) / 1.732
  );
  core.camera.lookAt(0, 0, 0);

  $(".front-g, .left-g").hide();
  $(".iso-g").show();
  $(".view-icon").removeClass("active");
  $(this).addClass("active");
});

// dacheris shemtxvevasshi tu chartuli dronis romelime funkcia tishavs
$(".drone-icon").click(function () {
  if (drone.droneIsActive) {
    drone.stop();
    return;
  }
});

// rtavs navigaciis funkcias dronidan rodesac davachert shesabamis gilaks
$(".navigate-icon").click(function () {
  $(".settings-menu").hide();
  $(".settings-btn").removeClass("active");

  if (core.camera.name == "orthographic") {
    document
      .getElementsByClassName("prld-Msg2")[0]
      .classList.remove("error-warning-d-flex2");
    $(".error-warning-message").text(
      "Your current camera mode is Orthographic, this type of camera can't work properly with drone functionalities, so we changed it to perspective."
    );
    $(".error-warning-menu").toggle();
    $(".navigate-icon").addClass("dronoModeColor");
    droneMode = "fm";
    return;
  }

  if (drone.droneIsActive) {
    if (!drone.flyModeIsActive) {
      drone.stop();
      drone.freeFly();
      $(".drone-btn").addClass("droneActivated");
      $(".tracer-tree").addClass("blockClick");
      $(".navigate-icon").addClass("dronoModeColor");
      $(".tracer-sidebar").css("z-index", "2000");
    } else {
      drone.stop();
    }
  } else {
    drone.freeFly();
    $(".drone-btn").addClass("droneActivated");
    $(".tracer-tree").addClass("blockClick");
    $(".navigate-icon").addClass("dronoModeColor");
    $(".tracer-sidebar").css("z-index", "2000");
  }
});

$(".circle-icon").click(function () {
  $(".settings-menu").hide();
  $(".settings-btn").removeClass("active");

  if (core.camera.name == "orthographic") {
    document
      .getElementsByClassName("prld-Msg2")[0]
      .classList.remove("error-warning-d-flex2");
    $(".error-warning-message").text(
      "Your current camera mode is Orthographic, this type of camera can't work properly with drone functionalities, so we changed it to perspective."
    );
    $(".error-warning-menu").toggle();
    $(".circle-icon").addClass("dronoModeColor");
    droneMode = "cm";
    return;
  }

  if (drone.droneIsActive) {
    if (!drone.circleModeIsActive) {
      drone.stop();
      drone.circle();
      $(".drone-btn").addClass("droneActivated");
      $(".circle-icon").addClass("dronoModeColor");
      $(".tracer-sidebar").css("z-index", "2000");
    } else {
      drone.stop();
    }
  } else {
    drone.circle();
    $(".circle-icon").addClass("dronoModeColor");
    $(".drone-btn").addClass("droneActivated");
    $(".tracer-sidebar").css("z-index", "2000");
  }
});

// rtavs helix-is funkcias dronidan rodesac davachert shesabamis gilaks
$(".helix-icon").click(function () {
  $(".settings-menu").hide();
  $(".settings-btn").removeClass("active");

  if (core.camera.name == "orthographic") {
    document
      .getElementsByClassName("prld-Msg2")[0]
      .classList.remove("error-warning-d-flex2");
    $(".error-warning-message").text(
      "Your current camera mode is Orthographic, this type of camera can't work properly with drone functionalities, so we changed it to perspective."
    );
    $(".error-warning-menu").toggle();
    $(".helix-icon").addClass("dronoModeColor");
    droneMode = "hm";
    return;
  }

  if (drone.droneIsActive) {
    if (!drone.helixModeIsActive) {
      drone.stop();
      drone.helix();
      $(".drone-btn").addClass("droneActivated");
      $(".helix-icon").addClass("dronoModeColor");
      $(".tracer-sidebar").css("z-index", "2000");
    } else {
      drone.stop();
    }
  } else {
    drone.helix();
    $(".drone-btn").addClass("droneActivated");
    $(".helix-icon").addClass("dronoModeColor");
    $(".tracer-sidebar").css("z-index", "2000");
  }
});

// rtavs dollyZoom-is funkcias dronidan rodesac davachert shesabamis gilaks
$(".dollyZoom-icon").click(function () {
  $(".settings-menu").hide();
  $(".settings-btn").removeClass("active");

  if (core.camera.name == "orthographic") {
    document
      .getElementsByClassName("prld-Msg2")[0]
      .classList.remove("error-warning-d-flex2");
    $(".error-warning-message").text(
      "Your current camera mode is Orthographic, this type of camera can't work properly with drone functionalities, so we changed it to perspective."
    );
    $(".error-warning-menu").toggle();
    $(".dollyZoom-icon").addClass("dronoModeColor");
    droneMode = "dm";
    return;
  }

  if (drone.droneIsActive) {
    if (!drone.dollyModeIsActive) {
      drone.stop();
      drone.dollyZoom();
      $(".drone-btn").addClass("droneActivated");
      $(".dollyZoom-icon").addClass("dronoModeColor");
      $(".tracer-sidebar").css("z-index", "2000");
    } else {
      drone.stop();
    }
  } else {
    drone.dollyZoom();
    $(".drone-btn").addClass("droneActivated");
    $(".dollyZoom-icon").addClass("dronoModeColor");
    $(".tracer-sidebar").css("z-index", "2000");
  }
});

// rtavs rocket-is funkcias dronidan rodesac davachert shesabamis gilaks
$(".rocket-icon").click(function () {
  $(".settings-menu").hide();
  $(".settings-btn").removeClass("active");

  if (core.camera.name == "orthographic") {
    document
      .getElementsByClassName("prld-Msg2")[0]
      .classList.remove("error-warning-d-flex2");
    $(".error-warning-message").text(
      "Your current camera mode is Orthographic, this type of camera can't work properly with drone functionalities, so we changed it to perspective."
    );
    $(".error-warning-menu").toggle();
    $(".rocket-icon").addClass("dronoModeColor");
    droneMode = "rm";
    return;
  }

  if (drone.droneIsActive) {
    if (!drone.rocketModeIsActive) {
      drone.stop();
      drone.rocket();
      $(".rocket-icon").addClass("dronoModeColor");
      $(".drone-btn").addClass("droneActivated");
      $(".tracer-sidebar").css("z-index", "2000");
    } else {
      drone.stop();
    }
  } else {
    drone.rocket();
    $(".rocket-icon").addClass("dronoModeColor");
    $(".drone-btn").addClass("droneActivated");
    $(".tracer-sidebar").css("z-index", "2000");
  }
});

// rtavs animaciis funkcias dronidan rodesac davachert shesabamis gilaks
$(".animation-icon").click(function () {
  $(".settings-menu").hide();
  $(".settings-btn").removeClass("active");

  if (core.camera.name == "orthographic") {
    document
      .getElementsByClassName("prld-Msg2")[0]
      .classList.remove("error-warning-d-flex2");
    $(".error-warning-message").text(
      "Your current camera mode is Orthographic, this type of camera can't work properly with drone functionalities, so we changed it to perspective."
    );
    $(".error-warning-menu").toggle();
    $(".animation-icon").addClass("dronoModeColor");
    droneMode = "cinm";
    return;
  }

  if (drone.droneIsActive) {
    if (!drone.z0ModeIsActive) {
      drone.stop();
      drone.cinema();
      $(".animation-icon").addClass("dronoModeColor");
      $(".drone-btn").addClass("droneActivated");
      $(".tracer-sidebar").css("z-index", "2000");
    } else {
      drone.stop();
    }
  } else {
    drone.cinema();
    $(".animation-icon").addClass("dronoModeColor");
    $(".drone-btn").addClass("droneActivated");
    $(".tracer-sidebar").css("z-index", "2000");
  }
});

// gamoakvs fanjara sadac afrtxilebs users rom es funkcia did dros waigebs
$("#geometry-preload").click(function () {
  if (core.geometriesLoaded) return;

  document
    .getElementsByClassName("prld-Msg1")[0]
    .classList.remove("error-warning-d-flex");
  $(".error-warning-message").text(
    "This will take about 1-3 minutes, are you sure?"
  );
  $(".error-warning-menu").toggle();
});

// rodesac daetanxmeba am preload-funkcias iwyeba preload
$("#prld-a").click(function () {
  document
    .getElementsByClassName("prld-Msg1")[0]
    .classList.add("error-warning-d-flex");
  $(".error-warning-menu").hide();
  $(".settings-menu").hide();
  $(".settings-btn").toggleClass("active");
  core.preLoad();
});

// rodesac ar daetanxmeba preload-funkcias mashin itisheba
$("#prld-d").click(function () {
  document
    .getElementsByClassName("prld-Msg1")[0]
    .classList.add("error-warning-d-flex");
  $(".error-warning-menu").hide();
  $("#geometry-preload").prop("checked", false);
});

$("#prld-ok").click(function () {
  document
    .getElementsByClassName("prld-Msg2")[0]
    .classList.add("error-warning-d-flex2");
  $(".error-warning-menu").hide();
  $(".settings-menu").hide();
  $(".settings-btn").removeClass("active");

  if (droneMode == "fm") drone.freeFly();
  if (droneMode == "cm") drone.circle();
  if (droneMode == "hm") drone.helix();
  if (droneMode == "rm") drone.rocket();
  if (droneMode == "dm") drone.dollyZoom();
  if (droneMode == "cinm") drone.cinema();

  $(".drone-btn").addClass("droneActivated");
});

// rodesac snapfile upload xdeba eshveba snap funkcia
$("#uploadSnap").change(function () {
  let inputFile = document.getElementById("uploadSnap");
  snap.readText(inputFile);
  snap.clearInputFile(inputFile);
});

// gadmowera snapfileis
$("#downloadSnap").click(function () {
  snap.getData();

  let date = new Date();
  let today = date.toUTCString().substring(4, 16);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let string = snap.jsonStringify(snap);
  let fileName =
    "tracerCore -" +
    today +
    "_" +
    hours +
    "-" +
    minutes +
    "-" +
    seconds +
    ".snap";

  let fileToSave = new Blob([string], {
    type: "application/json",
    name: fileName,
  });

  saveAs(fileToSave, fileName);
});

// groundis chveneba/damalva
$("#show-ground").click(function () {
  if (core.scene.getObjectByName(grid.name) == undefined) {
    core.scene.add(grid);
  } else {
    core.scene.remove(grid);
  }
});

// event object radio buttons

// LAr-ebis scenidan washla ;gilakze dacherisas
$("#LAr-check").click(function () {
  if (this.checked) {
    scene.getObjectByName("LAR").visible = true;
  } else {
    scene.getObjectByName("LAR").visible = false;
  }
  // showEventStatus();
});
// Muon Segment-ebis scenidan washla ;gilakze dacherisas
$("#muon-segment-check").click(function () {
  if (this.checked) {
    scene.getObjectByName("SEGMENT").visible = true;
  } else {
    scene.getObjectByName("SEGMENT").visible = false;
  }
  // showEventStatus();
});
