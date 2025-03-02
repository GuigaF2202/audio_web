import { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import { FiArrowRight, FiCheck, FiX, FiMail, FiLock, FiUser } from 'react-icons/fi';

const CardSection = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Exemplos de Cards</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Básico */}
        <Card
          imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
          imgAlt="Imagem do card 1"
        >
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Card Básico com Imagem
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Este é um exemplo de card básico com imagem e texto.
          </p>
          <Button 
            color="primary"
            iconRight={<FiArrowRight />}
          >
            Saiba mais
          </Button>
        </Card>

        {/* Card com Link */}
        <Card
          imgSrc="https://flowbite.com/docs/images/blog/image-2.jpg"
          imgAlt="Imagem do card 2"
          href="/exemplo"
        >
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Card com Link
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Este card inteiro é clicável e leva para outra página.
          </p>
        </Card>

        {/* Card sem Imagem */}
        <Card>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Card sem Imagem
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Este é um exemplo de card sem imagem, apenas com conteúdo textual.
          </p>
          <div className="flex justify-between">
            <Button 
              color="success"
              iconLeft={<FiCheck />}
            >
              Aceitar
            </Button>
            <Button 
              color="danger"
              iconLeft={<FiX />}
            >
              Recusar
            </Button>
          </div>
        </Card>
      </div>

      {/* Card Horizontal */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Card Horizontal</h2>
        <Card
          horizontal={true}
          imgSrc="https://flowbite.com/docs/images/blog/image-4.jpg"
          imgAlt="Imagem do card horizontal"
        >
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Card com Layout Horizontal
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Este card utiliza um layout horizontal em telas médias e grandes, com a imagem à esquerda e o conteúdo à direita.
          </p>
          <Button 
            color="primary"
            size="lg"
            iconRight={<FiArrowRight />}
          >
            Ver detalhes
          </Button>
        </Card>
      </div>

      {/* Card com Formulário */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Card com Formulário</h2>
        <div className="max-w-md mx-auto">
          <Card>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Formulário de Cadastro
            </h5>
            <form>
              <Input
                id="name"
                name="name"
                label="Nome"
                placeholder="Digite seu nome"
                value={formValues.name}
                onChange={handleInputChange}
                required
                helperText="Seu nome completo"
              />
              <Input
                type="email"
                id="email"
                name="email"
                label="Email"
                placeholder="nome@exemplo.com"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
              <Input
                type="password"
                id="password"
                name="password"
                label="Senha"
                placeholder="••••••••"
                value={formValues.password}
                onChange={handleInputChange}
                required
                error={formValues.password && formValues.password.length < 6 ? "A senha deve ter pelo menos 6 caracteres" : ""}
              />
              <Button 
                type="submit"
                color="primary"
                className="w-full mt-2"
              >
                Cadastrar
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Exemplos de Botões */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Exemplos de Botões</h2>
        <div className="flex flex-wrap gap-4">
          <Button color="primary">Primário</Button>
          <Button color="secondary">Secundário</Button>
          <Button color="success">Sucesso</Button>
          <Button color="danger">Perigo</Button>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Tamanhos</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button color="primary" size="xs">Extra Pequeno</Button>
            <Button color="primary" size="sm">Pequeno</Button>
            <Button color="primary" size="md">Médio</Button>
            <Button color="primary" size="lg">Grande</Button>
            <Button color="primary" size="xl">Extra Grande</Button>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Com Ícones</h3>
          <div className="flex flex-wrap gap-4">
            <Button color="primary" iconLeft={<FiCheck />}>Com Ícone à Esquerda</Button>
            <Button color="secondary" iconRight={<FiArrowRight />}>Com Ícone à Direita</Button>
            <Button color="success" iconLeft={<FiCheck />} iconRight={<FiArrowRight />}>Com Ambos os Ícones</Button>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Estados</h3>
          <div className="flex flex-wrap gap-4">
            <Button color="primary">Normal</Button>
            <Button color="primary" disabled>Desabilitado</Button>
            <Button color="primary" href="/exemplo">Como Link</Button>
          </div>
        </div>
      </div>

      {/* Exemplos de Inputs */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Exemplos de Inputs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Tamanhos</h3>
            <Input
              label="Input Pequeno"
              placeholder="Tamanho pequeno"
              size="sm"
            />
            <Input
              label="Input Médio"
              placeholder="Tamanho médio"
              size="md"
            />
            <Input
              label="Input Grande"
              placeholder="Tamanho grande"
              size="lg"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Arredondamento</h3>
            <Input
              label="Sem arredondamento"
              placeholder="Sem arredondamento"
              rounded="none"
            />
            <Input
              label="Arredondamento pequeno"
              placeholder="Arredondamento pequeno"
              rounded="sm"
            />
            <Input
              label="Arredondamento completo"
              placeholder="Arredondamento completo"
              rounded="full"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Estados</h3>
            <Input
              label="Input com erro"
              placeholder="Input com erro"
              error="Este campo contém um erro"
            />
            <Input
              label="Input com texto de ajuda"
              placeholder="Input com texto de ajuda"
              helperText="Este é um texto de ajuda para o campo"
            />
            <Input
              label="Input desabilitado"
              placeholder="Input desabilitado"
              disabled
            />
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Tipos de Input</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              type="text"
              label="Texto"
              placeholder="Digite um texto"
            />
            <Input
              type="email"
              label="Email"
              placeholder="nome@exemplo.com"
            />
            <Input
              type="password"
              label="Senha"
              placeholder="••••••••"
            />
            <Input
              type="number"
              label="Número"
              placeholder="Digite um número"
            />
            <Input
              type="date"
              label="Data"
            />
            <Input
              type="time"
              label="Hora"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection; 