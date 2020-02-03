//Responsável pelo mapeamento de rotas

const {check, validationResult } = require('express-validator') //quando queremos pegar um objeto que não está definido como default, colocamos entre chaves
const UsuariosValid = require('../validators/Usuarios')

const usuarios = (app) => {

    

    app.get('/', (req, res) => {
        res.send('Root Rote')
    }) //ao ser feito uma requisição para a rota "/", será enviado a resposta "root rote"


    app.get('/usuarios', (req, res) => {

        // const usuario = {nome: 'Joanna', senha: '1234' }
        // res.send(usuario)

        // console.log(app);

        const usuarioDAO = app.models.Usuarios

        usuarioDAO.lista()
        .then(lista => {
            res.send(lista)
        }).catch(erro => {
            console.log(erro)
            res.status(500).send(erro)
        })


    }) //ao ser feito uma requisição para a rota "/", será enviado a resposta em forma de json


    app.post('/usuarios', UsuariosValid.validacoes(), (req , res) => {
        
        let usuario = req.body
        // console.log(usuario)

        const erros = validationResult(req) //retorna uma lista dos erros da checagem acima

        if(!erros.isEmpty()){
            res.status(400).send(erros)
            return
        }

        const usuarioDAO = app.models.Usuarios

        usuarioDAO.insere(usuario)
        .then(retorno => res.status(201).send(retorno)) //se der certo
        .catch(erro => { //se der errado
            console.log(erro)
            res.status(500).send(erro)
        })


    }) // requisição para

    app.get('/usuarios/email/:email', (req, res) => {
        const email = req.params.email

        usuarioDAO = app.models.Usuarios

        usuarioDAO.buscarPorEmail(email)
            .then(retorno => {
                if(retorno){
                    res.send(retorno)
                }else{
                    res.status(404).send()
                }
                res.send(retorno)
            })
            .catch(erro => res.status(500).send(erro))

    })


}

module.exports = usuarios