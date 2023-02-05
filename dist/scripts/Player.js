class Player {
    constructor(timeLeft) {
        this.animalCount = 8;
        this.timeLeft = timeLeft;
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
