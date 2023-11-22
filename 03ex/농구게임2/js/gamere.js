//변수 설정
//html변경되는 요소 
let shortleftElem = document.querySelector("#short-left");
let comScoreElem = document.querySelector("#computer-score");
let userScoreElem = document.querySelector("#user-score");
let textElem = document.querySelector("#text");
let comBtn = document.querySelector(".btn-computer");
//사용자 버튼은 2개라서 복수선택
let userBtn = document.querySelectorAll(".btn-user"); 


//객체 생성
//컴퓨터 객체  //computer["percent2"], computer["percent3"]
let computer = {
    score: 0,
    percent2: 0.5,
    percent3: 0.3
}
//사용자 객체
let user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.3
}
let game = { shortsLeft: 5 }

shortleftElem.innerHTML = game.shortsLeft;

//버튼 이벤트 지정
comBtn.addEventListener("click",function(){
    onComputerShoot();
})
userBtn.forEach(btn=>{
    btn.addEventListener("click",function(){
        onUserShoot(parseInt(btn.innerHTML));
    })
})

function onComputerShoot(){
    //2점인지 3점인지 랜덤하게 지정
    let shootType = Math.random() > 0.5 ? 2 : 3;  
    //2점슛이면 0.5보다 작을때, 3점슛이면 0.3보다 작을때 
    if(Math.random()<computer["percent"+shootType]){
        //컴퓨터의 점수를 2점 올려준다
        computer.score = computer.score + shootType;
        //화면변경
        comScoreElem.innerHTML = computer.score;
        textElem.innerHTML = "컴퓨터가 "+shootType+"점슛을 성공시켰습니다.";
    }
    //실패했을때
    else {
            textElem.innerHTML = "컴퓨터가 "+shootType+"점슛을 실패했습니다.";
    }   
    disabledBtn(false);
}

//사용자 버튼 함수
function onUserShoot(jum){
    //슛 성공
    if(Math.random() < user["percent"+jum]){
        //사용자의 점수를 올리면된다.
        user.score = user.score + jum;
        userScoreElem.innerHTML = user.score;
        textElem.innerHTML = "당신이 "+jum+"점 슛을 성공했습니다.";
    }
    //슛 실패
    else {
        textElem.innerHTML = "당신이 "+jum+"점 슛을 실패했습니다.";
    }
    game.shortsLeft--;
    //슛 횟수 화면 변경하기
    shortleftElem.innerHTML = game.shortsLeft;
    disabledBtn(true);
    if(game.shortsLeft==0) {
        gameOver();
    }
}

//버튼 비활성화 false
function disabledBtn(flag){
    userBtn.forEach(btn=>btn.disabled = flag);
    comBtn.disabled = !flag;
}

//슛 횟수가 0이되면 승자를 결정
function gameOver(){
    if(user.score>computer.score){
        textElem.innerHTML="당신이 승리했습니다.";
    }else if(user.score == computer.score){
        textElem.innerHTML="비겼습니다.";
    }else {
        textElem.innerHTML="컴퓨터가 승리했습니다.";
    }
    comBtn.disabled = true;
    userBtn.forEach(btn=>btn.disabled = true);
}
