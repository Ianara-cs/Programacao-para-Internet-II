import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("reflesh_token")
export class RefleshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    expiresIn: number
    
    @Column()
    userId: string
}