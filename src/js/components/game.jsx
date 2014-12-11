var GameComponent = React.createClass({
    mixins: [Reflux.connect(boardStore)],
    getInitialState: function () {
        return {snake: {direction: 'right'}};
    },
    render: function () {
        return <div id="game">
            <div id="score">
                <ScoreComponent score={this.state.score}></ScoreComponent>
            </div>
            <div id="board">
                <BoardComponent cells={this.state.cells} direction={this.state.snake.direction}></BoardComponent>
            </div>
        </div>
    }
});

React.render(<GameComponent></GameComponent>, document.body);
