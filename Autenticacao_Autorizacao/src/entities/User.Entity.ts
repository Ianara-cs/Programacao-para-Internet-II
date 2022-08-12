import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

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
    
    @CreateDateColumn()
    created_at: string

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}

