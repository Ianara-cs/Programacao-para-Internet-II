import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../../auth/entities/User"

@Entity('leitura')
export class Reading {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    titulo: string
    
    @Column()
    subtitulo: string
    
    @Column({nullable: true})
    tags: string

    @ManyToOne(() => User, (user) => user.readings)
    user: User
    
    @CreateDateColumn()
    created_at: string
}