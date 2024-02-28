"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() { 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
              }
              router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section>
                <div className="grid place-items-center mt-24">
                    <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 md:w-1/3">
                        <h1 className="text-xl font-bold my-4">Enter Login Details</h1>
                        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email</label> 
                            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            <label htmlFor="password">Enter Password</label> 
                            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" /> 
                            <button className="text-white bg-green-600 rounded-md p-2" type="submit">Login</button>
                            {error &&  (
                                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                    {error}
                                </div>)
                            }  
                            <Link href="./register">If you don't have an account?<span className="underline">Register</span></Link>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
