let gold = 0;
let diamonds = 0;

// =====================
// SAVE / LOAD
// =====================

function saveGame() {
  localStorage.setItem("goldMinerSave", JSON.stringify({
    gold: gold,
    diamonds: diamonds,
    power: power,
    upgradeLevel: upgradeLevel,
    upgradeCost: upgradeCost,
    workers: workers,
    workerCost: workerCost,
    missionTarget: missionTarget,
    missionReward: missionReward,
    missionCompleted: missionCompleted,
    achievements: achievements
  }));
}

function loadGame() {
  const save = localStorage.getItem("goldMinerSave");

  if (!save) return;

  const data = JSON.parse(save);

  gold = data.gold ?? 0;
  diamonds = data.diamonds ?? 0;
  power = data.power ?? 1;

  upgradeLevel = data.upgradeLevel ?? 1;
  upgradeCost = data.upgradeCost ?? 10;

  workers = data.workers ?? 0;
  workerCost = data.workerCost ?? 100;

  missionTarget = data.missionTarget ?? 500;
  missionReward = data.missionReward ?? 5;
  missionCompleted = data.missionCompleted ?? false;

  achievements = data.achievements ?? {
    firstDig: false,
    richMiner: false,
    diamondHunter: false,
    workerEmpire: false
  };
}

let power = 1;

let upgradeLevel = 1;
let upgradeCost = 10;

let workers = 0;
let workerCost = 100;


// =====================
// MISSION
// =====================

let missionTarget = 500;
let missionReward = 5;
let missionCompleted = false;


// =====================
// ACHIEVEMENTS
// =====================

let achievements = {
  firstDig: false,
  richMiner: false,
  diamondHunter: false,
  workerEmpire: false
};


// =====================
// ELEMENTS
// =====================

const goldText =
  document.getElementById("gold");

const diamondText =
  document.getElementById("diamond");

const powerText =
  document.getElementById("power");

const incomeText =
  document.getElementById("income");

const clickButton =
  document.getElementById("clickButton");

const upgradeButton =
  document.getElementById("upgradeButton");

const autoButton =
  document.getElementById("autoButton");

const upgradeInfo =
  document.getElementById("upgradeInfo");

const autoInfo =
  document.getElementById("autoInfo");


// Mission

const missionButton =
  document.getElementById("missionButton");

const missionPopup =
  document.getElementById("missionPopup");

const closeMission =
  document.getElementById("closeMission");

const claimMission =
  document.getElementById("claimMission");

const missionText =
  document.getElementById("missionText");

const missionProgress =
  document.getElementById("missionProgress");


// Achievement

const achievementButton =
  document.getElementById("achievementButton");

const achievementPopup =
  document.getElementById("achievementPopup");

const closeAchievement =
  document.getElementById("closeAchievement");

const achievementList =
  document.getElementById("achievementList");


// Notification

const notification =
  document.getElementById("notification");


// =====================
// NOTIFICATION SYSTEM
// =====================

let notificationTimer;

function showNotification(message) {

  notification.textContent = message;

  notification.classList.add("show");

  clearTimeout(notificationTimer);

  notificationTimer = setTimeout(function() {

    notification.classList.remove("show");

  }, 2200);
}


// =====================
// UPDATE SCREEN
// =====================

function updateScreen() {

  goldText.textContent =
    "🪙 Gold: " + gold;

  diamondText.textContent =
    "💎 Diamond: " + diamonds;

  powerText.textContent =
    "⛏️ Per Click: +" + power;

  incomeText.textContent =
    "👷 Income: +" + workers + "/sec";


  upgradeInfo.textContent =
    "Upgrade Lv." +
    upgradeLevel +
    " | Harga: " +
    upgradeCost +
    " Gold";


  autoInfo.textContent =
    "Workers: " +
    workers +
    " | Harga: " +
    workerCost +
    " Gold";


  missionText.textContent =
    "Kumpulkan " +
    missionTarget +
    " Gold";


  missionProgress.textContent =
    "Progress: " +
    Math.min(gold, missionTarget) +
    " / " +
    missionTarget;


  if (
    gold >= missionTarget &&
    !missionCompleted
  ) {

    claimMission.style.display =
      "block";

  } else {

    claimMission.style.display =
      "none";

  }


  updateAchievements();
}


// =====================
// ACHIEVEMENTS
// =====================

function updateAchievements() {

  let list = "";


  if (achievements.firstDig) {

    list += `
      <div class="achievement unlocked">
        🏆 <b>First Dig</b><br>
        Lakukan mining pertama.
      </div>
    `;

  } else {

    list += `
      <div class="achievement">
        🔒 <b>First Dig</b><br>
        Lakukan mining pertama.
      </div>
    `;

  }


  if (achievements.richMiner) {

    list += `
      <div class="achievement unlocked">
        🏆 <b>Rich Miner</b><br>
        Kumpulkan 1.000 Gold.
      </div>
    `;

  } else {

    list += `
      <div class="achievement">
        🔒 <b>Rich Miner</b><br>
        Kumpulkan 1.000 Gold.
      </div>
    `;

  }


  if (achievements.diamondHunter) {

    list += `
      <div class="achievement unlocked">
        🏆 <b>Diamond Hunter</b><br>
        Temukan Diamond pertama.
      </div>
    `;

  } else {

    list += `
      <div class="achievement">
        🔒 <b>Diamond Hunter</b><br>
        Temukan Diamond pertama.
      </div>
    `;

  }


  if (achievements.workerEmpire) {

    list += `
      <div class="achievement unlocked">
        🏆 <b>Worker Empire</b><br>
        Punya 10 Worker.
      </div>
    `;

  } else {

    list += `
      <div class="achievement">
        🔒 <b>Worker Empire</b><br>
        Punya 10 Worker.
      </div>
    `;

  }


  achievementList.innerHTML =
    list;
}


// =====================
// MINE
// =====================

clickButton.onclick = function() {

  let earnedGold = power;


  // CRITICAL 0.9%

  if (Math.random() < 0.009) {

    earnedGold =
      power * 5;

    showNotification(
      "💥 CRITICAL HIT! +" +
      earnedGold +
      " Gold!"
    );

  }


  gold =
    gold + earnedGold;


  // FIRST DIG

  if (!achievements.firstDig) {

    achievements.firstDig = true;

    showNotification(
      "🏆 ACHIEVEMENT UNLOCKED! First Dig!"
    );

  }


  // DIAMOND 0.5%

  if (Math.random() < 0.005) {

    diamonds =
      diamonds + 1;

    showNotification(
      "💎 RARE ORE! +1 Diamond!"
    );


    if (!achievements.diamondHunter) {

      achievements.diamondHunter =
        true;

      showNotification(
        "🏆 ACHIEVEMENT! Diamond Hunter!"
      );

    }

  }


  // RICH MINER

  if (
    gold >= 1000 &&
    !achievements.richMiner
  ) {

    achievements.richMiner =
      true;

    showNotification(
      "🏆 ACHIEVEMENT! Rich Miner!"
    );

  }


  updateScreen();
  saveGame();
};


// =====================
// UPGRADE
// =====================

upgradeButton.onclick = function() {

  if (gold >= upgradeCost) {

    gold =
      gold - upgradeCost;

    power =
      power + 1;

    upgradeLevel =
      upgradeLevel + 1;

    upgradeCost =
      upgradeCost + 10;

    updateScreen();
    saveGame();

  }

};


// =====================
// WORKER
// =====================

autoButton.onclick = function() {

  if (gold >= workerCost) {

    gold =
      gold - workerCost;

    workers =
      workers + 1;

    workerCost =
      workerCost + 50;


    if (
      workers >= 10 &&
      !achievements.workerEmpire
    ) {

      achievements.workerEmpire =
        true;

      showNotification(
        "🏆 ACHIEVEMENT! Worker Empire!"
      );

    }


    updateScreen();
    saveGame();

  }

};


// =====================
// AUTO GOLD
// =====================

setInterval(function() {

  if (workers > 0) {

    gold =
      gold + workers;


    if (
      gold >= 1000 &&
      !achievements.richMiner
    ) {

      achievements.richMiner =
        true;

      showNotification(
        "🏆 ACHIEVEMENT! Rich Miner!"
      );

    }


    updateScreen();
    saveGame();

  }

}, 1000);


// =====================
// MISSION OPEN
// =====================

missionButton.onclick = function() {

  missionPopup.style.display =
    "flex";

};


// =====================
// MISSION CLOSE
// =====================

closeMission.onclick = function() {

  missionPopup.style.display =
    "none";

};


// =====================
// CLAIM MISSION
// =====================

claimMission.onclick = function() {

  if (
    gold >= missionTarget &&
    !missionCompleted
  ) {

    diamonds =
      diamonds + missionReward;

    missionCompleted =
      true;


    showNotification(
      "🏆 MISSION COMPLETE! +" +
      missionReward +
      " 💎"
    );


    missionTarget =
      missionTarget + 500;

    missionReward =
      missionReward + 5;

    missionCompleted =
      false;


    updateScreen();
    saveGame();

  }

};


// =====================
// ACHIEVEMENT OPEN
// =====================

achievementButton.onclick = function() {

  achievementPopup.style.display =
    "flex";

};


// =====================
// ACHIEVEMENT CLOSE
// =====================

closeAchievement.onclick = function() {

  achievementPopup.style.display =
    "none";

};


// =====================
// START
// =====================

loadGame();
updateScreen();
