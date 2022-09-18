window.onscroll = function () { myFunction() };

function myFunction() {
    if (document.documentElement.scrollTop > 500) {
        document.getElementById("cont").style.position = 'fixed';
    } else {
        document.getElementById("cont").style.position = 'relative';
        document.getElementById("cont").style.translateX = '0%';
    }

    var styles = {
        "opacity": "1",
        "transition": "opacity 1s"
    }
    var obj = document.getElementById("cont");

    if(document.documentElement.scrollTop < 2200){
        // document.getElementById("cont").style.opacity = '1';
        Object.assign(obj.style, styles);
    }
    else{
        document.getElementById("cont").style.opacity = '0';
    }
}
// window.addEventListener("scroll", (event) => {
//     let scroll = this.scrollY;
//     console.log(scroll)
// });