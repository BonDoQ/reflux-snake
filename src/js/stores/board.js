/**
 * Created by BonDoQ on 11/28/14.
 */
function Cell(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
}

var boardStore = Reflux.createStore({

    // Data Members
    listenables: [GameActions],

    cells: [],
    score: '',

    // Initialization
    initBoard: function () {
        // Fill Empty Board
        var cells = new Array(Config.BOARD_HEIGHT);
        for (var i = 0; i < Config.BOARD_HEIGHT; i++) {
            cells[i] = new Array(Config.BOARD_WIDTH);
            for (var j = 0; j < Config.BOARD_WIDTH; j++) {
                cells[i][j] = new Cell(j, i, Config.CSS_EMPTY_CLASS);
            }
        }
        return cells;
    },

    getInitialState: function () {
        return this;
    },

    // Event Listeners
    onGameStart: function () {
        this.score = 0;
        this.cells = this.initBoard();
        GameActions.boardInit();
    },

    onFoodUpdated: function (food) {
        this.food = food.cell;
        this.updateBoard();
    },

    onSnakeUpdated: function (snake) {
        this.snake = {
            cells: snake.cells,
            direction: snake.direction
        };
        this.updateBoard();
    },

    onSnakeEat: function() {
        this.score += Config.SCORE_INC;
    },

    // Draw Helpers
    updateFood: function () {
        this.cells[this.food.y][this.food.x].type = Config.CSS_FOOD_CLASS;
    },

    updateSnake: function () {
        var length = this.snake.cells.length;

        for (var i = 0; i < length; i++) {
            this.cells[this.snake.cells[i].y][this.snake.cells[i].x].type = Config.CSS_SNAKE_CLASS;
        }
        this.cells[this.snake.cells[length-1].y][this.snake.cells[length-1].x].type = Config.CSS_HEAD_CLASS(this.snake.direction);
    },

    updateBoard: function () {
        for (var i = 0; i < this.cells.length; i++) {
            for (var j = 0; j < this.cells[i].length; j++) {
                this.cells[i][j].type = Config.CSS_EMPTY_CLASS;
            }
        }

        if (this.snake !== undefined) this.updateSnake();
        if (this.food  !== undefined) this.updateFood();
        this.trigger(this);
    }


});