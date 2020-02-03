
// *** Class de interação com o banco de dados

const conexao = require('../config/conexao-db')

class Usuarios {

    lista(){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM usuario'
        
            conexao.query(sql, (erro, retorno) => {
                if(erro) {
                    reject('erro ao consultar: ' + erro)
                    return
                }
                console.log('consultado com sucesso')
                resolve(retorno)
            })
        })

    }

    insere(usuario){
        return new Promise((resolve,reject) => {
            const sql = ' INSERT INTO usuario SET ? '

            conexao.query(sql, usuario, (erro, retorno) => {

                erro ? 
                reject("Erro ao inserir: " + erro) : 
                resolve({id:retorno.insertId, ...usuario}) //pega o id que vem no retorno (insertId) e adiciona no restante do objeto usuario (...usuario)

                // if(erro){
                //     reject("Erro ao inserir: " + erro)
                //     return
                // }
                // resolve(retorno)

            })

        })
    }


    buscarPorEmail(email){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM usuario WHERE email = ?'

            conexao.query(sql, email, (erro, retorno) => {
                if(erro){
                    reject("Erro ao consultar: " + erro)
                }else{
                    const usuario = retorno[0]
                    // if(usuario){
                    //     console.log('usuario encontrado')
                        resolve(usuario)
                    // }else{
                    //     console.log('Usuário não encontrado')
                    //     reject({erro: "Usuário não encontrado"})
                    // }
                }
                console.log(retorno)
                resolve(retorno)

            })

        })
    }

}

module.exports = new Usuarios()