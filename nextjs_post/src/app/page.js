import Image from 'next/image'

export default function Home() {
  return (
   <main className="m-10">
    <div className="m-5">
      <h1 className="text-center m-5">
        Add note
      </h1>
      <form action="" className="space-y-5">
        <input type="text"
        name='note'
        id='note' placeholder='Add note' className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]" />
        <input type="date"
        name='date'
        id='date' placeholder='Add date' className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]" />
        <button type="submit" className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md">SUBMIT</button>
      </form>
    </div>
   </main>
  )
}
