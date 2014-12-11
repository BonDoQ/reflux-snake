var snakeStore = Reflux.createStore({

    listenables: [GameActions],

    cells: [],
    direction: '',

    initialize: function () {
        this.cells = Config.SNAKE_START.slice(0);
        this.direction = Config.DIR_RIGHT;
    },


    onBoardInit: function () {
        this.initialize();
        GameActions.snakeUpdated(this);
    },

    onFoodUpdated: function (food) {
        if (this.food === undefined) {
            var that = this;
            this.Interval = setInterval(function () {
                that.move(that.direction);
            }, Config.SNAKE_SPEED);
        }
        this.food = food.cell;
    },

    onSnakeMove: function (direction) {
        this.move(direction);
    },

    validateDirection: function (newDirection) {
        newDirection = newDirection || this.direction;
        if (newDirection === Config.DIR_RIGHT && this.direction === Config.DIR_LEFT)
            return Config.DIR_LEFT;
        if (newDirection === Config.DIR_LEFT && this.direction === Config.DIR_RIGHT)
            return Config.DIR_RIGHT;
        if (newDirection === Config.DIR_UP && this.direction === Config.DIR_DOWN)
            return Config.DIR_DOWN;
        if (newDirection === Config.DIR_DOWN && this.direction === Config.DIR_UP)
            return Config.DIR_UP;

        return newDirection;

    },


    validatePoint: function (point) {
        if (point.x >= Config.BOARD_WIDTH) point.x = 0;
        if (point.y >= Config.BOARD_HEIGHT) point.y = 0;

        if (point.x < 0) point.x = Config.BOARD_WIDTH - 1;
        if (point.y < 0) point.y = Config.BOARD_HEIGHT - 1;

        return point;
    },


    move: function (direction) {
        var last = {x: this.cells[this.cells.length - 1].x, y: this.cells[this.cells.length - 1].y};
        this.direction = this.validateDirection(direction);
        switch (this.direction) {
            case Config.DIR_RIGHT:
                last.x += 1;
                break;
            case Config.DIR_LEFT:
                last.x -= 1;
                break;
            case Config.DIR_UP:
                last.y -= 1;
                break;
            case Config.DIR_DOWN:
                last.y += 1;
                break;
        }

        // add the new point
        this.cells.push(this.validatePoint(last));


        //Remove Point
        if (this.eat()) {
            GameActions.snakeEat(this.cells);
        } else if (this.collides() !== false) {
            console.log("Crashed");
            //clearInterval(this.Interval);
            GameActions.gameStart();

        } else {
            this.cells.shift();
            GameActions.snakeUpdated(this);
        }
    },

    eat: function () {
        var last = {x: this.cells[this.cells.length - 1].x, y: this.cells[this.cells.length - 1].y};
        return (this.food.x === last.x && this.food.y === last.y);
    },


    collides: function () {
        for (var i = 0; i < this.cells.length - 1; i++) {
            for (var j = i + 1; j < this.cells.length; j++) {
                if (this.cells[i].x === this.cells[j].x && this.cells[i].y === this.cells[j].y) {
                    return this.cells[i];
                }
            }
        }
        return false;
    }

});