export interface CreateUserDTO {
    id?: string
    email: string
    password: string
    name: string
    codigo_de_validacao: number
    expires_in: number
}