'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_React$Component) {
    _inherits(Player, _React$Component);

    function Player(props) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));

        _this.state = {
            timeOff: moment.unix(_this.props.seen).utc().fromNow()
        };
        return _this;
    }

    _createClass(Player, [{
        key: "minotar",
        value: function minotar() {
            return "//minotar.net/avatar/" + this.props.uuid + "/100.png";
        }
    }, {
        key: "minotar_helm",
        value: function minotar_helm() {
            return "//minotar.net/helm/" + this.props.uuid + "/100.png";
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            var myState = this.props.gamestate ? "Online" : this.state.timeOff;
            var $me = $("#" + this.props.uuid);
            $me.tooltip('hide').attr('data-original-title', this.props.user + " <br> " + myState).attr('title', null);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.timerID = setInterval(function () {
                return _this2.tick();
            }, 30000);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.timerID);
        }
    }, {
        key: "tick",
        value: function tick() {
            this.setState({
                timeOff: moment.unix(this.props.seen).utc().fromNow()
            });
        }
    }, {
        key: "render",
        value: function render() {
            var a = moment.unix(this.props.seen).utc();
            var myState = this.props.gamestate ? "Online" : this.state.timeOff;
            return React.createElement(
                "div",
                { className: "fadecontainer" },
                React.createElement("img", { src: this.minotar(), className: "head " + (this.props.gamestate ? "online" : "offline") }),
                React.createElement(
                    "div",
                    { className: "overlay" },
                    React.createElement("img", {
                        src: this.minotar_helm(),
                        className: "head " + (this.props.gamestate ? "online" : "offline"),
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        id: this.props.uuid,
                        title: this.props.user + " <br> " + myState
                    })
                )
            );
        }
    }]);

    return Player;
}(React.Component);