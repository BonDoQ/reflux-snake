/**
 * Created by BonDoQ on 11/28/14.
 */
/** @Jsx React.DOM */


var BoardComponent = React.createClass({

    componentDidMount: function () {
        GameActions.gameStart();
        window.document.addEventListener('keydown', this.handleClick);
    },

    handleClick: function (e) {
        e = e || window.event;
        //e.preventDefault();
        var dir = "";
        switch (e.keyCode) {
            case Config.KEY_LEFT:
                dir = Config.DIR_LEFT;
                break;

            case Config.KEY_UP:
                dir = Config.DIR_UP;
                break;

            case Config.KEY_RIGHT:
                dir = Config.DIR_RIGHT;
                break;


            case Config.KEY_DOWN:
                dir = Config.DIR_DOWN;
                break;
        }
        GameActions.snakeMove(dir);

    },

    render: function () {
        var rows = [];
        for (var i = 0; i < this.props.cells.length; i++) {
            var cls = [];
            for (var j = 0; j < this.props.cells[i].length; j++) {
                cls.push(<CellComponent cell={this.props.cells[i][j]} direction={this.props.direction}></CellComponent>)
            }
            rows.push(<div className="row">{cls}</div>);
        }


        return <div className="table">{rows}</div>
    }
});

