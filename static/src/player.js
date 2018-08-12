'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_React$Component) {
    _inherits(Player, _React$Component);

    function Player(props) {
        _classCallCheck(this, Player);

        return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));
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
            var offset = moment().local().utcOffset();
            var a = moment.unix(this.props.seen).utc().subtract(offset, 'minutes');
            var myState = this.props.gamestate ? "Online" : a.fromNow();
            var $me = $("#" + this.props.uuid);
            $me.tooltip('hide').attr('data-original-title', this.props.user + " <br> " + myState).attr('title', null);
        }
    }, {
        key: "render",
        value: function render() {
            var offset = moment().local().utcOffset();
            var a = moment.unix(this.props.seen).utc().subtract(offset, 'minutes');
            var myState = this.props.gamestate ? "Online" : a.fromNow();
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