import { useState, useEffect } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { user, isLoading } = useAuth();

  // If user is already logged in, redirect to home
  if (!isLoading && user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Form Section */}
            <div className="md:w-1/2 p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 font-poppins">
                {activeTab === "login" ? "Bem-vindo(a) de volta!" : "Junte-se a nós!"}
              </h2>
              <p className="text-gray-600 mb-8">
                {activeTab === "login" 
                  ? "Acesse sua conta para continuar explorando carreiras e profissões." 
                  : "Crie sua conta no Profissão na Prática e descubra o dia a dia das carreiras."}
              </p>
              
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Cadastrar</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="register">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Hero Section */}
            <div className="md:w-1/2 bg-primary p-6 md:p-10 flex items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 font-poppins text-white">
                  Descubra a realidade das profissões
                </h3>
                <p className="text-lg mb-6 text-white">
                  Conecte-se com profissionais experientes e conheça o dia a dia de diversas carreiras antes de tomar sua decisão.
                </p>
                <ul className="space-y-4 text-white">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Vídeos exclusivos de profissionais atuantes</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Conheça os desafios reais de cada carreira</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Interaja e tire suas dúvidas diretamente</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Tome decisões mais conscientes sobre seu futuro</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
