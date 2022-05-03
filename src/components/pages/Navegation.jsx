import PageLogin from "./PageLogin";
import PageRegister from "./PageRegister";
import PageHome from "./PageHome";

import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Navigation({ user, setUser }) {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("Token"));
  }, []);

  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/home");
    }
  }, [token]);
  return (
    <section>
      <Switch>
        <Route exact path={"/"}>
          <PageLogin setUser={setUser} user={user} />
        </Route>
        <Route exact path={"/register"}>
          <PageRegister />
        </Route>
        <Route exact path={"/home"}>
          <PageHome setUser={setUser} user={user} />
        </Route>
      </Switch>
    </section>
  );
}

export default Navigation;
