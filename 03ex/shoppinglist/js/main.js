//json파일을 동적으로 받아오는 함수
async function loadItems(){
    //fetch() ---> Promise객체
    // return fetch("data/data.json")
    // .then(response=>response.json())
    // .then(data=>data.items);   //---> promise객체
    let response = await fetch("data/data.json");
    let data = await response.json();
    return data.items;
}

function displayItems(items){
    console.log(items);
    document.querySelector("ul").innerHTML = items.map(item=> `
    <li class="item">
        <img src="${item.images}"/>
        <span>${item.gender} , ${item.size}</span>
    </li>`).join("");
    //document.querySelector("ul").innerHTML ="<li class='item'><img src='imgs/pink_t.png'/><span>,small</span></li><li class='item'><img src='imgs/pink_t.png'/><span>,small</span></li><li class='item'><img src='imgs/pink_t.png'/><span>,small</span></li><li class='item'><img src='imgs/pink_t.png'/><span>,small</span></li><li class='item'><img src='imgs/pink_t.png'/><span>,small</span></li><li class='item'><img src='imgs/pink_t.png'/><span>,small</span></li><li class='item'><img src='imgs/pink_t.png'/><span>,small</span></li>";
    
}


//버튼에 이벤트 연결하기 
function setEvent(items){
    const buttons = document.querySelector(".buttonDiv");
    buttons.addEventListener("click", function(e){
        let key = e.target.dataset.key;
        let value = e.target.dataset.value;
        let filterd = items.filter(item=> item[key] === value);
        displayItems(filterd);
    })
}

loadItems()
.then(items=>{
    displayItems(items);
    setEvent(items);
})