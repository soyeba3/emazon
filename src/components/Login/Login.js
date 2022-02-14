import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider,updateProfile, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from './firebase.config';
import './Login.css'
import { userContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';

initializeApp(firebaseConfig)

const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email : '',
        password : '',
        photo : '',
        error : '',
        success : ''
    })
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const navigate = useNavigate()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } }; 

    const provider = new GoogleAuthProvider();
    const handleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((res) => {
            const {displayName, photoURL, email} = res.user
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email : email, 
                photo: photoURL
            }
            setUser(signedInUser)
            setLoggedInUser(signedInUser)
            const json = JSON.stringify(signedInUser)
            localStorage.setItem("email", json)
        }) 
        .catch((error)=>{
            console.log(error.message);
        })
    }
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
        .then((res) => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email : '',
                photo : '',
            }
            setUser(signOutUser)
            localStorage.removeItem('email')
        })
    }
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'name') {
            isFieldValid = e.target.value
        }
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length>6;
            const hasPasswordNumber = /[0-9]/.test(e.target.value)
            isFieldValid = isPasswordValid && hasPasswordNumber
        }   
        if(isFieldValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true
                setUser(newUserInfo)
                updateUserName(user.name)
                // console.log(newUserInfo)
            })
            .catch((error) => {
                const newUserInfo = {...user}
                newUserInfo.error = 'The email address already in used by another account';
                newUserInfo.success = false;
                setUser(newUserInfo)
                // console.log(newUserInfo)
            });
        }
        if (!newUser && user.email && user.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true
                setUser(newUserInfo)
                setLoggedInUser(newUserInfo)
                navigate(from)
                // console.log(res.user);
            })
            .catch((error) => {
                const newUserInfo = {...user}
                newUserInfo.error = 'The Password you entered is incorrect';
                newUserInfo.success = false;
                setUser(newUserInfo)
                // console.log(error.message);
            });
        }
        e.preventDefault()
    }

        const updateUserName = (name) => {
            const auth = getAuth();
            updateProfile(auth.currentUser, {
            displayName: name
            }).then((res) => {
            console.log('User Name Updated Successfully');
            }).catch((error) => {
            console.log(error.message);
            });
        }

    return (
        <div className='main'>
            {   
                user.isSignedIn
                ? <button onClick={handleSignOut}>Sign out</button>
                : <button onClick={handleSignIn}>Sign in with google</button>
            }

          {
              user.isSignedIn && <div>
                  <h1>Welcome {user.name}</h1>
                  <p>Your e-mail : {user.email}</p>
                  <img src={user.photo} alt="img" />          
              </div>
          }
          <h1>Our own Authentication</h1>
          <input type="checkbox" name="newUser" onChange={()=> setNewUser(!newUser)} />
          <label htmlFor="">Sign up for new user</label>
          <br />
          <form onSubmit={handleSubmit}>
              {newUser && <input type="text" name="name" placeholder='Enter Your Name' onBlur={handleBlur} required />}
              <br />
              <input type="text" name="email" placeholder='Enter e-mail' onBlur={handleBlur} required/>
              <br />
              <input type="password" name="password" placeholder='Enter Password' onBlur={handleBlur} required/>
              <br />
              <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
          </form>
          <p style={{color : 'red'}}>{user.error}</p>
            {user.success && <p style={{color : 'green'}}>User {newUser ? 'Creation' : 'Logged in'} Successfully</p>}
          
          
        </div>
    );
};

export default Login;