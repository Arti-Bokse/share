const db = require('./db')
const utils = require('./utils')
const express = require('express')


const router = express.Router()
// http://localhost:5000/issuebooks/issuedbook
router.get('/issuedbook/', (request, response) => {
    const connection = db.connect(

    )
    const statement = `select i.issue_date,i.id,i.return_date ,c.id,c.status,b.name,b.author,b.subject,b.price,b.isbn from issuerecord i INNER JOIN  copies c ON (i.copyid = c.id) INNER JOIN books b ON (b.id=c.bookid) where c.status ='unavaliable' and i.return_duedate is NULL;`
    connection.query(statement, (error, data) => {
        // console.log(statement)
        connection.end()

        response.send(utils.createResult(error, data))
    })
})
router.post('/issue/', (request, response) => {
    const connection = db.connect()
    // const {id} = request.params
    const {copyid,memberid,issue_date,return_duedate,return_date,fine_amount}=request.body
    const statement = `insert into issuerecord (copyid,memberid,issue_date,return_duedate,return_date,fine_amount) values(${copyid},${memberid},${issue_date},${return_duedate},${return_date},${fine_amount});`
    connection.query(statement, (error, data) => {
        // console.log(statement)
        connection.end()

        response.send(utils.createResult(error, data))
    })
})
router.put('/return/:id', (request, response) => {
    const connection = db.connect()
    const {id} = request.params
    const{return_duedate}=request.body
    // const statement = `insert into issuerecord (copyid,memberid,issue_date,return_duedate,return_date,fine_amount) values(${copyid},${memberid},${issue_date},${return_duedate},${return_date},${fine_amount});`
    const statement = `update issuerecord set return_duedate = ${return_duedate} where id=${id};`
    connection.query(statement, (error, data) => {
        // console.log(statement)
        connection.end()

        response.send(utils.createResult(error, data))
    })
})


module.exports = router