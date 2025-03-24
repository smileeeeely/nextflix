import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
}

const Poster = ({ src, alt }: Props) => {
  return (
    <section className='flex items-center justify-center'>
      <Image src={src} width={300} height={400} alt={alt} />
    </section>
  );
};

export default Poster;
