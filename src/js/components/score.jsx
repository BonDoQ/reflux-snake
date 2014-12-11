/** @Jsx React.DOM */
var ScoreComponent  = React.createClass({
    render: function(){
        return <h2 className="score">Your Score is : {this.props.score}</h2>
    }
});