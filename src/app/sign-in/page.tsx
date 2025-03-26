import SignInForm from '@/components/commons/SignInForm';
import { checkSession } from '@/services/signIn';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const signInPage = async () => {
  const userData = await checkSession();

  if (userData) {
    redirect('/home');
  }

  return (
    <div className='mt-[100px] flex flex-col items-center'>
      <SignInForm />
      <div className='flex pt-3'>
        <p>계정이 없으신가요?</p>
        <Link href={'/sign-up'}>
          <p className='px-2 font-bold text-[#e6354f]'>회원가입</p>
        </Link>
      </div>
    </div>
  );
};

export default signInPage;
