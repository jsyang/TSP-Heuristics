// Sequence Heuristics /////////////////////////////////////////////////////////

function FLIP(tour,i,j)
{
    if( !(i<tour.locs.length) || !(j<tour.locs.length) || i==j ) return;

    var r0=tour.locs.slice(0);
    var r=[];

    // Flip the inside / outside.
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
//  i       Starting index of the segment
//  j       Segment length
//  shift   Where to shift to the new position
{
    if( !shift || j <=0 || i+j > tour.locs.length ) return;    

    // MOVE the segment to a new place in the Tour.
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