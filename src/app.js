import express from "express"
import conexao from '../infra/conexao.js'
const app = express()
app.use(express.json())


function buscarProdutoPorID(id){
    return produtos.filter(produto => produto.id == id)
}

function buscarIndexProduto(id){
    return produtos.findLastIndex(produto => produto.id == id)
}

app.get('/produtos',(req,res)=>{
    // res.status(200).send(produtos)
    const sql = 'select * from produtos;'
    conexao.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }else{
            res.status(200).json(result)
        }
    })
})

app.get('/produtos/:id',(req,res)=>{
    // res.json(buscarProdutoPorID(req.params.id))
    let id = req.params.id
    const sql = 'select * from produtos where id=?;'
    conexao.query(sql,id,(error,result)=>{
        const linha = result[0]
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(linha)
        }
    })
})

app.post('/produtos',(req,res)=>{
    // produtos.push(req.body)
    // res.status(201).send('Produto Cadastrado com Sucesso!')
    const produto = req.body
    const sql = 'insert into produtos set ?'
    
    conexao.query(sql,produto,(error,result)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).send('Produto Cadastrado Com Sucesso!')
        }
    })
})

app.delete('/produtos/:id',(req,res)=>{
    // let index = buscarIndexProduto(req.params.id)
    // produtos.splice(index, 1)
    // res.send(`Produto com id ${req.params.id} excluído com sucesso!`)
    const id = req.params.id
    const sql = 'delete from produtos where id=?'

    conexao.query(sql,id,(error,result)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).send('Produto Removido Com Sucesso!')
        }
    })

})

app.put('/produtos/:id',(req,res)=>{
    // let index = buscarIndexProduto(req.params.id)
    // produtos[index].nome = req.body.nome
    // produtos[index].categoria = req.body.categoria
    // produtos[index].preço = req.body.preço
    // produtos[index].quantidade = req.body.quantidade
    // res.json(produtos)
    const id = req.params.id
    const corpo = req.body
    const sql = 'update produtos set ? where id=?'

    conexao.query(sql,[corpo,id],(error,result)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(result)
        }
    })
})

export default app