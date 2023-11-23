<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png" width="50" alt="Nest Logo" /></a>
</p>

# Fullstack Project Front-end

## Descrição

Front-end em React para cadastro de clientes com vínculo de contatos.

## Autor

Mario Silva

## Versão

1.0.0

## Tecnologias Utilizadas

<div style="display: flex;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png" height="50" alt="React" style="margin-right: 10px;">
  <img src="https://avatars.githubusercontent.com/u/65625612?s=280&v=4" height="50" alt="Vite" style="margin-right: 10px;">
  <img src="https://cdn-icons-png.flaticon.com/512/919/919832.png" height="50" alt="Typescript" style="margin-right: 10px;">
  <img src="https://seeklogo.com/images/Z/zod-logo-B57E684330-seeklogo.com.png" height="50" alt="Zod" style="margin-right: 10px;">
  <img src="https://user-images.githubusercontent.com/43313420/105893220-1bae8780-6013-11eb-87be-eeac845ecc6f.png" height="50" alt="Axios" style="margin-right: 10px;">
  <img src="https://static-00.iconduck.com/assets.00/swagger-icon-512x512-halz44im.png" height="50" alt="Swagger">
</div>

## Scripts

- `dev`: Inicia o ambiente de desenvolvimento usando o Vite.
- `build`: Usado para construir o aplicativo para produção.
- `lint`: Executa o ESLint para linting e correção automática.
- `preview`: Usado para pré-visualizar o aplicativo construído usando o Vite.
- `format`: Formatação do código usando Prettier.

Execute os scripts utilizando `npm run` ou `yarn run`.

## Dependências

- @hookform/resolvers: ^3.3.2
- axios: ^1.6.2
- immer: ^10.0.3
- react: ^18.2.0
- react-dom: ^18.2.0
- react-hook-form: ^7.48.2
- react-router-dom: ^6.19.0
- react-spinners: ^0.13.8
- react-toastify: ^9.1.3
- styled-components: ^6.1.1
- zod: ^3.22.4

## Dependências de Desenvolvimento

- @types/react: ^18.2.37
- @types/react-dom: ^18.2.15
- @types/styled-components: ^5.1.30
- @typescript-eslint/eslint-plugin: ^6.10.0
- @typescript-eslint/parser: ^6.10.0
- @vitejs/plugin-react: ^4.2.0
- eslint: ^8.53.0
- eslint-plugin-react-hooks: ^4.6.0
- eslint-plugin-react-refresh: ^0.4.4
- typescript: ^5.2.2
- vite: ^5.0.0

## Instalação

1. Clone o repositório (front-end): 

```bash
git clone git@github.com:mariosilva81/m6-fullstack-project-frontend.git
```

2. Clone o repositório (back-end): 

```bash
git clone git@github.com:mariosilva81/m6-fullstack-project-backend.git
```
Para mais informações sobre o back-end, verfique o README.md na raiz do projeto.

3. Instale as dependências: 

```bash
npm install 

# ou 

yarn install
```

## Executando o Projeto

Execute o seguinte comando para iniciar o servidor:

```bash
# development
npm run dev

# production
npm run build
```

A aplicação estará acessível localmente em [http://localhost:5173](http://localhost:5173). 
Lembrando que o projeto de back-end precisa estar rodando para que o front-end funcione corretamente.

## Estrutura do Projeto

```
m6-fullstack-project/
│
├── node_modules/         Pacotes e dependências do projeto.
│
├── public/               Recursos públicos acessíveis diretamente.
│
├── src/                  Código-fonte da aplicação.
│   ├── assets/           Recursos estáticos como imagens, icones, etc.
│   ├── components/       Componentes reutilizáveis.
│   ├── hooks/            Hooks reutilizáveis.
│   ├── pages/            Componentes específicos de páginas.
│   ├── providers/        Componentes de gerenciamento de estado global.
│   ├── routes/           Componentes específicos de rotas.
│   ├── schemas/          Contexto de validação de dados.
│   ├── services/         Serviço de comunicação com API.
│   ├── styles/           Estilos globais da aplicação.
│   └── ...
```

## Endpoints

|`Método`| `Endpoint`     | `Responsabilidade`                 | `Autenticação`      |
| ------ | -------------- | ---------------------------------- | ------------------- |
| POST   | /session/login | Gera o token de autenticação       | Não necessita token |
| POST   | /clients       | Criação de cliente                 | Não necessita token |
| GET    | /clients       | Lista todos os clientes            | Token de cliente    |
| GET    | /clients/:id   | Lista um cliente pelo ID           | Token de cliente    |
| PATCH  | /clients/:id   | Atualiza um cliente pelo ID        | Token de cliente    |
| DELETE | /clients/:id   | Exclui um cliente pelo ID          | Token de cliente    |
| POST   | /contacts      | Criação de contato                 | Token de cliente    |
| GET    | /contacts      | Lista todos contatos os do cliente | Token de cliente    |
| GET    | /contacts/:id  | Lista um contato pelo ID           | Token de cliente    |
| DELETE | /contacts/:id  | Exclui um contato pelo ID          | Token de cliente    |
| PATCH  | /contacts/:id  | Atualiza um contato pelo ID        | Token de cliente    |

Verifique o arquivo `insomnia.json` disponibilizado na raiz do projeto. Nele estão contidas todas as rotas e métodos HTTP disponíveis na aplicação, que pode ser importado no Insomnia ou qualquer outro client HTTP, para realizar requisições.

Para mais informações, consulte a documentação disponível em [http://localhost:3000/doc](http://localhost:3000/doc). Disponível apenas com o servidor do back-end rodando.

## Contato

Para questões ou sugestões, entre em contato através do email: mariosilva.81@icloud.com.
