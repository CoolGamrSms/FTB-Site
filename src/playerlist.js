class PlayerList extends React.Component {

    render() {
        return(
        <div>
        {this.props.players.map((player, i) => 
            <Player 
                user={player.name}
                gamestate={player.online} 
                seen={player.seen}
                key={player.uuid}
                uuid={player.uuid}
            />)
        }
        </div>
        );
    }
}
PlayerList.defaultProps = { players: [] }


