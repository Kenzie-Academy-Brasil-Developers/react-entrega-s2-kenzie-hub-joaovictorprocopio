import FormRegister from "../forms/register/FormRegister";
import KenzieHubLogo from "../logo/KenzieHubLogo.png";
import Button from "../button/Buttin";

import { useHistory } from "react-router-dom";

function PageRegister() {
  const history = useHistory();
  const altPath = () => {
    history.push("/");
  };
  return (
    <section className={"pageRegister"}>
      <section>
        <img src={KenzieHubLogo} alt={"logo da Kenzie Hub"} />
        <Button handle={altPath} name={"voltar"} />
      </section>
      <FormRegister />
    </section>
  );
}

export default PageRegister;
