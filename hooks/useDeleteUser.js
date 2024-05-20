import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

export async function deleteUser(userId){
    const response = await axios.delete(`/api/user?_id=${userId}`);
    return response.data
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  const deleteUsersMutate = useMutation((userId) => {
      return deleteUser(userId)
    })
    const handleDeleteUser =(userId) => 
        deleteUsersMutate.mutate(userId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['users']);
        toast.success("Usuário deletado com sucesso!");
      },
      onError: (error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error("Ocorreu um erro ao deletar um usuário.");
        }
      },
    })

    return {handleDeleteUser, deleteUsersMutate}
}


