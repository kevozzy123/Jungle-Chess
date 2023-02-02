class UserInterface {
    constructor() {
        this.rulesModal = document.querySelector('.rules-modal');
        this.gameoverModal = document.querySelector('.game-over-modal');
        this.gameoverText = document.querySelector('.game-over-text');
        this.shadow = document.querySelector('.shadow');
        this.backBtn = document.querySelector('.back-btn');
        this.optionsBtn = document.querySelector('.options-btn');
        this.optionsBox = document.querySelector('.options-box');
        this.concedeBtn = document.querySelector('.concede-btn');
        this.drawBtn = document.querySelector('.draw-btn');
        this.undoBtn = document.querySelector('.undo-btn');
        this.winnerTxt = document.querySelector('.winner-text');
        this.closeBtn = document.querySelector('.close-btn');
        this.init();
    }
    init() {
        this.backBtn.addEventListener('click', () => {
            location.href = '/';
        });
        this.optionsBtn.onclick = (event) => {
            if (this.optionsBox.style.opacity === '0') {
                this.optionsBox.style.opacity = '1';
                this.optionsBox.style.transform = 'translateY(0)';
                this.optionsBox.style.pointerEvents = 'auto';
                // console.log(event.pageX, event.pageY)
            }
            else {
                this.hideToolkit();
            }
        };
        this.drawBtn.addEventListener('click', () => {
            this.hideToolkit();
            this.showGameover('This game has ended in a draw', 'draw');
        });
        this.closeBtn.addEventListener('click', () => {
            location.href = '/';
        });
        this.shadow.addEventListener('click', () => {
            this.shadow.style.display = 'none';
            this.gameoverModal.style.display = 'none';
            location.href = '/';
        });
    }
    hideToolkit() {
        this.optionsBox.style.opacity = '0';
        this.optionsBox.style.transform = 'translateY(-25px)';
        this.optionsBox.style.pointerEvents = 'none';
    }
    showGameover(reason, player) {
        console.log(reason);
        this.gameoverModal.style.opacity = '1';
        this.gameoverText.textContent = reason;
        this.shadow.style.display = 'block';
        this.winnerTxt.textContent = player === 'draw' ? "It's a draw"
            : player === 'red' ? 'Red Player has won!' : 'Blue Player has won!';
    }
    showRules() {
        this.rulesModal.style.display = 'block';
    }
}
export default UserInterface;
