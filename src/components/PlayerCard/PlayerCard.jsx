import '../PlayerCard/PlayerCard.scss'

function PlayerCard(props) {

    const { provided, innerRef } = props;

    return (
        <>
            <div {...provided.draggableProps} {...provided.dragHandleProps}  ref={innerRef} className="player-card">

                <div className="player-field">  
                    <span className="player-label">Name: </span>
                    <span className="player-card-name player-data">{props.name}</span>

                    <span className="player-label">Age: </span>
                    <span className="player-card-age player-data">{props.age}</span>   
                </div>

                <span className="player-label">Nacionality: </span>
                <span className="player-card-nacionality player-data">{props.nacionality}</span>
                
            </div>
        </>
    );
}

export default PlayerCard;