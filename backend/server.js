const express= new require('express');
const app=express();
const mysql= require('mysql');
const cors=require('cors');
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  
  }));
const db= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'27.Dec.2004',
    database:'employee'
});
app.post('/register',(req,res)=>{
    console.log("entered")
    const{firstname,lastname,employeeid,email,phonenumber,department,dateofjoin,role}=req.body;
    console.log(firstname,lastname,employeeid,email,phonenumber,department,dateofjoin,role)
    const emailregex=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    if(!emailregex.test(email)){
        return res.status(400).send({message:'Invalid email'});
    }
    const checkquery=`select * from emp_details where emp_id=? or email=? or phone_number=?`;
    db.query(checkquery,[employeeid, email, phonenumber],(err,results)=>{
        if(err) {
            console.log(err);
            return res.status(500).send({message:"error while checking",error:err})
        }
        if(results.length>0){
            console.log("already exists")
            return res.status(400).send({ message: "User already exists" })
        }
        const insertquery=`insert into emp_details (firstname, secondname, emp_id, email, phone_number, department, date_of_join, emp_role) values(?,?,?,?,?,?,?,?)`;
        db.query(insertquery,[firstname, lastname, employeeid, email, phonenumber, department, dateofjoin, role],(err,results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send({ message: "Issue while inserting", error: err });
            }
            else{
                return res.status(200).send({ message: "User created successfully" });
            }
        })
        
    })
});
const port=3006
app.listen(port,()=>{console.log(`running on${port}`)});