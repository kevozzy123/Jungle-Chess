class Menu {
    startBtn: HTMLButtonElement
    id: string
    mode: string | null
    ruleBtn: HTMLButtonElement
    ruleModal: HTMLDivElement
    shadow: HTMLDivElement
    constructor() {
        this.startBtn = document.querySelector('.start-btn')!
        this.id = this.makeid(8)
        this.mode = null
        this.ruleBtn = document.querySelector('.rule-btn')!
        this.ruleModal = document.querySelector('.rules')!
        this.shadow = document.querySelector('.shadow')!
        this.init()
    }

    init() {
        this.startBtn.addEventListener('click', () => this.handleStartClick())
        this.ruleBtn.addEventListener('click', () => this.handleShowRule())
        this.shadow.addEventListener('click', () => this.onShadowClick())
    }

    makeid(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    handleStartClick() {
        location.href = `game.html?id=${this.id}&mode=${this.mode}`
    }

    handleShowRule() {
        this.ruleModal.style.transform = 'translate(-50%, -50%)'
        this.shadow.style.display = 'block'
    }

    onShadowClick() {
        this.ruleModal.style.transform = 'translate(-50%, -250%)'
        this.shadow.style.display = 'none'
    }
}

new Menu()