import { Schema , model, models} from "mongoose";

const UserSchema = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    cpf: String,
    idade: {type: Number, required: true},
}, {
    timestamps: true,
});

export const User = models.User || model('User', UserSchema);