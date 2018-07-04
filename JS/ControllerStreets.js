function ControllerStreets(){
	//alert("ControllerStreets");
	if (this instanceof ControllerStreets){
		this.model = null;
		this.view = null;
		this.idArray = [];
		this.linksArray = [];
		this.panorama = new google.maps.StreetViewPanorama(
				document.getElementById("pano"));
		var callbackLinksChanged = function(){
			//alert("linksChanged");
			//console.log(this.linksArray.toString());
			var links = this.panorama.getLinks();
			var aux = links.length;
			var id = this.panorama.getPano();
			if ((this.indexForId(id) < 0)) {
				this.idArray.push(id);
				var location = this.panorama.getPosition();
				var pov = this.panorama.getPhotographerPov();
				this.model.requestPanoData(id,pov.heading,pov.pitch);
				var i;
				for(i=0; i<aux; i++){
					if((this.indexForId(links[i].pano) < 0) &&
						(links[i].description !== "")){
						this.linksArray.push(links[i].pano);
					}
				}
			}
			else if(this.idArray.length > 0){
				var nextPano = this.idArray.shift();
				if (nextPano == id) {
					nextPano = this.idArray.shift();
				}
				this.panorama.setPano(nextPano);
			}
		};
		google.maps.event.addListener(
				this.panorama, "links_changed",
				callbackLinksChanged.bind(this));
	}
	else{
		return new ControllerStreets();
	}
}
ControllerStreets.prototype.modelHandler = function(model){
	//alert("ModelHandler");
	if(model instanceof ModelStreets){
		var aux2 = this.linksArray.length;
		if(aux2 > 0){
			var nextPano = this.linksArray.shift();
			if(nextPano == this.panorama.getPano()){
				nextPano = this.linksArray.shift();
			}
			this.panorama.setPano(nextPano);
		}
		var pano = model.getFirstPano();
		var lat = pano.getLat();
		var lng = pano.getLng();
		var gamma = pano.getGamma();
		this.view.setMarker(lat, lng, gamma);
	}
	else{
		throw new Error("Not a ModelStreets");
	}
};
ControllerStreets.prototype.viewHandler = function(view){
	//alert("ViewHandler");
	if(view instanceof ViewStreets){
		var sv =  new google.maps.StreetViewService();
		var panorama = this.panorama;
		var callback = function(data,status){
			if(status == google.maps.StreetViewStatus.OK){
				panorama.setPano(data.location.pano);
			}
		};
		var aux = view.getFirstClickLocation();
		sv.getPanoramaByLocation(
			aux, this.getSearchRadius(), callback);
	}
	else{
		throw new Error('Not a ViewStreets');
	}
};
ControllerStreets.prototype.indexForId = function(id) {
	var i;
	var aux = this.idArray.length;
    for(i=aux-1; i >= 0; i--){
		if(id == this.idArray[i]){
			return i;
        }
    }
    return i;
};
ControllerStreets.prototype.setModelAndView = function(model,view){
	//alert("setModelAndView");
	this.model = model;
	this.view = view;
};
ControllerStreets.prototype.getSearchRadius = function(){
	//alert("getSearchRadius");
	var aux = this.view.getZoom();
	switch(aux){
		case 15 : return 15;
		case 14 : return 25;
		default : return 6;
	}
};