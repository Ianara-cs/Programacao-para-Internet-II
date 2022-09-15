import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('codigo_validacao_telefone')
export class CodigoValidacaoTelefone {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    telefone: string

    @Column()
    codigo_de_validacao: number

    @CreateDateColumn()
    created_at: string
}