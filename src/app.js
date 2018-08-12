class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { players: [] };

        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(e) {
        var ev = JSON.parse(JSON.parse(e.data).message);
        console.log(this.state);
        var newState = Object.assign(this.state);
        // Player going offline
        if(!ev.online) {
            for(i = 0; i < newState.players.length; i++) {
            if(newState.players[i].uuid === ev.uuid) {
                newState.players[i].online = false;
                newState.players[i].seen = ev.seen;
                newState.players.sort(this.compare);
                console.log(newState);
                this.setState({players: newState.players});
                break;
                }
            }
        }
        // Player coming online
        else {
            var found = false;
            for(i = 0; i < newState.players.length; i++) {
            if(newState.players[i].uuid === ev.uuid) {
                newState.players[i].online = true;
                found = true;
                break;
                }
            }
            if(!found) {
                newState.players.push(ev); 
            }
            console.log(newState);
            newState.players.sort(this.compare);
            this.setState({players: newState.players});
        }
    }
    compare(a, b){ 
        if(a.online < b.online)
            return 1;
        if(a.online > b.online)
            return -1;
        if(a.seen < b.seen)
            return 1;
        if(a.seen > b.seen)
            return -1;
        if(a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase())
            return 1;
        return 0;
    }

    componentDidMount() {
        axios.get('/api')
            .then(res => {
                var sample = res.data;
                sample.sort(this.compare);
                this.setState({players: sample});
                source.addEventListener('loginEvent', this.loginHandler); 
                $(document).ready(function() {
                    $(".head").tooltip({html: true});
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return(
            <PlayerList players={this.state.players} />
        );
    }
}
ReactDOM.render(
<App />,
document.getElementById('root')
);
