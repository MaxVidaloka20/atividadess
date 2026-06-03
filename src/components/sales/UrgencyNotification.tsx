"use client"

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAMES = ["Maria", "Ana", "Carla", "Paula", "Juliana", "Bruna", "Fernanda", "Luciana", "Renata", "Beatriz"];
const CITIES = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Fortaleza", "Salvador", "Recife", "Porto Alegre"];

export function UrgencyNotification() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: "", city: "", time: "" });

  useEffect(() => {
    const showNotification = () => {
      setData({
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        city: CITIES[Math.floor(Math.random() * CITIES.length)],
        time: Math.floor(Math.random() * 10) + 1
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const interval = setInterval(showNotification, 15000);
    setTimeout(showNotification, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-20 right-4 z-50 transition-all duration-500 transform translate-y-0 opacity-100 md:bottom-6",
        !visible && "translate-y-10 opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-white rounded-lg shadow-lg p-1.5 flex items-center gap-2 border border-emerald-100 max-w-[180px]">
        <div className="bg-emerald-100 p-1 rounded-full shrink-0">
          <ShoppingCart className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="text-[10px] overflow-hidden">
          <p className="font-semibold text-emerald-900 truncate">{data.name} de {data.city}</p>
          <p className="text-emerald-700 leading-tight">Adquiriu o material!</p>
          <p className="text-emerald-400 text-[8px]">há {data.time} min</p>
        </div>
      </div>
    </div>
  );
}
