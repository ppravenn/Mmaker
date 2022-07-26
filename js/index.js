const saveBtn= document.getElementById("save")
const textInput = document.getElementById("text")
const fileInput = document.getElementById("file")
const modeBtn = document.getElementById("mode-btn")
const destroyBtn = document.getElementById("destroy-btn")
const eraserBtn = document.getElementById("eraser-btn")
const coloroption = Array.from(document.getElementsByClassName("color-option"));
const color = document.querySelector("#color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fontSize = document.getElementById("fontSize");
const sTexts = document.getElementById("sText");

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 800

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap ="round"
let isPainting = false;
let isFilling = false;
let isflag = false;

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMousedown() {
    isPainting = true;
    
}

function onMouseup() {
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function colorCahnge(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color
    ctx.strokeStyle = colorValue
    ctx.fillStyle = colorValue
    color.value=colorValue
}

function onModeClick(){
    if(isFilling){
        isFilling=false;
        modeBtn.innerText="Fill"
    }else{
        isFilling=true;
        modeBtn.innerText="Draw"
    }
}
function onTextMode(){ 
    if(isflag){
        isflag=false;
        sTexts.innerText="글자 stroke"
    }else{
        isflag=true;
        sTexts.innerText="글자 fill"
    }
}
function onCanvasClick(){
if(isFilling){
    ctx.fillRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT)
}
}

function onDestoyclick(){
    ctx.fillStyle="white"
    ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function onEraserClick(){
    ctx.strokeStyle="white"
    isFilling=false;
    modeBtn.innerText="Fill"
}

function onFileChange(event){
    const file = event.target.files[0]
    const url= URL.createObjectURL(file)
    console.log(url)
    const image = new Image()
    image.src = url
    image.onload = function(){
        ctx.drawImage(image,0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
        fileInput.value = null;
    }
}

function onDoubleClick(event){
    const size= fontSize.value;
    const text = textInput.value;
    ctx.font ="48px serif"
    ctx.save();
    if(text !== "" && isflag==false){
        ctx.lineWidth = 1;
        ctx.font=`${size}px serif`
        ctx.fillText(text, event.offsetX, event.offsetY);
        
    }else if(text !=="" && isflag==true){
        ctx.lineWidth = 1;
        ctx.font=`${size}px serif`
        ctx.strokeText(text, event.offsetX, event.offsetY);
    }
    ctx.restore();
}
function onSaveClick(){
    const url=canvas.toDataURL();
    const a = document.createElement("a")
    a.href = url;
    a.download = "myDrawing.png"
    a.click();
}


canvas.addEventListener("dblclick", onDoubleClick)
canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown", onMousedown)
canvas.addEventListener("mouseup", onMouseup)
canvas.addEventListener("mouseleave", onMouseup)
canvas.addEventListener("click", onCanvasClick)

sTexts.addEventListener("click", onTextMode)
lineWidth.addEventListener("change", onLineWidthChange)
color.addEventListener("change", colorCahnge)
modeBtn.addEventListener("click", onModeClick)
destroyBtn.addEventListener("click", onDestoyclick)
eraserBtn.addEventListener("click", onEraserClick)
fileInput.addEventListener("change", onFileChange)
saveBtn.addEventListener("click", onSaveClick)

coloroption.forEach(color => color.addEventListener("click", onColorClick))
















//사람그리기

// ctx.fillRect(210-40,200-20,15,100);
// ctx.fillRect(350-40,200-20,15,100);
// ctx.fillRect(260-40,200-20,60,200);

// ctx.arc(250, 100, 50, 0, 2*Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle="white"
// ctx.arc(260+10, 80, 8, Math.PI, 2*Math.PI);
// ctx.arc(220+10, 80, 8, Math.PI, 2*Math.PI);
// ctx.fill();


//집그리기
// cxt.fillRect(200, 200, 50, 200);
// cxt.fillRect(400, 200, 50, 200);
// cxt.lineWidth=2
// cxt.fillRect(300, 300, 50, 100);
// cxt.fillRect(200,200,200,20);
// cxt.moveTo(200,200);
// cxt.lineTo(325,100);
// cxt.lineTo(450,200);
// cxt.fill();