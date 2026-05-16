import { Bubalino, NewBubalino } from "../types";

let bubalinos: Bubalino[] = [
  { id: 1, n_etiqueta: "TE18", n_coleira: 1, status: 1, coordinate: { latitude: -23.5535, longitude: -46.634 } },
  { id: 2, n_etiqueta: "TA19", n_coleira: 2, status: 2, coordinate: { latitude: -23.5538, longitude: -46.635 } },
  { id: 3, n_etiqueta: "JI44", n_coleira: 3, status: 3, coordinate: { latitude: -23.5528, longitude: -46.633 } },
  { id: 4, n_etiqueta: "BC75", n_coleira: 4, status: 4, coordinate: { latitude: -23.5520, longitude: -46.636 } },
];

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export async function getBubalinos(): Promise<Bubalino[]> {
  await delay();
  // return a shallow copy to simulate API payload
  return bubalinos.map((b) => ({ ...b }));
}

export async function addBubalino(newB: NewBubalino): Promise<Bubalino> {
  await delay();
  const nextId = bubalinos.length ? Math.max(...bubalinos.map((b) => b.id)) + 1 : 1;
  const created: Bubalino = { id: nextId, ...newB };
  bubalinos = [created, ...bubalinos];
  return { ...created };
}

export async function clearMocks() {
  bubalinos = [];
}
