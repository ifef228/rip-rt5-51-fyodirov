import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { gasTemperatureRanges } from "../../data/mockOrderData";

// Расширенные данные о газах с ценами
const gasDetails = {
  1: {
    id: 1,
    name: "CO₂ (Углекислый газ)",
    fullName: "Диоксид углерода",
    concentration: "0.04%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-5.png",
    price: "₽2,500",
    pricePerVolume: "за м³",
    description: "Углекислый газ - это бесцветный газ без запаха, который является важной частью углеродного цикла Земли. Он играет ключевую роль в парниковом эффекте и является основным продуктом сгорания органических веществ.",
    properties: [
      "Молекулярная формула: CO₂",
      "Молярная масса: 44.01 г/моль",
      "Плотность: 1.977 г/л (при 0°C)",
      "Температура кипения: -78.5°C",
      "Растворимость в воде: высокая"
    ],
    applications: [
      "Пищевая промышленность (газированные напитки)",
      "Огнетушители",
      "Сварочные работы",
      "Холодильная техника",
      "Сельское хозяйство (парниковый эффект)"
    ]
  },
  2: {
    id: 2,
    name: "O₂ (Кислород)",
    fullName: "Молекулярный кислород",
    concentration: "20.95%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-12.png",
    price: "₽1,800",
    pricePerVolume: "за м³",
    description: "Кислород - это химический элемент, жизненно необходимый для большинства живых организмов. Он составляет около 21% атмосферы Земли и является ключевым компонентом для дыхания.",
    properties: [
      "Молекулярная формула: O₂",
      "Молярная масса: 32.00 г/моль",
      "Плотность: 1.429 г/л (при 0°C)",
      "Температура кипения: -183°C",
      "Цвет: бесцветный"
    ],
    applications: [
      "Медицина (дыхательная терапия)",
      "Металлургия (сталеплавильное производство)",
      "Акваланги и космические корабли",
      "Химическая промышленность",
      "Очистка сточных вод"
    ]
  },
  3: {
    id: 3,
    name: "Ar (Аргон)",
    fullName: "Аргон",
    concentration: "0.93%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-13.png",
    price: "₽3,200",
    pricePerVolume: "за м³",
    description: "Аргон - это благородный газ, который составляет около 1% атмосферы Земли. Он инертен и не вступает в химические реакции при обычных условиях, что делает его полезным для различных промышленных применений.",
    properties: [
      "Атомная формула: Ar",
      "Атомная масса: 39.95 г/моль",
      "Плотность: 1.784 г/л (при 0°C)",
      "Температура кипения: -185.8°C",
      "Инертный газ"
    ],
    applications: [
      "Сварочные работы (защитная атмосфера)",
      "Лампы накаливания",
      "Криогенные применения",
      "Научные исследования",
      "Пищевая промышленность (упаковка)"
    ]
  },
  4: {
    id: 4,
    name: "N₂ (Азот)",
    fullName: "Молекулярный азот",
    concentration: "78.08%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-14.png",
    price: "₽1,200",
    pricePerVolume: "за м³",
    description: "Азот - это самый распространенный газ в атмосфере Земли, составляющий около 78% её объёма. Он является основным компонентом белков и ДНК, что делает его жизненно важным для всех живых организмов.",
    properties: [
      "Молекулярная формула: N₂",
      "Молярная масса: 28.01 г/моль",
      "Плотность: 1.251 г/л (при 0°C)",
      "Температура кипения: -195.8°C",
      "Инертный при обычных условиях"
    ],
    applications: [
      "Производство аммиака и удобрений",
      "Пищевая промышленность (упаковка)",
      "Электроника (защитная атмосфера)",
      "Медицина (криотерапия)",
      "Автомобильная промышленность"
    ]
  },
  5: {
    id: 5,
    name: "H₂O (Водяной пар)",
    fullName: "Водяной пар",
    concentration: "0-4%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-15.png",
    price: "₽800",
    pricePerVolume: "за м³",
    description: "Водяной пар - это газообразное состояние воды, которое играет важную роль в климатических процессах. Его концентрация в атмосфере сильно варьируется в зависимости от температуры и влажности.",
    properties: [
      "Молекулярная формула: H₂O",
      "Молярная масса: 18.02 г/моль",
      "Плотность: 0.804 г/л (при 100°C)",
      "Температура кипения: 100°C",
      "Парниковый газ"
    ],
    applications: [
      "Климатические системы",
      "Пищевая промышленность",
      "Фармацевтика",
      "Энергетика (паровые турбины)",
      "Сельское хозяйство"
    ]
  }
};

export const AtmosphericGasDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const gasId = parseInt(id || "1");
  const gas = gasDetails[gasId as keyof typeof gasDetails];

  // Состояние для полей ввода
  const [temperature, setTemperature] = useState(gas?.temperature || "15");
  const [concentration, setConcentration] = useState(gas?.concentration || "0.04");
  const [temperatureError, setTemperatureError] = useState("");
  const [concentrationError, setConcentrationError] = useState("");

  if (!gas) {
    return (
      <div className="min-h-screen bg-[#e1e1e1] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Газ не найден</h1>
          <Button onClick={() => navigate("/")} className="bg-[#dff0a5] hover:bg-[#dff0a5ad]">
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate("/");
  };

  // Валидация температуры
  const validateTemperature = (value: string) => {
    const temp = parseFloat(value);
    const range = gasTemperatureRanges[gasId as keyof typeof gasTemperatureRanges];

    if (isNaN(temp)) {
      setTemperatureError("Температура должна быть числом");
      return false;
    }

    if (temp < range.min || temp > range.max) {
      setTemperatureError(`Температура должна быть от ${range.min}°C до ${range.max}°C для газообразного состояния`);
      return false;
    }

    setTemperatureError("");
    return true;
  };

  // Валидация концентрации
  const validateConcentration = (value: string) => {
    const conc = parseFloat(value);

    if (isNaN(conc)) {
      setConcentrationError("Концентрация должна быть числом");
      return false;
    }

    if (conc <= 0 || conc > 100) {
      setConcentrationError("Концентрация должна быть больше 0 и не больше 100%");
      return false;
    }

    setConcentrationError("");
    return true;
  };

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTemperature(value);
    validateTemperature(value);
  };

  const handleConcentrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConcentration(value);
    validateConcentration(value);
  };

  const handleOrderClick = () => {
    const isTempValid = validateTemperature(temperature);
    const isConcValid = validateConcentration(concentration);

    if (isTempValid && isConcValid) {
      // Переход на страницу расчета с выбранным газом
      navigate("/temperature-calculation", {
        state: { selectedGases: [gas.id] }
      });
    } else {
      alert("Пожалуйста, исправьте ошибки в полях ввода");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#e1e1e1]">
      {/* Header */}
      <header className="w-full h-[164px] bg-[#f8f8f8] translate-y-[-1rem] animate-fade-in opacity-0">
        <div className="container mx-auto px-8 py-8 flex items-center gap-4">
          <Button
            onClick={handleBackClick}
            className="gas_btn_secondary w-[50px] h-[50px] rounded-lg shadow-md flex items-center justify-center"
          >
            <span className="text-xl">←</span>
          </Button>
          <h1 className="text-4xl font-bold text-black tracking-[-0.70px] [font-family:'Inter',Helvetica]">
            AtmosphericTempCalc
          </h1>
          <img
            className="w-[110px] h-[110px] object-cover"
            alt="AtmosphereTemp Logo"
            src="https://c.animaapp.com/mfi4rqisUqRMxb/img/image-4.png"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full py-8">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-6">
              <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <img
                      className="w-[200px] h-[200px] object-cover rounded-lg mx-auto mb-6"
                      alt={gas.name}
                      src={gas.image}
                    />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {gas.name}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      {gas.fullName}
                    </p>
                    <div className="bg-[#dff0a5ad] rounded-lg p-4 mb-6">
                      <div className="text-2xl font-bold text-gray-800">
                        {gas.price}
                      </div>
                      <div className="text-sm text-gray-600">
                        {gas.pricePerVolume}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Input Fields */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Параметры расчета
                  </h3>

                  {/* Temperature Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Температура (°C)
                    </label>
                    <Input
                      type="number"
                      value={temperature}
                      onChange={handleTemperatureChange}
                      className={`w-full h-[50px] bg-[#f8f8f8] border rounded-lg px-4 ${
                        temperatureError ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Введите температуру"
                    />
                    {temperatureError && (
                      <p className="text-red-500 text-sm mt-1">{temperatureError}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Диапазон для газообразного состояния: {gasTemperatureRanges[gasId as keyof typeof gasTemperatureRanges]?.min}°C - {gasTemperatureRanges[gasId as keyof typeof gasTemperatureRanges]?.max}°C
                    </p>
                  </div>

                  {/* Concentration Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Концентрация (%)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={concentration}
                      onChange={handleConcentrationChange}
                      className={`w-full h-[50px] bg-[#f8f8f8] border rounded-lg px-4 ${
                        concentrationError ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Введите концентрацию"
                    />
                    {concentrationError && (
                      <p className="text-red-500 text-sm mt-1">{concentrationError}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Введите значение от 0 (не включительно) до 100%
                    </p>
                  </div>

                  {/* Order Button */}
                  <Button
                    onClick={handleOrderClick}
                    className="gas_btn w-full h-[60px] text-lg font-semibold"
                  >
                    Рассчитать температуру
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="space-y-6">
              {/* Description */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Описание
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {gas.description}
                  </p>
                </CardContent>
              </Card>

              {/* Properties */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Физические свойства
                  </h3>
                  <ul className="space-y-2">
                    {gas.properties.map((property, index) => (
                      <li key={index} className="text-gray-600 flex items-start">
                        <span className="text-[#dff0a5] mr-2">•</span>
                        {property}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Applications */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Применение
                  </h3>
                  <ul className="space-y-2">
                    {gas.applications.map((application, index) => (
                      <li key={index} className="text-gray-600 flex items-start">
                        <span className="text-[#dff0a5] mr-2">•</span>
                        {application}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Atmospheric Data */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Атмосферные данные
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#f8f8f8] rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Концентрация</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {gas.concentration}
                      </div>
                    </div>
                    <div className="bg-[#f8f8f8] rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Температура</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {gas.temperature}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
