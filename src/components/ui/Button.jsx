import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useComponentTheme } from './ThemeProvider';

const Button = ({
  children,
  color = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  iconLeft,
  iconRight
}) => {
  // Obtendo o tema do contexto
  const themes = useComponentTheme();
  const theme = themes.button || {
    base: "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none",
    color: {
      primary: "text-white bg-streama-pink hover:bg-streama-pink-dark focus:ring-streama-pink-light",
      secondary: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
      success: "text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
      danger: "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    },
    size: {
      xs: "px-3 py-2 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-5 py-3 text-base",
      xl: "px-6 py-3.5 text-base"
    },
    icon: {
      base: "inline-flex items-center",
      left: "mr-2",
      right: "ml-2"
    }
  };

  // Construindo as classes CSS com base no tema
  const buttonClasses = `
    ${theme.base}
    ${theme.color[color]}
    ${theme.size[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  // Renderizando o conteúdo do botão com ícones, se houver
  const renderContent = () => (
    <>
      {iconLeft && (
        <span className={theme.icon.left}>
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span className={theme.icon.right}>
          {iconRight}
        </span>
      )}
    </>
  );

  // Se tiver href, renderiza como Link
  if (href) {
    return (
      <Link
        to={href}
        className={buttonClasses}
        onClick={onClick}
      >
        {renderContent()}
      </Link>
    );
  }

  // Caso contrário, renderiza como botão
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  href: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node
};

export default Button; 