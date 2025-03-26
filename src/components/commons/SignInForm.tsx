'use client';

import { signInSupabase } from '@/services/signIn';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabaseClient';

const SignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FieldValues>({ mode: 'onChange' }); //훅 폼 사용

  const onSubmit = async (value: FieldValues) => {
    try {
      const { email, password } = value;
      const data = await signInSupabase({ email, password }); //서버 액션 함수 호출
      if (data) {
        localStorage.setItem('auth_token', data.session.access_token); //로컬스토리지에 토큰 저장
        useAuthStore.getState().signIn(data.user.email as string); //로그인 상태 전역 업데이트
      }
      alert('로그인되었습니다.');
      router.push('/home'); //로그인 성공 시 홈으로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-[350px] rounded-lg bg-gray-200 p-5'>
      <div className='flex flex-col items-center'>
        <label htmlFor='email' />
        <input
          className='m-3 w-[270px] rounded-md p-2'
          type='email'
          placeholder='email'
          {...register('email', {
            required: { value: true, message: '아이디를 입력하세요' },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식으로 입력하세요.',
            },
          })}
        />
        {formState.errors.email && (
          <span className='text-[14px] font-semibold'>{formState.errors.email.message as string}</span>
        )}
        <label htmlFor='password' />
        <input
          className='m-3 w-[270px] rounded-md p-2'
          type='password'
          placeholder='password'
          {...register('password', {
            required: { value: true, message: '비밀번호를 입력하세요' },
            pattern: {
              value: /^.{6,}$/,
              message: '6자리 이상 입력하세요.',
            },
          })}
        />
        {formState.errors.password && (
          <span className='text-[14px] font-semibold'>{formState.errors.password.message as string}</span>
        )}
        <Button type='submit' className='my-5 h-[50px] w-[270px] items-center font-semibold text-white'>
          로그인
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
