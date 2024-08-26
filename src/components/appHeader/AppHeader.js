import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="https://grimdvl.github.io/Marvel/">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="https://grimdvl.github.io/Marvel/">Characters</a></li>
                    /
                    <li><a href="https://grimdvl.github.io/Marvel/">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;