import { ChangeEventHandler } from 'react';

interface TextBoxProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  helpText?: string;
  disabled: boolean;
  readonly: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  value: any;
}

export default function TextBox(props: TextBoxProps) {
  const { id, label, type, placeholder, helpText, disabled, readonly, handleChange, value } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type || 'text'}
        className={[boxClass, 'border-dark'].join(' ')}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        onChange={handleChange}
        value={value}
      />
      <div className="invalid-feedback">{helpText}</div>
    </div>
  );
}
