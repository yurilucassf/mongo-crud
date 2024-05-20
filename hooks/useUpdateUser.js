import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

export async function updateUser(userId, data){
    const response = await axios.put(`/api/user?_id=${userId}`, data)
    return response.data
}

export function useUpdateUser(userId) {
  const queryClient = useQueryClient()
  const updateUsersMutate = useMutation((data) => {
      return updateUser(userId, data)
    })
    const handleUpdateUser =(data) => 
        updateUsersMutate.mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['users']);
        toast.success("Usuário atualizado com sucesso!");
      },
      onError: (error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error("Ocorreu um erro ao atualizar um usuário.");
        }
      },
    })

    return {handleUpdateUser, updateUsersMutate}
}


