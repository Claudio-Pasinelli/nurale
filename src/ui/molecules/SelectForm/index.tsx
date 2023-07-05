import { Select } from '@chakra-ui/react';
import { HTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { theme } from '../../themes';

interface Props extends HTMLAttributes<HTMLSelectElement> {
  options: any[];
  name: string;
  label: string;
  fontWeight: string;
  fontSize?: string;
  error?: string;
  containerWidth?: string;
}

const SelectForm = ({
  options,
  name,
  label,
  fontWeight,
  fontSize,
  error,
  containerWidth,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <div style={{ width: containerWidth ? containerWidth : 'fit-content' }}>
      <label style={{ fontWeight: fontWeight ? fontWeight : '100px' }}>{label}</label>
      <Select {...register(name)} style={{ fontSize: theme.fontSizes.xxs }} {...rest}>
        {options.map((selectOption) => (
          <option
            value={selectOption.value}
            key={selectOption.value}
            style={{ fontSize: theme.fontSizes.xxs }}
          >
            {selectOption.value}
          </option>
        ))}
      </Select>
      <div style={{ color: 'red', height: fontSize ? fontSize : '24px' }}>{error}</div>
    </div>
  );
};

export default SelectForm;
