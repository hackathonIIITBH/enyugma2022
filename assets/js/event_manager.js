const url="https://enyugma.herokuapp.com/"
document.forms["#desc"].addeventlistener("submit",(e)=>{
    e.preventDefault();
    fetch(`${url}/desc`,{
        method:"post",
        body:URLSearchParams(FormData(e.target)),
    }).then((res)=>res.json()).then((data)=>{
        if(data.status==1){
         alert(data.message)
        }
        else{
            alert("Something went wrong")
        }
    })
})

