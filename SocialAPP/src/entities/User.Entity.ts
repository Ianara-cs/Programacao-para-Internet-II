import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import { PostEntity } from "./Post.Entity"

@Entity('users')
export class UserEntity {
    @PrimaryColumn()
    id?: string

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity
    
    @CreateDateColumn()
    created_at: string

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}

