import '../InfoCard/InfoCard.scss'

function InfoCard({ name, avg }) {

    return (
        <div className="card-info">
            <span className="team-name-avg">{name}</span>
            <span className="team-age-avg">{avg}</span>
        </div>
    );
}

export default InfoCard;