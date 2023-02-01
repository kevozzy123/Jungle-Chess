import { gameControl } from "./index";

class Player {
    animalCount: number;
    timeLeft: number;
    lairAlive: boolean;
    constructor() {
        this.animalCount = 8;
        this.timeLeft = 300;
        this.lairAlive = true
    }

    get alive() {
        return this.lairAlive
    }

    set alive(value: boolean) {
        this.lairAlive = value
    }
}

export default Player