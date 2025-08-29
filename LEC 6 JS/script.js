

// Callback Function

// function sum() {
//     let name = "Pushkar"
//     return name
// }

// function fun(add) {
//     let data = sum()

//     // console.log("hello from ",data);
//     // let ans = add(10,20) 
//     // console.log("sum is ",ans);
//     return data
// }

// let ans = fun(sum)
// console.log(ans);



// function sum(a,b) {
//     return a+b
// }

// function fun(sum) {
//    let ans = sum(40,50)
//    console.log(ans);
// }

// fun(sum)



// HIGHER ORDER FUNCTION 


// function fun() {
//     console.log("hello world");


//     function sum(a,b) {
//         console.log(a+b)
//     }


//     return sum
    


// }

// let returnFun = fun()
// returnFun(10,20)






// IIFE
// (function () {
//     let a = 10 
//     let b = 20 
//     console.log(a+b);
    
// })();



// (
//     function (){

//     }
// )()



// CLOSURES

function parent() {
    let name = "Abhishek"
    console.log("hello from parent");
    

    function child() {
        console.log("hello from ",name);
        
    }

    return child

}

let bachha = parent()
bachha()