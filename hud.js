import { monkeyHP, clickAmount, currentWeaponIMG, damageAmount, autoClickerDuration } from "./click.js";
import { weaponList } from "./lists.js";
const inventory = document.querySelector(".inventory");
const shop = document.querySelector(".shop");
const iHUD = document.querySelector(".inventory-hud");
const sHUD = document.querySelector(".shop-hud");
const x1 = document.querySelector(".x-out1");
const x2 = document.querySelector(".x-out2");
const hpLabel = document.querySelector(".hp-label");
const currentWeapon = document.querySelector(".weapon-img");
const damage = document.querySelector(".damage");
const bpc = document.querySelector(".bpc");
const bps = document.querySelector(".bps");
shop.addEventListener("click",()=>{
    sHUD.style.visibility = "visible";
});

inventory.addEventListener("click",()=>{
    hpLabel.innerHTML = "Monkey HP: " + monkeyHP;
    currentWeapon.src = weaponList[currentWeaponIMG];
    bpc.innerHTML = "BPC: " + clickAmount;
    damage.innerHTML = "Damage: " + damageAmount;
    bps.innerHTML = "BPS: " + 
   (clickAmount * (2-(autoClickerDuration/1000)));
    iHUD.style.visibility = "visible";
});
x1.addEventListener("click",()=>{
    sHUD.style.visibility = "hidden";
});

x2.addEventListener("click",()=>{
    iHUD.style.visibility = "hidden";
});