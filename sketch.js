//사각형
let rx, ry;  //사각형 시작점
const rw=200, rh=30;   //사각형 크기
//원
let cx, cy;   //원 시작점
const cr=15;   //반지름
let cdirx=1, cdiry=-1;
let cspeed=5;  //움직이는 속도

//점수
let score;

//소리, 이미지
let img, song1, song2;

//버튼
let button;

//시작 flag
let sFlag =true;

function setup() {
  createCanvas(600, 600);
  initDraw(); 
}
//소리, 이미지 불러오기
function preload(){
  img = loadImage('./img/logo.png');
  song1 = loadSound('./sound/blop.mp3');
  song2 = loadSound('./sound/blop2.mp3');
}
//초기화
function initDraw(){
  //사각형 시작점
  rx=width/2-rw/2;
  ry=height-rh;
  
  //원 시작점
  cx= width/2;
  cy= height/2;
  
  //점수
  score=0;
}

//사각형 그리기
function rectDraw(){
  //마우스로 움직이기
  // rx=mouseX;
  
  //키보드로 움직이기
  if (keyIsDown(LEFT_ARROW)) rx -= 5;
  if (keyIsDown(RIGHT_ARROW)) rx += 5;
  
  //캔버스안에서 움직이기
  if( rx>width-rw) rx=width-rw;    //오른쪽벽에 닿았을때
  if(rx<0) rx=0;                   //왼쪽벽에 닿았을때
  
  rect(rx,ry,rw,rh);               //사각형 그리기
}

//원 그리기
function circleDraw(){
  //막대에 닿았을때
  if(cx >=rx && cx<= rx+rw && cy >= ry-cr){
    cdiry = -cdiry;
    score = score+1;  // 점수 +1
    song1.play();    //소리 삽입
  }
  else if( cy > ry-cr){      //막대에 닿지 않았을때
    cdiry = -cdiry;
    score = score-1;  //점수 -1
    song2.play();    //소리 삽입
  }
  //벽면에 닿았을때 튕기기
  if(cx<=cr||cx>=width-cr){      //가로벽에 닿았을때
    cdirx=-cdirx;
    cx= cx+cdirx*random(cr*2);
  }
  if(cy<=cr || cy >= height-cr){  //세로벽에 닿았을때
    cdiry=-cdiry;
    cy= cy+cdiry*random(cr*2);
  }
  
  //새로운 중심점
  cx= cx+cdirx*cspeed;
  cy= cy+cdiry*cspeed;
  
  circle(cx, cy, cr*2);    //원그리기
}

//점수 
function showScore(){
  textSize(24);
  text('만든이 : 홍길동', 10,30);
  text('점수 : '+score,10,60);
}
//시작화면
function startBt(){
  image(img,200,150,200,200);
  button=createButton('시작하기');
  button.size(200,50);
  button.position(width/3, height/5*3);
  button.style('font-size','24');
  button.mousePressed(changeFlag);
}
//게임시작
function changeFlag(){
  removeElements();
  sFlag = false;
}
function draw() {
  background(220);
  
  if(sFlag){      //sFlag=true
    startBt();    //시작화면
  }
  else {
    //게임시작
    rectDraw();    //막대
    circleDraw();   //공
    showScore();    //점수   
    
  }
  
  
  
  
}





