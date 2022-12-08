var countToDate = new Date("Dec 08, 2022 23:59:00").getTime();
// var countToDate = new Date("Dec 08, 2022 18:45:00").getTime();

var x = setInterval(function(){

    var now = new Date().getTime();

    var distance = countToDate-now;

    var days = Math.floor(distance/(1000*60*60*24));
    var hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    var minutes = Math.floor((distance%(1000*60*60))/(1000*60));
    var seconds = Math.floor((distance%(1000*60))/1000);


    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    // console.log(distance)
    // if(now >= countToDate){
    //     console.log('HELLO')
    // }
    if(distance < 0){
        clearInterval(x);
        document.getElementById("demo").innerHTML = 
        `
        <h3 style="font-size:22px; margin:5px auto 10px auto;">9 December to 11 December, 2022</h3>
        <button id="demobtn" >Now Live</button>
        `
    }


},50) 