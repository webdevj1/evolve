const champs = require('./allChamps');

let tank = function(){
    let tanks = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Tank')){
            tanks.push(champs.data[key].id);
        };
    };
    return tanks;
}();

let fighter = function(){
    let fighters = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Fighter')){
            fighters.push(champs.data[key].id);
        };
    };
    return fighters;
}();

let mage = function(){
    let mages = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Mage')){
            mages.push(champs.data[key].id);
        };
    };
    return mages;
}();

let marksman = function(){
    let marksmen = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Marksman')){
            marksmen.push(champs.data[key].id);
        };
    };
    return marksmen;
}();

let assassin = function(){
    let assassins = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Assassin')){
            assassins.push(champs.data[key].id);
        };
    };
    return assassins;
}();

let support = function(){
    let supports = [];
    for(let key in champs.data){
        if(champs.data[key].tags.includes('Support')){
            supports.push(champs.data[key].id);
        };
    };
    return supports;
}();

module.exports = {
    tank,
    fighter,
    mage,
    support,
    assassin,
    marksman 
};