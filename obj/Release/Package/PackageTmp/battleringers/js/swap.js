function newImage(arg) { 
  if (document.images) {
    result = new Image();
    result.src = arg;
    return result;
  }
}   
if (document.images) {
  grey = newImage("images/button.gif");
  one = newImage("images/one.gif");
  two = newImage("images/two.gif");
  three = newImage("images/three.gif");
  four = newImage("images/four.gif");
  five = newImage("images/five.gif");
  six = newImage("images/six.gif");
  seven = newImage("images/seven.gif");
  eight = newImage("images/eight.gif");
  nine = newImage("images/nine.gif");
}  
function swap(pic,pica) {
  if(!document.images) return;
    eval('document.images[pic].src = '+pica +'.src');
}
