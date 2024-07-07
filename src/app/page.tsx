'use client';
import Image from 'next/image';
import logo from '../../public/images/login-logo.png';
import user from '../../public/images/loginUser.svg';
import passwordIcon from '../../public/images/loginPassword.svg';
import InputLogin from './components/login/InputLogin';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SpinnerLoad from './components/common/SpinnerLoad';
import Cookies from 'js-cookie';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/Login/Authenticate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      setError('*Usuario o contraseña incorrectos');
      setIsLoading(false);
      return;
    }

    const data = await response.json();

    const token = data.responseData;

    Cookies.set('token', token);

    localStorage.setItem('token', token);
    router.push('/inicio');
  };

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  return (
    <div className='h-screen flex'>
      <div className='bg-custom-blue w-1/2 flex-grow flex justify-center items-center'>
        <Image src={logo} alt='login' width={430} height={340} />
      </div>

      <div className='flex-grow w-1/2 flex justify-center items-center bg-[#EFF4FC] '>
        <div className='flex flex-col justify-center items-center shadow-lg p-10 rounded-xl bg-custom-blue bg-opacity-20'>
          <InputLogin
            type='text'
            placeholder={'Usuario'}
            icon={user}
            width={20}
            height={20}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLogin
            type='password'
            placeholder='Contraseña'
            icon={passwordIcon}
            width={16}
            height={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className='bg-custom-blue text text-white font-bold text-center p-2 border rounded w-64 h-12'
          >
            {isLoading ? <SpinnerLoad /> : 'Entrar'}
          </button>
          {error && <div className='text-red-500'>{error}</div>}
        </div>
      </div>
    </div>
  );
}
