var GameComponent = React.createClass({
    mixins: [Reflux.connect(boardStore)],
    render: function () {
        return <div id="game">
            <div id="score">
                <ScoreComponent score={this.state.score}></ScoreComponent>
            </div>
            <div id="board">
                <BoardComponent cells={this.state.cells}></BoardComponent>
            </div>
        </div>
    }
});

React.render(<GameComponent></GameComponent>, document.body);
