import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-primary text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold font-poppins leading-tight mb-4">
              Descubra o dia a dia das profissões com quem realmente vive
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white">
              Conectamos você a profissionais experientes que compartilham a realidade de suas carreiras através de vídeos exclusivos
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/explore">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Comece a explorar
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="secondary" className="bg-white text-secondary hover:bg-white/90">
                  Sou profissional
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold z-10">
                Novo!
              </div>
              {/* Mobile mockup with video player */}
              <div className="bg-white rounded-3xl shadow-xl p-2 border-8 border-dark">
                <div className="rounded-2xl overflow-hidden bg-black">
                  <div className="video-container bg-gray-800 relative">
                    <div className="aspect-[9/16] relative">
                      <img 
                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1350&q=80" 
                        alt="Engenheiro civil no canteiro de obras" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <div className="flex items-center mb-2">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
                            alt="Foto de perfil" 
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-white font-medium">Carlos Engenheiro</div>
                            <div className="text-gray-300 text-sm">Engenharia Civil • 8 anos exp.</div>
                          </div>
                        </div>
                        <p className="text-white text-sm">Neste vídeo mostro o dia a dia no canteiro de obras e os desafios da profissão!</p>
                      </div>
                      {/* Video controls overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-white bg-opacity-20 rounded-full p-3">
                          <i className="ri-play-fill text-3xl text-white"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
