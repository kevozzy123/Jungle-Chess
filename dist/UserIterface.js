class UserInterface {
    constructor() {
        this.rulesModal = document.querySelector('.rules-modal');
        this.gameoverModal = document.querySelector('.game-over-modal');
        this.gameoverText = document.querySelector('.game-over-text');
        this.gamePage = document.querySelector('.game-page');
        this.menuPage = document.querySelector('.menu-page');
        this.shadow = document.querySelector('.shadow');
        this.ruleBtn = document.querySelector('.rule-btn');
        this.init();
    }
    init() {
        this.ruleBtn.addEventListener('click', () => {
            this.showRules();
        });
    }
    showGameover(reason) {
        console.log(reason);
        this.gameoverModal.style.display = 'block';
        this.gameoverText.textContent = reason;
        this.shadow.style.transform = 'translateY(0)';
    }
    showRules() {
        this.rulesModal.style.display = 'block';
        this.shadow.style.transform = 'translateY(0)';
    }
    showMenu() {
        this.menuPage.style.display = 'block';
        this.gamePage.style.display = 'none';
    }
    showGame() {
        this.menuPage.style.display = 'none';
        this.gamePage.style.display = 'block';
    }
}
export default UserInterface;
