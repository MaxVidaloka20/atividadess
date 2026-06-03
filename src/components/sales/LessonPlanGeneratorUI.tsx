"use client"

import { useState } from 'react';
import { generateLessonPlan, type GenerateLessonPlanOutput } from '@/ai/flows/generate-lesson-plan';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2, BookOpen, CheckCircle2 } from 'lucide-react';

export function LessonPlanGeneratorUI() {
  const [passage, setPassage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateLessonPlanOutput | null>(null);

  const handleGenerate = async () => {
    if (!passage) return;
    setLoading(true);
    try {
      const data = await generateLessonPlan({ biblePassage: passage });
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <Card className="border-2 border-emerald-200 bg-white shadow-xl overflow-hidden">
        <CardHeader className="bg-emerald-50 border-b border-emerald-100">
          <CardTitle className="flex items-center gap-2 text-emerald-900 font-headline">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Experimente Nossa IA (Demo Gratuita)
          </CardTitle>
          <p className="text-sm text-emerald-700">
            Digite uma passagem bíblica e veja como nossa inteligência cria um plano de aula instantâneo.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Ex: João 3:16 ou Mateus 5:1-12"
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              className="border-emerald-200 focus:ring-emerald-500 flex-grow"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading || !passage}
              className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[180px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                'Gerar Plano de Aula'
              )}
            </Button>
          </div>

          {result && (
            <div className="mt-8 space-y-6 animate-fade-in-up">
              <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-100">
                <h3 className="text-xl font-headline font-bold text-emerald-900 mb-2">{result.lessonPlan.title}</h3>
                <div className="flex items-center gap-2 text-sm text-emerald-700 mb-4">
                  <span className="font-semibold">Público:</span> {result.lessonPlan.targetAudience}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-emerald-800 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Objetivo
                    </h4>
                    <p className="text-emerald-700 text-sm">{result.lessonPlan.objective}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-emerald-800">Introdução</h4>
                    <p className="text-emerald-700 text-sm italic">{result.lessonPlan.introduction}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white p-4 rounded border border-emerald-100 shadow-sm">
                      <h4 className="font-bold text-emerald-800 mb-2">Materiais</h4>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        {result.lessonPlan.materials.map((m, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded border border-emerald-100 shadow-sm">
                      <h4 className="font-bold text-emerald-800 mb-2">Perguntas de Discussão</h4>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        {result.lessonPlan.discussionQuestions.map((q, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-bold">{i+1}.</span> {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-headline font-bold text-emerald-900 border-l-4 border-emerald-600 pl-3">
                  Atividades Dinâmicas Sugeridas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.dynamicActivities.map((act, i) => (
                    <div key={i} className="bg-white border border-emerald-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-bold text-emerald-900 text-sm mb-2">{act.name}</p>
                      <p className="text-emerald-700 text-xs mb-3 line-clamp-3">{act.description}</p>
                      <div className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">
                        Ver detalhes no material completo
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="text-center">
        <p className="text-sm text-emerald-600">
          * Este é apenas um exemplo do poder da nossa metodologia integrada. No material completo, você recebe tudo pronto e formatado para impressão.
        </p>
      </div>
    </div>
  );
}
