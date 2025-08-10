'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Criando um hook simples para gerenciar traduções
export function useTranslation() {
  const [locale, setLocale] = useState<string>('pt-BR');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const router = useRouter();
  const pathname = usePathname();

  // Carregar as traduções
  useEffect(() => {
    async function loadTranslations() {
      try {
        const storedLocale = localStorage.getItem('locale') || 'pt-BR';
        setLocale(storedLocale);
        const res = await fetch(`/locales/${storedLocale}/common.json?v=${Date.now()}`);
        const data = await res.json();
        setTranslations(data);
      } catch (error) {
        console.error('Erro ao carregar traduções:', error);
        // Fallback para português
        const res = await fetch('/locales/pt-BR/common.json');
        const data = await res.json();
        setTranslations(data);
      }
    }
    
    loadTranslations();
  }, []);

  // Função para mudar o idioma
  const changeLocale = async (newLocale: string) => {
    try {
      localStorage.setItem('locale', newLocale);
      setLocale(newLocale);
      const res = await fetch(`/locales/${newLocale}/common.json?v=${Date.now()}`);
      const data = await res.json();
      setTranslations(data);
      
      // Recarregar a página para aplicar as mudanças
      window.location.reload();
    } catch (error) {
      console.error('Erro ao mudar idioma:', error);
    }
  };

  // Função para obter uma tradução
  const t = (key: string): string => {
    // Suporta caminhos aninhados como "heroSection.title.first"
    const path = key.split('.');
    let result: any = translations;
    
    for (const part of path) {
      if (!result) return key;
      result = result[part];
    }
    
    return (typeof result === 'string' ? result : key);
  };

  return {
    t,
    locale,
    changeLocale,
    availableLocales: ['pt-BR', 'en-US', 'es-ES']
  };
}