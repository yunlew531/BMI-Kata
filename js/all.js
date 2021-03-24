
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
