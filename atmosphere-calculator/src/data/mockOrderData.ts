// Мок данные для заказа с бэкенда
export interface OrderGasItem {
  id: number;
  name: string;
  concentration: number; // в процентах
  temperature: number; // в градусах Цельсия
  price: number; // цена за 1 м³ воздуха с данной концентрацией
  image: string;
}

export const mockOrderData: OrderGasItem[] = [
  {
    id: 1,
    name: "CO₂ (Углекислый газ)",
    concentration: 0.04,
    temperature: 15,
    price: 2500,
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-5.png"
  },
  {
    id: 2,
    name: "O₂ (Кислород)",
    concentration: 20.95,
    temperature: 15,
    price: 1800,
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-12.png"
  },
  {
    id: 3,
    name: "Ar (Аргон)",
    concentration: 0.93,
    temperature: 15,
    price: 3200,
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-13.png"
  },
  {
    id: 4,
    name: "N₂ (Азот)",
    concentration: 78.08,
    temperature: 15,
    price: 1200,
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-14.png"
  },
  {
    id: 5,
    name: "H₂O (Водяной пар)",
    concentration: 2.5,
    temperature: 15,
    price: 800,
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-15.png"
  }
];

// Данные о температурных диапазонах для газов (в газообразном состоянии)
export const gasTemperatureRanges = {
  1: { min: -78.5, max: 2000 }, // CO2: от сублимации до высоких температур
  2: { min: -183, max: 2000 },  // O2: от кипения до высоких температур
  3: { min: -185.8, max: 2000 }, // Ar: от кипения до высоких температур
  4: { min: -195.8, max: 2000 }, // N2: от кипения до высоких температур
  5: { min: 0, max: 100 }        // H2O: от замерзания до кипения
};
