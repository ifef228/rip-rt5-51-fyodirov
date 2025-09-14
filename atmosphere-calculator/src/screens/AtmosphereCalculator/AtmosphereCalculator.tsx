import React from "react";
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
    imageClasses: "w-[166px] h-[150px]",
    position: "top-[383px] left-11",
  },
  {
    id: 2,
    name: "O₂ (Кислород)",
    concentration: "20.95%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-12.png",
    imageClasses: "w-[148px] h-[148px]",
    position: "top-[383px] left-[670px]",
  },
  {
    id: 3,
    name: "Ar (Аргон)",
    concentration: "0.93%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-13.png",
    imageClasses: "w-[182px] h-[182px]",
    position: "top-[635px] left-[43px]",
  },
  {
    id: 4,
    name: "N₂ (Азот)",
    concentration: "78.08%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-14.png",
    imageClasses: "w-[124px] h-[124px]",
    position: "top-[679px] left-[681px]",
  },
  {
    id: 5,
    name: "H₂O (Водяной пар)",
    concentration: "0-4%",
    temperature: "15°C",
    image: "https://c.animaapp.com/mfi4rqisUqRMxb/img/image-15.png",
    imageClasses: "w-[125px] h-[188px]",
    position: "top-[887px] left-[43px]",
  },
];

export const AtmosphereCalculator = (): JSX.Element => {
  return (
    <div
      className="relative w-[1368px] h-[1969px] bg-[#e1e1e1]"
      data-model-id="14:69"
    >
      {/* Header */}
      <header className="w-[1368px] h-[164px] bg-[#f8f8f8] translate-y-[-1rem] animate-fade-in opacity-0">
        <div className="relative w-[314px] h-[110px] top-[29px] left-7">
          <h1 className="w-[297px] top-7 left-0 [font-family:'Inter',Helvetica] font-bold text-black text-[35px] tracking-[-0.70px] leading-[normal] absolute">
            AtmosphereTemp
          </h1>
          <img
            className="w-[110px] h-[110px] top-0 left-[204px] absolute object-cover"
            alt="AtmosphereTemp Logo"
            src="https://c.animaapp.com/mfi4rqisUqRMxb/img/image-4.png"
          />
        </div>
      </header>

      {/* Search Section */}
      <section className="w-[408px] h-[60px] gap-10 top-[283px] left-[466px] flex flex-col items-start absolute translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="flex w-[571px] h-[71px] items-start gap-8 relative mb-[-11.00px] mr-[-163.00px]">
          <div className="relative w-[408px] h-[60px] bg-[#dff1a54a] rounded-lg border border-solid border-[#dfdfdf] shadow-button-shadow">
            <Input
              className="w-full h-full bg-transparent border-0 px-4 placeholder:text-[#828282] placeholder:font-small-text placeholder:text-[length:var(--small-text-font-size)]"
              placeholder="Поиск газа атмосферы"
            />
          </div>
          <Button className="flex w-[86px] h-[60px] items-center gap-2 px-8 py-5 bg-[#dff1a5ad] rounded-lg shadow-button-shadow hover:bg-[#dff1a5] transition-colors h-auto">
            <span className="w-fit mt-[-9.00px] mb-[-7.00px] mr-[-2.00px] text-2xl leading-9 whitespace-nowrap [font-family:'Inter',Helvetica] font-medium text-black tracking-[0]">
              🔍
            </span>
          </Button>
        </div>
      </section>

      {/* Atmospheric Gases Grid */}
      <main className="grid grid-cols-2 gap-8 absolute top-[383px] left-11 w-[1266px]">
        {atmosphericGases.map((gas, index) => (
          <Card
            key={gas.id}
            className={`relative w-[598px] h-[212px] bg-white shadow-none border-0 translate-y-[-1rem] animate-fade-in opacity-0 hover:shadow-lg transition-[transform,box-shadow] hover:scale-[1.02]`}
            style={{
              animationDelay: `${400 + index * 200}ms`,
              position:
                index === 0
                  ? "absolute"
                  : index === 1
                    ? "absolute"
                    : index === 2
                      ? "absolute"
                      : index === 3
                        ? "absolute"
                        : "absolute",
              top:
                index === 0
                  ? "0px"
                  : index === 1
                    ? "0px"
                    : index === 2
                      ? "252px"
                      : index === 3
                        ? "296px"
                        : "504px",
              left:
                index === 0
                  ? "0px"
                  : index === 1
                    ? "626px"
                    : index === 2
                      ? "0px"
                      : index === 3
                        ? "626px"
                        : "0px",
            }}
          >
            <CardContent className="relative w-full h-full p-0">
              <img
                className={`${gas.imageClasses} absolute object-cover ${
                  index === 0
                    ? "top-[31px] left-0"
                    : index === 1
                      ? "top-[33px] left-[3px]"
                      : index === 2
                        ? "top-[15px] left-0"
                        : index === 3
                          ? "top-[25px] left-[11px]"
                          : "top-3 left-[13px]"
                }`}
                alt={gas.name}
                src={gas.image}
              />
              <div
                className={`absolute ${
                  index === 0
                    ? "w-[191px] h-[89px] top-[61px] left-[171px]"
                    : index === 1
                      ? "w-[191px] h-[89px] top-[61px] left-[137px]"
                      : index === 2
                        ? "w-[191px] h-[89px] top-[61px] left-[182px]"
                        : index === 3
                          ? "w-[191px] h-[89px] top-[59px] left-[139px]"
                          : "w-[154px] h-[89px] top-[61px] left-[166px]"
                } flex flex-col items-start justify-center gap-1`}
              >
                <h3 className="self-stretch text-2xl text-center leading-[35px] [font-family:'Inter',Helvetica] font-medium text-black tracking-[0]">
                  {gas.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Концентрация: {gas.concentration}
                </p>
                <p className="text-sm text-gray-600">
                  Температура: {gas.temperature}
                </p>
              </div>
              <Button
                className={`absolute w-[79px] h-[85px] bg-[#dff0a5ad] rounded-lg shadow-button-shadow hover:bg-[#dff0a5] transition-colors h-auto ${
                  index === 0
                    ? "top-[61px] left-[362px]"
                    : index === 1
                      ? "top-[61px] left-[294px]"
                      : index === 2
                        ? "top-[77px] left-[357px]"
                        : index === 3
                          ? "top-[59px] left-[290px]"
                          : "top-[77px] left-[350px]"
                }`}
              >
                <span className="w-[75px] h-[30px] [font-family:'Inter',Helvetica] font-medium text-black text-xl text-center tracking-[0] leading-[30px]">
                  расчет
                </span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* Shopping Cart */}
      <div className="w-[255px] h-[134px] top-[1807px] left-[1094px] bg-[url(https://c.animaapp.com/mfi4rqisUqRMxb/img/image-11.png)] bg-cover bg-[50%_50%] absolute translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1400ms] hover:scale-105 transition-transform cursor-pointer">
        <div className="top-[45px] left-[21px] [font-family:'Inter',Helvetica] font-bold text-black text-[35px] tracking-[-0.70px] leading-[normal] whitespace-nowrap absolute">
          2
        </div>
      </div>
    </div>
  );
};
