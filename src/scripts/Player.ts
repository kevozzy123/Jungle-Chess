class Player {
    animalCount: number;
    timeLeft: number;
    lairAlive: boolean;
    constructor(timeLeft: number) {
        this.animalCount = 8;
        this.timeLeft = timeLeft;
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