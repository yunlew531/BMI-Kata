// 把資料按組別分類，並且運算需要的資料加上去
function dataClassification() {
  let obj = {};
  data.forEach(item => {
    if (item.jsGroup === '未分組') return;
    if (!obj[item.jsGroup]) {
      obj[item.jsGroup] = {};
      obj[item.jsGroup].members = [];
    }
    obj[item.jsGroup].team = item.jsGroup;
    obj[item.jsGroup].members.push(item);
  })
  const teamArr = Object.values(obj);
  return teamArr;
}

// 增加每組平均時間屬性
function addGroupAverageTime(teamArr) {
  teamArr.map(item => {
    const totalMin = item.members.reduce((prev, minute) => {
      minute = parseInt(minute.practiceMinute);
      return prev + minute;
    }, 0);
    const totalSec = item.members.reduce((prev, second) => {
      second = parseInt(second.practiceSecond);
      return prev + second;
    }, 0);
    const TimeInSec = totalMin * 60 + totalSec;
    const averageTotalSec = (TimeInSec / item.members.length);
    const averageMin = Math.floor(averageTotalSec / 60);
    const averageSec = (Math.round(averageTotalSec % 60) < 10 ? '0' : '') + (Math.round(averageTotalSec % 60));
    item.averageTime = `${averageMin}分${averageSec}秒`;
    item.averageTotalSec = averageTotalSec;
  })
    ;
}

// 按繳交人數最多的組別排序
function getActiveTeam(teamArr) {
  return teamArr.sort((a, b) => b.members.length - a.members.length);

}

// 按平均時間快的組別排序
function getFasterTeam(teamArr) {
  return teamArr.sort((a, b) => a.averageTotalSec - b.averageTotalSec);
}

// 渲染組別卡片
function renderTeamCard(cardArr, Dom) {
  let str = '';
  cardArr = cardArr.filter((item, key) => key < 3);
  cardArr.forEach((item, key) => {
    let strGroupRank = ''

    // 組內排名
    const groupRankSortArr = rankMemberInGroup(item);

    groupRankSortArr.forEach(groupMember => {
      const content = `
      <li>
          <p>${groupMember.slackName}</p>
          <p>${groupMember.practiceMinute}分${groupMember.practiceSecond}秒</p>
        </li>
      `;
      strGroupRank += content;
    })

    const content = `
      <li class="card">
        <div class="card-header">
          <h4>第${item.team}組</h4>
          <div class="rank-img-${key}"></div>
          <div class="people-time">
            <div>
              <h5>繳交人數</h5>
              <p>${item.members.length}人</p>
            </div>
            <div>
              <h5>平均時間</h5>
              <p>${item.averageTime}</p>
            </div>
          </div>
        </div>
        <div class="card-content">
          <h5>組內排名</h5>
          <ul>${strGroupRank}</ul>
        </div>
      </li>
    `;
    str += content;
  })
  Dom.innerHTML = str;
}

// 組內排名
function rankMemberInGroup(arr) {
  const groupRankSortArr = arr.members.sort((a, b) => {
    a = a.practiceMinute * 60 + a.practiceSecond * 1;
    b = b.practiceMinute * 60 + b.practiceSecond * 1;
    return a - b;
  });
  return groupRankSortArr;
}

// 渲染個人排名
function renderPersonalCard(e) {
  const cardRender = document.querySelector('.search-content .card-render');
  let PersonalRank = data.sort((a, b) => {
    a = a.practiceMinute * 60 + a.practiceSecond * 1;
    b = b.practiceMinute * 60 + b.practiceSecond * 1;
    return a - b;
  })
  
  if (!e) {
    PersonalRank = PersonalRank;
  } else if (e.target.value === '低於10分鐘') {
    PersonalRank = PersonalRank.filter(item => item.practiceMinute < 10);
  } else if (e.target.value === '有留言') {
    PersonalRank = PersonalRank.filter(item => item.message);
  } else if (e.target.value === '有影片') {
    PersonalRank = PersonalRank.filter(item => item.youtubeUrl);
  } else if (e.target.value === '搜尋' || e.keyCode === 13) {;
    PersonalRank = PersonalRank.filter(item => item.slackName.match(searchText.value));
  }
  let str = '';
  PersonalRank.forEach((item, key) => {
    const isUnder10 = (item.practiceMinute >= 10 ? 'class="display-none"' : '')
    const content = `
      <li class="personal-rank-card">
        <div class="header">
          <span>No. ${key + 1}</span>
          <span>TEAM ${item.jsGroup}</span>
          <span ${isUnder10}>Under 10 mins</span>
          <h3>${item.slackName}</h3>
          <h5>${item.practiceMinute}分${item.practiceSecond}秒</h5>
        </div>
        <div class="content">
          <h5>留言</h5>
          <p>${item.message || '沒有留言'}</p>
        </div>
        <div class="footer">
          <a href="${item.codepenUrl}">Code</a>
          <a href="${item.youtubeUrl}">Video</a>
          <span>${item.timestamp}</span>
        </div>
      </li>
    `;
    str += content;
  })
  cardRender.innerHTML = str;
}

// JS執行位置
const fasterTeam = document.querySelector('.fastly-team .card-render');
const activelyTeam = document.querySelector('.actively-team .card-render');
const searchText = document.querySelector('.search-text');
const searchBtn = document.querySelector('.search-btn');
const under10Btn = document.querySelector('.under-10-btn');
const hasMessage = document.querySelector('.has-message');
const hasVideo = document.querySelector('.has-video');

let data = [];

const api = 'https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json';
axios.get(api).then(res => {
  data = res.data;

  // 整理資料成需要的格式
  const teamArr = dataClassification();
  // 增加組別平均時間
  addGroupAverageTime(teamArr);

  // 排序踴躍的組別
  const activeTeamArr = getActiveTeam(teamArr);
  // 渲染踴躍的組別
  renderTeamCard(activeTeamArr, activelyTeam);

  // 排序神速的組別
  const fasterTeamArr = getFasterTeam(teamArr);
  // 渲染神速的組別
  renderTeamCard(fasterTeamArr, fasterTeam);

  // 渲染個人排名
  renderPersonalCard();
})

searchText.addEventListener('keyup', renderPersonalCard);
searchBtn.addEventListener('click', renderPersonalCard);
under10Btn.addEventListener('click', renderPersonalCard);
hasMessage.addEventListener('click', renderPersonalCard);
hasVideo.addEventListener('click', renderPersonalCard);