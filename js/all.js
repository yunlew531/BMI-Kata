// 題目
// printBmi(178, 85) >> 印出 console.log 文字為「您的體重過重，健康指數為澄色」
// printBmi("身高","體重")>> 印出 console.log 文字為「您的數值輸入錯誤，請重新輸入」
// showHistoryData() >> 印出 console.log 文字為「您總共計算 3 次 BMI 紀錄，最後一次 BMI 指數為 26.83，體重過重！健康指數為澄色！」

const bmiStatesData = {
  "overThin": {
    "state": "過輕",
    "color": "藍色"
  },
  "normal": {
    "state": "正常",
    "color": "紅色"
  },
  "overWeight": {
    "state": "過重",
    "color": "澄色"
  },
  "mildFat": {
    "state": "輕度肥胖",
    "color": "黃色"
  },
  "moderateFat": {
    "state": "中度肥胖",
    "color": "黑色"
  },
  "severeFat": {
    "state": "重度肥胖",
    "color": "綠色"
  },
};

function printBmi(height, weight) {
  const BMI = (weight / ((height / 100) ** 2)).toFixed(2);
  let state = '';
  if (BMI < 18.5) state = 'overThin';
  else if (BMI < 24) state = 'normal';
  else if (BMI < 27) state = 'overWeight';
  else if (BMI < 30) state = 'mildFat';
  else if (BMI < 35) state = 'moderateFat';
  else if (BMI >= 35) state = 'severeFat';
  else {
    console.log('您的數值輸入錯誤，請重新輸入');
    return;
  }
  bmiHistoryData.push({
    BMI,
    state
  })
  console.log(`您的體重${bmiStatesData[state].state}，健康指數為${bmiStatesData[state].color}`);
}

function showHistoryData() {
  const lastOne = bmiHistoryData[bmiHistoryData.length - 1];
  console.log(`您總共計算 ${bmiHistoryData.length} 次 BMI 紀錄，最後一次 BMI 指數為 ${lastOne.BMI}，體重${bmiStatesData[lastOne.state].state}！健康指數為${bmiStatesData[lastOne.state].color}！`);
}

// JS執行位置
const bmiHistoryData = [];


printBmi(178, 20);
printBmi(178, 70);
printBmi(178, 85);
printBmi(178, 90);
printBmi(178, 110);
printBmi(178, 130);
printBmi("身高", "體重");
showHistoryData();
