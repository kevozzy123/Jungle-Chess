class Board {
    arr: number[][];
    animals: string[];
    constructor() {
        this.arr = [
            [-2, 0, 31, 41, 31, 0, -3],
            [0, -6, 0, 31, 0, -7, 0],
            [-8, 0, -4, 0, -5, 0, -1],
            [0, 33, 33, 0, 33, 33, 0],
            [0, 33, 33, 0, 33, 33, 0],
            [0, 33, 33, 0, 33, 33, 0],
            [1, 0, 5, 0, 4, 0, 8],
            [0, 7, 0, 30, 0, 6, 0],
            [3, 0, 30, 40, 30, 0, 2],
        ];
        // mouse in river: 24, -24
        // animal in self trap: +100, -100. example: 4 => 104
        // in enemy trap: +1000, -1000. example: -2 => -1002
        this.animals = [
            '&#xe60e;', //1, -1 elephant
            '&#xe60d;', //2, -2 lion
            '&#xe617;', //3, -3 tiger
            '&#xedd4;',//4, -4 cheeta
            '&#xedcc;', //5, -5 wolf
            '&#xed07;', //6, -6 dog
            '&#xe61a;',//7, -7 cat
            '&#xe60c;',//8, -8 rat
            'trap',//30, 31
            'lair',//40, 41
            'river'//33
        ]
    }
}


//let boardContent = `<i class='iconfont'>${this.board.animals[Math.abs(arr[i][j])]}</i>`

export default Board