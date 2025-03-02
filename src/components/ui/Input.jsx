import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useComponentTheme } from './ThemeProvider';

const Input = forwardRef(({
  type = 'text',
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  error,
  helperText,
  size = 'md',
  rounded = 'md',
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  // Obtendo o tema do contexto
  const themes = useComponentTheme();
  const theme = themes.input || {
    base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-streama-pink focus:ring-streama-pink dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-streama-pink dark:focus:ring-streama-pink",
    sizes: {
      sm: "p-2 text-sm",
      md: "p-2.5 text-sm",
      lg: "p-4 text-base"
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full"
    }
  };

  // Construindo as classes CSS com base no tema
  const inputClasses = `
    ${theme.base}
    ${theme.sizes[size]}
    ${theme.rounded[rounded]}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500' : ''}
    ${className}
  `;

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={id} 
          className={`block mb-2 text-sm font-medium ${error ? 'text-red-700 dark:text-red-500' : 'text-gray-900 dark:text-white'}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...props}
      />
      
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string
};

export default Input; 