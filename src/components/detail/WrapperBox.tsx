interface Children {
  children: React.ReactNode;
}

const WrapperBox = ({ children }: Readonly<Children>) => {
  return (
    <section className='mb-[20px] rounded-lg border border-gray-400 bg-gray-200 px-5 py-4 shadow-lg'>
      {children}
    </section>
  );
};

export default WrapperBox;
