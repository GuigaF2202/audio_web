import CTACard from './CTACard';

const CTASection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <CTACard 
            title="Experimente a Streama gratuitamente por 7 dias"
            description="Teste todos os recursos da nossa plataforma sem compromisso. Não é necessário cartão de crédito para o período de teste."
            buttonText="Começar teste grátis"
            secondaryButtonText="Ver demonstração"
            secondaryButtonLink="/demo"
            imageSrc="/assets/android-chrome-192x192.png"
          />
          
          <CTACard 
            title="Precisa de uma solução personalizada?"
            description="Nossa equipe de especialistas está pronta para criar uma solução sob medida para as necessidades específicas da sua rádio ou podcast."
            buttonText="Falar com consultor"
            buttonLink="/contato"
            bgColor="bg-gradient-to-r from-streama-pink to-violet-purple"
          />
          
          <CTACard 
            title="Baixe nosso aplicativo"
            description="Gerencie sua rádio de qualquer lugar com nosso aplicativo móvel. Disponível para iOS e Android."
            buttonText="App Store"
            buttonLink="/ios-app"
            secondaryButtonText="Google Play"
            secondaryButtonLink="/android-app"
            imageSrc="/assets/person-headphones.svg"
            bgColor="bg-gradient-to-br from-streama-pink-dark to-streama-pink"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection; 