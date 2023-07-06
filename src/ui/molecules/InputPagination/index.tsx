import { Flex, Input, InputProps } from '@chakra-ui/react';

interface Props extends InputProps {
  placeholder: string;
  label: string;
  fontWeight?: string;
  fontSize?: string;
  name: string;
  type?: string;
  containerWidth?: string;
}

const InputPagination = ({
  placeholder,
  label,
  fontWeight,
  fontSize,
  name,
  type,
  containerWidth,
  ...rest
}: Props) => {
  return (
    <div
      style={{
        width: containerWidth ? containerWidth : 'fit-content',
        minWidth: containerWidth ? containerWidth : '10%',
      }}
    >
      <Flex alignItems='center'>
        <label style={{ fontWeight: fontWeight ? fontWeight : '100px' }}>{label}</label>
        <Input
          placeholder={placeholder}
          fontSize={fontSize ? fontSize : '18px'}
          type={type ? type : 'text'}
          name={name}
          {...rest}
          marginLeft='5px'
          padding='5px'
        />
      </Flex>
    </div>
  );
};

export default InputPagination;
