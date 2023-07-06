import { Select } from '@chakra-ui/react';
import { HTMLAttributes } from 'react';
import { theme } from 'ui';

interface Props extends HTMLAttributes<HTMLSelectElement> {
  options: any[];
  name: string;
  label: string;
  fontWeight: string;
  fontSize?: string;
  error?: string;
  value?: string | number;
}

const SelectFilter = ({
  options,
  name,
  label,
  fontWeight,
  fontSize,
  error,
  value,
  ...rest
}: Props) => {
  return (
    <div>
      <label style={{ fontWeight: fontWeight ? fontWeight : '100px' }}>{label}</label>
      <Select name={name} style={{ fontSize: theme.fontSizes.xxs }} value={value} {...rest}>
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

export default SelectFilter;
