import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../../auth/entities/User"
import { Tag } from "../../tags/entities/Tag"

@Entity('leitura')
export class Reading {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    titulo: string
    
    @Column()
    subtitulo: string

    @ManyToOne(() => User, (user) => user.readings)
    user: User

    @ManyToMany(() => Tag, (tag) => tag.readings)
    @JoinTable()
    tag: Tag[]

    @Column({type: "json"})
    tags: JSON
    
    @CreateDateColumn()
    created_at: string
}