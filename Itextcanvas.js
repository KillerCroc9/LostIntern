canvas = new fabric.Canvas('canv')

iTextSample = new fabric.IText("Something happens someday", {
  left: 50,
  top: 50,
  fill: 'black',
  font: '20px',
  lineHeight: 1.1,
});

canvas.add(iTextSample);


function getSelectedObject() {
  if (obj = canvas.getActiveObject()) {
    return obj;
  } else {
    return 0;
  }
}

function setStyle(object, styleName, value) {
  if (object.setSelectionStyles && object) {
    var style = {};
    style[styleName] = value;
    object.setSelectionStyles(style);
  } else {
    object[styleName] = value;
    
  }
}

function getStyle(object, styleName) {
  return (object.getSelectionStyles && object.isEditing) ?
    object.getSelectionStyles()[styleName] :
    object[styleName];
}



function font() {
  var isFont = (getStyle(obj, 'fontFamily') || '').indexOf('Verdana') > -1;;
  setStyle(obj, 'fontFamily', isFont ? '' : 'Verdana');
};


function color() {
  var isfill = (getStyle(obj, 'textBackgroundColor') || '').indexOf('aqua') > -1;
  setStyle(obj, 'textBackgroundColor', isfill ? '' : 'aqua');
};


function mytask() {
  a = getSelectedObject();
  if (a == 0) {
    console.log("nothing selected");
  } else {

    text = a.text;
    words = text.split(" ");
    for (count = 0; count < words.length; count++) {
      word = words[count];
      start = text.indexOf(word);
      end = word.length;
      end = end + start;
      a.setSelectionStart(start);
      a.setSelectionEnd(end);

      if (count % 2 == 0) {
        console.log("Changing Font", word);
        font();

      } else {
        console.log("Changing Color", word);
        color();

      }
    }
    a.onDeselect();
    canvas.renderAll();
  }
}
document.getElementById('BtnClick')['onclick'] = mytask;
