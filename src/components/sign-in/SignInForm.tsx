'use client';

import { signInSupabase } from '@/services/signIn';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ALERT_TYPE } from '@/constants/alertType';
import { openAlert } from '@/lib/openAlert';
import { EMAIL, PASSWORD } from '@/constants/signUp';

const SignInForm = () => {
  const { ERROR, SUCCESS } = ALERT_TYPE;
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
      openAlert({
        type: SUCCESS,
        title: '로그인 성공!',
        text: '로그인되었습니다.',
        buttonText: '확인',
      });
      router.push('/home'); //로그인 성공 시 홈으로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      openAlert({
        type: ERROR,
        title: '로그인 실패',
        text: '로그인에 실패하였습니다.',
        buttonText: '다시 시도',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto h-[330px] w-[350px] rounded-lg bg-gray-200 p-5'>
      <div className='flex flex-col items-center'>
        <label htmlFor='email' />
        <input
          className='mb-2 mt-7 w-[270px] rounded-md p-2'
          type='email'
          placeholder='email'
          {...register(EMAIL, {
            required: { value: true, message: '아이디를 입력하세요' },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식으로 입력하세요.',
            },
          })}
        />
        {formState.errors.email ? (
          <span className='block h-[20px] text-[14px] font-semibold text-red-500'>
            {formState.errors.email.message as string}
          </span>
        ) : (
          <span className='invisible block h-[20px] text-[14px] font-semibold'></span>
        )}
        <label htmlFor='password' />
        <input
          className='mb-2 mt-7 w-[270px] rounded-md p-2'
          type='password'
          placeholder='password'
          {...register(PASSWORD, {
            required: { value: true, message: '비밀번호를 입력하세요' },
            pattern: {
              value: /^.{6,}$/,
              message: '6자리 이상 입력하세요.',
            },
          })}
        />
        {formState.errors.password ? (
          <span className='block h-[20px] text-[14px] font-semibold text-red-500'>
            {formState.errors.password.message as string}
          </span>
        ) : (
          <span className='invisible block h-[20px] text-[14px] font-semibold'></span>
        )}
        <Button type='submit' className='mt-8 h-[50px] w-[270px] items-center font-semibold text-white'>
          로그인
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
