// responsável pelas consigurações do servidor

const express = require('express') //importando o modulo express
const app = express() //invocando o modulo express
const consign = require('consign')//importando o modulo consign
const bodyParser = require('body-parser')

//const usuarioController = require('./controllers/usuarios') //importando o modulo usuarios (arquivo e rotas)
//usuarioController(app) // Invocando a função do modulo app

customExpress = () =>{

    // identifica que nossa aplicação vai aceitar json
    app.use(express.json())

    consign()
    .include('controllers')
    .include('models')
    .into(app) // tudo que está na pasta controller, serão disponibilizados para o modulo app. Evita de fazer os requires

    return app

}

module.exports = customExpress()


