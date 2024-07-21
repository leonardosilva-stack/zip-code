# API ZIP-CODE

Esta aplicação fornece informações sobre o clima e a localização baseada em um CEP.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Sequelize
- PostgreSQL
- Axios
- dotenv

## Requisitos

- Conta na OpenWeatherMap para obter a chave da API
- Conta na TimeZoneDB para obter a chave da API
- Banco de Dados PostgreSQL (Vercel)

## Configuração

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no arquivo `.env` com suas informações reais
4. Inicie o servidor: `npm run dev`

## Endpoints

- `GET /weather/:cep`: Retorna informações sobre o clima e localização baseado em um CEP.

## Formato dos Ceps

- **CEP Brasileiro**: Deve seguir o formato `00000-000`.
- **CEP Internacional**: Pode seguir outros formatos válidos para CEPs fora do Brasil.

## Limite de Requisições

Cada IP pode fazer até 5 requisições por dia. Após isso, a aplicação retornará uma mensagem informando que o limite foi excedido e para tentar novamente no dia seguinte.

## Estrutura dos Arquivos

- `src/controllers/weatherController.ts`: Controlador que lida com as requisições relacionadas ao clima e localização.
- `src/models/index.ts`: Configuração e definição do modelo do banco de dados.
- `src/routes/weatherRoutes.ts`: Rotas da aplicação relacionadas ao clima e localização.
- `src/services/weatherService.ts`: Serviço que lida com a API do OpenWeatherMap e TimeZoneDB.
- `src/utils/rateLimiter.ts`: Funções utilitárias para limitar a quantidade de requisições.
- `src/utils/locationService.ts`: Serviço que lida com APIs de localização.
- `src/app.ts`: Configuração do Express e outras configurações iniciais.
- `src/server.ts`: Arquivo principal que inicializa o servidor.

## Funcionalidades

- **Localização**: Recupera dados de localização com base em um CEP, incluindo cidade e país. Suporta CEPs brasileiros e internacionais.
- **Clima**: Fornece informações climáticas atuais, incluindo temperatura e descrição do clima.
- **Rate Limiting**: Limita o número de requisições por IP para prevenir abusos.
- **Data e Hora**: Retorna a hora e data local do lugar consultado.

### Notas Adicionais

- **Credenciais e Configurações**: Certifique-se de que o arquivo `.env` está configurado corretamente com a chave da API e quaisquer outras configurações necessárias.
- **Banco de Dados**: Ajuste o arquivo de configuração para refletir suas credenciais do PostgreSQL.
- **Execução**: Inclua um script `start` no `package.json` para executar o servidor.

### Exemplos de Configuração do `.env`

```plaintext
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=your_database_port
OPENWEATHER_API_KEY=your_openweather_api_key
TIMEZONEDB_API_KEY=your_timezonedb_api_key
```
