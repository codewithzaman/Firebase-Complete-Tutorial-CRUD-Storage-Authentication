import {auth} from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useState} from 'react';
export const Auth =()=>{
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const signIn = async()=>{
        
    }
    const signUp = async()=>{
        await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
            )
    }
    return (
       <div>
         <div>
            <input type="text"
            value={registerEmail}
             placeholder="email"
             onChange ={(e) => setRegisterEmail(e.target.value)}
             />
            <input type="password"
            value={registerPassword}
             placeholder="password"
             onChange ={(e) => setRegisterPassword(e.target.value)}
             /><br/> <br/>
            <button onClick={signUp}>Sign up</button> <br/>
        </div><br/>
        <div>
            <input type="text"
             placeholder="email"
             value={loginEmail}
             onChange ={(e) => setLoginEmail (e.target.value)}
             />
            <input type="text" 
             placeholder="password"
             value={loginPassword}
             onChange ={(e) => setLoginPassword (e.target.value)}
             /><br/> <br/>
            <button>Sign in</button>
        </div>
       </div>
    )
}