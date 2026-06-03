'use server';
/**
 * @fileOverview A Genkit flow for generating quick lesson plans and complementary dynamic activities based on a given Bible passage.
 *
 * - generateLessonPlan - A function that handles the lesson plan generation process.
 * - GenerateLessonPlanInput - The input type for the generateLessonPlan function.
 * - GenerateLessonPlanOutput - The return type for the generateLessonPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateLessonPlanInputSchema = z.object({
  biblePassage: z.string().describe('A passagem bíblica específica para a qual o plano de aula e as atividades devem ser gerados (ex: "João 3:16", "Mateus 5:1-12").'),
  targetAudience: z.string().optional().describe('A faixa etária ou público-alvo específico para o plano de aula (ex: "crianças de 5-7 anos", "adolescentes", "adultos"). Se não especificado, use um público geral para crianças.'),
});
export type GenerateLessonPlanInput = z.infer<typeof GenerateLessonPlanInputSchema>;

// Output Schema
const GenerateLessonPlanOutputSchema = z.object({
  lessonPlan: z.object({
    title: z.string().describe('Título criativo e envolvente para o plano de aula.'),
    targetAudience: z.string().describe('Faixa etária ou público-alvo definido para esta aula.'),
    objective: z.string().describe('Objetivo principal da aula, o que as crianças devem aprender.'),
    materials: z.array(z.string()).describe('Lista de materiais necessários para a aula principal.'),
    introduction: z.string().describe('Como iniciar a aula para prender a atenção das crianças.'),
    bibleReading: z.string().describe('A passagem bíblica principal a ser lida e explicada.'),
    mainLesson: z.string().describe('Desenvolvimento do conteúdo principal da aula, explicando a passagem bíblica de forma didática.'),
    discussionQuestions: z.array(z.string()).describe('Três a cinco perguntas para discussão em grupo.'),
    conclusion: z.string().describe('Como concluir a aula e aplicar o aprendizado na vida diária.'),
  }).describe('Plano de aula detalhado em português.'),
  dynamicActivities: z.array(z.object({
    name: z.string().describe('Nome da atividade dinâmica.'),
    description: z.string().describe('Descrição detalhada da atividade, incluindo como realizá-la.'),
    materials: z.array(z.string()).describe('Materiais necessários para esta atividade.'),
  })).describe('Três a cinco sugestões de atividades dinâmicas complementares e criativas para reforçar o aprendizado.'),
});
export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;

export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<GenerateLessonPlanOutput> {
  return generateLessonPlanFlow(input);
}

const generateLessonPlanPrompt = ai.definePrompt({
  name: 'generateLessonPlanPrompt',
  input: {schema: GenerateLessonPlanInputSchema},
  output: {schema: GenerateLessonPlanOutputSchema},
  prompt: `Você é um especialista em ministério infantil e um criador de conteúdo educacional cristão para crianças. Sua tarefa é criar um plano de aula completo e sugestões de atividades dinâmicas e envolventes baseadas em uma passagem bíblica específica. Todo o conteúdo deve ser em português do Brasil e focado em crianças.\n\nSiga estas diretrizes para formatar a saída como um objeto JSON válido:\n1.  **Plano de Aula (lessonPlan)**:\n    *   **title**: Um título criativo e chamativo.\n    *   **targetAudience**: O público-alvo para esta aula. Se não for especificado no input, use "Crianças de 6 a 10 anos". Se for especificado, use o que foi fornecido.\n    *   **objective**: Um objetivo claro e mensurável para a aula.\n    *   **materials**: Uma lista de materiais simples e acessíveis necessários.\n    *   **introduction**: Uma forma criativa de começar a aula e capturar a atenção das crianças.\n    *   **bibleReading**: A passagem bíblica principal.\n    *   **mainLesson**: Explique a passagem bíblica de forma clara, simples e aplicável à vida das crianças, com exemplos práticos.\n    *   **discussionQuestions**: 3 a 5 perguntas abertas que estimulem o pensamento e a participação das crianças.\n    *   **conclusion**: Como encerrar a aula, reforçando a mensagem principal e incentivando a aplicação.\n\n2.  **Atividades Dinâmicas (dynamicActivities)**:\n    *   Crie 3 a 5 sugestões de atividades práticas e divertidas que complementem o tema da aula e ajudem a fixar o aprendizado.\n    *   Para cada atividade, inclua um **name**, uma **description** detalhada de como realizá-la e uma lista de **materials** necessários.\n\nA passagem bíblica para a qual você deve criar o plano de aula é: "{{{biblePassage}}}".\n{{#if targetAudience}}O público-alvo para esta aula é: "{{{targetAudience}}}".{{else}}Considere o público-alvo como "Crianças de 6 a 10 anos".{{/if}}\n\nCertifique-se de que a linguagem seja apropriada para crianças e que o tom seja encorajador e edificante.\n`
});

const generateLessonPlanFlow = ai.defineFlow(
  {
    name: 'generateLessonPlanFlow',
    inputSchema: GenerateLessonPlanInputSchema,
    outputSchema: GenerateLessonPlanOutputSchema,
  },
  async (input) => {
    const {output} = await generateLessonPlanPrompt(input);
    return output!;
  }
);
