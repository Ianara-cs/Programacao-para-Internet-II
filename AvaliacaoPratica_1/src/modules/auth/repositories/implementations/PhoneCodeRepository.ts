import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { CodigoValidacaoTelefone } from "../../entities/CodigoValidacaoTelefone";
import { IPhoneCodeRepository } from "../IPhoneCodeRepository";

export class PhoneCodeRepository implements IPhoneCodeRepository {
    private phoneCodeRepository : Repository<CodigoValidacaoTelefone>

    constructor() {
        this.phoneCodeRepository = AppDataSource.getRepository(CodigoValidacaoTelefone)
    }

    async addPhoneCode(telefone: string, code: number): Promise<CodigoValidacaoTelefone> {
        const fone = this.phoneCodeRepository.create({telefone, codigo_de_validacao: code})
        await this.phoneCodeRepository.save(fone)
        return fone
    }

    async findByTelefoneCode(telefone: string, code: number): Promise<CodigoValidacaoTelefone> {
        return await this.phoneCodeRepository.findOne({where: {telefone, codigo_de_validacao: code}})
    }
}