import dayjs from "dayjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { generateCodeNumber } from "../../../../utils/util";
import { CodigoValidacaoEmail } from "../../entities/CodigoValidacaoEmail";
import { IEmailCodeRepository } from "../IEmailCodeRepository";

export class EmailCodeRepository implements IEmailCodeRepository {
    private emailCodeRepository : Repository<CodigoValidacaoEmail>

    constructor() {
        this.emailCodeRepository = AppDataSource.getRepository(CodigoValidacaoEmail)
    }

    async findByEmail(email: string): Promise<CodigoValidacaoEmail> {
        return await this.emailCodeRepository.findOne({where: {user_email: email}})
    }

    async createCodigoEmail(email: string, expire: number): Promise<CodigoValidacaoEmail> {
        const codigo_de_validacao = generateCodeNumber()
        const expires_in = dayjs().add(expire, "hours").unix()
        
        const code = this.emailCodeRepository.create({codigo_de_validacao, user_email: email, expires_in})
        await this.emailCodeRepository.save(code)
        return code
    }

    async deleteCodeEmail (email: string): Promise<boolean> {
        const result = await this.emailCodeRepository.delete({user_email: email})
        return result.raw
    }

}