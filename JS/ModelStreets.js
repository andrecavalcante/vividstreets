function ModelStreets(listener){
	//alert("ModelStreets");
	if (this instanceof ModelStreets){
		this.panoArray = [];
		this.newPanoReady = new EventMVC(this,listener);
	}
	else{
		return new ModelStreets(listener);
	}
}
ModelStreets.prototype.addListener = function(listener){
	//alert("addListener");
	this.newPanoReady.attach(listener);
};
ModelStreets.prototype.requestPanoData = function(id, heading){
	//alert("requestPanoData");
	var sv =  new google.maps.StreetViewService();
	var svCallback = function(data, status){
		if(status == google.maps.StreetViewStatus.OK){
			var lat = data.location.latLng.lat();
			var lng = data.location.latLng.lng();
			var date = data.imageDate;
			this.requestServer(lat,lng,heading,date);
		}
	};
	sv.getPanoramaById(id, svCallback.bind(this));
};
ModelStreets.prototype.requestServer = function(lat,lng,heading,date) {
	var xhr = new XMLHttpRequest();
	var location=lat + "," + lng;
	var url = 'http://localhost:8888/getpanogamma.php?location='+
				location + '&heading=' + heading + '&date=' + date;
	var callback = function(){
		if (xhr.readyState == xhr.DONE){
			var location = xhr.getResponseHeader("Location");
			var gamma = xhr.getResponseHeader("Gamma");
			var latLng = location.split(",");
			this.panoArray.push(new
				PanoStreets(latLng[0], latLng[1], gamma));
			this.newPanoReady.notify();
		}
	};
	xhr.onreadystatechange = callback.bind(this);
	xhr.open("HEAD", url, true);
	xhr.send();
};
ModelStreets.prototype.getFirstPano = function() {
	return this.panoArray.shift();
};