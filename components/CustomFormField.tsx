/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/core';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
// import { getMonth, getYear } from 'date-fns';

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  todayButton?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    todayButton,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className={'shad-input border-0'}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='US'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className={'input-phone'}
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      const currentDate = new Date();
      // Extract year, month, and day
      // const year = currentDate.getFullYear();
      // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
      // const day = currentDate.getDate().toString().padStart(2, '0');
      // Format the date as 'YYYY/MM/DD'
      // const formattedDate = `${year}/${month}/${day}`;
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <Image
            src='/assets/icons/calendar.svg'
            height={24}
            width={24}
            alt='user'
            className='ml-2'
          />
          <FormControl>
            <DatePicker
              showTimeSelect={showTimeSelect ?? false}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              timeInputLabel='Time:'
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              className={'date-picker'}
              maxDate={currentDate}
              withPortal
              openToDate={currentDate}
              placeholderText='mm/dd/yyyy'
              todayButton={todayButton ?? false}
              closeOnScroll={true}
              dateFormatCalendar='MMMM'
              yearDropdownItemNumber={15}
              scrollableYearDropdown
              showYearDropdown
              dropdownMode='select'
            />
          </FormControl>
        </div>
      );
    default:
      break;
  }
};
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField
            field={field}
            props={props}
          />
          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
