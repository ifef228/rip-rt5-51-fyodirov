import { Gas, PaginatedResponse } from '../types';

// Mock данные для газов (на случай недоступности бэкенда)
export const mockGases: Gas[] = [
  {
    id: 1,
    name: "Азот",
    formula: "N₂",
    detailedDescription: "Азот - химический элемент 15-й группы главной подгруппы второго периода периодической системы. Это бесцветный газ без вкуса и запаха, который составляет около 78% атмосферы Земли.",
    imageUrl: null
  },
  {
    id: 2,
    name: "Кислород",
    formula: "O₂",
    detailedDescription: "Кислород - химический элемент 16-й группы. Важнейший биогенный элемент, составляющий около 21% атмосферы Земли. Необходим для дыхания большинства живых организмов.",
    imageUrl: null
  },
  {
    id: 3,
    name: "Аргон",
    formula: "Ar",
    detailedDescription: "Аргон - инертный одноатомный газ без цвета, вкуса и запаха. Третий по распространённости газ в атмосфере Земли (около 0.93%).",
    imageUrl: null
  },
  {
    id: 4,
    name: "Углекислый газ",
    formula: "CO₂",
    detailedDescription: "Углекислый газ - бесцветный газ со слегка кисловатым запахом и вкусом. Один из парниковых газов. Необходим для фотосинтеза растений.",
    imageUrl: null
  },
  {
    id: 5,
    name: "Неон",
    formula: "Ne",
    detailedDescription: "Неон - инертный одноатомный газ без цвета и запаха. Второй по лёгкости инертный газ после гелия. Применяется в газоразрядных лампах.",
    imageUrl: null
  },
  {
    id: 6,
    name: "Гелий",
    formula: "He",
    detailedDescription: "Гелий - второй по лёгкости элемент после водорода. Инертный одноатомный газ без цвета, вкуса и запаха. Не горит и не поддерживает горение.",
    imageUrl: null
  },
  {
    id: 7,
    name: "Метан",
    formula: "CH₄",
    detailedDescription: "Метан - простейший углеводород, бесцветный газ без запаха. Основной компонент природного газа. Является парниковым газом.",
    imageUrl: null
  },
  {
    id: 8,
    name: "Криптон",
    formula: "Kr",
    detailedDescription: "Криптон - инертный одноатомный газ без цвета, вкуса и запаха. Применяется в лампах накаливания, фотовспышках.",
    imageUrl: null
  }
];

// Функция для получения pag инированных mock данных
export const getMockGasesPaginated = (
  page: number = 0,
  size: number = 20,
  nameFilter?: string
): PaginatedResponse<Gas> => {
  let filteredGases = [...mockGases];

  // Фильтрация по названию
  if (nameFilter && nameFilter.trim() !== '') {
    const searchTerm = nameFilter.toLowerCase();
    filteredGases = filteredGases.filter(gas =>
      gas.name.toLowerCase().includes(searchTerm) ||
      gas.formula.toLowerCase().includes(searchTerm)
    );
  }

  const totalItems = filteredGases.length;
  const totalPages = Math.ceil(totalItems / size);
  const startIndex = page * size;
  const endIndex = startIndex + size;
  const items = filteredGases.slice(startIndex, endIndex);

  return {
    items,
    totalItems,
    totalPages,
    currentPage: page
  };
};

// Функция для получения одного газа по ID
export const getMockGasById = (id: number): Gas | undefined => {
  return mockGases.find(gas => gas.id === id);
};
