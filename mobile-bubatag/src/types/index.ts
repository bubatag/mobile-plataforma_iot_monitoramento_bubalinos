export interface Bubalino {
  id: number;
  n_etiqueta: string;
  n_coleira: number;
  status: 1 | 2 | 3 | 4; // 1=healthy,2=alert,3=warning,4=offline
  coordinate?: {
    latitude: number;
    longitude: number;
  };
}

export type NewBubalino = Omit<Bubalino, 'id'>;
