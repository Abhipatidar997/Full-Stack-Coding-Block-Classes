// let para = document.createElement("p")
// let box = document.querySelector(".box")
// let h2 = document.querySelector("h2")


// para.innerText = "hello world"
// // console.log(para);

// // box.prepend(para)
// para.id = "one"
// para.className = "two"
// box.appendChild(para)

// console.log(box);


// box.remove()
// let p = document.querySelector("p")
// let h2 = document.querySelector("h2")
// box.removeChild(h2)




let box = document.querySelector(".box")
let h2 = document.querySelector("h2")
// let para = document.createElement("p")
// para.innerText = "naya kuch add kiya"

// box.replaceChild(para , h2)
// console.log(box);

// console.log(box.children);

// console.log(h2.parentElement);

// console.log(box.firstElementChild);
// console.log(box.lastElementChild);


// console.log(box.firstChild);
// console.log(box.firstElementChild);
// console.log(box.lastChild);




// console.log(h2.previousElementSibling);


// console.log(h2.nextElementSibling);



let btn = document.querySelector("button")
let body = document.querySelector("body")



btn.addEventListener("click", ()=>{
    let img = document.createElement("img")
    img.setAttribute("src", "https://images.unsplash.com/photo-1755381370462-45f9a5846000?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")

    let top = Math.floor(Math.random()*90)
    let left = Math.floor(Math.random()*90)

    img.style.position = "absolute"
    img.style.top = top+"%"
    img.style.left = left+"%"

    body.appendChild(img)
})
