import FormLogIn from "../forms/login/FormLogIn";
import KenzieHubLogo from "../logo/KenzieHubLogo.png";

function PageLogin({ user, setUser }) {
  return (
    <section className={"pageLogin"}>
      <header>
        <img src={KenzieHubLogo} alt="logo da Kenzie Hub" />
      </header>
      <FormLogIn setUser={setUser} user={user} />
    </section>
  );
}

export default PageLogin;
