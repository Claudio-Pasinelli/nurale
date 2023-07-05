import { Textarea, TextareaProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface Props extends TextareaProps {
  placeholder: string;
  label: string;
  fontWeight?: string;
  fontSize?: string;
  name: string;
  containerWidth?: string;
  error?: string;
}

const TextAreaForm = ({
  placeholder,
  label,
  fontWeight,
  fontSize,
  name,
  error,
  containerWidth,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <div style={{ width: containerWidth ? containerWidth : 'fit-content' }}>
      <label style={{ fontWeight: fontWeight ? fontWeight : '100px' }}>{label}</label>
      <Textarea
        placeholder={placeholder}
        size='xs'
        resize='vertical'
        rows={1}
        {...register(name)}
        {...rest}
      />
      <div style={{ color: 'red', height: fontSize ? fontSize : '24px' }}>{error}</div>
    </div>
  );
};

export default TextAreaForm;
