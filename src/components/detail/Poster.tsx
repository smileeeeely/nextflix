import Image from 'next/image';

interface Props {
  params: {
    src: string;
    alt: string;
  };
}

const Poster = ({ params }: Props) => {
  return (
    <section>
      <Image src={params.src} fill alt={params.alt}></Image>
    </section>
  );
};

export default Poster;
