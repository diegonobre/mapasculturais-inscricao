'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/header';

const RichTextEditor = dynamic(() => import('@/components/ui/rich-text-editor'), { ssr: false });

const formSchema = z.object({
  cnpj: z.string().min(18, 'CNPJ inválido'),
  companyName: z
    .string()
    .min(2, 'Nome da empresa é obrigatório')
    .max(100, 'Nome da empresa deve ter no máximo 100 caracteres'),
  email: z.string().email('E-mail inválido').max(100, 'E-mail deve ter no máximo 100 caracteres'),
  organizationalIdentity: z
    .string()
    .min(10, 'Identidade Organizacional deve ter pelo menos 10 caracteres')
    .max(1000, 'Identidade Organizacional deve ter no máximo 1000 caracteres'),
  organizationHistory: z
    .string()
    .min(10, 'Histórico da Organização deve ter pelo menos 10 caracteres')
    .max(1000, 'Histórico da Organização deve ter no máximo 1000 caracteres'),
  problemDefinition: z
    .string()
    .min(10, 'Definição do Problema deve ter pelo menos 10 caracteres')
    .max(1000, 'Definição do Problema deve ter no máximo 1000 caracteres'),
  justification: z
    .string()
    .min(10, 'Justificativa deve ter pelo menos 10 caracteres')
    .max(1000, 'Justificativa deve ter no máximo 1000 caracteres'),
  proposedSolution: z
    .string()
    .min(10, 'Proposta de Solução deve ter pelo menos 10 caracteres')
    .max(1000, 'Proposta de Solução deve ter no máximo 1000 caracteres'),
  developmentAndVerification: z
    .string()
    .min(10, 'Desenvolvimento e Verificação deve ter pelo menos 10 caracteres')
    .max(1000, 'Desenvolvimento e Verificação deve ter no máximo 1000 caracteres'),
  innovationDegree: z
    .string()
    .min(1, 'Grau de Inovação é obrigatório')
    .max(100, 'Grau de Inovação deve ter no máximo 100 caracteres'),
  impactsAndBenefits: z
    .string()
    .min(10, 'Impactos e Benefícios deve ter pelo menos 10 caracteres')
    .max(1000, 'Impactos e Benefícios deve ter no máximo 1000 caracteres'),
  supportAndEvidence: z
    .string()
    .min(10, 'Suporte e Evidências deve ter pelo menos 10 caracteres')
    .max(1000, 'Suporte e Evidências deve ter no máximo 1000 caracteres'),
});

const cnpjMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export default function SubscriptionForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: '',
      companyName: '',
      email: '',
      organizationalIdentity: '',
      organizationHistory: '',
      problemDefinition: '',
      justification: '',
      proposedSolution: '',
      developmentAndVerification: '',
      innovationDegree: '',
      impactsAndBenefits: '',
      supportAndEvidence: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    setIsSaving(false);
    setLastSaved(new Date());
  };

  const handleValidate = () => {
    setShowValidation(true);
    form.trigger();
  };

  const handleSave = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleSaveAndExit = () => {
    form.handleSubmit(onSubmit)();
    // Add logic to navigate away or close the form
  };

  useEffect(() => {
    const subscription = form.watch(() => {
      if (showValidation) {
        form.trigger();
      }
    });
    return () => subscription.unsubscribe();
  }, [form, showValidation]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="sticky top-0 z-10 bg-background py-4 shadow-md">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <Button onClick={handleSave} variant="secondary" disabled={isSaving}>
              Salvar
            </Button>
            <Button onClick={handleValidate} variant="secondary" disabled={isSaving}>
              Validar inscrição
            </Button>
            <Button onClick={handleSaveAndExit} variant="secondary" disabled={isSaving}>
              Salvar e sair
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </div>

        <Card className="w-full max-w-4xl mx-auto mt-4">
          <CardHeader>
            <CardTitle>Formulário de inscrição</CardTitle>
            <CardDescription>Prêmio CLEODON SILVA de Soluções Digitais Livres</CardDescription>
          </CardHeader>
          <CardContent>
            {lastSaved && (
              <div className="mb-4 text-sm text-green-600 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Último salvamento: {lastSaved.toLocaleString()}
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">CNPJ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00.000.000/0000-00"
                          {...field}
                          disabled={isSaving}
                          value={cnpjMask(field.value)}
                          onChange={(e) => field.onChange(cnpjMask(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 18</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">Nome da empresa/organização</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa/organização" {...field} disabled={isSaving} />
                      </FormControl>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 100</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">E-mail de contato</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} disabled={isSaving} />
                      </FormControl>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 100</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organizationalIdentity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">Identidade Organizacional</FormLabel>
                      <FormControl>
                        <RichTextEditor {...field} disabled={isSaving} minHeight={200} />
                      </FormControl>
                      <FormDescription>Missão, visão e valores.</FormDescription>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 1000</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organizationHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">Histórico da Organização</FormLabel>
                      <FormControl>
                        <RichTextEditor {...field} disabled={isSaving} minHeight={200} />
                      </FormControl>
                      <FormDescription>
                        Histórico da organização com projetos de soluções digitais na área da cultura.
                      </FormDescription>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 1000</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="problemDefinition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">Definição do Problema</FormLabel>
                      <FormControl>
                        <RichTextEditor {...field} disabled={isSaving} minHeight={200} />
                      </FormControl>
                      <FormDescription>
                        Descrição clara e objetiva do problema a ser resolvido dentre os existentes no Banco de
                        Problemas e relacionados com o fomento.
                      </FormDescription>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 1000</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="justification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">Justificativa</FormLabel>
                      <FormControl>
                        <RichTextEditor {...field} disabled={isSaving} minHeight={200} />
                      </FormControl>
                      <FormDescription>
                        Por que você e sua empresa resolveram escolher este problema? Impactos negativos do
                        problema não resolvido na gestão do fomento à cultura.
                      </FormDescription>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 1000</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="proposedSolution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">Proposta de Solução</FormLabel>
                      <FormControl>
                        <RichTextEditor {...field} disabled={isSaving} minHeight={200} />
                      </FormControl>
                      <FormDescription>
                        Solução proposta para resolver o problema. Tecnologias e metodologias a serem utilizadas.
                        Exemplos de uso e aplicação da solução.
                      </FormDescription>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 1000</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="developmentAndVerification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">Desenvolvimento e Verificação</FormLabel>
                      <FormControl>
                        <RichTextEditor {...field} disabled={isSaving} minHeight={200} />
                      </FormControl>
                      <FormDescription>
                        Etapas utilizadas no desenvolvimento da solução. Cronograma de implementação realizado.
                      </FormDescription>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 1000</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="innovationDegree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">Grau de Inovação</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isSaving} />
                      </FormControl>
                      <FormDescription>
                        Explicação se a inovação é incremental, radical ou disruptiva. Comparação com soluções
                        existentes no mercado.
                      </FormDescription>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 100</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="impactsAndBenefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold  text-black">
                        Impactos e Benefícios para a Política de Fomento à Cultura
                      </FormLabel>
                      <FormControl>
                        <RichTextEditor {...field} disabled={isSaving} minHeight={200} />
                      </FormControl>
                      <FormDescription>
                        Impactos positivos esperados na política de fomento à cultura. Benefícios para a gestão da
                        política de fomento à cultura.
                      </FormDescription>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 1000</div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supportAndEvidence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-black">Suporte e Evidências</FormLabel>
                      <FormControl>
                        <RichTextEditor {...field} disabled={isSaving} minHeight={200} />
                      </FormControl>
                      <FormDescription>
                        Documentação e dados que suportam as informações apresentadas. Link de acesso ao protótipo,
                        se disponível, ou vídeo e documentação.
                      </FormDescription>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">{field.value.length} / 1000</div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 Mapa da Cultura. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
