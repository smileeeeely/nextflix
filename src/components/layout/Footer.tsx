import Image from 'next/image';
import logo from '@images/images/logo.png';

const Footer = () => {
  return (
    <footer className='mt-10 bg-gray-800 text-center'>
      <section className='mx-auto max-w-[1200px] p-6'>
        <div className='mb-2 flex items-center justify-center'>
          <Image src={logo} alt='logo' width={40} height={40} />
          <h3 className='text-xl font-bold text-gray-600'>NEXTFLIX</h3>
        </div>
        <p className='text-sm text-gray-600'>자사의 약관 및 개인정보처리방침의 적용을 받습니다.</p>
        <p className='text-sm text-gray-600'>
          본 홈페이지는 TMDB와 무관합니다. | 서울특별시 강남구 테헤란로44길 8 12층
        </p>
        <p className='text-sm text-gray-600'>© 2025 NextFlix. All Rights Reserved</p>
      </section>
    </footer>
  );
};

export default Footer;
