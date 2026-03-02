$(document).ready(function () {
  initialize();
  $(".tree-parent-li .plus-minus-circle").click(function () {
    if ($(this).parent().siblings(".tracer-tree1").is(":visible")) {
      $(this).find("svg").replaceWith(feather.icons["plus-circle"].toSvg());
      $(this).parent().siblings(".tracer-tree1").hide(200);
      $(".tracer-sidebar").addClass("geometry-tree-closed");
    } else {
      $(this).find("svg").replaceWith(feather.icons["minus-circle"].toSvg());
      $(this).parent().siblings(".tracer-tree1").show(200);
      $(".tracer-sidebar").removeClass("geometry-tree-closed");
    }
  });
  //geometriebis xeze "+" da "-" icon-ebze dacherisas shesabamisi ierarqiis gaxsna/daxurva
  $(".tracer-tree1 .plus-minus-circle").click(function () {
    if ($(this).parent().siblings(".tracer-tree2").is(":visible")) {
      $(this).find("svg").replaceWith(feather.icons["plus-circle"].toSvg());
      $(this).parent().siblings(".tracer-tree2").hide(200);
      //  $(".tracer-sidebar").addClass("geometry-tree-closed");
    } else {
      $(this).find("svg").replaceWith(feather.icons["minus-circle"].toSvg());
      $(this).parent().siblings(".tracer-tree2").show(200);
      //  $(".tracer-sidebar").removeClass("geometry-tree-closed");
    }
  });
  //geometriebis xeze "+" da "-" icon-ebze dacherisas shesabamisi ierarqiis gaxsna/daxurva
  $(".tracer-tree2 .plus-minus-circle").click(function () {
    if ($(this).parent().siblings(".tracer-tree3").is(":visible")) {
      $(this).find("svg").replaceWith(feather.icons["plus-circle"].toSvg());
      $(this).parent().siblings(".tracer-tree3").hide(200);
    } else {
      $(this).find("svg").replaceWith(feather.icons["minus-circle"].toSvg());
      $(this).parent().siblings(".tracer-tree3").show(200);
    }
  });
  $(".event-tree-1-li .plus-minus-circle").click(function () {
    if ($(this).parent().siblings(".event-tracer-tree2").is(":visible")) {
      $(this).find("svg").replaceWith(feather.icons["plus-circle"].toSvg());
      $(this).parent().siblings(".event-tracer-tree2").hide(200);
    } else {
      $(this).find("svg").replaceWith(feather.icons["minus-circle"].toSvg());
      $(this).parent().siblings(".event-tracer-tree2").show(200);
    }
  });
  //geometriebis xeshi "ATLAS Detector"-ze click funqcia
  $("#atlas-detector").click(function () {
    const activeGeomNames = core.getActiveGeometries().map(({ name }) => name);
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      $(this)
        .closest(".tree-parent-li")
        .find(".tree-1-child, .tree-2-child")
        .removeClass("active-tree-item child-is-active")
        .addClass("not-active");
      core.deleteGeometries(activeGeomNames);
    } else if ($(this).hasClass("child-is-active")) {
      $(this).removeClass("child-is-active").addClass("active-tree-item");
      $(this)
        .closest(".tree-parent-li")
        .find(".tree-1-child, .tree-2-child")
        .removeClass("not-active child-is-active")
        .addClass("active-tree-item");
      core.deleteGeometries(activeGeomNames);
      core.loadAllGeometry([...core.allGeomNames]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      $(this)
        .closest(".tree-parent-li")
        .find(".tree-1-child, .tree-2-child")
        .removeClass("not-active")
        .addClass("active-tree-item");
      core.loadAllGeometry([...core.allGeomNames]);
    }
  });
  //geometriebis xeshi "MagnetSystems"-ze click funqcia
  $("#MagnetSystems").click(function () {
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      core.deleteGeometries([
        "Barrel-Toroid",
        "End-Cap-Toroid-SideA",
        "End-Cap-Toroid-SideC",
      ]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      core.loadAllGeometry([
        "Barrel-Toroid",
        "End-Cap-Toroid-SideA",
        "End-Cap-Toroid-SideC",
      ]);
    }
  });

  //geometriebis xeshi "Pixel"-ze click funqcia
  $("#Pixel").click(function () {
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      core.deleteGeometries(["Pixel"]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      core.loadAllGeometry(["Pixel"]);
    }
  });
  //geometriebis xeshi "SCT"-ze click funqcia
  $("#SCT").click(function () {
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      core.deleteGeometries(["SCT-BAR", "SCT-SideA", "SCT-SideC"]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      core.loadAllGeometry(["SCT-BAR", "SCT-SideA", "SCT-SideC"]);
    }
  });
  //geometriebis xeshi "TRT"-ze click funqcia
  $("#TRT").click(function () {
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      core.deleteGeometries(["TRT-BAR", "TRT-SideA", "TRT-SideC"]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      core.loadAllGeometry(["TRT-BAR", "TRT-SideA", "TRT-SideC"]);
    }
  });
  //geometriebis xeshi "LAR"-ze click funqcia
  $("#LAR").click(function () {
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      core.deleteGeometries([
        "Lar-Barrel",
        "Lar-EMEC-SideA",
        "Lar-HEC-SideA",
        "Lar-FCAL-SideA",
        "Lar-EMEC-SideC",
        "Lar-HEC-SideC",
        "Lar-FCAL-SideC",
      ]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      core.loadAllGeometry([
        "Lar-Barrel",
        "Lar-EMEC-SideA",
        "Lar-HEC-SideA",
        "Lar-FCAL-SideA",
        "Lar-EMEC-SideC",
        "Lar-HEC-SideC",
        "Lar-FCAL-SideC",
      ]);
    }
  });
  //geometriebis xeshi "TILE"-ze click funqcia
  $("#TILE").click(function () {
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      core.deleteGeometries([
        "Tile-Barrel",
        "Tile-End-Cap-SideA",
        "Tile-End-Cap-SideC",
      ]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      core.loadAllGeometry([
        "Tile-Barrel",
        "Tile-End-Cap-SideA",
        "Tile-End-Cap-SideC",
      ]);
    }
  });
  //geometriebis xeshi "Muon Barrel"-ze click funqcia
  $("#MuonBarrel").click(function () {
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      core.deleteGeometries([
        "Muon-Barrel-Inner",
        "Muon-Barrel-Middle",
        "Muon-Barrel-Outer",
      ]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      core.loadAllGeometry([
        "Muon-Barrel-Inner",
        "Muon-Barrel-Middle",
        "Muon-Barrel-Outer",
      ]);
    }
  });
  //geometriebis xeshi "Muon Endcap"-ze click funqcia
  $("#MuonEndcap").click(function () {
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      core.deleteGeometries([
        "Small-Wheel-Chambers-SideA",
        "TGC3-SideA",
        "Extra-Wheel-SideA",
        "Outer-Wheel-SideA",
        "Small-Wheel-Chambers-SideC",
        "TGC3-SideC",
        "Extra-Wheel-SideC",
        "Outer-Wheel-SideC",
      ]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      core.loadAllGeometry([
        "Small-Wheel-Chambers-SideA",
        "TGC3-SideA",
        "Extra-Wheel-SideA",
        "Outer-Wheel-SideA",
        "Small-Wheel-Chambers-SideC",
        "TGC3-SideC",
        "Extra-Wheel-SideC",
        "Outer-Wheel-SideC",
      ]);
    }
  });
  // geometriebis xeshi "Beam"-ze click funqcia
  $("#Beam").click(function () {
    if ($(this).hasClass("active-tree-item")) {
      $(this).removeClass("active-tree-item").addClass("not-active");
      core.deleteGeometries(["Beam"]);
    } else {
      $(this).removeClass("not-active").addClass("active-tree-item");
      core.loadAllGeometry(["Beam"]);
    }
  });
  //geometriebis xeshi "tree 1"-ze click funqcia
  $(".tree-1-child").click(function () {
    if ($(this).closest(".tree-1-li").find("ul")[0]) {
      if ($(this).hasClass("active-tree-item")) {
        //  $(this).removeClass("active-tree-item").addClass("not-active");
        $(this)
          .closest(".tree-1-li")[0]
          .querySelectorAll(".tree-2-child")
          .forEach(function (child) {
            $(child).trigger("click");
          });
      } else {
        // $(this)
        //   .removeClass("not-active child-is-active")
        //   .addClass("active-tree-item");
        $(this)
          .closest(".tree-1-li")[0]
          .querySelectorAll(".tree-2-child")
          .forEach(function (child) {
            if ($(child).hasClass("not-active")) {
              $(child).trigger("click");
            }
          });
      }
    }
    if ($(".tree-child.not-active").length == 0) {
      $("#atlas-detector")
        .removeClass("child-is-active")
        .addClass("active-tree-item");
    } else if ($(".tree-child.active-tree-item").length == 0) {
      $("#atlas-detector")
        .removeClass("child-is-active")
        .addClass("not-active");
    } else {
      $("#atlas-detector")
        .removeClass("not-active active-tree-item")
        .addClass("child-is-active");
    }
  });
  //geometriebis xeshi "tree 2"-ze click funqcia
  $(".tree-2-child").click(function () {
    const notActiveLength = $(this)
      .closest("ul")[0]
      .querySelectorAll(".not-active").length;
    const childrenLength = $(this)
      .closest("ul")[0]
      .querySelectorAll(".tree-2-child").length;
    const parenteEl = $(this)
      .closest("ul")
      .parent()[0]
      .querySelectorAll(".tree-1-child")[0];
    if (
      notActiveLength == childrenLength &&
      $(parenteEl).hasClass("child-is-active")
    ) {
      $(parenteEl).removeClass("child-is-active").addClass("not-active");
    } else if (
      notActiveLength == 0 &&
      $(parenteEl).hasClass("child-is-active")
    ) {
      $(parenteEl).removeClass("child-is-active").addClass("active-tree-item");
    } else {
      $(parenteEl)
        .removeClass("not-active active-tree-item")
        .addClass("child-is-active");
    }
    if ($(".tree-child.not-active").length == 0) {
      $("#atlas-detector")
        .removeClass("child-is-active")
        .addClass("active-tree-item");
    } else if ($(".tree-child.active-tree-item").length == 0) {
      $("#atlas-detector")
        .removeClass("child-is-active")
        .addClass("not-active");
    } else {
      $("#atlas-detector")
        .removeClass("not-active active-tree-item")
        .addClass("child-is-active");
    }
  });
});
