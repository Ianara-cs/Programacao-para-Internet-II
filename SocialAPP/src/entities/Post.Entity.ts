import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.Entity";

@Entity('posts')
export class PostEntity{
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    post: string

    @ManyToOne(() => UserEntity, (user) => user.posts)
    user: UserEntity
    
    @CreateDateColumn()
    created_at: string
}