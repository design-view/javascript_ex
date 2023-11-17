//변수설정
//컴퓨터 점수, 사람점수, 남은 슛 회수
//html변경되는 요소

//html요소 
let shortleftElem = document.querySelector("#short-left");
let comScoreElem = document.querySelector("#computer-score");
let userScoreElem = document.querySelector("#user-score");
let textElem = document.querySelector("#text");
let comBtn = document.querySelector(".btn-computer");
let userBtns = document.querySelectorAll(".btn-user");

//오브젝트로 만들기
//컴퓨터 오브젝트

let computer = {
  score: 0,
  percent2: 0.5,
  percent3: 0.3,
}
//사용자 오브젝트
let user = {
  score: 0,
  percent2: 0.5,
  percent3: 0.3,
}
//게임 오브젝트
let game = {
  isComputerTurn: true,
  shotsLeft: 5,
}
shortleftElem.innerHTML = game.shotsLeft;
function onComputerShoot(){
  //2점인지 3점인지 랜덤지정
  let shootType = Math.random() > 0.5 ? 2 : 3;
  //2점슛일때 실행
  if(Math.random() < computer["percent"+shootType]){
      computer.score = computer.score + shootType;
      comScoreElem.innerHTML = computer.score;
      textElem.innerHTML = "컴퓨터가 "+ shootType +"점슛을 성공시켰습니다.";
  }
  else {
    textElem.innerHTML = "실패했습니다."
  }
  disabledBtn(false);
}
//버튼 비활성화 함수
//flag에 true가 할당되면 사용자 버튼이 비활성화
//컴퓨터 버튼은 활성화
//flag에 false가 할당되면 사용자 버튼이 활성화
//컴퓨터 버튼은 비활성화
function disabledBtn(flag){
  userBtns.forEach(btn=>{
    btn.disabled = flag;
  })
  comBtn.disabled = !flag;
}
//사용자가2점슛을 클릭했을때
function onUserShoot(jum){
  if(Math.random()<user["percent"+jum]){
    //사용자의 점수를 올린다.
    //글자를변경 컴퓨터가 2점슛을 성공시켰습니다.
    user.score = user.score + jum;
    userScoreElem.innerHTML = user.score;
    textElem.innerHTML = "당신이 " + jum + "점슛을 성공시켰습니다.";
  }else {
    textElem.innerHTML = "실패했습니다."
  }
  disabledBtn(true);
  //남은 슛횟수를 1씩 빼기 
  game.shotsLeft = game.shotsLeft-1;
  //슛횟수 화면 변경하기 
  shortleftElem.innerHTML = game.shotsLeft;
  if(game.shotsLeft==0){
    gameOver();
  }
}

//슛횟수가 0이되면 승자를 결정하는 함수
function gameOver(){
  if(user.score>computer.score){
    textElem.innerHTML = "승리했습니다.";
  }else if(user.score == computer.score) {
    textElem.innerHTML = "비겼습니다.";
  }else {
    textElem.innerHTML = "졌습니다."
  }
  userBtns.forEach(btn=>{
    btn.disabled = true;
  })
  comBtn.disabled = true;
}