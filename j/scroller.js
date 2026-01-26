// Accessible Scroller by Mike Foskett (http://www.websemantics.co.uk/). Retain this message and you may use the code freely.

var speed=2       // speed of scroller
var step=1         // smoothness of movement
var top="#top"      // name of anchor used as page top when clicking start / stop / show
var Start= "Start"  // Text for start link
var Stop = "Stop"   // Text for stop link
var Show = "Show"   // Text for show link

var x, scroll, divW, sText=""

function onclickIE(idAttr,handler,call){
  if ((document.all)&&(document.getElementById)){idAttr[handler]=new Function(call)}
}

function addLink(id,call,txt){
  var e=document.createElement('A')
  e.setAttribute('href',top)
  e.setAttribute('onclick',call)
  var linktext=document.createTextNode(txt)
  e.appendChild(linktext)
  document.getElementById(id).appendChild(e)
}

function addControls(){
  //addLink('controls','clickAction(0)',Stop)
 //onclickIE(document.getElementById('controls').childNodes[0],"onclick",'clickAction(0)')
//  document.getElementById('controls').appendChild(document.createTextNode(' | '))
 // addLink('controls','clickAction(2)',Show)
 // onclickIE(document.getElementById('controls').childNodes[2],"onclick",'clickAction(2)')
}

function stopScroller(){clearTimeout(scroll)}

function setAction(node,callvalue,txt){
  var c=document.getElementById('controls')
  c.childNodes[node].setAttribute('onclick','clickAction('+callvalue+')')
  onclickIE(document.getElementById('controls').childNodes[node],"onclick",'clickAction('+callvalue+')')
  c.childNodes[node].firstChild.nodeValue=txt
}

function clickAction(no){
  switch(no) {
    case 0:
      stopScroller()
      setAction(0,1,Start)
      setAction(2,2,Show)
      break
    case 1:
      startScroller()
      setAction(0,0,Stop)
      setAction(2,2,Show)
      break
    case 2:
      stopScroller()
      setAction(0,1,Start)
      setAction(2,3,Start)
      x=0
      document.getElementById('tag').style.whiteSpace='normal'
      document.getElementById('tag').style.left='0px'
      break
    case 3:
      startScroller()
      setAction(0,0,Stop)
      setAction(2,2,Show)
      x=divW
      document.getElementById('tag').style.left=x+'px'
  }
}

function startScroller(){
  document.getElementById('tag').style.whiteSpace='nowrap'
  var p=document.createElement('P')
  p.id='testP'
  p.style.fontSize='25%' //fix for mozilla. multiply by 4 before using
  x-=step
  if (document.getElementById('tag').className) p.className=document.getElementById('tag').className
  p.appendChild(document.createTextNode(sText))
  document.body.appendChild(p)
  pw=p.offsetWidth
  document.body.removeChild(p)
  if (x<(pw*4)*-1){x=divW}
  document.getElementById('tag').style.left=x+'px'
  scroll=setTimeout('startScroller()',speed)
}

function initScroller(){
  if (document.getElementById && document.createElement && document.body.appendChild) {
    addControls()
    document.getElementById('controls').style.display='block'
    divW=document.getElementById('scroller').offsetWidth
    x=divW
    document.getElementById('tag').style.position='relative'
    document.getElementById('tag').style.left=divW+'px'
    var ss=document.getElementById('tag').childNodes
    for (i=0;i<ss.length;i++) {sText+=ss[i].nodeValue+" "}
    scroll=setTimeout('startScroller()',speed)
  }
}

function addLoadEvent(func) {
  if (!document.getElementById | !document.getElementsByTagName) return
  var oldonload = window.onload
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload()
      func()
    }
  }
}

addLoadEvent(initScroller)
