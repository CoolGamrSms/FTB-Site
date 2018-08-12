'use strict';

class Player extends React.Component {
constructor(props) {
    super(props);
}

minotar() {
    return "//minotar.net/avatar/" + this.props.uuid + "/100.png";
}

minotar_helm() {
    return "//minotar.net/helm/" + this.props.uuid + "/100.png";
}

componentDidUpdate() {
    var offset = moment().local().utcOffset();
    var a = moment.unix(this.props.seen).utc().subtract(offset, 'minutes');
    var myState = this.props.gamestate ? "Online" : a.fromNow();
    var $me = $("#"+this.props.uuid);
    $me.tooltip('hide').attr('data-original-title', this.props.user+" <br> "+myState).attr('title', null);
}

render() {
    var offset = moment().local().utcOffset();
    var a = moment.unix(this.props.seen).utc().subtract(offset, 'minutes');
    var myState = this.props.gamestate ? "Online" : a.fromNow();
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
