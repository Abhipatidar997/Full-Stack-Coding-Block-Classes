// let box = document.getElementById("box")
// console.log(box);


// let box1 = document.getElementsByClassName("box1")

// console.log(box1);


// let h2 = document.getElementsByTagName("h2")
// console.log(h2);


// let box = document.querySelector("#box")
// let box = document.querySelectorAll(".box1")


// console.log(box);


// let h2 = document.querySelector("h2")
// h2.textContent += " rishab pant"
// h2.innerHTML += '<a href="/">go back</a>'

// console.log(h2);


// let div = document.querySelector("div")
// box.style.backgroundColor = "red"
// box.style.height = "200px"
// let div1 = document.querySelector("#box1")

// div1.classList.add("box")

// div.classList.remove("box")


// console.log(box);



// let body = document.querySelector("body")
// let btn = document.querySelector("button")

// btn.addEventListener("click", ()=>{
//     body.classList.toggle("dark")
// })

// console.log(body.classList.contains("dark"));


let light = document.querySelector(".light")
let btn = document.querySelector("button")

let isOn = false
btn.addEventListener("dblclick", ()=>{
    if(isOn){
        light.style.backgroundColor = "white"
        btn.innerText = "On"
        isOn = false
    }else {
        light.style.backgroundColor = "yellow"
        btn.innerText = "Off"
        isOn = true
    }
})