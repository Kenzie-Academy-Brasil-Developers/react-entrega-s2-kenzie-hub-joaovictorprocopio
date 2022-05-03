import KenzieHubLogo from "../logo/KenzieHubLogo.png";
import Dashboard from "../dashboard/Dashboard";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PageHome({ user, setUser }) {
  const history = useHistory();

  const sair = () => {
    history.push("/");
    localStorage.removeItem("Token");
    localStorage.removeItem("NameUser");
    localStorage.removeItem("IdUser");
  };

  return (
    <section className={"pageHome"}>
      <nav>
        <img src={KenzieHubLogo} alt="logo da Kenzie Checkin" />
        <button onClick={sair}>sair</button>
      </nav>
      <Dashboard setUser={setUser} user={user} />
    </section>
  );
}

export default PageHome;
