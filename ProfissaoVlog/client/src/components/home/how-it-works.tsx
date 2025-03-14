import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50" id="como-funciona">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">Como Funciona</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Conheça como o HopWell ajuda você a descobrir a realidade das profissões com quem realmente entende.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-secondary">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold font-poppins mb-3">Explore Profissões</h3>
            <p className="text-gray-600">Navegue por diversas categorias profissionais e encontre áreas que combinam com seu perfil.</p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                <path d="m15 11 4.553-2.276A1 1 0 0 1 21 9.618v6.764a1 1 0 0 1-1.447.894L15 15"></path>
                <rect width="10" height="10" x="3" y="7" rx="2"></rect>
              </svg>
            </div>
            <h3 className="text-xl font-bold font-poppins mb-3">Assista Vlogs Exclusivos</h3>
            <p className="text-gray-600">Veja vídeos gravados por profissionais experientes mostrando a realidade do dia a dia na carreira.</p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold font-poppins mb-3">Conecte-se e Tire Dúvidas</h3>
            <p className="text-gray-600">Interaja através de comentários e tire suas dúvidas diretamente com os profissionais.</p>
          </div>
        </div>
        
        {/* User types */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Students */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full">
            <div className="bg-secondary text-white p-4">
              <h3 className="text-xl font-bold font-poppins">Para Estudantes</h3>
            </div>
            <div className="p-6 flex flex-col h-full">
              <ul className="space-y-4 flex-grow">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Descubra a realidade das profissões antes de escolher sua carreira</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Compre vídeos individuais ou assine um plano mensal</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Interaja e tire dúvidas com profissionais experientes</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Receba recomendações personalizadas baseadas em seus interesses</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/auth">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
                    Criar meu perfil de estudante
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* For Professionals */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full">
            <div className="bg-primary text-white p-4">
              <h3 className="text-xl font-bold font-poppins">Para Profissionais</h3>
            </div>
            <div className="p-6 flex flex-col h-full">
              <ul className="space-y-4 flex-grow">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monetize seu conhecimento e experiência profissional</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Crie vídeos mostrando o dia a dia real da sua profissão</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Defina o valor dos seus conteúdos e receba pagamentos</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Construa reputação e visibilidade na sua área de atuação</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/auth">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Tornar-me um profissional parceiro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
