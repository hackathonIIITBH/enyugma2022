//poori website body class mein honi chahiye

function getcurrentmode() {
    const dmode = localStorage.getItem("3dmode");
    return dmode ?? "true";
  }
  
  function getcurrenttheme() {
    const dtheme = localStorage.getItem("currentthememode");
    return dtheme ?? "light";
  }
  
  function setcurrenttheme(theme) {
    localStorage.setItem("currentthememode", theme);
  }
  
  function setcurrentmode(mode) {
    localStorage.setItem("3dmode", mode);
  }
  var original_width = 0;
  $( document ).ready( async function ()
  {
  
    original_width = window.screen.width;
    $(".body").css("display", "none");
    $(".background").css("display", "none");
    if (getcurrenttheme() === "light") {
      document.getElementById("html-css").href = "./light.css";
      $("#modebtext").text("light_mode");
    } else {
      document.getElementById("html-css").href = "./dark.css";
      $("#modebtext").text("dark_mode");
    }
    $(".background3").attr("id", "particlebg");
    $(".body").css("display", "");
    $(".background").css("display", "");
  });
  
  $(window).resize(function () {
    if (original_width < 720 && window.screen.width < 720) {
      $(".sidebar").css("display", "none");
      $(".sidebar").addClass("no-3d-sidebar");
      $(".sidebar .closebtn").text("X");
      $("#setbtext").text("expand_more");
      $(".sidebar").removeClass("sidebar");
      setTimeout(() => {
        $(".no-3d-sidebar").css("display", "");
      }, 1000);
      $(".navbar .navbarbtns").css("display", "none");
      $(".settingbar").addClass("navbardatas");
      $(".settingbar").removeClass("settingbar");
      $(".navbardatas").html(`<div class="navbarbtns">
            <div class="link">
              <a class="active" href="./index.html">Home</a>
            </div>
            <div class="link">
              <a href="#about">About</a>
            </div>
            <div class="link">
              <a href="#example">Example</a>
            </div>
            <div class="link">
              <a href="#collaborators">Collabs</a>
            </div>
          </div>`);
    } else if (original_width > 720 && window.screen.width > 720) {
      $(".no-3d-sidebar").addClass("sidebar");
      $(".sidebar .closebtn").text("Close");
      $("#setbtext").text("settings");
      $(".no-3d-sidebar").removeClass("no-3d-sidebar");
      $(".navbar .navbarbtns").css("display", "");
      $(".navbardatas").addClass("settingbar");
      $(".navbardatas").html(``);
      $(".navbardatas").removeClass("navbardatas");
    } else {
      orginal_width = window.screen.width;
    }
  });
  
  $("#setb").hover(
    function () {
      // over
      $(".sets .material-icons").addClass("material-symbols-outlined");
      $(".sets .material-icons").removeClass("material-icons");
    },
    function () {
      // out
      $(".sets .material-symbols-outlined").addClass("material-icons");
      $(".sets .material-symbols-outlined").removeClass(
        "material-symbols-outlined",
      );
    },
  );
  
  
  function sets() {
    if (getcurrentmode() === "true") {
      $(".settingbar").css("--settingbar-display", "flex");
      $(".body").css("transform-origin", "left");
      $(".body").css("transform", "rotateY(+5deg) translateX(-20vw)");
      $(".settingbar").css("transform", "rotateY(0) skewY(-15deg)");
      window.scrollTo(0, 0);
      $("body").css("overflow", "hidden");
      $(".displaybox").css("height", "50%");
    } else {
      $(".no-3d-settingbar").css("--settingbar-display", "flex");
      $(".body").css("transform-origin", "left");
      $(".body").css("transform", "translateX(-50vw)");
      window.scrollTo(0, 0);
      $("body").css("overflow", "hidden");
      $(".displaybox").css("height", "50%");
    }
    return false;
  }
  
  function closesettingbar() {
    if (getcurrentmode() === "true") {
      $(".settingbar").css("--settingbar-display", "none");
      $(".body").css("transform-origin", "");
      $(".body").css("transform", "");
      $(".settingbar").css("transform", "rotateY(90deg)");
      $("body").css("overflow", "");
      $(".displaybox").css("height", "");
    } else {
      $(".no-3d-settingbar").css("--settingbar-display", "none");
      $(".body").css("transform-origin", "");
      $(".body").css("transform", "");
      $("body").css("overflow", "");
      $(".displaybox").css("height", "");
    }
  }
  