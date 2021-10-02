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
  Chart2(BankList);
};

// 소비 관련 swiper
new Swiper('.swiper1', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  mousewheel: true
});

new Swiper('.swiper2', {
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
   const sum = day.reduce((acc,curr) => curr['income'] === 'in' ? acc : acc+curr['price'],0)
   return sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
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


// Chart page Javascript 
const chartImgEl = document.querySelector('.card .chart-bar .chart-in');
const chartDisplay = document.querySelector('.chart-page');
const closeBtn = document.querySelector('.close');
let clicked = false;

chartImgEl.addEventListener('click', function () {
  clicked = true;
  chartDisplay.classList.add('clicked');
})

closeBtn.addEventListener('click', function() {
  clicked = false;
  chartDisplay.classList.remove('clicked');
})

// 일간 리포트 chart
let myChartOne = document.getElementById('myChartOne').getContext('2d');
let barChart1 = new Chart(myChartOne, {
  type: 'bar',
  data: {
    labels : ["02","04","06","08","10","12","14","18"],
    datasets : [{
      label: '',
      barPercentage:0.2,
      borderRadius: 3,
      data : [78000,92000,72000,92000,76000,70000,98000,78000,97000],
      backgroundColor: ['rgba(56,201,118,1)']
    }]
  },
  options: {
    responsive: false,  // 그래프의 width, height를 조정하기 위해선 false
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display:false
        }
      }
    }
  }
})

// 지출패턴 chart
function Chart2(object) {
  const analyze = object['bankList'].reduce((acc, v) => {
    acc[0] += v['income'] === 'in' ? v['price'] : 0; 
    acc[1] += v['classify'] === 'health' ? v['price'] : 0;
    acc[2] += v['classify'] === 'eatout' ? v['price'] : 0;
    acc[3] += v['classify'] === 'mart' ? v['price'] : 0;
    acc[4] += v['classify'] === 'shopping' ? v['price'] : 0;
    acc[5] += v['classify'] === 'oiling' ? v['price'] : 0;
    return acc;
  }, [0, 0, 0, 0, 0, 0])
  
  
  let myChartTwo = document.getElementById('myChartTwo').getContext('2d');
  let barChart2 = new Chart(myChartTwo, {
    type: 'doughnut',
    data: {
      datasets: [{
        cutoutPercentage: 0,
        backgroundColor: [
          'rgba(255, 99, 132,1)', // Income
          'rgba(245, 143, 41,1)', // health
          'rgba(255, 75, 62,1)', // eatout
          'rgba(35, 87, 137,1)', //mart
          'rgba(155, 197, 61,1)', //shopping
          'rgba(254, 194, 41,1)' //oiling
        ],
        data: analyze
      }]
    },
    options: {
      responsive: false,
      cutout:100
    }
  })
}

