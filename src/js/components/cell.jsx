/** @Jsx React.DOM */

var CellComponent = React.createClass({
    render: function () {
        var pos = this.props.cell.x + "," + this.props.cell.y;
        return <div data-pos={pos} className="cell">
            <div className={this.props.cell.type}></div>
        </div>;
    }
});