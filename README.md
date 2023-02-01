# Jungle Chess

## Overview
Jungle Chess, or Beast Chess, is a traditional Chinese game that survives until modern day. There are many variations and each one of their rules are different. However, at its core, it always about eating the enemy beasts and/or taking their lair. The most popular rule starts with the elephant as the strongest piece, while the rat is the weakest. However, the rat is the only animal which can beat an elephant to keep it in check.

## Rules

In my version of Beast Chess, the power order is as follows: elephant > lion > tiger > cheeta > wolf > dog > cat > rat > elephant.

### Movement Rules
Most of the time, beasts can **only move one grid horizontally or vertically next to it at a time while being unable to move into the river(the blue boxes)**. 
<br>Once a player moves one beast, his turn ends and his opponents can now move his beasts. 
<br>However, the **rats are the only one which can go into the river**. When they do, they become invunerable as they are unreachable to other animals. However, they can **no longer attach elephants on the land, nor are they able to eat other rats in the river**.
<br>Besides rats, Tigers and lions can **jump across the river.**

Traps will trap an enemy beast, **render it vunerable**. Any beast from you can take it out while it's in the trap. Friendly trap **has no effect on friendly beasts.**

When a stronger beast meets a weaker one, the stronger one wins and the weaker one is removed from the game. If two beasts are equal, both of them die. It is also legal to move your weaker beast into a stronger enemy, thus sacrificing it.

### Win Condition
Once the enemy lair is taken or all of their beasts are eliminated, you win.

## Game Logic
I used **vanilla TypeScript and CSS** to make this game without any framework such as React or Vue, though in hindsight, I definetely made it difficult for myself as I need to mannully manipulate a lot of DOM and I had to rely on web components to seperate html elements into another file.
I used an array of array to represent of chess board and its contents. This way, it's easier to add on new features such as undo or even upgrade it into a multiplayer game in the future

```javascript
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
```

-1 to -8 represents elephant to rat of the green team, while 1 to 8 for the red team. 33 represents river terrain. 30 and 31 represents each team's traps
Finally, 40 and 41 represent each lair.