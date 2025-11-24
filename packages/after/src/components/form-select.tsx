import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  className,
  required,
}: FormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            <NativeSelect
              {...field}
              className={className}
              aria-invalid={fieldState.invalid}
            >
              {placeholder && (
                <NativeSelectOption value="" disabled>
                  {placeholder}
                </NativeSelectOption>
              )}
              {options.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
