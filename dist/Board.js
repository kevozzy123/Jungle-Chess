class Board {
    constructor() {
        this.arr = [
            [-2, 0, 31, 41, 31, 0, -3],
            [0, -6, 0, 31, 0, -7, 0],
            [-8, 0, -4, 1, -5, 0, -1],
            [0, 33, 33, 0, 33, 33, 0],
            [0, 33, 33, 0, 33, 33, 0],
            [0, 33, 33, 0, 33, 33, 0],
            [1, 0, 5, -1, 4, 0, 8],
            [0, 7, 0, 30, 0, 6, 0],
            [3, 0, 30, 40, 30, 0, 2],
        ];
        // mouse in river: 24, -24
        // animal in self trap: +100, -100. example: 4 => 104
        // in enemy trap: +1000, -1000. example: -2 => -1002
        this.animals = [
            '&#xe60e;',
            '&#xe60d;',
            '&#xe617;',
            '&#xedd4;',
            '&#xedcc;',
            '&#xed07;',
            '&#xe61a;',
            '&#xe60c;',
            'trap',
            'lair',
            'river' //33
        ];
    }
}
//let boardContent = `<i class='iconfont'>${this.board.animals[Math.abs(arr[i][j])]}</i>`
export default Board;
