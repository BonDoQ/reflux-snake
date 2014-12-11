/** @Jsx React.DOM */

var CellComponent = React.createClass({
    render: function () {
        var pos = this.props.cell.x + "," + this.props.cell.y;
        if (this.props.cell.type == 'head') {
            return <HeadComponent pos={pos} direction={this.props.direction}></HeadComponent>
        } else {
            var clsName = "cell " + this.props.cell.type;
            return <div data-pos={pos} className={clsName}></div>
        }
    }
});


var HeadComponent = React.createClass({

    render: function(){
        var imgSrc = Config.HEAD_IMG_SRC + this.props.direction +".png";
        return <div data-pos={this.props.pos} className="cell empty">
            <img src={imgSrc}/>
        </div>
    }
});