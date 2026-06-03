
"use client"

import React from "react"
import { Clock, TrendingUp } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const PROBLEMS = [
  { title: "Horas de Pesquisa", desc: "Passa horas procurando atividades desconexas na internet e nunca encontra algo completo." },
  { title: "Improviso Constante", desc: "Precisa improvisar aulas de última hora porque não teve tempo de preparar nada melhor." },
  { title: "Falta de Atenção", desc: "Tem dificuldade em prender a atenção das crianças com materiais simples ou chatos." },
  { title: "Criação do Zero", desc: "Cria materiais do zero toda semana, sacrificando seu tempo com a família e descanso." },
  { title: "Sentimento de Culpa", desc: "Sente que poderia entregar aulas melhores, mas a correria do dia a dia não permite." }
]

export function ProblemCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-7xl mx-auto px-4"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-4">
        {PROBLEMS.map((item, i) => (
          <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-8 rounded-2xl bg-[#F0F7F3] border border-emerald-100 shadow-sm hover:shadow-md transition-all group flex flex-col min-h-[280px]">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Clock className="w-6 h-6 text-emerald-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-4">{item.title}</h3>
              <p className="text-emerald-700 leading-relaxed">{item.desc}</p>
            </div>
          </CarouselItem>
        ))}
        <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
          <div className="h-full p-8 rounded-2xl bg-emerald-600 text-white flex flex-col justify-center min-h-[280px]">
            <h3 className="text-2xl font-headline font-bold mb-4">Chega de estresse!</h3>
            <p className="opacity-90 mb-6">Estamos aqui para transformar sua forma de ensinar e devolver seu tempo livre.</p>
            <div className="flex items-center gap-2 font-semibold">
              <TrendingUp className="w-5 h-5" /> 100% Organizado
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
