import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useGetUser } from "@/hooks/useGetUsers";
import DeleteUserModal from "@/modals/DeleteUserConfirmationModal";
import UpdateUserModal from "@/modals/UpdateUserModal";
import { CircularProgress } from "@mui/material";

export default function UsersTable() {
  const { data: users, isFetching: isFetching } = useGetUser();

  return (
    <>
      <table>
        <thead style={{ backgroundColor: "black", color: "white" }}>
          <tr>
            <th>Ih</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Ihahe</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {users &&
          users.map((user) => (
            <tbody key={user._id}>
              <tr>
                <td>{user._id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.telefone}</td>
                <td>{user.cpf}</td>
                <td>{user.idade}</td>
                <td>
                  <UpdateUserModal user={user} />
                </td>
                <td>
                  <DeleteUserModal userId={user._id} />
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </>
  );
}
