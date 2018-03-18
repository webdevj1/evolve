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

module.exports = {
    topLane: topLane,
    midLane: midLane,
    bottomLane: bottomLane

}