/*
    TSP Optimization Webworker.    
*/

importScripts("entity.js","ops.js");

function OPTIMIZE(t,info)
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
    
    if(!op) FLIP_CYCLE(t);
    else    MOVE_CYCLE(t);

    if(t.lastDist<dist) { dist=t.lastDist; }
    else if(tries<3)    { op++; op%=2; tries++; }
    else                { return; }
    
    OPTIMIZE(t,{ dist:dist, op:op, tries:tries, flipOnly:flipOnly });
}

onmessage=function(e)
{
    
};


