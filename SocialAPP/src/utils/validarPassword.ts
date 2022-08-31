export const validarPassword = async (password: string) => {

    let temNum = false
    let temSimbolo = false
    let temMaiuscula = false

    if(password.length < 4) {
        return false
    }

    if(password.match(/[0-9]+/)) {
        temNum = true
    }

    if (password.match(/[@#!$%&*<>?+=^]+/)){
        temSimbolo = true
    }

    if (password.match(/[A-Z]+/)){
        temMaiuscula = true
    }

    if(temNum == false || temSimbolo == false || temMaiuscula == false) {
        return false
    }

    return true
    
}