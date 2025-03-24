import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
}

const Poster = ({ src, alt }: Props) => {
  return (
    <section className='mb-[30px] mt-[50px] flex items-center justify-center'>
      <Image src={src} width={300} height={400} alt={alt} className='shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]' />
    </section>
  );
};

export default Poster;
