import Input from "../../inputs/Input";
import Button from "../../button/Buttin";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function FormRegister() {
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email obrigatório")
      .email("Insira um email válido"),
    name: yup
      .string()
      .required("Nome obrigatório")
      .matches(/[A-Z][a-z]*/, "Insira apenas letras no campo do nome"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Senha invalida. A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial: $*&@#"
      ),
    confirmpass: yup
      .string()
      .required("Confirmação de senha obrigatória")
      .oneOf([yup.ref("password")], "Senha não coincide"),
    course_module: yup.string().required("Modulo do curso obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmitFunction = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        course_module: data.course_module,
        bio: "Aluno kenzie",
        contact: data.email,
      })
      .then((response) => {
        console.log(response.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={"register"}>
      <p>Crie sua conta</p>
      <span>Rapido e grátis, vamos nessa</span>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>Nome</label>
        <input
          type={"text"}
          placeholder={"Digite aqui seu nome"}
          {...register("name")}
        />
        <span>{errors.name?.message}</span>
        <label>Email</label>
        <input
          placeholder={"Digite aqui seu email"}
          {...register("email")}
          type={"email"}
        />
        <span>{errors.email?.message}</span>
        <label>Senha</label>
        <input
          type={"password"}
          placeholder={"Digite aqui sua senha"}
          {...register("password")}
        />
        <span>{errors.password?.message}</span>
        <label>Confirmar senha</label>
        <input
          type={"password"}
          placeholder={"Digite novamente sua senha"}
          {...register("confirmpass")}
        />
        <span>{errors.confirmpass?.message}</span>
        <label>Selecionar modo</label>
        <select {...register("course_module")}>
          <option>{"Primeiro módulo (Introdução ao Frontend)"}</option>
          <option>{"Segundo módulo (Frontend Avançado)"}</option>
          <option>{"Terceiro módulo (Introdução ao Backend)"}</option>
          <option>{"Quarto módulo (Backend Avançado)"}</option>
        </select>
        <span>{errors.course_module?.message}</span>
        <section></section>
        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
}

export default FormRegister;
