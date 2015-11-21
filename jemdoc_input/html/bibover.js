/* For abstractcontent. 
 * Modified from bibover Jemdoc extension:http://bibover.polytekniker.dk/
 */
var offX = 0;          // X offset from mouse position
var offY = 0;          // Y offset from mouse position
var patt = /javascript:cite\(\'(.*)\'\)/;
var oldposx,oldposy;
//Hack save x and y on mouse over to avoid passing event to cite(...)
var posX,posY;
var currDiv;

function mouseX(evt) {
    if (!evt) 
	evt = window.event; 
    if (evt.pageX) 
	return evt.pageX; 
    else if (evt.clientX)
	return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft); 
    else 
	return 0;
}

function mouseY(evt) {
    if (!evt) 
	evt = window.event; 
    if (evt.pageY) 
	return evt.pageY; 
    else if (evt.clientY)
	return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); 
    else 
	return 0;
}

function bibshow(evt) 
{
    var obj;
    if(obj=getciteobj(this)) {
	posX=(parseInt(mouseX(evt))+offX);
	posY=(parseInt(mouseY(evt))+offY);
	//Check to se if element is fixed
	if(!(hasClassName(obj,'fixed'))) {
	    removeClassName(obj,'noshow');
	    obj.style.left = posX + 'px';
	    obj.style.top = posY + 'px';
	}
    }
}

function bibhide(evt) 
{
    var obj;
    if(obj=getciteobj(this)) {
	//If the div is fixed, down't hide
	if(!(hasClassName(obj,'fixed'))) {
	    addClassName(obj,'noshow');
	    obj.style.left = (parseInt(mouseX(evt))+offX) + 'px';
	    obj.style.top = (parseInt(mouseY(evt))+offY) + 'px';
	}
    }
}

function getciteobj(tgt) {
    var key;
    hr=tgt.href;
    m=hr.match(patt);
    key=m[1];
    obj = document.getElementById('bibover_'+key); 
    return obj;
}
//Show the cite permanently
function cite(key) {
    var obj;
    if(obj=document.getElementById('bibover_'+key)) {
	addClassName(obj,'fixed');
	obj.style.left = posX + 'px';
	obj.style.top = posY + 'px';
    }
}

function closeCite(key) {
   var obj;
   if(obj=document.getElementById('bibover_'+key)) {
       removeClassName(obj,'fixed');
       addClassName(obj,'noshow');
   }
}

/*
 * Some reimplementations of functions from the prototype library
 */
function hasClassName(elm,str) {
    return (elm.className.search(str)!=-1);
}

function removeClassName(elm,str) {
    elm.className=elm.className.replace(str,'');
    //Clean up double spaces to avoid classname to become really long
    elm.className=elm.className.replace('  ',' ');
}

function addClassName(elm,str) {
    // Check if the class name already exists
    if(!hasClassName(elm,str))
	elm.className=elm.className.concat(' ',str);
    
}

