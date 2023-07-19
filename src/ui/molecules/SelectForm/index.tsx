import { Select } from '@chakra-ui/react';
import { HTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { theme } from 'ui';
import { object } from 'zod';

interface Props extends HTMLAttributes<HTMLSelectElement> {
  options: any[];
  name: string;
  label: string;
  fontWeight: string;
  fontSize?: string;
  error?: string;
  containerWidth?: string;
  objectName?: any;
}

const SelectForm = ({
  options,
  name,
  label,
  fontWeight,
  fontSize,
  error,
  containerWidth,
  objectName = null,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <div style={{ width: containerWidth ? containerWidth : 'fit-content' }}>
      <label style={{ fontWeight: fontWeight ? fontWeight : '100px' }}>{label}</label>
      <Select {...register(name)} style={{ fontSize: theme.fontSizes.xxs }} {...rest}>
        <option value='' style={{ fontSize: theme.fontSizes.xxs }}></option>
        {options.map((selectOption, index) =>
          selectOption.value ? (
            <option
              value={selectOption.value}
              key={selectOption.value + index}
              style={{ fontSize: theme.fontSizes.xxs }}
              selected={objectName && selectOption.value === objectName ? true : false}
            >
              {selectOption.value}
            </option>
          ) : (
            <option
              value={selectOption.name}
              key={selectOption.name + selectOption.id + index}
              style={{ fontSize: theme.fontSizes.xxs }}
              selected={objectName && selectOption.name === objectName ? true : false}
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

export default SelectForm;
