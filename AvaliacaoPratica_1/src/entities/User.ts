import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    name: string
    
    @Column()
    login: string

    @Column()
    telefone: string

    @Column()
    password: string

    @Column({default: true})
    conta_ativa: boolean

    @Column({nullable: true})
    refresh_token: string

    @CreateDateColumn()
    created_at: string
}