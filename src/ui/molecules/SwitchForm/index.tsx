import { Stack, Switch, SwitchProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface Props extends SwitchProps {
  label: string;
  fontWeight?: string;
  fontSize?: string;
  name: string;
  containerWidth?: string;
  defaultChecked: boolean;
  error?: string;
}

const SwitchForm = ({
  label,
  fontWeight,
  fontSize,
  name,
  error,
  containerWidth,
  defaultChecked,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <div style={{ width: containerWidth ? containerWidth : 'fit-content' }}>
      <label style={{ fontWeight: fontWeight ? fontWeight : '700' }}>{label}</label>
      <Stack align='center' direction='row' defaultChecked={defaultChecked}>
        <Switch size='md' {...register(name)} {...rest} />
      </Stack>
      <div style={{ color: 'red', height: fontSize ? fontSize : '24px' }}>{error}</div>
    </div>
  );
};

export default SwitchForm;
