function Loc(x,y)
// A 2D coord in this implementation. Any definition which has a 
// distance or norm function is a practical alternative.
{
    this.x=x;
    this.y=y;
    
    this.distTo=function(otherLoc)
    // Squared!
    {
        var yd=this.y-otherLoc.y;
        var xd=this.x-otherLoc.x;
        return xd*xd+yd*yd;
    };
}

function Tour(locs)
// Composed of a _sequence_ of Locs.
{
    this.locs=locs;
    
    this.dist=function(locs)
    {
        if(!locs.length) return;
        for(var i=0, distance=0, prevLoc=locs[locs.length-1]; i<locs.length; prevLoc=locs[i], i++)
        distance+=prevLoc.distTo(locs[i]);        
        return distance;
    };
    
    this.lastDist=Math.sqrt(this.dist(locs));
    
    this.update=function(newLocs)
    {
        var newDist=Math.sqrt(this.dist(newLocs));
        if(newDist>=this.lastDist) return;
        this.locs=newLocs;
        this.lastDist=newDist;
    };
    
    this.merge=function(otherTour)
    {
        this.locs=this.locs.concat(otherTour.locs);
        this.lastDist=Math.sqrt(this.dist(this.locs));
    };
}