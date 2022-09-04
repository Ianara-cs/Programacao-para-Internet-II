import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    name: string

    @Column()
    email: string
    
    @Column()
    login: string

    @Column()
    telefone: string

    @Column()
    password: string

    @Column({default: false})
    conta_ativa: boolean

    @Column({nullable: true})
    refresh_token: string

    @Column()
    codigo_de_validacao: number

    @Column()
    expires_in: number

    @CreateDateColumn()
    created_at: string
}