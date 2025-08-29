

const btn = document.querySelector("button")


btn.addEventListener("click", (event)=>{


    
    event.preventDefault()

    // let img1 = document.querySelector("#one")
    // let img2 = document.querySelector("#two")

    // let imgSrc1 = img1.getAttribute("src")
    // let imgSrc2 = img2.getAttribute("src")

    // img1.setAttribute("src",imgSrc2)
    // img2.setAttribute("src",imgSrc1)

    // img1.removeAttribute("src")
    // img2.removeAttribute("src")

} )



    // let img1 = document.querySelector("#one")


    // img1.addEventListener("mouseover", ()=>{
    //     console.log("mouse aaya");
        
    // })


    // img1.addEventListener("mouseout", ()=>{
    //     console.log("mouse gaya");
        
    // })


let inp = document.querySelector("input")

// inp.addEventListener("keyup",()=>{
//     console.log("key hatai kisine");
    
// })
inp.addEventListener("keydown",(event)=>{
    // console.log("key dabai kisine");
    console.log(event.target.value);
    
})  

