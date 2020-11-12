import '../PlayerCard/PlayerCard.scss'

function PlayerCard({ name, age, nacionality }) {

    return (
        <>
            <div className="player-card">

                <div className="player-field">  
                    <span className="player-label">Name: </span>
                    <span className="player-card-name player-data">{name}</span>

                    <span className="player-label">Age: </span>
                    <span className="player-card-age player-data">{age}</span>   
                </div>

                <span className="player-label">Nacionality: </span>
                <span className="player-card-nacionality player-data">{nacionality}</span>

            </div>
        </>
    );
}

export default PlayerCard;