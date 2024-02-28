"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function RegisteRform(){
const [name,setName]= useState('');
const[email,setEmail]= useState('');
const[password,setPassword]=useState('');
const[error,setError]=useState('');

const router=useRouter();

const handleSubmit=async(e)=>{
e.preventDefault();
if(!name || !password || !email){
    setError('All fields are necessary');
    return;
}
try{

    const resUserexist = await fetch("api/Userexist",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
    });
    const {user}= await resUserexist.json();
    if(user){
        setError("User exist")
        return;
    }
    const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
    if(res.ok){
        const form =e.target;
        form.reset();
        router.push('/')
    }else{
        console.log('User registration failed.')
    }

}catch(error){

}
};

    return(
        <main className="">
             <div className="grid place-items-center mt-24 ">
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 md:w-1/3 bg-white">
                <h1 className="text-xl font-bold my-4">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
                <label htmlFor="name">Name</label>
                <input type="text" onChange={(e)=>setName(e.target.value)}  id="" placeholder="Full Name" />

                <label htmlFor="email">Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} name="" id="email" placeholder="Email"/>

                <label htmlFor="password">Enter Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="Password"/>
                <button className="text-white bg-green-600 rounded-md p-2">Register</button>
                {error && (
                     <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                     {error}
                   </div> 
                )

                }
                
                <Link href={"/"}>If already have an account? <span className="underline">Login</span></Link>
            </form>
                </div>
            
            </div>
        </main>
    )
}