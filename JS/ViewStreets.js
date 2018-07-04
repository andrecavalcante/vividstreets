function ViewStreets(window,map,listener){
	//alert("ViewStreets");
	if(this instanceof ViewStreets){
		this.window = window;
		this.map = map;
		this.click = new EventMVC(this,listener);
		this.clickLocationsArray = [];
		this.weightedLocArray = [];
		var hsvGradient = [
			'rgba(0,0,255,0)',
			'rgba(0,16,255,1)',
			'rgba(0,32,255,1)',
			'rgba(0,48,255,1)',
			'rgba(0,64,255,1)',
			'rgba(0,80,255,1)',
			'rgba(0,97,255,1)',
			'rgba(0,113,255,1)',
			'rgba(0,129,255,1)',
			'rgba(0,145,255,1)',
			'rgba(0,161,255,1)',
			/*'rgba(0,178,255,1)',
			'rgba(0,194,255,1)',
			'rgba(0,210,255,1)',
			'rgba(0,226,255,1)',
			'rgba(0,242,255,1)',
			'rgba(0,255,250,1)',
			'rgba(0,255,234,1)',
			'rgba(0,255,218,1)',
			'rgba(0,255,202,1)',
			'rgba(0,255,186,1)',
			'rgba(0,255,169,1)',
			'rgba(0,255,153,1)',
			'rgba(0,255,137,1)',
			'rgba(0,255,121,1)',
			'rgba(0,255,105,1)',
			'rgba(0,255,89,1)',
			'rgba(0,255,72,1)',
			'rgba(0,255,56,1)',
			'rgba(0,255,40,1)',
			'rgba(0,255,24,1)',
			'rgba(0,255,8,1)',
			'rgba(8,255,0,1)',*/
			'rgba(24,255,0,1)',
			'rgba(40,255,0,1)',
			'rgba(56,255,0,1)',
			'rgba(72,255,0,1)',
			'rgba(89,255,0,1)',
			'rgba(105,255,0,1)',
			'rgba(121,255,0,1)',
			'rgba(137,255,0,1)',
			'rgba(153,255,0,1)',
			'rgba(170,255,0,1)',
			'rgba(186,255,0,1)',
			'rgba(202,255,0,1)',
			'rgba(218,255,0,1)',
			'rgba(234,255,0,1)',
			'rgba(255,242,0,1)',
			'rgba(255,226,0,1)',
			'rgba(255,210,0,1)',
			'rgba(255,194,0,1)',
			'rgba(255,178,0,1)',
			'rgba(255,161,0,1)',
			'rgba(255,145,0,1)',
			'rgba(255,129,0,1)',
			'rgba(247,16,0,1)',
			'rgba(255,97,0,1)',
			'rgba(255,80,0,1)',
			'rgba(255,64,0,1)',
			'rgba(255,48,0,1)',
			'rgba(255,32,0,1)',
			'rgba(255,16,0,1)',
			'rgba(255,0,0,1)'
		];
	var heatmapOptions = {
			map: this.map,
			radius: 15,
			gradient: hsvGradient
		};
	this.heatmap = new
		google.maps.visualization.HeatmapLayer(heatmapOptions);
  }
  else{
	return new ViewStreets(window,map,listener);
  }
}
ViewStreets.prototype.addListener = function(listener){
	//alert("addListener");
	this.click.attach(listener);
};
ViewStreets.prototype.clickHandler = function(event){
	//alert("clickHandler");
	this.clickLocationsArray.push(event.latLng);
	this.click.notify();
};
ViewStreets.prototype.getFirstClickLocation = function(){
	//alert("getFirstClickLocation");
	return this.clickLocationsArray.shift();
};
ViewStreets.prototype.setMarker = function (lat, lng, value){
	//alert("setMarker");
	value = value/100;
	var weightedLoc = {
			location: new google.maps.LatLng(lat,lng),
			weight: value
	};
	this.weightedLocArray.push(weightedLoc);
	this.heatmap.setData(this.weightedLocArray);
};
ViewStreets.prototype.getZoom = function(){
	return this.map.getZoom();
};