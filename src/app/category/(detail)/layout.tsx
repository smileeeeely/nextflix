const CategoryLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className='mt-[45px]'>{children}</div>;
};

export default CategoryLayout;
