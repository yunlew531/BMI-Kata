const bmiStatesData = {
  "overThin": {
    "state": "過輕",
    "colorTxt": "藍色",
    "color": 'blue'
  },
  "normal": {
    "state": "正常",
    "colorTxt": "紅色",
    "color": 'red'
  },
  "overWeight": {
    "state": "過重",
    "colorTxt": "澄色",
    "color": 'orange'
  },
  "mildFat": {
    "state": "輕度肥胖",
    "colorTxt": "黃色",
    "color": 'yellow'
  },
  "moderateFat": {
    "state": "中度肥胖",
    "colorTxt": "黑色",
    "color": 'black'
  },
  "severeFat": {
    "state": "重度肥胖",
    "colorTxt": "綠色",
    "color": 'green'
  },
};

function calculateBmi(e) {
  const height = document.querySelector('#height');
  const errorMessage = document.querySelector('.error-message');
  const h = parseInt(height.value);
  const w = parseInt(weight.value);
  const isEmpty = (!w || !h);
  const bmi = (w / (h / 100) ** 2).toFixed(2);
  const clickEvent = (e.type === 'click');
  let state = '';
  errorMessage.textContent = '';
  if(e.keyCode === 13 || clickEvent) {
    if (isEmpty) {
      errorMessage.textContent = '您的數值輸入錯誤，請重新輸入';
      return;
    }
    else if (bmi < 18.5) state = 'overThin'
    else if (bmi < 24) state = 'normal';
    else if (bmi < 27) state = 'overWeight';
    else if (bmi < 30) state = 'mildFat';
    else if (bmi < 35) state = 'moderateFat';
    else if (bmi >= 35) state = 'severeFat';
    const timestamp = getTime();
    const obj = {
      timestamp,
      bmi,
      state
    }
    bmiHistoryData.push(obj);
    height.value = '';
    weight.value = '';
    renderBmiList();
  }
}

function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
  const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
  return `${year}/${month}/${day} ${hour}:${min}:${sec}`;
}

function renderBmiList() {
  const lastOne = bmiHistoryData[bmiHistoryData.length-1];
  let str = '';
  bmiHistoryData.forEach(item => {
    const content = `<li class="bmi-list ${bmiStatesData[item.state].color}-text"><h4>您的體重${bmiStatesData[item.state].state}，健康指數為${bmiStatesData[item.state].colorTxt}</h4><span>${item.timestamp}</span></li>`;
    str += content;
  })
  if (bmiHistoryData.length) {
    lastTimeDom.parentNode.classList.remove('display-none');
    lastTimeDom.textContent = `您總共計算 ${bmiHistoryData.length} 次 BMI 紀錄，最後一次 BMI 指數為 ${lastOne.bmi}，體重${bmiStatesData[lastOne.state].state}！健康指數為${bmiStatesData[lastOne.state].colorTxt}！`;
  } else {
    lastTimeDom.parentNode.classList.add('display-none');
  }
  calculateHistory.innerHTML = str;
}

function removeAllBbi() {
  calculateHistory.innerHTML = `<li class="empty-history">不要害怕面對現實</li>`;
  lastTimeDom.parentNode.classList.add('display-none');
}

// 執行
const calculateHistory = document.querySelector('.calculate-history');
const lastTimeDom = document.querySelector('.last-time > p');
const calculateBtn = document.querySelector('.calculate-btn');
const removeAllBtn = document.querySelector('.remove-all-btn');
const weight = document.querySelector('#weight');
const bmiHistoryData = [];

calculateBtn.addEventListener('click', calculateBmi);
removeAllBtn.addEventListener('click', removeAllBbi);
weight.addEventListener('keyup', calculateBmi);