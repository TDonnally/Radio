const radio = new Zdog.Illustration({
    element: '.radio',
    resize: 'fullscreen',
    zoom: 2,
    rotate: {x:Zdog.TAU/-12, y:Zdog.TAU/15},
    dragRotate: true,
  })
  
  const box = new Zdog.Rect({
    addTo:radio,
    width: 140,
    height: 40,
    stroke: 50,
    color: '#584b42', // default face color
  })
  
  
  const dial = new Zdog.Cylinder({
    addTo: radio,
    diameter: 40,
    length: 20,
    stroke: 2,
    fill: true,
    color: '#f77754',
    frontFace: '#EA0',
    translate: { x: -40, z:25 },
  })
  const ticker = new Zdog.Shape({
    path: [
      {x: 0, z: 10},
      {x:0, z: 10, y:-20},
    ],
  })
  dial.addChild(ticker);


  const screen = new Zdog.Rect({
    addTo:radio,
    width: 60,
    height: 10,
    stroke: 2,
    fill: true,
    color: '#537d91',
    translate: { x: 40, z:25 },
  })
  
  
  const antenna = new Zdog.Shape({
    addTo: radio,
    path: [
      { x: 41, y: -40 },
      { x: 30, y: -70 },
      { x: 80, y: -90 }, // start at 1st point
      { x: 70, y: -110 }, // line to 2nd point
    ],
    stroke: 2,
    closed:false,
    color: '#537d91',
  })
  const lightning = new Zdog.Shape({
    path: [
      {x:70, y:-110},
    ],
    stroke: 7,
    color:'#f8b400'
  })
  
  
  //animation variables
  var size = 2.0;
  var negative = true;
  var denominator = 90;
  var timer = 0;
  var origin = new Array();
  var path = new Array();
  var audio = document.getElementById("buttercup");

  function animateRadio() {
    if (size > 2.1){
      negative = true;
    }
    else if (size < 1.9){
      negative = false;
    }
    if (negative == false){
      size += 1/denominator;
    }
    else{
      size -= 1/denominator;
    }
    if (radioOn == true){
      radio.zoom = size;
      dial.rotate.z +=.02;
      }
    
   
    radio.updateRenderGraph();
    requestAnimationFrame(animateRadio);
  }
  animateRadio();
  

  var radioOn = false;
  document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyZ') {
      if (radioOn == false){
        radioOn = true;
        screen.color = '#f8b400';
        
        radio.addChild(lightning);
        audio.play();
        
      }
      else if(radioOn == true){
        radioOn = false;
        screen.color = '#537d91';
        radio.removeChild(lightning);
        audio.pause();
        
      }
    }
  });
