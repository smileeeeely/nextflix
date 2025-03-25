import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex h-20 items-center justify-center">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;