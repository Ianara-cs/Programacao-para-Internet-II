interface HeaderProps{
    title?: string
}

export const Header = ({title = 'BMI Calculator'}: HeaderProps) => {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
    
}