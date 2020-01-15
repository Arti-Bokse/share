const db = require('./db')
const utils = require('./utils')
const express = require('express')


const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect(

    )
    const statement = `select i.issue_date ,b.name,b.author,b.price from issuerecord i INNER JOIN  copies c ON (i.copyid = c.id) INNER JOIN books b ON (b.id=c.bookid);`
    connection.query(statement, (error, data) => {
        console.log(statement)
        connection.end()

        response.send(utils.createResult(error, data))
    })
})


module.exports = router