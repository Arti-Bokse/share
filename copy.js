const db = require('./db')
const utils = require('./utils')
const express = require('express')
const router =express.Router()

// router.get('/',(request,response)=>{
//     const connection =db.connect()
   
//     const statement= `select c.id,c.bookid,b.name,b.author,b.subject,c.rack,c.status from copies c inner join books b on c.bookid=b.id`
//     connection.query(statement,(error,data)=>{
//         connection.end()
//         response.send(utils.createResult(error,data))
//     })
// })

router.post('/',(request,response)=>{
    const {bookid,rack,status}=request.body
    // const {messid} = request.params
    const connection =db.connect()
    const statement =`insert into copies(bookid,rack,status)values('${bookid}','${rack}','${status}')`
    connection.query(statement,(error,data)=>{
      connection.end()
    response.send(utils.createResult(error,data))
    })
  })

router.get('/:bookid',(request,response)=>{
    const {bookid} = request.params
    const connection =db.connect()
     const statement=`select * from copies where bookid= ${bookid}`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})
router.get('/subject/sub',(request,response)=>{
    const {subject} = request.params
    const connection =db.connect()
     const statement=`select b.subject,count(bookid)from copies c inner join books b on b.id=c.bookid group by subject`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})
router.put('/issue/:id',(request,response)=>{
    const {id} = request.params
    
    const connection =db.connect()
     const statement=`update  copies set status = 'unavailable' where id = '${id}'`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.put('/return/:id',(request,response)=>{
    const {id} = request.params
    
    const connection =db.connect()
     const statement=`update  copies set status = 'available' where id = '${id}'`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})
  module.exports=router