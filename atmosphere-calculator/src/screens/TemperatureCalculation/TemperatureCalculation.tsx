import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { mockOrderData, OrderGasItem } from "../../data/mockOrderData";

export const TemperatureCalculation = (): JSX.Element => {
  const navigate = useNavigate();
  const [orderGases] = useState<OrderGasItem[]>(mockOrderData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [calculatedTemperature, setCalculatedTemperature] = useState(15);

  // Расчет общей стоимости (за 1 м³ воздуха)
  useEffect(() => {
    const total = orderGases.reduce((sum, gas) => {
      return sum + gas.price;
    }, 0);
    setTotalPrice(total);
  }, [orderGases]);

  // Расчет температуры на основе концентрации газов
  useEffect(() => {
    // Упрощенная формула расчета температуры
    // CO2 и H2O увеличивают температуру, O2, N2, Ar - уменьшают
    let temperatureEffect = 0;

    orderGases.forEach(gas => {
      switch (gas.id) {
        case 1: // CO2 - парниковый эффект
          temperatureEffect += gas.concentration * 0.1;
          break;
        case 2: // O2 - охлаждающий эффект
          temperatureEffect -= gas.concentration * 0.05;
          break;
        case 3: // Ar - нейтральный
          temperatureEffect += gas.concentration * 0.02;
          break;
        case 4: // N2 - охлаждающий эффект
          temperatureEffect -= gas.concentration * 0.03;
          break;
        case 5: // H2O - парниковый эффект
          temperatureEffect += gas.concentration * 0.15;
          break;
      }
    });

    setCalculatedTemperature(Math.round((15 + temperatureEffect) * 10) / 10);
  }, [orderGases]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleCalculateClick = () => {
    alert(`Расчет завершен!\nИтоговая температура: ${calculatedTemperature}°C\nОбщая стоимость за 1 м³ воздуха: ₽${totalPrice.toLocaleString()}`);
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

      {/* Calculation Summary */}
      <section className="w-full py-8 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Temperature Result */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Расчетная температура
                  </h3>
                  <div className="text-4xl font-bold text-[#dff0a5] mb-2">
                    {calculatedTemperature}°C
                  </div>
                  <p className="text-sm text-gray-600">
                    На основе выбранных газов
                  </p>
                </CardContent>
              </Card>

              {/* Total Price */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Общая стоимость
                  </h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ₽{totalPrice.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">
                    За выбранные газы
                  </p>
                </CardContent>
              </Card>

              {/* Volume */}
              <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Объем воздуха
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    1 м³
                  </div>
                  <p className="text-sm text-gray-600">
                    Стандартный объем
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Order Gases List */}
      <main className="w-full py-8">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Состав атмосферного воздуха (1 м³)
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {orderGases.map((gas, index) => (
                <Card
                  key={gas.id}
                  className="relative w-full h-[250px] bg-white shadow-lg border border-gray-200 rounded-xl translate-y-[-1rem] animate-fade-in opacity-0 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    animationDelay: `${400 + index * 200}ms`,
                  }}
                >
                  <CardContent className="relative w-full h-full p-6 flex items-center gap-6">
                    {/* Image Section */}
                    <div className="flex-shrink-0">
                      <img
                        className="w-[120px] h-[120px] object-cover rounded-lg"
                        alt={gas.name}
                        src={gas.image}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-center gap-3">
                      <h3 className="text-2xl font-semibold text-gray-800 leading-tight">
                        {gas.name}
                      </h3>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Концентрация:</span> {gas.concentration}%
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Температура:</span> {gas.temperature}°C
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Цена за 1 м³:</span> ₽{gas.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center mt-12">
              <Button
                onClick={handleCalculateClick}
                className="gas_btn w-[300px] h-[60px] text-lg font-semibold"
              >
                Завершить расчет температуры
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
