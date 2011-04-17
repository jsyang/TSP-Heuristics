// Sequence Heuristics /////////////////////////////////////////////////////////

function FLIP(tour,i,j)
// Flip the inside / outside between bounds i, j.
{
    if( !(i<tour.locs.length) || !(j<tour.locs.length) || i==j ) return;

    var r0=tour.locs.slice(0);
    var r=[];
    
    var lower=(j>i)? i : j;
    var upper=(j>i)? j : i;
    var r_head=r0.slice(0,lower);
    var r_body=r0.slice(lower,upper);
    var r_tail=r0.slice(upper);
    r=r.concat(r_head);
    r=r.concat(r_body.reverse());
    r=r.concat(r_tail);
    
    tour.update(r);
}

function FLIP_CYCLE(tour)
// Cycle through all index combinations once.
{
    for(var i=0;   i<tour.locs.length; i++)
    for(var j=i+1; j<tour.locs.length; j++)
    FLIP(tour,i,j);
}

function MOVE(tour,i,j,shift)
// MOVE the segment to a new place in the Tour.
//  i       Starting index of the segment
//  j       Segment length
//  shift   Where to shift to the new position
{
    if( !shift || j <=0 || i+j > tour.locs.length ) return;    
    
    var r0=tour.locs.slice(0);
    var cut=r0.splice(i,j);
    var r=r0.slice(0,i+shift);
    r=r.concat(cut);
    r=r.concat(r0.slice(i+shift));
    
    tour.update(r);
}

function MOVE_CYCLE(tour)
// Cycle through all index and length combinations once.
{
    var nl=tour.locs.length;
    for(var i=0; i<nl; i++)
    for(var j=1; j<nl-i; j++)
    for(var s=-i; s<=nl-j-i; s++)
    if(s) MOVE(tour,i,j,s);
}

function OPTIMIZE(tour,info)
// Optimize to the extent that FLIP and MOVE operations will permit.
// info:
// {
//      op:         Next operation to perform
//      tries:      How many tries so far without dist improvement?
//      flipOnly:   Only perform the cheaper FLIP operation
//      dist:       Current Tour distance
// }
{
    var dist=    info? (info.dist? info.dist:Number.POSITIVE_INFINITY) :Number.POSITIVE_INFINITY;
    var op=      info? (info.op? info.op:0) :0;
    var tries=   info? (info.tries? info.tries:0) :0;
    var flipOnly=info? (info.flipOnly? info.flipOnly:0) :0;

    if(flipOnly) op=0;
    
    if(!op) FLIP_CYCLE(tour);
    else    MOVE_CYCLE(tour);

    if(tour.lastDist<dist)  { dist=tour.lastDist; }
    else if(tries<3)        { op++; op%=2; tries++; }
    else                    { return; }
    
    OPTIMIZE(tour,{ dist:dist, op:op, tries:tries, flipOnly:flipOnly });
}