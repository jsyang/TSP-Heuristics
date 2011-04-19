/*
    TSP Optimization Webworker.    
*/

importScripts("entity.js","ops.js");

var l=[];   // global locations list
var t={};   // tour

function sequenceMessage(tour)
{
    var m="";
    for(var i=0; i<tour.locs.length; i++)
    {
        m+=tour.locs[i].initIndex+",";
    }
    return "["+m+"0]";
}

// May want to make this a little more abstract later, but for now
// we can still assume the Locs are 2D cartesian, as defined in entity.js

// Receives a message from the worker manager (parent page)
onmessage=function(e)
{
    var endmsg="invalid op / message";
    var msg=e.data.split(":");    
    
    var op=msg[0];
    var args=msg[1];        
    
    switch(op)
    {
        case "init":
            l=[];
            args=eval(args);    // ex: eval("[[12,14],[52,135],...,[431,52]]")
            for(var i=0; i<args.length; i++)
            {
                var newL=new Loc(args[i][0],args[i][1]);
                newL.initIndex=i;
                l.push( newL );
            }
            t=new Tour(l);
            endmsg="initdone";
            break;
        
        case "opt2only":
            OPTIMIZE(t,{flipOnly:1});
            endmsg="opt2only:"sequenceMessage(t);
            break;
            
        case "opt":
            OPTIMIZE(t,info);
            endmsg="opt:"+sequenceMessage(t);
            break;    
    }
};


