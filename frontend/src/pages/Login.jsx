import React, {useEffect, useState} from 'react'
import BgAnimated from '../modules/BgAnimated'
import { cn } from '../lib/utils'
import { GoogleLogin } from '@react-oauth/google';

const clientId = '290987074567-aubqds8lertag869pqdkc8uc2m68rnn2.apps.googleusercontent.com'

const Login = () => {
    const [isLoginView, setIsLoginView] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            //redirect to dashboard
            window.location.href = '/dashboard'
        }
    }, [])

    const onSuccess = (response) => {
        console.log('Login Success:', response)
        const token = response.credential
        localStorage.setItem('token', token)
        window.location.href = '/dashboard'
      }
    
      const onFailure = (response) => {
        console.log('Login Failed:', response)
      }

    const handleChangeLogin = () => {
        setIsLoginView(!isLoginView)
        setError(false)
        setErrorMessage('')
        setLoading(false)
    }

    const createToken = () => {
        // Create a token from random characters
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return token;
    }

    const handleRegister = (e) => {
        console.log('Register')
        e.preventDefault()
        setLoading(true)
        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const token = createToken()
        fetch('http://localhost:3000/user/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status === 200) {
                setLoading(false)
                setErrorMessage('User already exists, please login.')
                setError(true)
            } else {
                fetch('http://localhost:3000/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                        name: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    })
                }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(data.status === 404 || data.status === 500) {
                        setErrorMessage(data.message)
                        setError(true)
                        setLoading(false)
                        return
                    }else {
                        setLoading(false)
                        localStorage.setItem('token', token)
                        window.location.href = '/dashboard'
                    }
                })
                .catch(err => {
                    setLoading(false)
                    setErrorMessage('Error creating user')
                    setError(true)
                })
            }
        })
    }

    const handleLogin = (e) => {
        console.log('Login')
        e.preventDefault()
        setLoading(true)
        const email = document.getElementById('emailLogin').value
        const password = document.getElementById('passwordLogin').value

        const token = createToken()
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status === 404 || data.status === 500) {
                setErrorMessage(data.message)
                setError(true)
                setLoading(false)
                return
            }else {
                setError(false)
                setLoading(false)
                localStorage.setItem('token', token)
                window.location.href = '/dashboard'
            }
        })
    }

  return (
    <section className='login-container py-12 px-4 md:px-10 bg-[#222831]'>
        <div className='rounded-[36px] p-2 bg-white flex justify-between items-center h-full max-w-[1300px] mx-auto overflow-hidden'>
            <div className='relative py-12 px-10 h-full info-container hidden md:flex w-[50%] rounded-[36px] bg-[#222831] flex-col justify-end gap-24 text-[#EEEEEE]'>
                <BgAnimated
                    numSquares={20}
                    maxOpacity={0.5}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-65%] h-[200%] skew-y-12",
                    )}
                />
                <div className='absolute top-12 left-10'>
                    <span className='source-code-pro-regular text-xl text-[#EEEEEE]'>Ipsum</span>
                </div>
                <div>
                    <h1 className='text-5xl source-code-pro-bold mb-5'>Welcome, to <br/>your expense manager!</h1>
                    <p className='source-code-pro-regular text-xl'>Keep track of your expenses and manage your budget with ease.</p>
                    <p className='source-code-pro-regular text-xl'>Sign up now and start managing your finances.</p>
                </div>
                <div className='text-sm text-center mx-auto source-code-pro-regular'>
                    <span>@2024 Ipsum. Developed by Juanjo García.</span>
                </div>
            </div>
            <div className='py-12 px-4 md:px-10 h-full w-[100%] md:w-[50%] bg-white relative flex justify-center items-center'>
                <img src="/logoipsum-dark.svg" alt="Logo placeholder" className="w-[200px] max-w-[40dvw] mx-auto text-center absolute top-9 left-0 right-0 m-auto"/>
                {!isLoginView && <div className='source-code-pro-regular min-w-[77%]'>
                    <h2 className='source-code-pro-bold text-3xl'>Create new account.</h2>
                    <p className='source-code-pro-italic'>Already a member? <a href="#" className='underline' onClick={() => handleChangeLogin()}>Log in</a></p>

                    <form className='mt-4 login-form' onSubmit={(e) => handleRegister(e)}>
                        <div className='flex items-center justify-center gap-3'>
                            <div className='relative w-[50%] inline-flex items-center px-4 py-4 rounded-2xl bg-[#DCE2EA] mb-3'>
                                <input type="text" required name='firstName' id='firstName' className='bg-transparent text-sm font-regular'/>
                                <label className='absolute pointer-events-none font-regular transition-all text-xs' htmlFor="firstName">First name</label>
                            </div>
                            <div className='relative w-[50%] inline-flex items-center px-4 py-4 rounded-2xl bg-[#DCE2EA] mb-3'>
                                <input type="text" required name='lastName' id='lastName' className='bg-transparent text-sm font-regular'/>
                                <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="lastName">Last name</label>
                            </div>
                        </div>
                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] mb-3 flex items-center'>
                            <input type="email" required name='email' id='email' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="email">Email</label>
                        </div>
                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] mb-3 flex items-center'>
                            <input type="password" required name='password' id='password' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="password">Password</label>
                        </div>
                        <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
                            <button className='effect effect-1 relative w-[50%] text-[#EEEEEE] bg-[#222831] mb-3 text-xs font-semibold inline-flex items-center justify-center gap-1'>
                                Create account {loading && <div class="loader-button"></div>}
                            </button>
                            <div className='google-button relative w-[50%] inline-flex items-center rounded-2xl mb-3'>
                                <GoogleLogin
                                    onSuccess={onSuccess}
                                    onError={onFailure}
                                    shape='circle'
                                />
                            </div>
                        </div>
                        {error && <p className='text-red-500 text-xs font-semibold'>{errorMessage}</p>}
                    </form>
                </div>}

                {isLoginView && <div className='source-code-pro-regular min-w-[77%]'>
                    <h2 className='source-code-pro-bold text-3xl'>Enter to dashboard.</h2>
                    <p className='source-code-pro-italic'>Not a member? <a href="#" className='underline' onClick={() => handleChangeLogin()}>Register</a></p>

                    <form className='mt-4 login-form' onSubmit={(e) => handleLogin(e)}>
                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] mb-3 flex items-center'>
                            <input type="email" required name='email' id='emailLogin' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="email">Email</label>
                        </div>
                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] mb-3 flex items-center'>
                            <input type="password" required name='password' id='passwordLogin' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="password">Password</label>
                        </div>
                        <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
                            <button className='effect effect-1 relative w-[50%] text-[#EEEEEE] bg-[#222831] mb-3 text-xs font-semibold inline-flex items-center justify-center gap-1'>
                                Enter {loading && <div class="loader-button"></div>}
                            </button>
                            <div className='google-button relative w-[50%] inline-flex items-center rounded-2xl mb-3'>
                                <GoogleLogin
                                    onSuccess={onSuccess}
                                    onError={onFailure}
                                    shape='circle'
                                />
                            </div>
                        </div>
                        {error && <p className='text-red-500 text-xs font-semibold'>{errorMessage}</p>}
                    </form>
                </div>}
            </div>
        </div>
    </section>
  )
}

export default Login