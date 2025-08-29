// console.log("hello");
// console.log("good morning");
// setTimeout(()=>{
//     console.log("class end");

// },2000)

// console.log("last wali line");

// console.log("hello");
// console.log("good morning");
// let timer = setInterval(()=>{
//     console.log("class end");
//     console.log("chuti ho gyi ");

// },2000)

// console.log("last wali line");

// setTimeout(()=>{
//     clearInterval(timer)
// },5000)

// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     let num = Math.floor(Math.random() * 2);
//     if (num === 1) {
//       resolve("promise resolve");
//     } else {
//       reject("dhoka diya ....");
//     }
//   }, 2000);
// });
// console.log(promise);

// promise
//   .then((res) => {
//     console.log(res);

//     console.log("chal bhai tension hata dimag se ab");
    
//   })
//   .catch((rej) => {
//     console.log(rej);
//     console.log("sala aur karna hi padega aur tension badh gya");
    
    
//   });




// async function  getData() {

//     try {
        
//         let response = await fetch('https://dummyjson.com/users')
//         let data = await response.json()
//         console.log(data);
        
        

//     } catch (error) {
//         console.log("error aaya ",error);
        
//     }

   
// }

// getData()



// localStorage.setItem("name" , "Pushkar")
// localStorage.setItem("age","22")

// let name = localStorage.getItem("name")
// console.log(name);

// // localStorage.removeItem("name")
// localStorage.clear()



// hoisting 
// var a
// console.log(a);

// a = 10

// let b
// console.log(b);

// b = 10


// fun()

// var fun = function () {
//     console.log("hello");
    
// }

// console.log("h"/2);

let date = new Date()

console.log(date.getDate());
console.log(date.getDay());
console.log(date.getFullYear());


