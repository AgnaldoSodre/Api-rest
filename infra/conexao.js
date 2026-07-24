import mysql from 'mysql2'

const conexao = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    database:'bd_estoque'
})

conexao.connect()

export default conexao