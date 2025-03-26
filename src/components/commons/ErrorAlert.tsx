import { ALERT_TYPE } from '@/constants/alertType';
import { openAlert } from '@/lib/openAlert';
import { useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';
import { boolean, string } from 'zod';

const { ERROR } = ALERT_TYPE;

interface Props {
  isOpenErrorAlert?: boolean;
  errorMessage?: string;
}

const ErrorAlert = ({ isOpenErrorAlert = false, errorMessage = '에러가 발생했습니다.' }: Props) => {
  useEffect(() => {
    if (isOpenErrorAlert) {
      openAlert({
        type: ERROR,
        text: errorMessage,
      });
    }
  }, [isOpenErrorAlert, errorMessage]);
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <TriangleAlert className='text-accent-active text-9xl' />
      {errorMessage}
    </div>
  );
};

export default ErrorAlert;
