import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState, useEffect } from "react";

function TechnologyDetails({
  setModalDetails,
  count,
  setCount,
  altTechnology,
  technologies,
}) {
  const [token, setToken] = useState("");

  const idTech = technologies.filter((item) => {
    return item.title === altTechnology ? item.id : null;
  });

  useEffect(() => {
    setToken(localStorage.getItem("Token"));
  }, []);

  const formSchema = yup.object().shape({
    status: yup.string().required("Status obrigatório"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    console.log(data);

    axios
      .put(
        `https://kenziehub.herokuapp.com/users/techs/${idTech[0].id}`,
        data,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("deu bom pow");
        setModalDetails("none");
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${idTech[0].id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((response) => {
        console.log("deu bom pow");
        setModalDetails("none");
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <p>Tecnologia Detalhes</p>
      <button
        onClick={() => {
          setModalDetails("none");
        }}
      >
        x
      </button>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>Nome</label>
        <input value={altTechnology} type="text" />

        <label>Status</label>
        <select {...register("status")}>
          <option>Iniciante</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <button type="submit">Alterar</button>
        <button onClick={handleDelete}>Excluir</button>
      </form>
    </section>
  );
}

export default TechnologyDetails;
