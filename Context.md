# Contexto do Projeto: Bubatag (Mobile)

## 1. Visão Geral
O projeto **Bubatag** é um aplicativo mobile focado no monitoramento de estresse, geolocalização e saúde de bubalinos. O sistema consome dados de coleiras inteligentes (IoT via LoRaWAN/ESP32) que capturam batimentos cardíacos, temperatura e localização. A IA de retaguarda processa esses dados para classificar o nível de estresse do animal.
A API real ainda não está pronta. Todo o desenvolvimento front-end deve utilizar o padrão **Mock Driven Development**, simulando chamadas assíncronas baseadas na estrutura do banco NoSQL fornecida.

## 2. Stack Tecnológico e Arquitetura
* **Framework:** React Native com **Expo** (Managed Workflow).
* **Roteamento:** Expo Router (File-based routing).
* **Linguagem:** TypeScript (Tipagem estrita obrigatória).
* **Estilização:** NativeWind (Tailwind CSS para React Native - Versão 4).
* **Design System:** Estilo visual **minimalista e moderno**, garantindo alta performance e legibilidade, especialmente para uso em campo (telas de alto contraste).
* **Gerenciamento de Estado de UI/Global:** Zustand.
* **Gerenciamento de Dados Assíncronos (Mocks/API):** TanStack Query (React Query).

## 3. Estrutura de Pastas Padrão
Siga esta estrutura ao gerar novos arquivos e importar recursos:
/ (Raiz)
  /assets         # Recursos estáticos
    /fonts        # Fontes personalizadas (Fonarto.ttf, Lato-Regular.ttf)
    logotipo.svg  # Logo principal
    simbolo.svg   # Símbolo da marca
  /src
    /app          # Telas e rotas (Expo Router)
    /components   # Componentes de UI atômicos e reutilizáveis (Botões, Cards, Badges)
    /types        # Interfaces TypeScript (Modelos de dados)
    /services     # Funções de mock (simulando fetch/axios) e futura integração com API
    /store        # Hooks do Zustand para estado global
    /theme        # Configurações adicionais de tema
    /utils        # Funções auxiliares (formatação de data, cálculo de idade, etc.)

## 4. Escopo do Aplicativo Mobile
O app mobile é projetado para ser leve, direto e operável em áreas de conectividade limitada. 
As principais telas e componentes incluem:
1.  **Tela de Monitoramento / Mapa:** * Exibe a localização em tempo real (mapa).
    * Lista de animais com: ID do animal, número da etiqueta, número da coleira.
    * **Status Visual:** Indicador em verde (saudável / dentro do limite) ou vermelho (estresse elevado / fora da cerca virtual).
2.  **Ficha do Animal (Detalhes):**
    * Dados de identificação: Etiqueta, Nome, Sexo, Idade/Data de Nasc., Raça.
    * Telemetria em tempo real: Temperatura corporal (°C) e Batimentos Cardíacos (BPM).
    * Histórico de alertas e estresse.

## 5. Modelagem de Dados e Tipagem TypeScript (Baseado no NoSQL)
Sempre utilize estas interfaces ao tipar componentes e retornos de serviços.
```typescript
// /src/types/index.ts

export interface Localizacao {
  _id: string;
  latitude: string;
  longitude: string;
  ativo: boolean;
}

export interface HistoricoEstresse {
  _id: string;
  estado_estresse: "Ocioso" | "Estressado" | string;
  data_estresse: Date | string; // Considerar string ISO para mocks JSON
  ativo: boolean;
}

export interface DadosBiometricos {
  _id: string;
  batimento_cardiaco: number;
  temperatura: number;
  ativo: boolean;
  data: Date | string;
}

export interface Bubalino {
  _id: string;
  nome: string;
  raca: string;
  n_etiqueta: string;
  dt_nasc: Date | string;
  sexo: "Masculino" | "Feminino" | string;
  ativo: boolean;
  dados: DadosBiometricos[];
  historico_estresse: HistoricoEstresse[];
  localizacao?: Localizacao[]; // Pode não vir preenchido se não houver histórico
}

export interface Coleira {
  _id: string;
  n_coleira: string;
  coleira_localizacao: string;
  IP: string;
  ativo: boolean;
  bubalino?: Bubalino; // Opcional, pois uma coleira pode não ter um búfalo atrelado
}

export interface Usuario {
  _id: string;
  nome: string;
  email: string;
  CCIR: string;
  ativo: boolean;
  coleiras: Coleira[];
}