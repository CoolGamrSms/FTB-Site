var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = { players: [] };

        _this.loginHandler = _this.loginHandler.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'loginHandler',
        value: function loginHandler(e) {
            var ev = JSON.parse(JSON.parse(e.data).message);
            console.log(this.state);
            var newState = Object.assign(this.state);
            // Player going offline
            if (!ev.online) {
                for (i = 0; i < newState.players.length; i++) {
                    if (newState.players[i].uuid === ev.uuid) {
                        newState.players[i].online = false;
                        newState.players[i].seen = ev.seen;
                        newState.players.sort(this.compare);
                        console.log(newState);
                        this.setState({ players: newState.players });
                        break;
                    }
                }
            }
            // Player coming online
            else {
                    var found = false;
                    for (i = 0; i < newState.players.length; i++) {
                        if (newState.players[i].uuid === ev.uuid) {
                            newState.players[i].online = true;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        newState.players.push(ev);
                    }
                    console.log(newState);
                    newState.players.sort(this.compare);
                    this.setState({ players: newState.players });
                }
        }
    }, {
        key: 'compare',
        value: function compare(a, b) {
            if (a.online < b.online) return 1;
            if (a.online > b.online) return -1;
            if (a.seen < b.seen) return 1;
            if (a.seen > b.seen) return -1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            axios.get('/api').then(function (res) {
                var sample = res.data;
                sample.sort(_this2.compare);
                _this2.setState({ players: sample });
                source.addEventListener('loginEvent', _this2.loginHandler);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(PlayerList, { players: this.state.players });
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));