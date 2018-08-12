'use strict';

class Player extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        timeOff: moment.unix(this.props.seen).utc().fromNow()
        };
}

minotar() {
    return "//minotar.net/avatar/" + this.props.uuid + "/100.png";
}

minotar_helm() {
    return "//minotar.net/helm/" + this.props.uuid + "/100.png";
}

componentDidUpdate() {
    var myState = this.props.gamestate ? "Online" : this.state.timeOff;
    var $me = $("#"+this.props.uuid);
    $me.tooltip('hide').attr('data-original-title', this.props.user+" <br> "+myState).attr('title', null);
}

componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        30000
    );
}

componentWillUnmount() {
    clearInterval(this.timerID);
}

tick() {
    this.setState({
        timeOff: moment.unix(this.props.seen).utc().fromNow()
    });
}

render() {
    var a = moment.unix(this.props.seen).utc();
    var myState = this.props.gamestate ? "Online" : this.state.timeOff;
    return (
    <div className="fadecontainer">
    <img src={this.minotar()} className={"head "+(this.props.gamestate ? "online" : "offline")} />
    <div className="overlay">
        <img 
            src={this.minotar_helm()} 
            className={"head "+(this.props.gamestate ? "online" : "offline")}
            data-toggle="tooltip"
            data-placement="top"
            id={this.props.uuid}
            title={this.props.user+" <br> "+myState}
        />
    </div>
    </div>
    );
}
}
