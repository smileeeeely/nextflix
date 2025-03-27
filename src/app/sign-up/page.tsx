'use client';
import { Button } from '@/components/ui/button';
import { ALERT_TYPE } from '@/constants/alertType';
import { SIGNIN } from '@/constants/pagePath';
import { EMAIL, NICKNAME, PASSWORD } from '@/constants/signUp';
import { useSignUpSchema } from '@/hooks/useSignUpSchema';
import { openAlert } from '@/lib/openAlert';
import { signUpSupabase } from '@/services/signUpSupabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';

const SignUpPage = () => {
  const router = useRouter();
  const { ERROR, SUCCESS } = ALERT_TYPE;

  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    },
    resolver: zodResolver(useSignUpSchema),
  });

  const onSubmit = async (value: FieldValues) => {
    try {
      await signUpSupabase(value);
      openAlert({ type: SUCCESS, text: '회원가입이 성공적으로 완료되었습니다!' });
      router.push(SIGNIN);
    } catch (error) {
      openAlert({ type: ERROR, text: '회원가입에 실패했습니다!' });
      throw new Error('회원가입 실패');
    }
  };
  return (
    <div className='mt-[100px] flex flex-col items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto h-[430px] w-[350px] rounded-lg bg-gray-200 p-5'>
        <div className='flex flex-col items-center'>
          <label htmlFor='email' />
          <input {...register(EMAIL)} placeholder='email' className='mb-2 mt-7 w-[270px] rounded-md p-2' />
          {formState.errors.email ? (
            <span className='block h-[20px] text-[14px] font-semibold text-red-500'>
              {formState.errors.email.message as string}
            </span>
          ) : (
            <span className='invisible block h-[20px] text-[14px] font-semibold'></span>
          )}
          <label htmlFor='password' />
          <input
            type={PASSWORD}
            {...register(PASSWORD)}
            className='mb-2 mt-7 w-[270px] rounded-md p-2'
            placeholder='password'
          />
          {formState.errors.password ? (
            <span className='block h-[20px] text-[14px] font-semibold text-red-500'>
              {formState.errors.password.message as string}
            </span>
          ) : (
            <span className='invisible block h-[20px] text-[14px] font-semibold'></span>
          )}
          <label htmlFor='nickname' />
          <input {...register(NICKNAME)} className='mb-2 mt-7 w-[270px] rounded-md p-2' placeholder='nickname' />
          {formState.errors.nickname ? (
            <span className='block h-[20px] text-[14px] font-semibold text-red-500'>
              {formState.errors.nickname.message as string}
            </span>
          ) : (
            <span className='invisible block h-[20px] text-[14px] font-semibold'></span>
          )}
          <Button type='submit' className='mt-8 h-[50px] w-[270px] items-center font-semibold text-white'>
            회원가입
          </Button>
        </div>
      </form>
      <div className='flex pt-3'>
        <p>이미 회원이신가요?</p>
        <Link href={SIGNIN}>
          <p className='px-2 font-bold text-[#e6354f]'>로그인</p>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
