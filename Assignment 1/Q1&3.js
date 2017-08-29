var fun = require("./method");
var array = [1,2,3,4,5];

function callback(n) {
	console.log("i am in index");
	console.log(n +" milisecond complete ");
}


function square( i) {
	return i*i;
}


// provide your own callback method 
fun.wait(callback,50);

// change in parameter array
fun.map(array,square);
console.log(array);

// return a new array
var res = fun.forEach(array,square);
console.log(res);