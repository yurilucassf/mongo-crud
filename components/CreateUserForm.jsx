import { TextField, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import * as yup from "yup";
import { useCreateUser } from "@/hooks/useCreateUser";
import { getAllUsers } from "@/hooks/useGetUsers";

export const inputFields = [
  {
    nameInput: "Nome",
    type: "text",
    field: "nome",
  },
  {
    nameInput: "Email",
    type: "email",
    field: "email",
  },
  {
    nameInput: "CPF",
    type: "text",
    field: "cpf",
  },
  {
    nameInput: "Idade",
    type: "number",
    field: "idade",
  },
  {
    nameInput: "Telefone",
    type: "tel",
    field: "telefone",
  },
];

export const createUserSchema = yup.object().shape({
  nome: yup.string().required("O campo nome é obrigatório"),
  email: yup.string().required("O campo email é obrigatório"),
  cpf: yup.string().required("O campo CPF é obrigatório"),
  idade: yup.number().positive(),
  telefone: yup.string().required("O campo telefone é obrigatório"),
});

export default function CreateUserForm() {
  const { handleCreateUser, createusersMutate } = useCreateUser();
  const isLoading = createusersMutate.isLoading;
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      idade: "",
    },
    mode: "onBlur",
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = async (data) => {
    handleCreateUser(data);
    reset()
  };

  return (
    <>
      <div className="center-box">
        <div className="form-div">
          <div className="titulo">
            <h2>Cadastrar Usuário</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {inputFields?.map((campo) => {
              return (
                <TextField
                  sx={{ width: "230px" }}
                  key={campo.field}
                  label={campo.nameInput}
                  type={campo.type}
                  {...register(campo.field)}
                />
              );
            })}
            <Button
              variant="contained"
              type="submit"
              endIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
