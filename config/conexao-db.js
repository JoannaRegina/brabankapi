// *** Responsável pela conexao com o banco

const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: '100.26.100.165',
    port: 3306,
    user: 'joanna',
    password: 'bcd127',
    database: 'brabank'
})

module.exports = conexao