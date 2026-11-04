# 🐃 BUBATAG — Mobile

### Aplicativo móvel para monitoramento inteligente de rebanhos bubalinos por meio de IoT, geolocalização e análise de dados.

O **BUBATAG Mobile** é a aplicação móvel do ecossistema BUBATAG, desenvolvido para facilitar o acompanhamento e o gerenciamento de rebanhos bubalinos por meio de uma interface intuitiva, moderna e acessível.

A aplicação foi projetada para permitir que produtores acompanhem informações relacionadas aos animais, incluindo identificação, localização, temperatura corporal, frequência cardíaca e indicadores de estresse.

Integrado à proposta de monitoramento inteligente do projeto, o aplicativo busca aproximar os produtores das informações coletadas pelas coleiras eletrônicas, contribuindo para um manejo mais seguro, eficiente e orientado por dados.

O desenvolvimento prioriza a experiência do usuário (UX/UI), a organização das informações e a facilidade de utilização, considerando também as condições de conectividade encontradas em ambientes rurais.

---

## 🎯 Objetivo

Desenvolver uma aplicação móvel que permita aos produtores acompanhar e gerenciar seus rebanhos de maneira prática, centralizando informações importantes sobre os animais em um único ambiente.

Entre os principais objetivos estão:

- Facilitar o acompanhamento das condições dos bubalinos.
- Disponibilizar informações sobre localização e identificação dos animais.
- Apresentar dados fisiológicos, como temperatura corporal e frequência cardíaca.
- Exibir indicadores relacionados aos níveis de estresse.
- Permitir o acompanhamento do histórico de informações dos animais.
- Organizar o gerenciamento do rebanho e das coleiras inteligentes.
- Proporcionar uma experiência de utilização simples e intuitiva.

## ✨ Funcionalidades

A aplicação contempla módulos voltados ao gerenciamento e monitoramento dos animais.

### 🔐 Autenticação

Interface destinada ao acesso dos produtores à plataforma, contemplando o fluxo de entrada e criação de contas.

### 📊 Dashboard de Monitoramento

Painel principal desenvolvido para apresentar uma visão geral do rebanho.

Entre as informações previstas estão:

- Total de bubalinos cadastrados.
- Temperatura média dos animais.
- Quantidade de coleiras ativas.
- Indicadores gerais de monitoramento.
- Alertas relacionados às condições dos animais.

### 🐃 Gestão do Rebanho

Módulo destinado à visualização e ao gerenciamento dos animais cadastrados.

Informações contempladas:

- Nome e identificação do animal.
- Número da etiqueta.
- Raça.
- Sexo.
- Data de nascimento.
- Informações relacionadas à coleira.

### 📍 Monitoramento e Geolocalização

Interface destinada ao acompanhamento da localização dos animais por meio dos dados enviados pelas coleiras inteligentes.

A proposta é permitir:

- Visualização da localização dos animais em mapa.
- Identificação dos animais monitorados.
- Acompanhamento da localização registrada.
- Identificação de animais fora da área monitorada.

### ❤️ Monitoramento Fisiológico

Apresentação das informações coletadas pelos sensores instalados nas coleiras.

Entre os principais indicadores estão:

- Temperatura corporal (°C).
- Frequência cardíaca (BPM).
- Histórico de medições.
- Informações relacionadas ao estado de estresse.

### 🔔 Alertas e Status dos Animais

O aplicativo utiliza indicadores visuais para facilitar a identificação das condições dos animais.

Os estados considerados na aplicação incluem:

| Status | Significado |
|---|---|
| 🟢 Saudável | Animal dentro das condições esperadas. |
| 🔴 Estressado | Animal com indicadores associados a possível estresse elevado. |
| 🟡 Sem sinal | Ausência de comunicação ou dados recentes. |
| 🟠 Fora da área | Animal identificado fora da área monitorada. |

---

## 🏗️ Arquitetura da Aplicação

O BUBATAG Mobile foi desenvolvido como parte de uma arquitetura integrada, na qual o aplicativo representa a camada de interação entre o produtor e os dados do sistema.

### Fluxo de funcionamento proposto

```text
       [ COLEIRA INTELIGENTE ]
          ESP32 + Sensores
                  |
                  v
          [ COMUNICAÇÃO IoT ]
             LoRaWAN / Wi-Fi
                  |
                  v
            [ API-BUBATAG ]
                  |
          +-------+-------+
          |               |
          v               v
      [ MongoDB ]    [ Inteligência
                       Artificial ]
          |               |
          +-------+-------+
                  |
                  v
           [ MOBILE APP ]
           React Native
                  |
                  v
          [ PRODUTOR RURAL ]
```

**Importante:** esse diagrama representa a arquitetura planejada para integração dos componentes. Atualmente, o desenvolvimento mobile utiliza dados simulados (mocks) para permitir a implementação e validação das interfaces enquanto a integração definitiva com a API é preparada.

---

## 🛠️ Tecnologias Utilizadas

O aplicativo utiliza tecnologias modernas para desenvolvimento mobile multiplataforma, organização do código e gerenciamento de dados.

| Tecnologia | Aplicação |
|---|---|
| React Native | Desenvolvimento da aplicação mobile. |
| Expo | Ambiente de desenvolvimento e execução do aplicativo. |
| TypeScript | Tipagem estática e organização do código. |
| Expo Router | Gerenciamento de telas e navegação baseada em arquivos. |
| NativeWind | Estilização utilizando classes utilitárias no padrão Tailwind CSS. |
| Zustand | Gerenciamento de estado global. |
| TanStack Query | Gerenciamento de dados assíncronos e requisições. |

### Principais tecnologias

**React Native + Expo**

Permitem desenvolver uma aplicação multiplataforma utilizando uma única base de código, facilitando o desenvolvimento e a execução em dispositivos Android e iOS.

**TypeScript**

Adiciona tipagem estática ao JavaScript, contribuindo para a organização, manutenção e segurança do código.

**Expo Router**

Organiza a navegação da aplicação por meio de uma estrutura baseada em arquivos e diretórios.

**NativeWind**

Permite aplicar estilos utilizando classes utilitárias, mantendo consistência visual entre os componentes.

**Zustand**

Gerencia estados compartilhados entre diferentes telas e componentes da aplicação.

**TanStack Query**

Organiza o gerenciamento de dados assíncronos, cache e atualização das informações recebidas pelos serviços.

---

## 📁 Organização do Repositório

O projeto está organizado para separar as responsabilidades da aplicação, facilitando a manutenção e a evolução do código.

```text
mobile-plataforma_iot_monitoramento_bubalinos/
│
├── mobile-bubatag/
│   ├── assets/
│   │   ├── fonts/
│   │   └── imagens e recursos visuais
│   │
│   ├── src/
│   │   ├── app/
│   │   │   └── Telas e rotas da aplicação
│   │   │
│   │   ├── components/
│   │   │   └── Componentes reutilizáveis
│   │   │
│   │   ├── types/
│   │   │   └── Interfaces e tipagens TypeScript
│   │   │
│   │   ├── services/
│   │   │   └── Serviços e dados simulados
│   │   │
│   │   ├── store/
│   │   │   └── Gerenciamento de estado global
│   │   │
│   │   ├── theme/
│   │   │   └── Configurações visuais
│   │   │
│   │   └── utils/
│   │       └── Funções auxiliares
│   │
│   └── Arquivos de configuração do Expo
│
├── Context.md
├── LICENSE
└── README.md
```

### Descrição dos diretórios

| Diretório | Responsabilidade |
|---|---|
| `assets/` | Armazenamento de imagens, fontes, logotipos e recursos estáticos. |
| `src/app/` | Telas e rotas da aplicação. |
| `src/components/` | Componentes visuais reutilizáveis. |
| `src/types/` | Interfaces e definições de tipos TypeScript. |
| `src/services/` | Comunicação com serviços, dados simulados e futura integração com a API. |
| `src/store/` | Gerenciamento de estado global utilizando Zustand. |
| `src/theme/` | Configurações de identidade visual e estilos. |
| `src/utils/` | Funções auxiliares utilizadas em diferentes partes do aplicativo. |

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

- [Node.js](https://nodejs.org/) instalado.
- npm ou Yarn para gerenciamento de dependências.
- [Git](https://git-scm.com/) para clonar o repositório.
- [Expo Go](https://expo.dev/go) para executar a aplicação em um dispositivo físico.
- Android Studio ou Xcode, caso deseje utilizar um emulador ou simulador compatível.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/bubatag/mobile-plataforma_iot_monitoramento_bubalinos.git
```

### 2. Acessar o diretório do aplicativo

```bash
cd mobile-plataforma_iot_monitoramento_bubalinos/mobile-bubatag
```

### 3. Instalar as dependências

Utilizando npm:

```bash
npm install
```

Ou utilizando Yarn:

```bash
yarn install
```

### 4. Iniciar o ambiente de desenvolvimento

Execute:

```bash
npx expo start
```

Após a inicialização, o Expo disponibilizará um QR Code no terminal ou na interface de desenvolvimento.

### 5. Executar a aplicação

**Dispositivo físico**

1. Instale o Expo Go no smartphone.
2. Certifique-se de que o computador e o smartphone estejam na mesma rede Wi-Fi.
3. Abra o Expo Go.
4. Escaneie o QR Code apresentado pelo Expo.

**Emulador Android**

Com um emulador Android configurado e em execução, pressione:

```text
a
```

**Simulador iOS**

Em um ambiente macOS com Xcode configurado, pressione:

```text
i
```

---

## 🔄 Desenvolvimento e Integração de Dados

Atualmente, o desenvolvimento da interface utiliza a abordagem **Mock Driven Development**.

Essa estratégia permite desenvolver e validar as funcionalidades do aplicativo utilizando dados simulados, sem depender da disponibilidade da API definitiva.

Os serviços simulados seguem a estrutura de dados planejada para o banco não relacional do BUBATAG.

### Estrutura dos dados

As principais entidades consideradas na aplicação incluem:

| Entidade | Descrição |
|---|---|
| Usuario | Informações dos produtores cadastrados. |
| Bubalino | Dados de identificação e cadastro dos animais. |
| Coleira | Informações dos dispositivos de monitoramento. |
| DadosBiometricos | Registros de temperatura e frequência cardíaca. |
| HistoricoEstresse | Histórico de estados relacionados ao estresse. |
| Localizacao | Coordenadas geográficas dos animais. |

### Integração futura

Com a disponibilização e estabilização da API-BUBATAG, os serviços simulados poderão ser substituídos pelas chamadas reais, mantendo a organização das interfaces e dos componentes.

Essa abordagem permite que o desenvolvimento da aplicação mobile avance de maneira independente, facilitando a integração posterior com o backend.

---

## 🎨 Interface e Experiência do Usuário

O desenvolvimento visual do BUBATAG Mobile prioriza uma experiência simples, moderna e funcional.

A interface considera as necessidades dos produtores rurais, buscando facilitar a interpretação das informações e reduzir a complexidade na utilização do sistema.

Os principais princípios adotados são:

- **Usabilidade:** navegação simples e intuitiva.
- **UX/UI:** experiência de utilização planejada para o contexto rural.
- **Legibilidade:** informações organizadas e fáceis de interpretar.
- **Contraste:** identificação visual clara de indicadores e alertas.
- **Consistência:** padronização de componentes e elementos visuais.
- **Acessibilidade:** apresentação objetiva das informações para diferentes perfis de usuários.

---

## 🔗 Integração com os Demais Projetos

O BUBATAG Mobile faz parte de um ecossistema de soluções tecnológicas desenvolvido para integrar dispositivos IoT, processamento de dados e interfaces de gerenciamento.

Cada repositório possui uma responsabilidade específica dentro da arquitetura geral.

| Repositório | Responsabilidade |
|---|---|
| [BUBATAG](https://github.com/bubatag/bubatag) | Apresentação institucional e visão geral do projeto. |
| [sistema-frontend](https://github.com/bubatag/sistema-frontend) | Interface web para gerenciamento e visualização das informações. |
| [mobile-plataforma_iot_monitoramento_bubalinos](https://github.com/bubatag/mobile-plataforma_iot_monitoramento_bubalinos) | Aplicativo móvel para acompanhamento e gerenciamento do rebanho. |
| [API-bubatag](https://github.com/bubatag/API-bubatag) | API REST, processamento de dados e serviços de inteligência. |
| [DB-BUBATAG](https://github.com/bubatag/DB-BUBATAG) | Modelagem e organização dos bancos de dados. |

---

## 👥 Equipe de Desenvolvimento

Projeto desenvolvido no contexto do curso de **Desenvolvimento de Software Multiplataforma da FATEC Registro**, integrando tecnologia, Internet das Coisas e inovação aplicada à pecuária bubalina.

Conheça a organização e acompanhe os demais projetos:

🐃 [GitHub — BUBATAG](https://github.com/bubatag)
