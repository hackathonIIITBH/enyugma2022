window.onscroll = function () { myFunction() };

function myFunction() {
    if (document.documentElement.scrollTop > 700) {
        document.getElementById("cont").style.position = 'fixed';
        document.getElementById("cont").style.display = 'flex';
    } else {
        document.getElementById("cont").style.position = 'relative';
        document.getElementById("cont").style.display = 'none';
    }

    var styles = {
        "opacity": "1",
        "display": "flex",
        "transition": "display 0.5s"
    }
    var obj = document.getElementById("cont");

    if(document.documentElement.scrollTop > 700 && document.documentElement.scrollTop < 2200){
        // document.getElementById("cont").style.display = 'flex';
        Object.assign(obj.style, styles);
    }
    else{
        document.getElementById("cont").style.opacity = '0';
        document.getElementById("cont").style.display = 'none';
    }
}