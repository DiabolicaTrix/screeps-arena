import { ATTACK, HEAL, RANGED_ATTACK } from "game/constants";
import { Creep } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";

let initialized: boolean = false;
let defenders: Creep[] = [];
let attackers: Creep[] = [];

export function loop() {
    const creeps = getObjectsByPrototype(Creep).filter(creep => creep.my)
    const enemyCreeps = getObjectsByPrototype(Creep).filter(creep => !creep.my)

    console.log(creeps)
    
    if(!initialized) {
        splitCreeps(creeps)
    }
}

export function splitCreeps(creeps: Creep[]): { attackers: Creep[], defenders: Creep[] } {
    let defenders: Creep[] = [];
    let attackers: Creep[] = [];

    let attacker = creeps.find(creep => creep.body.some(body => body.type == ATTACK));
    if(attacker) {
        defenders.push(attacker);
    }

    let healers = creeps.filter(creep => creep.body.some(body => body.type == HEAL));
    defenders.concat(healers.slice(0, 2))

    let rangers = creeps.filter(creep => creep.body.some(body => body.type == RANGED_ATTACK));
    defenders.concat(rangers.slice(0, 2))

    attackers = creeps.filter(creep => !defenders.includes(creep))
    return { attackers, defenders }
}