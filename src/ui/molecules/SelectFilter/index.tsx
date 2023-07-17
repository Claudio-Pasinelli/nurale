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
  value?: string | number | null;
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
      <Select style={{ fontSize: theme.fontSizes.xxs }} {...rest}>
        <option value='' style={{ fontSize: theme.fontSizes.xxs }}></option>
        {options.map((selectOption) =>
          selectOption.value ? (
            <option
              value={selectOption.value}
              key={selectOption.value}
              style={{ fontSize: theme.fontSizes.xxs }}
            >
              {selectOption.value}
            </option>
          ) : (
            <option
              value={selectOption.name}
              key={selectOption.name + selectOption.id}
              style={{ fontSize: theme.fontSizes.xxs }}
            >
              {selectOption.name}
            </option>
          ),
        )}
      </Select>
      <div style={{ color: 'red', height: fontSize ? fontSize : '24px' }}>{error}</div>
    </div>
  );
};

export default SelectFilter;
