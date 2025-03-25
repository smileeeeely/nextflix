import React from 'react';

interface Props {
  link: string;
}

const LinkBtn = ({ link }: Props) => {
  return (
    <section className='my-[20px] flex items-center justify-center'>
      <button onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}>예고편 보러가기</button>
    </section>
  );
};

export default LinkBtn;
