import { CodigoValidacaoEmail } from "../entities/CodigoValidacaoEmail";

export interface IEmailCodeRepository {
    createCodigoEmail (email: string, expire: number): Promise<CodigoValidacaoEmail>
    findByEmail(email: string): Promise<CodigoValidacaoEmail>
    deleteCodeEmail (email: string): Promise<boolean>
}