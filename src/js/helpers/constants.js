/**
 * Created by BonDoQ on 11/28/14.
 */
Config = {
    SCORE_INC: 1,
    BOARD_HEIGHT: 18,
    BOARD_WIDTH: 43,
    DIR_LEFT: 'left',
    DIR_UP: 'up',
    DIR_RIGHT: 'right',
    DIR_DOWN: 'down',
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    SNAKE_START: [{x: 21, y: 7}, {x: 22, y: 7}, {x: 23, y: 7}, {x: 24, y: 7}, {x: 25, y: 7}, {x: 26, y: 7}],
    SNAKE_SPEED: 250,
    HEAD_IMG_SRC: "img/Snake-",
    CSS_EMPTY_CLASS: 'empty',
    CSS_SNAKE_CLASS: 'snake',
    CSS_HEAD_CLASS: 'head',
    CSS_FOOD_CLASS: 'food',
    CSS_CRASH_CLASS: 'crash',
    ACTION_SNAKE_MOVE: 'snakeMove',
    ACTION_FOOD_GENERATE: 'foodGenerate',
    ACTION_SNAKE_EAT: 'snakeEat',
    ACTION_SNAKE_COLLIDE: 'snakeCollide',
    ACTION_SNAKE_INIT: 'snakeInit'

};