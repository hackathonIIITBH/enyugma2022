$(document).ready(function () {
    $(".navbar").scroll(function () {
        //hide navbar when scroll down
        
        if ($(this).scrollTop() > 50) {
            $(".navbar").css("opacity", "0");
        } else {
            $(".navbar").css("opacity", "1");
        }
    });
});
