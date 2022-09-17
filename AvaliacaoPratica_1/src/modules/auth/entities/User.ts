import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Reading } from "../../reading/entities/Reading"

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

    @OneToMany(() => Reading, (reading) => reading.user)
    readings: Reading[]

    @CreateDateColumn()
    created_at: string
}