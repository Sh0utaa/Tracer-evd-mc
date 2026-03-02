$(".navigate-icon").hover(function () {
    $(this).toggleClass("navigate-icon-rotate");
});
$(".circle-icon").hover(function () {
    $(this).toggleClass("circle-icon-spin");
});
$(".dollyZoom-icon").hover(function () {
    $(this).find(".dollyZoom-svg-path").toggleClass("dollyZoom-svg-path-scale");
});
$(".rocket-icon").hover(function () {
    $(this).find(".rocket-svg-path").toggleClass("rocket-svg-path-up");
});
$(".animation-icon").hover(function () {
    $(this).toggleClass("animation-icon-blink");
});
