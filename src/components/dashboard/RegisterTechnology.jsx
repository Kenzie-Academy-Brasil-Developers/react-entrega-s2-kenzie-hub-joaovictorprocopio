import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState, useEffect } from "react";

function RegisterTechnology({ setModalRegister, count, setCount }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("Token"));
  }, []);

  const formSchema = yup.object().shape({
    title: yup.string().required("Nome obrogatório"),
    status: yup.string().required("Status obrigatório"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    console.log(data);

    axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((response) => {
        console.log("deu bom pow");
        setModalRegister("none");
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <p>Registrar Tecnologia</p>
      <button
        onClick={() => {
          setModalRegister("none");
        }}
      >
        x
      </button>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>Nome</label>
        <input
          type="text"
          placeholder="Insira o nome da tecnologia"
          {...register("title")}
        />

        <label>Status</label>
        <select {...register("status")}>
          <option>Iniciante</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <button type="submit">Adicionar</button>
      </form>
    </section>
  );
}

export default RegisterTechnology;
