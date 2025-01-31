import { ChangeEventHandler } from 'react';

interface ImageBoxProps {
  id: string;
  label: string;
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  value: any;
  error?: string;
}

//사진 입력할 수 있는 박스
//제대로 입력받는지 확인 안 한 코드
export default function ImageBox(props: ImageBoxProps) {
  const { id, name, label, placeholder, disabled, readonly, handleChange, value } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div>
        <input
          accept={'image/*'}
          type={'file'}
          className={['col-10', boxClass, 'form-control', `border-dark input`].join(' ')}
          name={name}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          onChange={handleChange}
          value={value || ''}
        />
      </div>
    </div>
  );
}
