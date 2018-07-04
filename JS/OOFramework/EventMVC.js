function EventMVC(sender,listener){
	//alert("EventMVC");
    this.sender = sender;
    this.listeners = [];
    this.listeners.push(listener);
}
EventMVC.prototype.attach = function (listener) {
    	//alert("attach");
        this.listeners.push(listener);
};
EventMVC.prototype.notify = function () {
    	//alert("notify");
        var index;
        for (index = 0; index < this.listeners.length; index += 1) {
            try{
            	this.listeners[index](this.sender);
            }
            catch(E){
            	alert(E);
            }
        }
};