import React from 'react';

interface Props {
  link: string;
  label: string;
}

const LinkBtn = ({ link, label }: Props) => {
  return (
    <section className='my-[20px]'>
      <button onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}>{label}</button>
    </section>
  );
};

export default LinkBtn;
