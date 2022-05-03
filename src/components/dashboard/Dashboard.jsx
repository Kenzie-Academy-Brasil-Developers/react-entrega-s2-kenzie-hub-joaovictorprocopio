import KenzieHubLogo from "../logo/KenzieHubLogo.png";
import ModalRegisterTechnology from "../styledComponents/ModalRegisterTechnology";
import ModalDetails from "../styledComponents/ModalDetails";
import RegisterTechnology from "./RegisterTechnology";
import TechnologyDetails from "./TechnologyDetails";
import CardTechnology from "./CardTechnology";

import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ user, setUser }) {
  const [modalRegister, setModalRegister] = useState("none");
  const [modalDetails, setModalDetails] = useState("none");
  const [altTechnology, setAltTechnology] = useState("none");
  const handleModalRegister = () => {
    setModalRegister("flex");
  };

  const handleOpenDetails = (e) => {
    console.log(e.target.children[0].firstChild.data);
    setAltTechnology(e.target.children[0].firstChild.data);
    setModalDetails("flex");
  };

  const [technologies, setTechnologies] = useState([]);

  const [count, setCount] = useState(0);

  const nameUser = localStorage.getItem("NameUser");
  const idUser = localStorage.getItem("IdUser");

  useEffect(() => {
    axios
      .get(` https://kenziehub.herokuapp.com/users/${idUser}`)
      .then((response) => {
        console.log(response.data.techs, "Tecnologias");
        setTechnologies(response.data.techs);
      });
  }, [count]);

  return (
    <section className={"dashboard"}>
      <header>
        <p>Olá, {nameUser}!</p>
        <span>{localStorage.getItem("Course_module")}</span>
      </header>
      <main>
        <div>
          <p>Tecnologias</p>
          <button onClick={handleModalRegister}>+</button>
        </div>
        <section className={"containerCards"}>
          {technologies &&
            technologies.map((item) => {
              return (
                <CardTechnology
                  onClick={handleOpenDetails}
                  key={item.id}
                  status={item.status}
                  technology={item.title}
                />
              );
            })}
        </section>
        <section>
          <ModalRegisterTechnology display={modalRegister}>
            <RegisterTechnology
              count={count}
              setCount={setCount}
              setModalRegister={setModalRegister}
            />
          </ModalRegisterTechnology>
          <ModalDetails display={modalDetails}>
            <TechnologyDetails
              setCount={setCount}
              count={count}
              setModalDetails={setModalDetails}
              altTechnology={altTechnology}
              technologies={technologies}
            />
          </ModalDetails>
        </section>
      </main>
    </section>
  );
}

export default Dashboard;
