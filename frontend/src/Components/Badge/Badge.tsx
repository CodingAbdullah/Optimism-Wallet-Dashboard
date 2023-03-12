// Creating a custom badge to be used for representing direction
const Badge = ( props: { type: string } ) => {
    const { type } = props;
    let message = "";

    switch ( type ) {
        case "IN":
            message = "IN";
            break;
        case "OUT":
            message = "OUT";
            break;
        default:
            break;
    }

    return (
        <div className='custom-badge'>
            {
                type === 'IN' ? <span className="badge text-bg-success p-2">{ message }</span> :
                <span className="badge text-bg-warning p-2">{ message }</span>
            }
        </div>
    )
}

export default Badge;