import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

export async function postCreateUser(data){
    const response = await axios.post('/api/user', data)
    return response.data
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  const createusersMutate = useMutation((data) => {
      return postCreateUser(data)
    })
    const handleCreateUser =(data) => 
        createusersMutate.mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['users']);
        toast.success("Usuário criado com sucesso!");
      },
      onError: (error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error("Ocorreu um erro ao criar um usuário.");
        }
      },
    })

    return {handleCreateUser, createusersMutate}
}


