import { useDeleteUser } from "@/hooks/useDeleteUser";
import { Box, Button, CircularProgress, Dialog } from "@mui/material";
import { useState } from "react";

export default function DeleteUserModal({userId}) {
    
    const { handleDeleteUser, deleteUsersMutate } = useDeleteUser();
    const isLoading = deleteUsersMutate.isLoading
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const onSubmit = () => {
        handleDeleteUser(userId);
        handleClose();
      };
  
    return (
    <>
      <Button
        onClick={() => handleOpen()}
        sx={{ background: "#6e0000", color: "white" }}
      >
        Excluir
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 500,
            textAlign: "center",
          }}
        >
          <p>Tem certeza que deseja excluir?</p>
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={() => handleClose()}
            sx={{ mt: 2, mr: 2 }}
          >
            Cancelar
          </Button>
          <Button
            disabled={isLoading}
            variant="contained"
            color="secondary"
            onClick={onSubmit}
            endIcon={
              isLoading ? <CircularProgress color="inherit" size={20} /> : null
            }
            sx={{
              mt: 2,
              backgroundColor: "red",
              color: "#ffffff",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Sim, Excluir
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
