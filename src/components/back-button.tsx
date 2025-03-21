import Link from 'next/link';
import React from 'react';

const BackButton = () => {
  return (
    <>
      <Link href={'/category'}>
        <button>뒤로가기</button>
      </Link>
    </>
  );
};

export default BackButton;
