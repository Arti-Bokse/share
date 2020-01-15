const db = require('./db')
const utils = require('./utils')
const express = require('express')
const router =express.Router()

router.get('/',(request,response)=>{
    const connection =db.connect()
    
    const statement=`select * from books`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
    
    
  })
  router.get('/:id',(request,response)=>{
    const connection =db.connect()
    const {id} = request.params
    
    const statement=`select * from books where id =${id}`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
    
    
  })
  router.delete('/:id', (request, response) => {
    const {id} = request.params
    const connection = db.connect()
    
    const statement = `delete from books where id = ${id}`
    connection.query(statement, (error, data) => {

      connection.end()
      response.send(utils.createResult(error, data))
    })
})
router.post('/', (request, response) => {
    const {name,author,subject,price,isbn} = request.body
  
    const connection = db.connect()
    
    const statement = `insert into books (name,author,subject,price,isbn) values ( '${name}','${author}','${subject}','${price}','${isbn}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
  })
  router.put('/:id',(request,response)=>{
    const {id} = request.params
    const {categoryname}=request.body
    const connection =db.connect()
     const statement=`update  books set name = '${name}',author = '${author}',subject = '${subject}',price = '${price}',isbn = '${isbn}' where id=${id}`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
  })

module.exports=router