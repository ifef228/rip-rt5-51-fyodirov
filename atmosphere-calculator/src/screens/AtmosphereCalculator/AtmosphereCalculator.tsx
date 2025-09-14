import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

const atmosphericGases = [
  {
    id: 1,
    name: "CO₂ (Углекислый газ)",
    concentration: "0.04%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-5.png",
  },
  {
    id: 2,
    name: "O₂ (Кислород)",
    concentration: "20.95%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-12.png",
  },
  {
    id: 3,
    name: "Ar (Аргон)",
    concentration: "0.93%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-13.png",
  },
  {
    id: 4,
    name: "N₂ (Азот)",
    concentration: "78.08%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-14.png",
  },
  {
    id: 5,
    name: "H₂O (Водяной пар)",
    concentration: "0-4%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-15.png",
  },
];

export const AtmosphereCalculator = (): JSX.Element => {
  const [cartCount, setCartCount] = useState(2);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div
      className="relative min-h-screen w-full bg-[#e1e1e1]"
      data-model-id="14:69"
    >
      {/* Header */}
      <header className="w-full h-[164px] bg-[#f8f8f8] translate-y-[-1rem] animate-fade-in opacity-0">
        <div className="container mx-auto px-8 py-8 flex items-center gap-4">
          <h1 className="text-4xl font-bold text-black tracking-[-0.70px] [font-family:'Inter',Helvetica]">
            AtmosphereTemp
          </h1>
          <img
            className="w-[110px] h-[110px] object-cover"
            alt="AtmosphereTemp Logo"
            src="https://c.animaapp.com/mfi4rqisUqRMxb/img/image-4.png"
          />
        </div>
      </header>

      {/* Search Section */}
      <section className="w-full py-8 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="container mx-auto px-8">
          <div className="flex justify-center">
            <div className="flex items-center gap-4 max-w-md w-full">
              <div className="flex-1 h-[60px] bg-[#dff1a54a] rounded-lg border border-solid border-[#dfdfdf] shadow-button-shadow">
                <Input
                  className="w-full h-full bg-transparent border-0 px-4 placeholder:text-[#828282] placeholder:font-small-text placeholder:text-[length:var(--small-text-font-size)]"
                  placeholder="Поиск газа атмосферы"
                />
              </div>
              <Button className="w-[60px] h-[60px] bg-[#dff1a5ad] rounded-lg shadow-button-shadow hover:bg-[#dff1a5] transition-colors flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Atmospheric Gases Grid */}
      <main className="w-full py-8">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {atmosphericGases.map((gas, index) => (
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
                    <span className="font-medium">Концентрация:</span> {gas.concentration}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Температура:</span> {gas.temperature}
                  </p>
                </div>
              </div>

              {/* Button Section */}
              <div className="flex-shrink-0">
                <Button
                  onClick={addToCart}
                  className="w-[100px] h-[50px] bg-[#dff0a5ad] hover:bg-[#dff0a5] transition-colors rounded-lg shadow-md"
                >
                  <span className="text-sm font-medium text-black">
                    расчет
                  </span>
                </Button>
              </div>
            </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Shopping Cart - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Cart Icon */}
          <div className="w-16 h-16 bg-[#dff0a5] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-110">
            <span className="text-2xl">🛒</span>
          </div>

          {/* Cart Count Badge */}
          {cartCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg animate-pulse">
              {cartCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
