"use client"

import React from "react"
import { Zap, Users, Heart, Layers, Award } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const TRANSFOMATIONS = [
  { label: "Pronta em Minutos", icon: Zap },
  { label: "Crianças Engajadas", icon: Users },
  { label: "Zero Estresse", icon: Heart },
  { label: "Organização Total", icon: Layers },
  { label: "Confiança Total", icon: Award }
]

export function TransformationCarousel() {
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
        {TRANSFOMATIONS.map((item, i) => (
          <CarouselItem key={i} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
            <div className="h-full bg-white p-6 rounded-xl text-center shadow-sm border border-emerald-50 transform hover:-translate-y-1 transition-all flex flex-col items-center justify-center min-h-[180px]">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <item.icon className="w-8 h-8" />
              </div>
              <p className="font-bold text-emerald-900">{item.label}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
