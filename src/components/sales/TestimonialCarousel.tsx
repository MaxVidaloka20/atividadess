"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    name: "Maria Oliveira",
    role: "Líder de Ministério Infantil",
    text: "Economizei horas de preparação toda semana. O material é muito completo!",
    avatar: "https://picsum.photos/seed/user1/100/100"
  },
  {
    name: "Ana Santos",
    role: "Professora de EBD",
    text: "As crianças ficaram muito mais participativas. As atividades são envolventes.",
    avatar: "https://picsum.photos/seed/user2/100/100"
  },
  {
    name: "Juliana Lima",
    role: "Mãe Educadora",
    text: "O melhor material que encontrei para ensinar a Bíblia em casa. Recomendo muito!",
    avatar: "https://picsum.photos/seed/user3/100/100"
  },
  {
    name: "Carla Ferreira",
    role: "Coordenadora de Igreja",
    text: "Material de altíssima qualidade. As ilustrações são lindas e os textos claros.",
    avatar: "https://picsum.photos/seed/user4/100/100"
  },
  {
    name: "Paula Mendes",
    role: "Educadora Cristã",
    text: "Finalmente um material que fala a língua das crianças de hoje. Excelente!",
    avatar: "https://picsum.photos/seed/user5/100/100"
  }
];

export function TestimonialCarousel() {
  return (
    <div className="w-full px-4 py-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {TESTIMONIALS.map((t, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full border-none shadow-md bg-white">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-emerald-900 italic mb-6 flex-grow">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={t.avatar} alt={t.name} />
                      <AvatarFallback>{t.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm text-emerald-900">{t.name}</p>
                      <p className="text-xs text-emerald-600">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="bg-white border-emerald-200 text-emerald-600" />
          <CarouselNext className="bg-white border-emerald-200 text-emerald-600" />
        </div>
      </Carousel>
    </div>
  );
}
