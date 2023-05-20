import { weaponList } from "./lists.js";
const bananaAmount = document.querySelector(".banana-amount");
const tree = document.querySelector(".tree");
const attackMonkeyBox = document.querySelector(".attack-monkeys");
const gameoverScreen = document.querySelector(".gameover");
const gameoverButton = document.querySelector(".play-again");
let monkeySound = new Audio("./sounds/monkey.mp3");
let monkeySlap = new Audio("./sounds/slap.mp3");
let chaching = new Audio("./sounds/chaching.mp3");
let rain = new Audio("./sounds/rain.mp3");
let bossfightMusic = new Audio("./sounds/boss.mp3");
rain.loop = true;
let playing = false;
monkeySound.volume = 0.5;
let monkeyArray = [];
let attackingMonkeyArray = [];
export let autoClickerActive = false;
export let damageAmount = 1;
export let clickAmount = 1;
export let monkeyHP = 23;
export let autoClickerDuration = 1000;
let upgradeCosts = {
  defense: 500,
  defenseMultiplier: 3,
  autoClicker: 10000,
  speed: 15000,
  speedMultiplier: 2,
  weapons: 200,
  weaponsMultiplier: 2,
};
export let currentWeaponIMG = 0;
let bananas = 1;

tree.addEventListener("click", () => {
  if (playing === false) {
    rain.play();
    playing = true;
  }
  bananas = bananas + clickAmount;
  bananaAmount.innerHTML = "Bananas: " + bananas;
});
createMonkey();
function createMonkey() {
  let monkey = document.createElement("div");
  monkeyArray.push(monkey);
  monkey.classList.add("monkey");
  attackMonkeyBox.appendChild(monkey);
  monkeyHealth(monkey, monkeyHP);
  attack(monkey);
}

function attack(monkey) {
  setTimeout(() => {
    attackingMonkeyArray.push(stealBananas());
    console.log(attackingMonkeyArray);
    monkeySound.play();
    monkey.style.transition = "10s ease";
    monkey.style.top = "60%";
  }, 10000);
}
function stealBananas() {
  return setInterval(() => {
    bananas--;
    bananaAmount.innerHTML = "Bananas: " + bananas;
    if (bananas < 0) {
      gameoverScreen.style.visibility = "visible";
    }
  }, 5000);
}
gameoverButton.addEventListener("click", () => {
  window.location.reload();
});

function monkeyHealth(monkey, health) {
  let currentHP = 0;
  monkey.addEventListener("click", () => {
    currentHP = currentHP + damageAmount;
    if (currentHP >= health) {
      monkeySlap.play();
      clearInterval(attackingMonkeyArray.pop());
      bananas += 25;
      bananaAmount.innerHTML = "Bananas: " + bananas;
      currentHP = 0;
      monkey.style.transition = "0s";
      monkey.style.top = "-10%";
      setTimeout(() => {
        monkey.style.transition = "10s ease";
        attack(monkey);
      }, 100);
    }
  });
}

const defenseButton = document.querySelector(".defense");
const autoClickerButton = document.querySelector(".auto-clicker");
const speedButton = document.querySelector(".speed");
const weaponButton = document.querySelector(".weapons");

defenseButton.addEventListener("mouseover", () => {
  defenseButton.innerHTML = upgradeCosts.defense;
});
defenseButton.addEventListener("mouseleave", () => {
  defenseButton.innerHTML = "Defense Upgrade";
});

autoClickerButton.addEventListener("mouseover", () => {
  autoClickerButton.innerHTML = upgradeCosts.autoClicker;
});
autoClickerButton.addEventListener("mouseleave", () => {
  autoClickerButton.innerHTML = "Auto Clicker Upgrade";
});

speedButton.addEventListener("mouseover", () => {
  speedButton.innerHTML = upgradeCosts.speed;
});
speedButton.addEventListener("mouseleave", () => {
  speedButton.innerHTML = "Speed Upgrade";
});

weaponButton.addEventListener("mouseover", () => {
  weaponButton.innerHTML = upgradeCosts.weapons;
  updateWeaponIMG();
});
weaponButton.addEventListener("mouseleave", () => {
  weaponButton.innerHTML = "Weapon Upgrade";
});

weaponButton.addEventListener("click", () => {
  if (bananas >= upgradeCosts.weapons) {
    chaching.play();
    bananas = bananas - upgradeCosts.weapons;
    upgradeCosts.weapons =
      upgradeCosts.weapons * upgradeCosts.weaponsMultiplier;
    bananaAmount.innerHTML = "Bananas: " + bananas;
    weaponButton.innerHTML = upgradeCosts.weapons;
    currentWeaponIMG++;
    damageAmount += 2;
    createMonkey();
  }
});

function updateWeaponIMG() {
  const weaponIMG = document.createElement("img");
  weaponIMG.src = weaponList[currentWeaponIMG];
  weaponButton.appendChild(weaponIMG);
}

autoClickerButton.addEventListener("click", () => {
  if (upgradeCosts.autoClicker === "PURCHASED") {
    return;
  } else if (bananas > upgradeCosts.autoClicker) {
    autoClickerActive = true;
    chaching.play();
    bananas = bananas - upgradeCosts.autoClicker;
    bananaAmount.innerHTML = "Bananas: " + bananas;
    autoClickerButton.innerHTML = "PURCHASED";
    upgradeCosts.autoClicker = "PURCHASED";
    autoClicker();
  }
});
let autoClickerID;
function autoClicker() {
  autoClickerID = setInterval(() => {
    bananas = bananas + clickAmount;
    bananaAmount.innerHTML = "Bananas: " + bananas;
  }, autoClickerDuration);
}

defenseButton.addEventListener("click", () => {
  if (bananas >= upgradeCosts.defense) {
    chaching.play();
    createMonkey();
    bananas = bananas - upgradeCosts.defense;
    upgradeCosts.defense =
      upgradeCosts.defense * upgradeCosts.defenseMultiplier;
    bananaAmount.innerHTML = "Bananas: " + bananas;
    defenseButton.innerHTML = upgradeCosts.defense;
    clickAmount = clickAmount * upgradeCosts.defenseMultiplier;
    monkeyHP++;
  }
});

speedButton.addEventListener("click", () => {
  if (bananas >= upgradeCosts.speed) {
    chaching.play();
    createMonkey();
    bananas = bananas - upgradeCosts.speed;
    upgradeCosts.speed = upgradeCosts.speed * upgradeCosts.speedMultiplier;
    bananaAmount.innerHTML = "Bananas: " + bananas;
    speedButton.innerHTML = upgradeCosts.speed;
    clearInterval(autoClickerID);
    autoClickerDuration = Math.round(autoClickerDuration * 0.9);
    autoClicker();
  }
});

const bossBox = document.querySelector(".bossfight-box");
const healthbar = document.querySelector(".healthbar");
const boss = document.querySelector(".boss");

function spawnBoss() {
  setTimeout(() => {
    bossBox.style.visibility = "visible";
    bossfight();
  }, 300000);
}

function bossfight() {
  bossfightMusic.play();
  //creating health
  let bossHealth = document.createElement("div");
  bossHealth.classList.add("health");
  healthbar.appendChild(bossHealth);
  //starting theft
  let bossID = setInterval(() => {
    if (bananas < 0) {
      gameoverScreen.style.visibility = "visible";
    }
    bananas--;
    bananaAmount.innerHTML = "Bananas: " + bananas;
  }, 300);
  //defeat boss mechanic
  let health = 100;
  boss.addEventListener("click", () => {
    health--;
    bossHealth.style.width = health + "%";
    if (health === 0) {
      bossfightMusic.pause();
      bossfightMusic.currentTime = 0;
      bananas += Math.round(0.05 * bananas);
      bananaAmount.innerHTML = "Bananas: " + bananas;
      clearInterval(bossID);
      bossBox.style.visibility = "hidden";
      healthbar.removeChild(bossHealth);
      spawnBoss();
    }
  });
}
spawnBoss();