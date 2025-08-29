// Map

// let arr = [10,20,30,40]


// let newArr = arr.map((elem ,index)=>{
//   console.log(elem, "==>", index);
//   return elem +5
// })


// console.log(newArr);



// filter 
// let arr = [1,2,3,4,5,6,7,8,9]
// let filteredArr = arr.filter((elem , index)=>{
//     if(elem % 2 == 0){
//         return elem  
//     }
// })


// console.log(filteredArr);



// reduce 
// let ans = arr.reduce((prev , curr)=>{
//     console.log("prev ",prev, "current :", curr);
//     return prev+curr
// })

// console.log(ans);




// forEach 

const newArr = arr.forEach((elem , index)=>{
    if(index >= 5){
        console.log(elem);
        
    }
})


// console.log(newArr);


// Object 
// console.log(this);


const person = {
    name : "raj",
    age : 23,
    fun() {
       
        
        console.log("hello from ", this.name);
        
    },

    address : {
        state : "MP",
        city : "indore"
    }

}



let product = {
    title : "watch",
    price : 2000,
    colour : "black",
    brand : "fire boltt",
}


// person.fun()
// person.age = 25
// person.course = "MCA"
// // console.log(person.age)
// console.log(person)



console.log(person.address.city);
