//SetTimeoutSync


var SetTimeoutSync = function SetTimeoutSync(callback,n) {
	console.log("SetTimeoutSync call");

	var date = new Date();
	console.log(date);
	while(new Date() - date < n*10  ){}
	callback(n);

}



var map = function map(array,callback) {
	for(var i = 0; i< array.length;i++){
		array[i] = callback(array[i]);
	}	
}
var forEach = function forEach(array,callback) {
	var res = [];
	for(var i = 0; i< array.length;i++){
		res[i] = callback(array[i]);
	}	
	return res;
}





module.exports.wait = SetTimeoutSync;
module.exports.map = map;
module.exports.forEach = forEach;