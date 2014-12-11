var foodStore = Reflux.createStore({

    listenables: [GameActions],

    cell:   undefined,


    initialize: function (snake) {
        this.cell = this.cell || this.generate(snake);
    },

    onSnakeUpdated: function (snake) {
        this.initialize(snake.cells);
        GameActions.foodUpdated(this);
    },

    onSnakeEat: function (snake) {
        this.cell = this.generate(snake);
        GameActions.foodUpdated(this);
    },

    // Game Logic
    generate: function (snake) {
        var point = {};
        point.x = this.rand(0, Config.BOARD_HEIGHT - 1);
        point.y = this.rand(0, Config.BOARD_WIDTH - 1);
        return (this.validPoint(point, snake)) ? point : this.generate(snake);
    },

    validPoint: function (point, snake) {
        if (point.x > Config.BOARD_WIDTH - 1 || point.x < 0 ||
            point.y > Config.BOARD_HEIGHT - 1 || point.y < 0) {
            return false;
        }

        for (var i = 0; i < snake.length; i++) {
            if (snake[i].x === point.x && snake[i].y === point.y)
                return false;
        }

        return true;
    },

    /**
     * generate Random Number within Interval
     * @param  {[Number]} min Minimum Number Allowed
     * @param  {[Number]} max Maximum Number Allowed
     * @return {[Number]}     Randomly Generated Number
     */
    rand: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


});