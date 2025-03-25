import SkeletoneCard from '@/components/home/SkeletoneCard';

const SkeletoneList = () => {
  return (
    <section className='mt-8 w-full p-8'>
      <ul className='flex justify-start gap-7 overflow-x-auto'>
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i}>
            <SkeletoneCard />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkeletoneList;
