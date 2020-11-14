import '../PlayerCard/PlayerCard.scss'

function PlayerCard({ draggable, name, age, nacionality, playerData, index, id }) {

    const drag = (ev,obj) => {

        obj.currentId = `player-${index}`
     
        ev.dataTransfer.setData("text", JSON.stringify(obj));

        // setTimeout(() =>{
        //     ev.target.style.display = "none"
        // },0)

    }

    return (
        <>
            <div id={id} draggable={draggable} onDragStart={(ev) => {drag(ev, playerData)}} className="player-card">

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