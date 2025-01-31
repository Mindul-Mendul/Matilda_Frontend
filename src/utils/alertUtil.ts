import Swal from 'sweetalert2';
import item_img1 from '../assets/images/Marketplace/item_img.png';

// 성공 알림
export const alertSuccess = (title: string, text: string) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text
  });
};

// 경고 알림
export const alertWarning = (title: string, text: string) => {
  return Swal.fire({
    icon: 'warning',
    title: title,
    text: text
  });
};

// 에러 알림
export const alertError = (title: string, text: string) => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: text
  });
};

// 정보제공 알림
export const alertInfo = (title: string, text: any) => {
  return Swal.fire({
    icon: 'info',
    title: title,
    text: text
  });
};

// 경고 모달
export const alertModal = async (title: string, text: string, url: string, alt?: string, width?: number) => {
  return Swal.fire({
    title: title,
    text: text,
    imageUrl: url.length > 0 && url != 'no img' ? url : item_img1,
    imageAlt: alt ? alt : 'Modal Image',
    imageWidth: width ? width : 500,
    imageHeight: width ? width : 500,
    width: width ? width + 60 : 560
  });
};

// 성공 확인 질문
export const confirmSuccess = async (title: string, text: string, confirmText: string, denyText: string) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33'
  });
};

// 경고 확인 질문
export const confirmWarning = async (title: string, text: string, confirmText: string, denyText: string) => {
  return Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33'
  });
};

// 선택 질문
export const confirmQuestion = async (title: string, text: string, confirmText: string, denyText: string) => {
  return Swal.fire({
    icon: 'question',
    title: title,
    text: text,
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33'
  });
};

// 질문이 있는 모달
export const confirmModal = async (
  title: string,
  text: string,
  confirmText: string,
  denyText: string,
  url: string,
  alt?: string,
  width?: number
) => {
  return Swal.fire({
    title: title,
    text: text,
    imageUrl: url.length > 0 && url != 'no img' ? url : item_img1,
    imageWidth: width ? width : 500,
    imageHeight: width ? width : 500,
    width: width ? width + 60 : 560,
    imageAlt: alt ? alt : 'Modal Image',
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33'
  });
};

// 값을 받을 수 있는 알림
export const alertInput = async (title: string, text: string, placeholder: string) => {
  const { value: newValue } = await Swal.fire({
    title: title,
    input: 'text',
    inputLabel: text,
    inputPlaceholder: placeholder,
    showCloseButton: true,
    showDenyButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!';
      }
      return '';
    }
  });

  return newValue;
};

//값을 받을 수 있는 모달
export const confirmInputModal = async (
  title: string,
  text: string,
  confirmText: string,
  denyText: string,
  placeholder: string,
  url: string,
  alt?: string
) => {
  return await Swal.fire({
    title: title,
    imageUrl: url.length > 0 && url != 'no img' ? url : item_img1,
    imageAlt: alt ? alt : 'Modal Image',
    input: 'text',
    inputLabel: text,
    inputPlaceholder: placeholder,
    allowOutsideClick: false,
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#81c147',
    denyButtonText: denyText,
    denyButtonColor: '#d33',
    inputValidator: (value) => {
      if (!value) {
        return '빈칸을 채워주세요!';
      } else if (isNaN(Number(value))) {
        return '숫자로 입력해주세요!';
      }
      return '';
    }
  });
};

// 로딩 알림
export const alertLoading = async (title: string) => {
  return Swal.fire({
    title: title,
    allowOutsideClick: false,
    showCloseButton: true,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// 진행되는 거 보여주는 알림
export const alertProgress = async (title: string, progress: any) => {
  let timerInterval;
  return Swal.fire({
    title: title,
    html: `진행률 : <b></b>%`,
    timer: 500,
    allowOutsideClick: false,
    showCloseButton: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer()?.querySelector('b') as HTMLElement;
      let progressPoint = (progress.value / progress.total) * 100;
      timerInterval = setInterval(() => {
        if (progress.error) clearInterval(timerInterval);
        progressPoint = (progress.value / progress.total) * 100;
        b.textContent = progressPoint.toString();
        if (progressPoint < 100) Swal.increaseTimer(100);
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  });
};
