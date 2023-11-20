//json파일을 동적으로 받아오는 함수
function loadItems(){
    //fetch 학습할것 (네트워크 주소를 적으면 받아옴)
    //json데이터를 fetch함수를 이용하여 받아옴
    return fetch('data/data.json')
    //성공하면 받아온데이터를 제이슨으로 변환
    .then(response => response.json())
    //변환이 성광하면 json안에 있는 items를 리턴
    .then(json => json.items);
}

//받아온 json데이터(items)를 html요소로 변환하여 필드에 나타내기
//리스트 업데이트 
function displayItems(items){
    const container = document.querySelector('.items');
    //item를 html배열로 변환 map을 이용
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
} 

//html스트링으로 변경해라
//이미지경로
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span>${item.gender},${item.size}</span>
    </li>
    `;
}
//버튼이 클릭할때 발생되는 이벤트
function onButtonClick(event, items){

    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    //키나 벨류하나라도 없으면 리턴
    if(key == null || value == null) {
        return;
    }
   //클릭된 요소의 value와 item배열의 key값이 같은 요소만 추출
    const filterd = items.filter(item => item[key] === value);
    // console.log(filterd);
     displayItems(filterd)

    // updateItems(items, key, value);
    // console.log(event.target.dataset.key);
    // console.log(event.target.dataset.value);
}

//업데이트 함수
// function updateItems(items, key, value) {
//     items.forEach(item => {
        
//         if(item.dataset[key] === value){
//             item.classList.remove('invisible');
//         }else {
//             item.classList.add('invisible');
//         }
//     })
// }

function setEventListerners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttonDiv');
    logo.addEventListener('click',() => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}


// main 프로미스!!!! json데이터를 받아옴
// 프로미스 성공시 then실행 실패시 catch실행
loadItems()
.then(items => {
    console.log(items);
    displayItems(items);
    //이벤트 실행
    setEventListerners(items);
})
.catch(console.log);

