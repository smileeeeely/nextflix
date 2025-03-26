import { ALERT_TYPE } from '@/constants/alertType';
import Swal, { SweetAlertOptions } from 'sweetalert2';

const { ERROR, SUCCESS, INFO, WARNING } = ALERT_TYPE;

interface Props {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  text: string;
  buttonText: string;
}

export const openAlert = ({ type, title = '', text = '', buttonText = '' }: Props) => {
  if (!Object.values(ALERT_TYPE).includes(type)) {
    console.error('invalid Alert Type');
    return;
  }

  const alertType = {
    [ERROR]: {
      title: title || 'Error!',
      text: text || '에러가 발생했습니다.',
      icon: 'error',
      confirmButtonText: buttonText || '확인',
      confirmButtonColor: 'rgb(236 69 69)',
    },
    [SUCCESS]: {
      title: title || 'Success!',
      text: text || '완료되었습니다.',
      icon: 'success',
      confirmButtonText: buttonText || '확인',
      confirmButtonColor: '#75d440',
    },
    [INFO]: {
      title: title || 'Info',
      text: text || '다시 확인해 주세요.',
      icon: 'info',
      confirmButtonText: buttonText || '확인',
      confirmButtonColor: '#3FC3EE',
    },
    [WARNING]: {
      title: title || 'Warning',
      text: text || '적용하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#75d440',
      cancelButtonColor: 'rgb(236 69 69)',
      confirmButtonText: buttonText || '적용',
      cancelButtonText: '취소',
      reverseButtons: true,
    },
  };

  const alert = alertType[type];
  return Swal.fire(alert as SweetAlertOptions);
};
