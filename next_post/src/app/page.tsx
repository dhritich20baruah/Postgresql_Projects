import Image from 'next/image'
import dbConnect from './dbConnect'
import { pool } from './dbConnect'
import Link from 'next/link'
import { redirect } from 'next/navigation'
export default function Home() {
  dbConnect()

  //CREATE
  async function createNote(data: FormData){
    "use server"
    let todo = data.get("todo")?.valueOf() as string | undefined
    let date = data.get("date")?.valueOf() as string | undefined 

    try{
      const newTodo = await pool.query('INSERT INTO todos (todo, date) VALUES ($1, $2) RETURNING *', [todo, date]);
      console.log(newTodo.rows[0])
    }catch(error){
      console.log(error)
    }
    redirect('/')
  }

  return (
  <main className="container m-10">
    <div className="m-5">
      <h1 className="text-center m-5">Add Todo</h1>
      <form action="" className="space-y-5">
        <input type="text" name="todo" id="todo" className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%] outline-none" autoComplete='off'/>
        <input type="date" name="date" id="date" className='shadow-lg rounded-md shadow-black h-10 p-3 w-[100%] outline-none' autoComplete='off'/>
        <button className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md" type='submit'>SUBMIT</button>
      </form>
    </div>

    <div className="m-5 space-y-10">
      <h1 className="text-center">Todos</h1>
      <div className='w-[100%]'>
        <ul className="flex font-bold text-md">
          <li className="text-center w-[50%]">Todo</li>
          <li className="text-center w-[30%]">Date</li>
          <li className="text-center w-[20%]">Options</li>
        </ul>
      </div>
    </div>
  </main>
  )
}
