import {Pool, PoolClient} from "pg"

export const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

export default async function dbConnect(){
    const client: PoolClient | null = await pool.connect();

    if (client){
        try {
            const result = await client.query("SELECT NOW()");
            console.log("Connected to DB")
        }
        catch(error){
            console.log("Error executing query")
        }
        finally{
            client.release()
        }
    }
    else{
        console.error('Error in Connection')
    }
}