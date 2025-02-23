## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/GuigaF2202/audio_web.git
    cd radio-backend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Configure o arquivo `.env` com as variáveis de ambiente necessárias:
    ```env
    NODE_ENV=development
    PORT=4000
    DATABASE_URL=your_database_url
    DB_SSL_CERT=your_ssl_certificate_base64
    LOG_LEVEL=debug
    CORS_ORIGINS=https://audioweb.com.br
    ```

## Scripts

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com `nodemon`.
- [npm start](http://_vscodecontentref_/15): Inicia o servidor em modo de produção.
- `npm run pm2:start`: Inicia o servidor usando PM2.
- `npm run pm2:stop`: Para o servidor usando PM2.
- `npm run pm2:restart`: Reinicia o servidor usando PM2.
- `npm run pm2:delete`: Deleta a aplicação do PM2.
- `npm run pm2:logs`: Exibe os logs do PM2.
- `npm run pm2:monit`: Monitora a aplicação usando PM2.
- `npm run lint`: Executa o ESLint para verificar problemas no código.
- [npm run format](http://_vscodecontentref_/16): Formata o código usando Prettier.
- `npm run test`: Executa os testes com Jest.

## Estrutura de Diretórios

- `src/config`: Configurações da aplicação, como a configuração do banco de dados.
- `src/controllers`: Controladores que lidam com a lógica de negócios.
- `src/middleware`: Middlewares para upload de arquivos e autenticação.
- `src/models`: Modelos que representam as entidades do banco de dados.
- `src/routes`: Definição das rotas da API.
- `src/services`: Serviços que contêm lógica de negócios reutilizável.
- `src/utils`: Utilitários, como o logger.
- `tests`: Testes unitários e de integração.
- `uploads`: Diretório para armazenar arquivos de upload.

## Endpoints

### Autenticação

- `POST /auth/login`: Autentica um usuário.
- `POST /auth/register`: Registra um novo usuário.

### Áudio

- `POST /audio/upload`: Faz upload de um arquivo de áudio.
- `GET /audio/my-audios`: Obtém os áudios do usuário autenticado.
- `DELETE /audio/:id`: Deleta um áudio pelo ID.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato

Para mais informações, entre em contato com [seu-email@dominio.com](mailto:seu-email@dominio.com).
