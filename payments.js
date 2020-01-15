const db = require('./db')
const utils = require('./utils')
const express = require('express')


const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect(

    )
    const statement = `select * from  payments` 
   // p INNER JOIN users u ON p.userid=u.userid INNER JOIN issuerecord i ON p.nextpayment_duedate=i.return_duedate`
    connection.query(statement, (error, data) => {
        connection.end()
        
        response.send(utils.createResult(error, data))
    })
})


module.exports = router