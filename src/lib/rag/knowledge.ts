export interface KnowledgeItem {
  id: string;
  title: string;
  text: string;
  tags: string[];
  lang?: 'pt-BR' | 'en-US' | 'es-ES';
}

// Base de conhecimento enxuta sobre serviços, ferramentas e processos
export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'servicos-desenvolvimento-web',
    title: 'Desenvolvimento Web (Next.js / React / WordPress)',
    text:
      'Criação de sites e landing pages performáticas com Next.js/React e também WordPress quando adequado. Foco em SEO técnico, acessibilidade e Core Web Vitals. Integração com APIs, formulários e automações. Suporte a multilingue e internacionalização.',
    tags: ['serviços', 'next.js', 'react', 'wordpress', 'seo', 'performance'],
    lang: 'pt-BR',
  },
  {
    id: 'servicos-chatbots',
    title: 'Chatbots com IA',
    text:
      'Implementação de chatbots com modelos leves rodando em VPS (ex.: Ollama) para responder dúvidas sobre serviços, ferramentas e orçamento. Suporte a RAG para respostas baseadas no seu conteúdo. Integração a formulários e automações.',
    tags: ['serviços', 'ia', 'chatbot', 'ollama', 'rag'],
    lang: 'pt-BR',
  },
  {
    id: 'servicos-recuperacao',
    title: 'Recuperação de Site Hackeado',
    text:
      'Diagnóstico, limpeza de malware, restauração de backups, hardening de segurança e monitoramento. Reforço de senhas, atualizações, WAF/CDN quando aplicável e relatórios de ações.',
    tags: ['serviços', 'segurança', 'backup', 'wordpress'],
    lang: 'pt-BR',
  },
  {
    id: 'servicos-landing-seo',
    title: 'Landing Pages, SEO e Performance',
    text:
      'Landing pages com foco em conversão, testes A/B, otimização de imagens, edge caching, fontes e bundle. Estratégias on-page SEO: meta tags, sitemaps, schema, headings e conteúdo.',
    tags: ['serviços', 'seo', 'performance', 'landing'],
    lang: 'pt-BR',
  },
  {
    id: 'orcamentos-politica',
    title: 'Orçamentos – Diretrizes',
    text:
      'Cada orçamento depende de escopo e complexidade. Para estimativas, informar: objetivos, funcionalidades, integrações, prazo desejado e referências. A IA pode coletar essas informações, mas a proposta formal é enviada por contato direto.',
    tags: ['orçamento', 'processo'],
    lang: 'pt-BR',
  },
  {
    id: 'ferramentas-stack',
    title: 'Stack e Ferramentas',
    text:
      'Principais: Next.js, React, TailwindCSS, Node.js, WordPress quando aplicável, integrações com APIs, e IA local via Ollama com modelos leves (1.5B–3B) para responder perguntas comuns.',
    tags: ['ferramentas', 'stack', 'ia', 'ollama'],
    lang: 'pt-BR',
  },
];


