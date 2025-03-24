import BackButton from '@/components/back-button';

const CategoryLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <BackButton />
      {children}
    </>
  );
};

export default CategoryLayout;
