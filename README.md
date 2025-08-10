# Portfolio - Rafael Rocha

Website portfolio desenvolvido em Next.js, React, TypeScript e TailwindCSS.

## Funcionalidades

- Design responsivo e moderno
- Animações com Framer Motion
- Suporte a múltiplos idiomas (Português, Inglês e Espanhol)
- Chatbot para contato direto
- Seções de portfolio, serviços, depoimentos e contato
- Integração com Amazon SES para envio de emails

## Como executar

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure as variáveis de ambiente:
   ```
   # Crie um arquivo .env.local na raiz do projeto com:
   
   # AWS SES Credentials
   AWS_ACCESS_KEY_ID=sua_access_key_aqui
   AWS_SECRET_ACCESS_KEY=sua_secret_key_aqui
   AWS_REGION=us-east-1
   
   # Email configuration
   SENDER_EMAIL=seu-email-verificado-no-ses@example.com
   RECIPIENT_EMAIL=seu-email-para-receber-mensagens@example.com
   ```
4. Execute o projeto em modo de desenvolvimento:
   ```
   npm run dev
   ```
5. Abra [http://localhost:3000](http://localhost:3000) no navegador

## Configuração do Amazon SES

Para que o chatbot funcione corretamente enviando emails, você precisa:

1. Ter uma conta na AWS com acesso ao serviço SES
2. Verificar seu domínio ou pelo menos um email no SES
3. Criar uma IAM key com permissões para o SES
4. Configurar as variáveis de ambiente conforme acima

## Estrutura de arquivos principais

- `/src/app` - Componentes e páginas principais
- `/src/app/components` - Componentes reutilizáveis
- `/src/app/hooks` - Custom hooks incluindo useTranslation
- `/public/locales` - Arquivos de tradução em JSON
- `/src/app/api` - Endpoints da API

## Licença

Este projeto é licenciado sob a licença MIT.