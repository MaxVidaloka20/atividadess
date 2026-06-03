"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Star, 
  BookOpen, 
  Check, 
  Lock,
  MessageCircle,
  Menu,
  Crown
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { UrgencyNotification } from '@/components/sales/UrgencyNotification';
import { TestimonialCarousel } from '@/components/sales/TestimonialCarousel';
import { ProblemCarousel } from '@/components/sales/ProblemCarousel';
import { TransformationCarousel } from '@/components/sales/TransformationCarousel';

export default function Home() {
  const [showUpsell, setShowUpsell] = useState(false);
  const demoImages = PlaceHolderImages.filter(img => img.id.startsWith('demo-'));
  
  // URLs de Checkout
  const BASIC_CHECKOUT_URL = "https://ggcheckout.app/checkout/v4/6tSMtqFrQ18DyjWKEH33";
  const PREMIUM_CHECKOUT_URL = "https://ggcheckout.app/checkout/v4/6tSMtqFrQ18DyjWKEH33";
  const UPSELL_PREMIUM_URL = "https://ggcheckout.app/checkout/v4/6tSMtqFrQ18DyjWKEH33";
  const UPSELL_BASIC_URL = "https://ggcheckout.app/checkout/v4/0LfImHHDmn7UCZw9NGAY";
  const PREMIUM_DIRECT_URL = "https://ggcheckout.app/checkout/v4/6tSMtqFrQ18DyjWKEH33";

  const handleBasicPurchase = () => {
    setShowUpsell(true);
  };

  const handleFinalPurchase = (plan: 'basic' | 'premium' | 'upsell-premium' | 'upsell-basic') => {
    let url = "";
    if (plan === 'premium') url = PREMIUM_DIRECT_URL;
    else if (plan === 'upsell-premium') url = UPSELL_PREMIUM_URL;
    else if (plan === 'upsell-basic') url = UPSELL_BASIC_URL;
    else url = BASIC_CHECKOUT_URL;
    
    window.location.href = url;
    setShowUpsell(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7F3] selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Upsell Dialog */}
      <AlertDialog open={showUpsell} onOpenChange={setShowUpsell}>
        <AlertDialogContent className="max-w-[92vw] sm:max-w-lg border-2 border-emerald-500 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
          <AlertDialogHeader className="space-y-4">
            <div className="mx-auto">
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 px-4 py-1 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4">
                OFERTA ÚNICA E EXCLUSIVA
              </Badge>
            </div>
            <AlertDialogTitle className="text-2xl md:text-3xl font-headline font-black text-center text-emerald-900 uppercase leading-tight">
              ESPERE! VOCÊ ESTÁ LEVANDO <span className="text-emerald-600">APENAS METADE...</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-emerald-700 text-sm md:text-lg leading-relaxed max-w-sm mx-auto">
              Por apenas <span className="font-black text-emerald-900 underline decoration-emerald-400 decoration-4">R$ 5,00 a mais</span>, você garante o acesso Vitalício ao <span className="font-bold">PACOTE PREMIUM COMPLETO</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-emerald-50/80 rounded-3xl p-6 md:p-8 space-y-4 my-6 border border-emerald-100">
            <p className="text-[10px] md:text-xs font-black text-emerald-800 uppercase tracking-widest text-center mb-4">O que você adiciona agora:</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                "+300 Atividades Bíblicas EXTRAS",
                "Kit Completo de Datas Comemorativas",
                "Certificados Personalizáveis",
                "100 Novas Histórias Ilustradas",
                "Plano de Aula Anual (52 Semanas)"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-emerald-500 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-emerald-900 font-bold text-sm md:text-base">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <AlertDialogFooter className="flex flex-col gap-4 sm:flex-col items-center">
            <AlertDialogAction 
              onClick={() => handleFinalPurchase('upsell-premium')}
              className="bg-[#7E8A0E] hover:bg-[#6A750C] text-white font-black w-full py-8 rounded-2xl text-lg uppercase shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5 fill-white" />
              SIM! QUERO O PACOTE COMPLETO
            </AlertDialogAction>
            <AlertDialogCancel 
              onClick={() => handleFinalPurchase('upsell-basic')}
              className="text-emerald-400 hover:text-emerald-600 hover:bg-transparent w-full py-2 rounded-xl text-xs border-0 font-bold uppercase tracking-widest transition-colors"
            >
              Não, quero apenas o material básico
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header Sticky Bar */}
      <header className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-emerald-100 py-2 md:py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-emerald-600 text-white p-1 rounded">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="font-headline font-bold text-base md:text-xl text-emerald-900 tracking-tight whitespace-nowrap">Escola Bíblica Pronta</span>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" onClick={() => scrollToSection('beneficios')} className="text-emerald-700 hover:text-emerald-900 font-bold">Benefícios</Button>
            <Button variant="ghost" onClick={() => scrollToSection('inclui')} className="text-emerald-700 hover:text-emerald-900 font-bold">O que Inclui</Button>
            <Button variant="ghost" onClick={() => scrollToSection('depoimentos')} className="text-emerald-700 hover:text-emerald-900 font-bold">Depoimentos</Button>
            <Button onClick={() => scrollToSection('precos')} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm font-bold uppercase tracking-tight">
              COMPRAR AGORA
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-emerald-700">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-6 md:pb-10 px-4 md:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-3 md:space-y-5 flex flex-col items-center">
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 px-4 py-1 text-[10px] md:text-sm font-bold mb-1 uppercase tracking-wider">
              🔥 Oferta de Lançamento
            </Badge>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-headline font-bold text-emerald-900 leading-tight md:leading-[1.1] uppercase px-2 max-w-5xl">
              PARE DE PERDER HORAS PREPARANDO AULAS INFANTIS
            </h1>
            <p className="text-sm md:text-xl text-emerald-700 leading-relaxed max-w-2xl mx-auto px-4">
              Receba +450 atividades bíblicas prontas para imprimir e aplicar, mesmo que você tenha pouco tempo para planejar.
            </p>
            
            <div className="pt-2 md:pt-4 space-y-4 md:space-y-6 w-full flex flex-col items-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('precos')}
                className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 text-lg md:text-2xl bg-[#7E8A0E] hover:bg-[#6A750C] text-white shadow-xl transition-all transform hover:scale-105 animate-bounce-slow font-bold uppercase rounded-2xl"
              >
                QUERO MEU ACESSO AGORA
                <ArrowRight className="ml-2 w-5 h-5 md:w-7 md:h-7" />
              </Button>

              <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-2">
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-emerald-600 font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 md:w-4 h-4" /> Compra Segura
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-emerald-600 font-bold uppercase tracking-widest">
                  <Zap className="w-3.5 h-3.5 md:w-4 h-4" /> Download Imediato
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-emerald-600 font-bold uppercase tracking-widest">
                  <Lock className="w-3.5 h-3.5 md:w-4 h-4" /> Pagamento Protegido
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-6 md:py-10 bg-white px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-4xl font-headline font-bold text-emerald-900 mb-2 md:mb-3 uppercase px-4">
            Você também passa por isso?
          </h2>
          <p className="text-xs md:text-lg text-emerald-700 max-w-2xl mx-auto px-6">
            Sabemos que o ministério infantil é um chamado lindo, mas a rotina pode ser exaustiva sem as ferramentas certas.
          </p>
        </div>
        <ProblemCarousel />
      </section>

      {/* Transformation Section */}
      <section id="beneficios" className="py-6 md:py-10 px-4 md:px-6 bg-[#F0F7F3]">
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-4xl font-headline font-bold text-emerald-900 mb-2 md:mb-3 uppercase px-4">
            Imagine suas próximas aulas assim
          </h2>
          <p className="text-xs md:text-lg text-emerald-700 italic max-w-2xl mx-auto px-6">
            "A alegria de ensinar sem o peso da preparação cansativa."
          </p>
        </div>
        <TransformationCarousel />
      </section>

      {/* Product Demonstration */}
      <section id="inclui" className="py-6 md:py-10 bg-white px-4 md:px-6 border-b border-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-xl md:text-4xl font-headline font-bold text-emerald-900 mb-2 md:mb-3 uppercase px-4">
              Veja exatamente o que você recebe
            </h2>
            <p className="text-xs md:text-lg text-emerald-700 max-w-2xl mx-auto px-6">
              Material profissional com design lúdico, desenvolvido por especialistas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {demoImages.map((img, i) => (
              <div key={i} className="group relative rounded-3xl overflow-hidden shadow-lg border border-emerald-100 aspect-[3/4]">
                <Image
                  src={img.imageUrl}
                  alt={img.description}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint={img.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-medium">{img.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto bg-[#F0F7F3] rounded-3xl p-6 md:p-10 border border-emerald-100 shadow-inner">
            <h3 className="text-lg md:text-2xl font-headline font-bold text-emerald-900 mb-6 md:mb-10 text-center uppercase">
              Um Acervo Completo para Seu Ministério
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {[
                "+450 atividades exclusivas",
                "Histórias bíblicas ilustradas",
                "Exercícios educativos p/ idades",
                "Impressão ilimitada",
                "Recursos visuais sala de aula",
                "Organizado por temas",
                "Versículos p/ memorização",
                "Dinâmicas de grupo",
                "Avaliações de aprendizado"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-emerald-800 bg-white/50 p-3 rounded-xl border border-white/80">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0" />
                  <span className="font-bold text-xs md:text-base leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offer Stack / Pricing */}
      <section id="precos" className="py-8 md:py-12 bg-emerald-50 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-4xl font-headline font-bold text-emerald-900 mb-2 md:mb-3 uppercase px-4">
              Escolha o melhor plano para você
            </h2>
            <p className="text-xs md:text-lg text-emerald-700 max-w-2xl mx-auto">
              Acesso imediato e vitalício. Sem mensalidades.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-stretch max-w-5xl mx-auto px-2">
            {/* Card 1 - Plano Básico */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-emerald-600 flex flex-col h-full transition-transform hover:scale-[1.02]">
              <div className="bg-emerald-50 py-6 px-6 text-center border-b border-emerald-100">
                <p className="uppercase tracking-widest text-[10px] font-bold text-emerald-600 mb-1">Acesso Essencial</p>
                <h3 className="text-xl md:text-2xl font-headline font-bold text-emerald-900">Plano Básico</h3>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="space-y-4 flex-grow mb-8">
                  {[
                    "Acesso Completo Escola Bíblica",
                    "+450 atividades prontas",
                    "Histórias Bíblicas Ilustradas",
                    "Exercícios e Dinâmicas",
                    "Bônus: 30 Dinâmicas Bíblicas",
                    "Bônus: 50 Versículos Ilustrados"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-emerald-900 font-bold text-sm md:text-base leading-tight">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-emerald-50 text-center mt-auto">
                  <p className="text-emerald-300 line-through mb-1 text-xs md:text-sm">De R$ 99,90</p>
                  <div className="flex flex-col items-center mb-6">
                    <span className="text-[10px] font-black text-emerald-600 uppercase mb-1 tracking-widest">Apenas hoje</span>
                    <span className="text-4xl md:text-5xl font-headline font-bold text-emerald-900 tracking-tighter">
                      R$ 9,90
                    </span>
                  </div>
                  
                  <Button 
                    onClick={handleBasicPurchase}
                    className="w-full h-14 md:h-16 text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all font-bold uppercase rounded-2xl"
                  >
                    COMPRAR AGORA
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2 - Plano Premium */}
            <div className="relative flex flex-col h-full group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] z-20 pointer-events-none transform transition-transform duration-300 group-hover:scale-110">
                <div className="bg-emerald-900 text-white border-2 border-white px-5 py-2.5 rounded-full shadow-xl font-black flex items-center gap-2 whitespace-nowrap text-[10px] md:text-xs tracking-widest">
                  <Crown className="w-4 h-4 fill-white text-yellow-400" />
                  RECOMENDADO
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-emerald-600 flex flex-col h-full transform transition-all duration-300 group-hover:scale-[1.03]">
                <div className="bg-emerald-600 py-8 px-6 text-center text-white">
                  <p className="uppercase tracking-widest text-[10px] font-bold opacity-90 mb-1">Kit Completo 2024</p>
                  <h3 className="text-xl md:text-2xl font-headline font-bold">Plano Premium</h3>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="space-y-4 flex-grow mb-8">
                    {[
                      "Tudo do Plano Básico",
                      "300 Atividades Bíblicas EXTRAS",
                      "100 Dinâmicas Inéditas",
                      "365 Versículos Ilustrados",
                      "200 Brincadeiras Cristãs",
                      "Kit Datas Comemorativas",
                      "Plano Anual Completo",
                      "Certificados de Conclusão"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-emerald-900 font-black text-sm md:text-base leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-emerald-50 text-center mt-auto">
                    <p className="text-emerald-300 line-through mb-1 text-xs md:text-sm">De R$ 199,90</p>
                    <div className="flex flex-col items-center mb-6">
                      <span className="text-[10px] font-black text-emerald-600 uppercase mb-1 tracking-widest">Oferta Exclusiva</span>
                      <span className="text-4xl md:text-5xl font-headline font-bold text-emerald-900 tracking-tighter">
                        R$ 14,90
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => handleFinalPurchase('premium')}
                      className="w-full h-14 md:h-16 text-lg bg-[#7E8A0E] hover:bg-[#6A750C] text-white shadow-xl transition-all font-bold uppercase rounded-2xl"
                    >
                      GARANTIR O PREMIUM
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="depoimentos" className="py-8 md:py-12 bg-white px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center mb-6 md:mb-10">
          <h2 className="text-xl md:text-4xl font-headline font-bold text-emerald-900 mb-2 md:mb-3 uppercase px-4">
            Líderes que já transformaram suas aulas
          </h2>
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />)}
          </div>
          <p className="text-xs md:text-lg text-emerald-700 max-w-2xl mx-auto px-4 italic">Junte-se a mais de 2.000 educadoras satisfeitas.</p>
        </div>
        <TestimonialCarousel />
      </section>

      {/* Guarantee Section */}
      <section className="py-6 md:py-10 bg-[#F0F7F3] px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white p-6 md:p-12 rounded-[2.5rem] border border-emerald-100 shadow-xl">
          <div className="w-20 h-20 md:w-40 md:h-40 flex-shrink-0 relative flex items-center justify-center">
            <div className="bg-emerald-600 text-white w-20 h-20 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-white">
               <span className="text-3xl md:text-4xl font-black leading-none">7</span>
               <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">Dias</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-headline font-bold text-emerald-900 mb-2 md:mb-3 uppercase leading-tight">
              Sua Satisfação ou Seu Dinheiro de Volta
            </h2>
            <p className="text-xs md:text-lg text-emerald-700 leading-relaxed mb-4">
              Teste o material sem risco por 7 dias. Se não amar, devolvemos seu investimento integralmente. Sem perguntas.
            </p>
            <p className="font-black text-emerald-900 text-sm md:text-base italic">"Seu risco é zero!"</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-12 bg-white px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-headline font-bold text-emerald-900 mb-2 uppercase">Dúvidas Frequentes</h2>
            <p className="text-xs md:text-base text-emerald-700">Tudo o que você precisa saber.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {[
              { q: "Como vou receber o material?", a: "O material é 100% digital. Após a confirmação do pagamento, você recebe o link de download instantaneamente no seu e-mail." },
              { q: "Posso imprimir para minha igreja toda?", a: "Sim! Você faz o download uma vez e pode imprimir quantas cópias precisar para seus alunos e atividades." },
              { q: "É pagamento mensal?", a: "Não. É pagamento único. Você paga uma vez e o acesso é vitalício para as 52 semanas de conteúdo." },
              { q: "Qual a idade recomendada?", a: "As atividades são ideais para crianças de 4 a 10 anos, com níveis variados de complexidade." },
              { q: "É seguro comprar aqui?", a: "Totalmente. Utilizamos plataformas de pagamento líderes com criptografia de dados bancários." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-emerald-50/50 border border-emerald-100 rounded-2xl px-5 md:px-6 data-[state=open]:bg-white transition-all shadow-sm">
                <AccordionTrigger className="text-emerald-900 font-bold hover:no-underline text-left py-5 text-sm md:text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-emerald-700 pb-5 leading-relaxed text-xs md:text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-[#F0F7F3] border-t border-emerald-100 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:justify-between items-center md:items-start text-center md:text-left">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="bg-emerald-600 text-white p-1 rounded">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-headline font-bold text-xl text-emerald-900">Escola Bíblica Pronta</span>
            </div>
            <p className="text-emerald-600 text-sm leading-relaxed font-bold">
              Dedicados a transformar o ensino bíblico infantil com materiais criativos e de alta qualidade.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex flex-col gap-3 text-sm text-emerald-600 font-bold uppercase tracking-wider">
              <a href="#" className="hover:text-emerald-900 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-emerald-900 transition-colors">Termos</a>
              <a href="#" className="hover:text-emerald-900 transition-colors">Ajuda</a>
            </div>
            <Button variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-100 font-bold h-12 rounded-xl">
              <MessageCircle className="w-4 h-4 mr-2" /> SUPORTE WHATSAPP
            </Button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-emerald-100 text-center">
          <div className="flex justify-center gap-6 mb-6 grayscale opacity-40">
             <ShieldCheck className="w-8 h-8 text-emerald-600" />
             <Lock className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-[10px] md:text-xs text-emerald-400 font-bold">
            © {new Date().getFullYear()} Escola Bíblica Pronta. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Conversion Widgets */}
      <UrgencyNotification />
    </div>
  );
}
