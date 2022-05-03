import Input from "../../inputs/Input";
import Button from "../../button/Buttin";

import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";

function FormLogIn({ user, setUser }) {
  const history = useHistory();

  const altPathRegister = () => {
    history.push("/register");
  };

  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrogatório").email(),
    password: yup.string().required("Senha obtigatória"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    console.log(data);

    axios
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((response) => {
        history.push("/home");
        localStorage.setItem("Token", response.data.token);
        setUser(response.data.user);
        localStorage.setItem("NameUser", response.data.user.name);
        localStorage.setItem("IdUser", response.data.user.id);
        localStorage.setItem("Course_module", response.data.user.course_module);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={"login"}>
      <p>Login</p>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>Email</label>
        <input
          type={"email"}
          placeholder="Digite seu email"
          {...register("email")}
        />
        <label>Senha</label>
        <input
          type={"password"}
          placeholder="Digite sua senha"
          {...register("password")}
        />
        <button type="submit">Logar</button>
      </form>
      <section>
        <p>Ainda não possui uma conta?</p>
        <Button handle={altPathRegister} name={"Cadastrar-se"} />
      </section>
    </section>
  );
}

export default FormLogIn;
