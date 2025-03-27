'use client';
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
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-lg'>
        <h1 className='mb-6 text-3xl'>회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4 rounded-2xl'>
          <div className='flex flex-col gap-2'>
            <label>이메일</label>
            <input {...register(EMAIL)} className='bg-orange-100 text-black' placeholder='이메일을 입력해주세요' />
            {formState.errors.email && <span>{formState.errors.email.message}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <label>비밀번호</label>
            <input
              type={PASSWORD}
              {...register(PASSWORD)}
              className='bg-orange-100 text-black'
              placeholder='비밀번호를 입력해주세요'
            />
            {formState.errors.password && <span>{formState.errors.password.message}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <label>닉네임</label>
            <input {...register(NICKNAME)} className='bg-orange-100 text-black' placeholder='닉네임을 입력해주세요' />
            {formState.errors.nickname && <span>{formState.errors.nickname.message}</span>}
          </div>
          <button disabled={!formState.isValid} type='submit'>
            회원가입
          </button>
        </form>
        <Link href={SIGNIN}>이미 회원이신가요?</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
