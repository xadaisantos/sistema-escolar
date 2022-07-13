import { Outlet, Link } from "react-router-dom";

const App = () => {
    return (
        <div className="container">
            <header>
                <div>Sistema Escolar</div>
            </header>
            <div>
                <Link to="/">Home</Link> | {" "}
                <Link to="/alunos">Alunos</Link> | {" "}
                <Link to="/turmas">Turmas</Link> | {" "}
                <Link to="/matriculas">Matrículas</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default App