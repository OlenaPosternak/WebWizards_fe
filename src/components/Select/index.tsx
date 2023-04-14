import { Control, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { TextField, Autocomplete } from '@mui/material';
import { InputContainer } from '@components/Input/styles';
import { ISignUp, Option } from '@components/Auth/type';
import { SignUpFields } from '@types';

export type Props = {
  options: Option[];
} & TextFieldProps;

export function SelectInput({
  control,
  name,
  label,
  error,
  placeholder,
  options,
}: Props & { control: Control<ISignUp> }) {
  return (
    <InputContainer hasError={!!error}>
      <span>{label}</span>
      <Controller
        control={control}
        name={name as SignUpFields}
        render={({ field: { ref, onChange, ...field } }) => (
          <Autocomplete
            options={options}
            onChange={(_, data) => onChange(data?.value)}
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                fullWidth
                inputRef={ref}
                placeholder={placeholder}
              />
            )}
          />
        )}
      />
    </InputContainer>
  );
}

export default SelectInput;