// json 파일들을 html내로 추가시킬 위치 
const json = document.querySelector('.transaction-container .swiper-slide');
// 해당 json 데이터 정보
const file = 'https://syoon0624.github.io/json/test.json';

const request = new XMLHttpRequest();

// URL로 서버 데이타(json) 연결하기 
request.open('GET', file);
request.responseType = 'json';
// 서버에서 response 요청을 보냄
request.send();

// onload를 통해 응답이 성공적으로 돌아왔을 때 작동할 코드 작성
request.onload = function () {
  // BankDataRequest.response는 서버의 json 파일 객체에서 banklist의 배열을 가져옴
  const BankList = request.response;

  showBankList(BankList);

};

// 소비 관련 swiper
new Swiper('.transaction-container .swiper-container', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  mousewheel: true
});

// 오늘 날짜 생성
function Today() {
  const days = new Date();
  // 한국에서 쓰는 날짜 형태로 변환
  return `${days.getFullYear()}-${String(days.getMonth() + 1).padStart(2, 0)}-${String(
    days.getDate()
    ).padStart(2, 0)}`;
}



const day_list = [];

function day_Spend (banklist,count) {

  const day =banklist.filter((t) => t['date'] === day_list[count])
  return day.reduce((acc,curr) => curr['income'] === 'in' ? acc : acc+curr['price'],0)
}



function showBankList(jsonObj) {
  const banklist = jsonObj['bankList'].reverse().filter(e => (e['date'] <= Today()))
  let count =0;

  banklist.map((object) => {

    let price = object['price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    if(object['income'] === 'in') {
       price = '+'+price;
    }

    if(!day_list.includes(object['date'])) { // 새로운 날짜면 
      day_list.push(object['date']);
      // 요소를 추가한다.
      json.innerHTML += `
      <section class="day${object['date'].slice(5,7)}${object['date'].slice(8,10)}">
        <header class="day_title">
          <h3>${object['date']}</h3>
          <span class="day__amount sub-text">${day_Spend(banklist,count)}원 지출</span>
        </header>
        <ol>
          <li>
            <p>${object['history']}</p>
            <span>${price}</span>
          </li>
        </ol>
      </section>`;
      count+=1;
    }
    else {
      const a = json.querySelector(`.day${object['date'].slice(5,7)}${object['date'].slice(8,10)} ol`)
      a.innerHTML += `
      <li>
        <p>${object['history']}</p>
        <span>${price}</span>
      </li>`;
    }
  })
}

const transactionEl = document.querySelector('.transaction-container');
const scroll_bar = document.querySelector('.scroll-bar');
let up = false;

scroll_bar.addEventListener('click', function() {
  up = !up;

  if(up) { // transaction-container가 열려있는 상태라면
    transactionEl.classList.add('up');
  }
  else {
    transactionEl.classList.remove('up');
  }
})

const chartImgEl = document.querySelector('.card .chart-bar .chart-in');
const chartDisplay = document.querySelector('.chart');
let clicked = false;

chartImgEl.addEventListener('click', function () {
  clicked = !clicked;
  if(clicked) {
    chartDisplay.classList.add('clicked');
  }
  else {
    chartDisplay.classList.remove('clicked');
  }
})
