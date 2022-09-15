import { CodigoValidacaoTelefone } from "../entities/CodigoValidacaoTelefone"

export interface IPhoneCodeRepository {
    addPhoneCode (telefone: string, code:number): Promise<CodigoValidacaoTelefone>
    findByTelefoneCode (telefone: string, code: number): Promise<CodigoValidacaoTelefone>
}