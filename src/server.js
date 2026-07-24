import app from './app.js'
const port = 3000

console.log("conexão feita com sucesso!")
        app.listen(port, () => {
            console.log(`Servidor está rodando no endereçp ${port} `)
        })
