export function Teams () {

    const teams = ['Brazil', 'Germany', 'France', 'USA', 'Canadá']

    return (
        <div className="container-main">
            <h1>Teams</h1>
            <ul>
                {teams.map(team => <li>{team}</li>)}
            </ul>
        </div>
    )
}