//변수 설정
//html변경되는 요소 
let shortleftElem = document.querySelector("#short-left");
let comScoreElem = document.querySelector("#computer-score");
let userScoreElem = document.querySelector("#user-score");
let textElem = document.querySelector("#text");
let comBtn = document.querySelector(".btn-computer");
//사용자 버튼은 2개라서 복수선택
let userBtn = document.querySelectorAll(".btn-user"); 

//컴퓨터 점수, 사람점수, 남은 슛횟수, 컴퓨터 차례
let comScore = 0;
let userScore = 0;
let shortLeft = 5;
let isComputerTurn = true;
shortleftElem.innerHTML = shortLeft;
//게임로직
//컴퓨터 먼저 슛을한다.
//컴퓨터 슛 버튼 클릭 
//2점슛인지 3점슛인지 랜덤으로 결정(50%)
//2점슛은 50%확률로 성공 3점슛은 30%확률로 성공

//버튼 이벤트 지정
comBtn.addEventListener("click",function(){
    onComputerShoot();
})


function onComputerShoot(){
    //2점인지 3점인지 랜덤하게 지정
    let shootType = Math.random() > 0.5 ? 2 : 3;
    if(shootType==2){
        //성공했을때
        if(Math.random()>0.5){
            //컴퓨터의 점수를 2점 올려준다
            comScore = comScore + 2;
            //화면변경
            comScoreElem.innerHTML = comScore;
            textElem.innerHTML = "컴퓨터가 2점슛을 성공시켰습니다.";
        }
        //실패했을때
        else {
            textElem.innerHTML = "컴퓨터가 2점슛을 실패했습니다.";
        }
    //3점슛을 시도 햇을때
    }else {
        //성공했을때
        if(Math.random()<0.3){
            //컴퓨터의 점수를 2점 올려준다
            comScore = comScore + 3;
            //화면변경
            comScoreElem.innerHTML = comScore;
            textElem.innerHTML = "컴퓨터가 3점슛을 성공시켰습니다.";
        }
        //실패했을때
        else {
            textElem.innerHTML = "컴퓨터가 3점슛을 실패했습니다.";
        }
    }
    //컴퓨터턴 false지정
    isComputerTurn = false;
    //유저버튼 비활성화 false
    userBtn.forEach(btn=>btn.disabled = false);
    //컴퓨터 버튼 비활성화 true
    comBtn.disabled = true;
}
userBtn.forEach(btn=>{
    btn.addEventListener("click",function(){
        onUserShoot(parseInt(btn.innerHTML));
    })
})
//사용자 버튼 함수
function onUserShoot(jum){
    let randomnum = jum==2 ? 0.5 : 0.3;
    //슛 성공
    if(Math.random() < randomnum){
        //사용자의 점수를 올리면된다.
        userScore = userScore + jum;
        userScoreElem.innerHTML = userScore;
        textElem.innerHTML = "당신이 "+jum+"점 슛을 성공했습니다.";
    }
    //슛 실패
    else {
        textElem.innerHTML = "당신이 "+jum+"점 슛을 실패했습니다.";
    }
    shortLeft--;
    //슛 횟수 화면 변경하기
    shortleftElem.innerHTML = shortLeft;
    userBtn.forEach(btn=>btn.disabled=true);
    comBtn.disabled = false;
    if(shortLeft==0) {
        gameOver();
    }
}

//슛 횟수가 0이되면 승자를 결정
function gameOver(){
    if(userScore>comScore){
        textElem.innerHTML="당신이 승리했습니다.";
    }else if(userScore == comScore){
        textElem.innerHTML="비겼습니다.";
    }else {
        textElem.innerHTML="컴퓨터가 승리했습니다.";
    }
    comBtn.disabled = true;
    userBtn.forEach(btn=>btn.disabled = true);
}
