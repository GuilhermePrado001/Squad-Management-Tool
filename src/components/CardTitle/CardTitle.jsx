import '../CardTitle/CardTitle.scss'

function CardTitle({ title }) {

    return (
        <>
            <span className="card-title">
                {title}
            </span>
        </>
    );
}

export default CardTitle;