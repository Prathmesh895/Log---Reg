"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { AiOutlineMenu,AiOutlineClose } from 'react-icons/ai';
function navabar() {
  const [isopen,setIsOpen]=useState(false);
  
  const handleonchange=()=>{
    setIsOpen(!isopen);
  };
  const navMenu = [
    {text:'Home', href:'/'},
    {text:'Login',href:'./loginform'},
    {text:'Register',href:'/register'}
  ];
  return (
    <main className=''>
        <nav className='flex md:justify-around justify-between shadow p-4 items-center '>
            <div className=''><img src="https://www.britwise.com/assets/imgs/logo.png" alt="" /></div>
            <div >
          <ul className='md:flex hidden space-x-4  justify-between'>
          {
            navMenu.map((link,index)=>(
              <li key={index}>
                <Link href={link.href}>{link.text}</Link>
              </li>

            ))
          }
          </ul>
            </div>
            <div className='md:hidden'>
              <button onClick={handleonchange}>
              <AiOutlineMenu size={27}/>
              </button>
             <div className={isopen?  "fixed right-0 top-0 w-[100%] h-1/3 z-50 bg-blue-500 ease-in duration-500":"fixed right-[-100%] top-0 p-6 bg-slate-500"}>
              <div className='p-3 justify-end flex ' onClick={handleonchange}>
                <AiOutlineClose className='border bg-white p-2 rounded-full' size={40}/> 
                </div>
                <ul className="flex flex-col justify-center items-center">
                {
            navMenu.map((link,index)=>(
              <li key={index} className='bg-white text-black font-semibold p-2 rounded m-2 w-28 flex justify-center'>
                <Link href={link.href}>{link.text}</Link>
              </li>

            ))
          }
                </ul>
             </div>
                 
            </div>
        </nav>
    </main>
  )
}

export default navabar