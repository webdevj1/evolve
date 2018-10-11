const champs = require('./allChamps');
 
let topLane = function(){
    let top = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Tank') || champs.data[key].tags.includes('Fighter')){
            top.push(champs.data[key].id)
        }
    }
    return top;
}();

let midLane = function(){
    let mid = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Mage') || champs.data[key].tags.includes('Assassin')){
            mid.push(champs.data[key].id)
        }
    }
    return mid;
}();

let bottomLane = function(){
    let bottom = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Marksman') || champs.data[key].tags.includes('Support')){
            bottom.push(champs.data[key].id)
        }
    }
    return bottom;
}();

let jungleLane = function(){
    let jungle = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Assassin') || champs.data[key].tags.includes('Tank') || champs.data[key].tags.includes('Fighter')){
            jungle.push(champs.data[key].id)
        }
    }
    return jungle;
}();

let support = function(){
    let supports = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Support')){
            supports.push(champs.data[key].id)
        }
    }
    return supports;
}();

let all = function(){
    let allchamps = [];
    for(let key in champs.data){
        allchamps.push(champs.data[key].id)
    }
    return allchamps;
}();

module.exports = {
    top: topLane,
    mid: midLane,
    bot: bottomLane,
    jungle: jungleLane,
    support: support,
    all: all
};