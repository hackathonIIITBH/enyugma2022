$(document).ready(() => {
    $(".setbtn").css("display","none");
    setTimeout(() => {
        $(".setbtn").css("display","");
    },8550);
})
  
  function sets() {
      $(".settingbar").css("--settingbar-display", "flex");
      $(".body").css("transform-origin", "left");
      $(".settingbar").css("transform", "rotateY(0) translateX(-25vw)");
      window.scrollTo(0, 0);
      $("body").css("overflow", "hidden");
      $(".displaybox").css("height", "50%");
    return false;
  }
  
  function closesettingbar() {
      $(".settingbar").css("--settingbar-display", "none");
      $(".body").css("transform-origin", "");
      $(".body").css("transform", "");
      $(".settingbar").css("transform", "rotateY(90deg)");
      $("body").css("overflow", "");
      $(".displaybox").css("height", "");

  }
  