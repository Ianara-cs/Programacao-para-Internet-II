import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('codigo_validacao_email')
export class CodigoValidacaoEmail {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    user_email: string

    @Column()
    codigo_de_validacao: number
    
    @Column()
    expires_in: number

    @CreateDateColumn()
    created_at: string

}