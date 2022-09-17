import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reading } from "../../reading/entities/Reading";

@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    name: string

    @ManyToMany(() => Reading, (reading) => reading.tag)
    readings: Reading[]

    @CreateDateColumn()
    created_at: string
}