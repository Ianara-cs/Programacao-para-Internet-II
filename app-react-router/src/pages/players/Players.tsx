export function Players () {

    const players = ['Vini Jr', 'Neymar', 'CR7', 'Messi', '']

    return (
        <div className="container-main">
            <h1>Players</h1>
            <ul>
                {players.map(players => <li>{players}</li>)}
            </ul>
        </div>
    )
}