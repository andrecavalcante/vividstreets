function PanoStreets(lat, lng, gamma){
	if(this instanceof PanoStreets){
		this.lat = lat;
		this.lng = lng;
		this.gamma = gamma;
	}
	else{
		return new PanoStreets(lat, lng, gamma);
	}
}
PanoStreets.prototype.getLat = function(){
	return this.lat;
};
PanoStreets.prototype.getLng = function(){
	return this.lng;
};
PanoStreets.prototype.getGamma = function(){
	return this.gamma;
};