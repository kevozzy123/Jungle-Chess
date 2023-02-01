class Player {
    constructor() {
        this.animalCount = 8;
        this.timeLeft = 300;
        this.lairAlive = true;
    }
    get alive() {
        return this.lairAlive;
    }
    set alive(value) {
        this.lairAlive = value;
    }
}
export default Player;
