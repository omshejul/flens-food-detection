import Form from "./Components/Home/Form";
import Logo from "./Components/Icons/Logo";



export default function Home() {
  



  return (
    <main className="flex bg-gradient-to-b from-sky-500 to-indigo-500 min-h-screen flex-col items-center justify-between p-5">

      <div className="group cursor-pointer border border-transparent flex items-center hover:border-blue-300 justify-center  p-10 rounded-xl text-4xl font-bold">



        <Logo fill="fill-blue-200" className="m-2 group-hover:fill-white transition-all duration-700" size="32" />
        <span className="self-center text-blue-200 group-hover:text-white transition-all duration-700 m-2">arthkin.com</span>

      </div>
      <div className="flex text-blue-200  p-10 rounded-xl text-7xl font-bold">
<Form />
      </div>
      <div className="flex"></div>


    </main>
  )
}
