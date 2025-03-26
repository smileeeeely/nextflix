interface Children {
  children: React.ReactNode;
}

const WrapperBox = ({ children }: Readonly<Children>) => {
  return (
    <section className='mx-[40px] mb-[20px] rounded-lg border-[4px] border-gray-400 bg-gray-200 px-[20px] py-[10px] shadow-lg'>
      {children}
    </section>
  );
};

export default WrapperBox;
