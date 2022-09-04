export interface CreateUserDTO {
    id?: string
    login: string
    email: string
    telefone: string
    password: string
    name: string
    codigo_de_validacao: number
    expires_in: number
}