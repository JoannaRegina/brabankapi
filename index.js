//responsável por dar start na aplicação

const app = require('./config/custom-express') //app recebe um modulo

//subindo a aplicação
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})