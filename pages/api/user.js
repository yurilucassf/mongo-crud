import { createUserSchema } from "@/components/CreateUserForm";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    try {
      const { nome, email, telefone, cpf, idade } = req.body;

      // Validação dos dados de entrada
      await createUserSchema.validate({ nome, email, telefone, cpf, idade });

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Este email já está cadastrado." });
      }

      const newUser = new User({ nome, email, telefone, cpf, idade });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao cadastrar o usuário." });
    }
  }

  if (req.method === "GET") {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao buscar os usuários." });
    }
  }

  if (req.method === "DELETE") {
    const { _id } = req.query;
    try {
      const deletedUser = await User.findByIdAndDelete(_id);
      if (!deletedUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      res.json({ message: "Usuário excluído com sucesso." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao excluir o usuário." });
    }
  }

  if (req.method === "PUT") {
    try {
      const { _id } = req.query;
      const { nome, email, telefone, cpf, idade } = req.body;
      const user = await User.findOneAndUpdate({ _id }, { nome, email, telefone, cpf, idade });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao atualizar o usuário." });
    }
  }
}
