import { useState,useContext } from "react";
import { handleUserLogin } from "../../../backend/http";
import  Input  from '../Login/Input';
import { AppContext } from "../context-files/context-api";
export default function Login() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError]= useState< null | {password:String,email:String,name:String} >(null);
    
    const {updateLocation} = useContext(AppContext);

    function handleInputChange(type:String,data:string){
        switch (type){
            case 'email':
                setEmail(data);
                return;

            case 'password':
            setPassword(data)
            return;

            default:
                setName(data);

        }
    }
   async function handleLogin() {
      const newErrors = {
       email: !email.trim() ? 'Email is required.' :
        !/^[^\s@]+@[^\s@]+\.com$/i.test(email) ?
        'Enter a valid .com email.'
        : '',
        
        password: !password.trim() ? 'Password is required.'
        : password.length < 8 ? 'At least 8 characters.' : '',

        name: !name.trim() ? 'Name is required.' :
        name.length < 8 ?  'Name must be 8 atleast characters long' : '',
  };

  setError(newErrors)
        if (Object.values(newErrors).some(Boolean)) return;

    try {
        await handleUserLogin({ name, email, password });
        updateLocation('Dashboard');
    } catch (err) {
        setError({ name:'',email:'',password:'Invalid Credentials'});
        console.error(err);
    }
}
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

                <div className="mb-7">
                    <p className="text-[0.6875rem] uppercase tracking-widest text-zinc-600 mb-1">
                        Welcome back
                    </p>
                    <h2 className="text-[1.75rem] font-semibold text-zinc-100" style={{ letterSpacing: '-0.02em' }}>
                        Sign in
                    </h2>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                   <Input
                   value={name}
                   onChangeFx={(e:React.ChangeEvent<HTMLInputElement>)=>handleInputChange('name',e.target.value)}
                   typeofInput='name'
                   error={error ? error.name : ''}
                   />
                  
                  <Input 
                  value={email}
                  onChangeFx={(e:React.ChangeEvent<HTMLInputElement>)=>handleInputChange('email',e.target.value)}
                  typeofInput='email'
                  error={error ? error.email : ''}
                  />

                   <Input
                   value={password}
                   onChangeFx={(e:React.ChangeEvent<HTMLInputElement>)=>handleInputChange('password',e.target.value)}
                   typeofInput='password'
                   error={error ? error.password : ''}
                   />

                </div>

                <button className="w-full py-2.5 rounded-xl text-[13px] font-medium tracking-wide text-white cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                onClick={handleLogin}
                    style={{
                        background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    }}
                >
                    Sign in →
                </button>

                <p className="text-center text-[12px] text-zinc-600 mt-5">
                    No account?{' '}
                    <button
                    className="text-zinc-400 hover:text-zinc-200 font-medium transition-colors duration-150 cursor-pointer">
                        Create one
                    </button>
                </p>

            </div>
        </div>
    );
}