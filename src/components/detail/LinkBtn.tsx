import { Button } from '@/components/ui/button';

interface Props {
  link: string;
  label: string;
}

const LinkBtn = ({ link, label }: Props) => {
  return (
    <section className='my-[20px]'>
      <Button className='hover:bg-[#e6354f]' onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}>
        {label}
      </Button>
    </section>
  );
};

export default LinkBtn;
