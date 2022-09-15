$(document).ready(() => {
    $(".setbtn").css("display", "none");
    setTimeout(() => {
        $(".setbtn").css("display", "");
    }, 17050);
});

function sets() {
    $(".settingbar").css("--settingbar-display", "flex");
    setTimeout(() => {
        $(".body").css("transform-origin", "left");
        $(".settingbar").css("transform", "rotateY(0) translateX(-25vw)");
        window.scrollTo(0, 0);
        $("body").css("overflow", "hidden");
        $(".displaybox").css("height", "50%");
    });

    return false;
}

function closesettingbar() {
    $(".body").css("transform-origin", "");
    $(".body").css("transform", "");
    $(".settingbar").css("transform", "rotateY(90deg)");
    $("body").css("overflow", "");
    $( ".displaybox" ).css( "height", "" );
        setTimeout(() => {
            $(".settingbar").css("--settingbar-display", "none");
        },500);

}
