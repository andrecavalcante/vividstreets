function shadowCopy(o){ 
	function F(){}
	F.prototype = o;
	return new F(); 
}
function inheritPrototype(subType, superType){ 
	var prototype = shadowCopy(superType.prototype); 
	prototype.constructor = subType; 
	subType.prototype = prototype;
}