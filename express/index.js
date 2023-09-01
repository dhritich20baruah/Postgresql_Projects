//Hello and welcome in this video We will be building a CRUD application using express server and postgresql as database. We will see how to connect to the database.Then build REST API endpoints to send queries to postgres and manage results of those queries. So let's get started.
//pg is a Node.js library that provides a PostgreSQL client for interacting with PostgreSQL databases. It helps express interact with postgres just like what mongoose does for mongodb and express

const express = require('express');
const app = express();
const Pool = require('pg').Pool; // The Pool class is a key component of the pg library, and it's used to manage a pool of database connections.
const path = require('path');
const ejs = require('ejs');
const PORT = 3000;
require('dotenv').config();

const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DIALECT, 
    port: process.env.PORT_NUMBER
})

// The code connects to the database using a connection pool and checks whether the connection is successful by executing a simple query to get the current timestamp 
pool.connect((err, client, release)=>{// This line initiates a connection to the database using a connection pool. A connection pool is a cache of database connections maintained so that the connections can be reused when needed, which is more efficient than opening and closing a new connection for each database interaction.
    if(err){
        return console.error('Error in connection')
    }
    client.query('SELECT NOW()', (err, result)=>{
        release() //After the query is executed, the release function is called to release the connection back to the pool. This ensures that the connection is not kept open and can be reused by other parts of the application.
        if(err){
            return console.error('Error executing query')
        }
        console.log("Connected to database")
    })
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/static', express.static('static'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//READ
app.get('/', async(req, res)=>{
    const data = await pool.query(`SELECT * FROM todo ORDER BY date`);
    res.render('index', {data: data.rows})
})
//FILTER
app.post('/filter', async(req, res)=>{
    const searchDate = req.body.date
    const data = await pool.query(`SELECT * FROM todo WHERE date='${searchDate}'`);
    res.render('filter', {data: data.rows})
})

//ADD TODO ENDPOINT
app.post('/addTodo', async(req, res)=>{
    const {todo, date} = req.body;

    try{
        const result = await pool.query(`INSERT INTO todo (todo, date) VALUES ($1, $2) RETURNING *`, [todo, date])
        console.log(result)
        res.redirect('/')
    }
    catch(error){
        console.log('Error in adding todo');
        res.status(500).json({error: 'Internal Server Error'})
    }
})

//UPDATE
app.get('/edit/:id', async (req,res)=>{
    const id = req.params.id;
    const data = await pool.query('SELECT * FROM todo WHERE id = $1', [id])
    res.render('edit', {data: data.rows})
})

app.post('/update/:id', async(req, res)=>{
    const id = req.params.id;
    const {todo, date} = req.body

    try{
        await pool.query(`UPDATE todo SET todo = $1, date = $2 WHERE id = $3`, [todo, date, id])
        res.redirect('/')
    }
    catch(error){
        console.error('Error updating todo:', error);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

//DELETE
app.get('/delete/:id', async (req, res)=>{
    const id = req.params.id;
    await pool.query('DELETE FROM todo WHERE id = $1', [id])
    res.redirect('/')
})

app.listen(PORT, ()=>{console.log(`Server started at port ${PORT}`)})