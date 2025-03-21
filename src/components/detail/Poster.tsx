import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
}

const Poster = ({ src, alt }: Props) => {
  return (
    <section>
      <Image src={src} fill alt={alt} />
    </section>
  );
};

export default Poster;
