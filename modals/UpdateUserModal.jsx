import { createUserSchema, inputFields } from "@/components/CreateUserForm";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  Dialog,
  Modal,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdateUserModal({ user }) {
  const { handleUpdateUser, updateUsersMutate } = useUpdateUser(user._id);
  const isLoading = updateUsersMutate?.isLoading;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      nome: user?.nome || "",
      email: user?.email || "",
      telefone: user?.telefone || "",
      cpf: user?.cpf || "",
      idade: user?.idade || "",
    },
    mode: "onBlur",
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = (data) => {
    handleUpdateUser(data);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ background: "#7aa80e", color: "white" }}
      >
        Editar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="modal-carona">
          <h3>Editar User</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {inputFields?.map((campo) => {
              return (
                <TextField
                  key={campo.nameInput}
                  label={campo.nameInput}
                  type={campo.type}
                  {...register(campo.field)}
                />
              );
            })}
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#235160" }}
              endIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              Editar
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
}
