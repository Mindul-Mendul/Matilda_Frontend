// 항목이 모두 있는지 체크하는 함수
export function isRequired(value: any, customMessage?: string) {
  if (value == null || value == undefined || (value?.length ?? 0) <= 0) {
    return customMessage || '해당 항목을 반드시 입력해주세요.';
  }

  return undefined;
}

// 정규표현식 - ID에 해당하는지 체크하는 함수
export function isID(value: any, minLength = 8, maxLength = 16, customMessage?: string) {
  if (!value?.length) return undefined;

  const pattern = new RegExp(`^[a-z][a-z0-9]{${minLength - 1},${maxLength - 1}}$`);

  if (!pattern.test(value)) {
    return customMessage || `아이디를 영문, 숫자 포함하여 ${minLength} - ${maxLength}자리 사이로 입력해주세요.`;
  }

  return undefined;
}

// 정규표현식 - 비밀번호에 해당하는지 체크하는 함수
export function isPassword(value: any, minLength = 8, maxLength = 16, customMessage?: string) {
  if (!value?.length) return undefined;

  const pattern = new RegExp(`^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$~!@$!%*#^?&\\(\\)\-_=+]).{${minLength},${maxLength}}$`);

  if (!pattern.test(value)) {
    return customMessage || `비밀번호를 영문, 숫자, 특수문자를 최소 하나 포함하여 ${minLength} - ${maxLength}자리 사이로 입력해주세요.`;
  }

  return undefined;
}

// 정규표현식 - 이메일에 해당하는지 체크하는 함수
export function isEmail(value: any, customMessage?: string) {
  if (!value?.length) return undefined;

  const pattern = new RegExp(`^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$`);

  if (!pattern.test(value)) {
    return customMessage || `이메일을 올바르게 입력해 주세요.`;
  }

  return undefined;
}

// 입력값이 최소 길이 이상인지 체크하는 함수
export function notMinLength(value: any, minLength = 2, customMessage?: string) {
  if (!value?.length) return undefined;

  if (value.length < minLength) {
    return customMessage || `해당 항목을 ${minLength}글자 이상 입력해 주세요.`;
  }

  return undefined;
}

// 입력값이 최대 길이 이하인지 체크하는 함수
export function notMaxLength(value: any, maxLength = 10, customMessage?: string) {
  if (!value?.length) return undefined;

  if ((value?.length ?? 0) > maxLength) {
    return customMessage || `해당 항목을 ${maxLength}글자 이하로 입력해 주세요.`;
  }

  return undefined;
}

// 입력값이 정수인지 체크하는 함수
export function isInt(value: any, customMessage?: string) {
  if (!value?.length) return undefined;

  if (!Number.isInteger(value)) {
    return customMessage || `해당 항목을 정수로만 입력해 주세요.`;
  }

  return undefined;
}

// 입력값이 숫자인지 체크하는 함수
export function isNumber(value: any, customMessage?: string) {
  if (!value?.length) return undefined;

  if (isNaN(value)) {
    return customMessage || `해당 항목은 숫자로만 입력해 주세요.`;
  }

  return undefined;
}

// 입력값이 최소값 이상인지 체크하는 함수
export function notMin(value: any, min = 0, customMessage?: string) {
  if (!value?.length) return undefined;

  if (value < min) {
    return customMessage || `해당 항목을 ${min} 이상으로 입력해 주세요.`;
  }

  return undefined;
}

// 입력값이 최대값 이하인지 체크하는 함수
export function notMax(value: any, max = 10, customMessage?: string) {
  if (!value?.length) return undefined;

  if (value > max) {
    return customMessage || `해당 항목을 ${max} 이하로 입력해 주세요.`;
  }

  return undefined;
}
