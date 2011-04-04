/*******************************************************************************
20/04/10 21:41 -- http://jsyang.ca

	gLayer -- each is a <CANVAS>-backed object

	imgs	= array of image filenames to load
	fn	= callback when done loading imgs

	i	= array of HTMLImageElements
	e	= HTMLElement
	c	= DrawingContext
	
*******************************************************************************/

function gLayer(imgs,size,fn){
    
    this.w=size[0];
    this.h=size[1];
    
	this.i=[];
	this.iLoaded=0;
	
	this.callback=fn;
	
	// Check progress of loading event
	this.checkProgress=function(obj,n)
	{
		if(++obj.iLoaded==n) obj.callback(obj);
	};

	
	this.e=document.createElement("canvas");
	if(size!=undefined)
	{
		this.e.width=this.w;
		this.e.height=this.h;
	}
	this.c=this.e.getContext('2d');
	
	document.body.appendChild(this.e);
    
    // Clear the canvas for the gLayer
    this.clear=function()
    {
        this.c.clearRect(0,0,this.w,this.h);
    };

    // Load the images
	for(var j in imgs)
	{
		var a=new Image();
		a.src=imgs[j];
		this.i.push(a);				
		a.onerror=function(){ alert("Error in loading "+this.src); };
		if(fn!=undefined) a.onload=this.checkProgress(this,imgs.length);
	}
	
	// If we didn't have any images, do the callback
	if(fn && !imgs.length) fn(this);
}
