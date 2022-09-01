import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('leitura')
export class Leitura {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    titulo: string
    
    @Column()
    subtitulo: string

    @Column()
    user_id: string

    @Column({nullable: true})
    tags: string

    @CreateDateColumn()
    created_at: string
}