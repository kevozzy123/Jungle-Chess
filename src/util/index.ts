function abs(num: string | number): number {
    return Math.abs(Number(num))
}

function deepClone(value: any[]) {
    let result: any[] = []

    for (const key in value) {
        // if (Object.prototype.hasOwnProperty(key)) {
        result[key] = value[key]
        // }
    }

    return result
}
// function checkMoveValid(
//     position: [number, number],
//     target: [number, number],
//     attr: string
// ): boolean {
//     let result: boolean
//     let condition =
//         (abs(position[0] - target[0]) === 1 && abs(position[1] - target[1]) === 0)
//         || (abs(position[1] - target[1]) === 1 && abs(position[0] - target[0]) === 0)
//     if (condition) {
//         result = true
//     } else {
//         result = false
//     }
//     console.log(result)
//     return result
// }

export {
    abs,
    deepClone
    // checkMoveValid
}