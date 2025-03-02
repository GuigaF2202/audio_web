import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useComponentTheme } from './ThemeProvider';

const Card = ({
  horizontal = false,
  href,
  imgSrc,
  imgAlt = 'Imagem do card',
  children,
  className = ''
}) => {
  // Obtendo o tema do contexto
  const themes = useComponentTheme();
  const theme = themes.card || {
    root: {
      base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
      children: "flex h-full flex-col justify-center gap-4 p-6",
      horizontal: {
        off: "flex-col",
        on: "flex-col md:max-w-xl md:flex-row"
      },
      href: "hover:bg-gray-100 dark:hover:bg-gray-700"
    },
    img: {
      base: "",
      horizontal: {
        off: "rounded-t-lg",
        on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
      }
    }
  };

  // Construindo as classes CSS com base no tema
  const rootClasses = `${theme.root.base} ${theme.root.horizontal[horizontal ? 'on' : 'off']} ${href ? theme.root.href : ''} ${className}`;
  const imgClasses = `${theme.img.base} ${theme.img.horizontal[horizontal ? 'on' : 'off']}`;

  // Componente Card com ou sem link
  const CardComponent = () => (
    <div className={rootClasses}>
      {imgSrc && (
        <img 
          className={imgClasses} 
          src={imgSrc} 
          alt={imgAlt} 
        />
      )}
      <div className={theme.root.children}>
        {children}
      </div>
    </div>
  );

  // Se tiver href, envolve com Link
  if (href) {
    return (
      <Link to={href}>
        <CardComponent />
      </Link>
    );
  }

  // Caso contrário, retorna o componente diretamente
  return <CardComponent />;
};

Card.propTypes = {
  horizontal: PropTypes.bool,
  href: PropTypes.string,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Card; 