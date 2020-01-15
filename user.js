const db=require('./db')
const express=require('express')
const utils = require('./utils')


const router=express.Router()

router.get('/',(request,response)=>{
    const connection=db.connect()
    const statement='select * from users'
    connection.query(statement,(error,data)=>{
        connection.end()
        const admin=[]
        for(let index=0;index<data.length;index++){
            const Admin=data[index]
            admin.push({
                user_id:Admin['user_id'],
                name:Admin['name'],
                email:Admin['email'],
                phone:Admin['phone'],
                role:Admin['role'],
                password:Admin['password']

            })
        }
        response.send(utils.createResult(error,admin))
    })
})


router.post('/login',(request,response)=>{
    const{email,password}=request.body
    const connection=db.connect()
    const statement=`select * from users where email='${email}' and password='${password}'`
    connection.query(statement,(error,admin)=>{
        connection.end()
        if(admin.length==0){
            response.send(utils.createResult('Invalid Email or Password'))
        }
        else{
            const Admin=admin[0]
            const info={
                name:Admin['name'],
                email:Admin['email']
            }
            response.send(utils.createResult(null,info))
        }
    })
})


router.post('/register',(request,response)=>{
    const{name,email,phone,password,role}=request.body
    const connection=db.connect()

    const statement1=`select * from users where email ='${email}'`
    connection.query(statement1,(error,admin)=>{
        if(admin.length==0){

            const statement=`insert into users(name,email,phone,password,role) values ('${name}','${email}','${phone}','${password}','${role}')`
            connection.query(statement,(error,data)=>{
                connection.end()
                response.send(utils.createResult(error,data))
            })

        }else{
            connection.end()
            response.send(utils.createResult('Email Already,Please Use Another EmailID'))

        }
    })


})

router.put('/update/:user_id',(request,response)=>{
    const{user_id}=request.params

    const{name,email,phone,password,role}=request.body

    const connection=db.connect()

    const statement=`update users set name='${name}',email='${email}',phone='${phone}',
    password='${password}',role='${role}' where user_id=${user_id}`

    connection.query(statement,(error,data)=>{
        connection.end()

        response.send(utils.createResult(error,data))
    })
})

router.post('/resetpassword', (request, response) => {
    const {email, password} = request.body
    
    const connection = db.connect()
    const statement = `update users set password = '${password}' where email = '${email}'`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})



module.exports=router