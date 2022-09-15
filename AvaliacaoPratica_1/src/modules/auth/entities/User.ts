import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    name: string

    @Column()
    email: string

    @Column({nullable: true})
    telefone: string

    @Column()
    password: string

    @Column({default: false})
    conta_ativa: boolean

    @Column({nullable: true})
    refresh_token: string

    @CreateDateColumn()
    created_at: string
}