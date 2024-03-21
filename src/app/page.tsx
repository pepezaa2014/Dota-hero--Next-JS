"use client";

import { useState, useEffect } from "react";
import { baseDotaHeroURL, dotaHeroApi } from "./constants/app_api";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { DotaHeroesModel } from "./models/dota_hero_model";
import { PrimaryAttr } from "@/app/constants/primary_attr";

export default function Home() {
  const [dotaHero, setDotaHero] = useState<DotaHeroesModel>();
  const [isLoading, setLoading] = useState(true);
  const [searchHero, setSearchHero] = useState("");
  const [selectedSort, setSelectedSort] = useState({
    type: null,
  });

  const handleSortClick = (sortType: any, buttonClassName: any) => {
    if (selectedSort.type == sortType) {
      setSelectedSort({ type: null });
    } else {
      setSelectedSort({ type: sortType });
    }
  };

  const welcomeText =
    "From magical tacticians to fierce brutes and cunning rogues, Dota 2's hero pool is massive and limitlessly diverse. Unleash incredible abilities and devastating ultimates on your way to victory.";

  useEffect(() => {
    const getHeroData = async () => {
      try {
        const response = await axios.get<DotaHeroesModel>(
          `${baseDotaHeroURL}${dotaHeroApi}`
        );
        setDotaHero(response.data);
        setLoading(false);
      } catch (e: any) {
        console.error(e);
      }
    };
    getHeroData();
  }, []);

  if (isLoading)
    return (
      <div className={`flex items-center justify-center min-h-screen'`}>
        <div className="relative w-[512px] h-[256px] items-center justify-center">
          <Image
            src="/images/dota2_logo_color.png"
            alt=""
            fill
            sizes="max-h-[256px] max-w-[512px]"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
    );

  if (!dotaHero)
    return (
      <div className="w-full h-full items-center justify-center text-4xl">
        <p>No data!</p>
      </div>
    );

  return (
    <main className="bg-gradient-to-r from-[#181D23] to-[#7F8993] w-full min-h-screen items-center flex-col justify-center px-[144px] py-16">
      <div className="pb-8 text-center">
        <h1 className="text-5xl font-bold">CHOOSE YOUR HERO</h1>
        <p className="pt-6 text-xl">{welcomeText}</p>
      </div>
      <div className="bg-gradient-to-r from-[#0E1013] to-[#4D565D] w-full items-center justify-center flex p-4 rounded">
        <div className="flex-1">
          <p>FILTER HEROES</p>
        </div>
        <div className="flex-1">
          <div className="flex flex-row items-center">
            <p>ATTRIBUTE</p>

            <button
              className={"sort-button ml-2"}
              onClick={() => {
                handleSortClick(PrimaryAttr.str, "selected");
              }}
            >
              <div
                className={`flex-1 relative flex items-center w-[32px] h-[32px] ${
                  selectedSort.type === PrimaryAttr.str
                    ? " opacity-100"
                    : " opacity-50"
                }`}
              >
                <Image
                  src="/images/str.png"
                  alt=""
                  fill
                  sizes="max-w-[32px] max-h-[32px]"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </button>

            <button
              className={`sort-button ml-2`}
              onClick={() => {
                handleSortClick(PrimaryAttr.agi, "selected");
              }}
            >
              <div
                className={`flex-1 relative flex items-center w-[32px] h-[32px] ${
                  selectedSort.type === PrimaryAttr.agi
                    ? " opacity-100"
                    : " opacity-50"
                }`}
              >
                <Image
                  src="/images/agi.png"
                  alt=""
                  fill
                  sizes="max-w-[32px] max-h-[32px]"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </button>

            <button
              className={"sort-button ml-2"}
              onClick={() => handleSortClick(PrimaryAttr.int, "selected")}
            >
              <div
                className={`flex-1 relative flex items-center w-[32px] h-[32px] ${
                  selectedSort.type === PrimaryAttr.int
                    ? " opacity-100"
                    : " opacity-50"
                }`}
              >
                <Image
                  src="/images/int.png"
                  alt=""
                  fill
                  sizes="max-w-[32px] max-h-[32px]"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </button>
            <button
              className={"sort-button ml-2"}
              onClick={() => handleSortClick(PrimaryAttr.all, "selected")}
            >
              <div
                className={`flex-1 relative flex items-center w-[32px] h-[32px] ${
                  selectedSort.type === PrimaryAttr.all
                    ? " opacity-100"
                    : " opacity-50"
                }`}
              >
                <Image
                  src="/images/all.png"
                  alt=""
                  fill
                  sizes="max-w-[32px] max-h-[32px]"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </button>
          </div>
        </div>
        <div className="flex-1 relative flex items-center">
          <svg
            className="w-6 h-6 text-white absolute left-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <input
            type="search"
            name="searchName"
            id="searchName"
            className="w-full p-4 pl-12 text-sm text-grey-50 rounded-lg bg-[#0E1013]"
            placeholder="Search..."
            value={searchHero}
            onChange={(e) => {
              setSearchHero(e.target.value);
            }}
          />
        </div>
      </div>

      {dotaHero.length > 0 ? (
        <div className="grid grid-cols-5 gap-5 mt-4">
          {dotaHero
            .filter((hero: DotaHeroesModel) =>
              hero.localized_name
                .toLowerCase()
                .includes(searchHero.toLowerCase())
            )
            .filter((hero: DotaHeroesModel) => {
              if (selectedSort.type === null) {
                return true;
              }
              return hero.primary_attr === selectedSort.type;
            })
            .map((hero: DotaHeroesModel) => {
              return (
                <Link
                  href={{ pathname: "/hero-info", query: hero }}
                  key={hero.id}
                  className="transition duration-500 hover:scale-125 hover:z-50 relative hover:shadow-lg"
                >
                  <div className="relative w-auto h-[144px] shadow-black shadow-md">
                    <Image
                      src={baseDotaHeroURL + hero.img}
                      alt={hero.localized_name}
                      fill
                      sizes="max-h-[144px]"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300  text-white items-end shadow-inner bg-gradient-to-r from-[#0E1013] from-5% via-transparent via-50% to-[#0E1013] to-100 ">
                    <div className="flex items-center mb-2">
                      <div className="relative h-8 w-8 mr-2 ml-2">
                        <Image
                          src={`/images/${hero.primary_attr}.png`}
                          alt={hero.primary_attr}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <p className="text-2xl font-bold">
                        {hero.localized_name.toString()}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      ) : null}
    </main>
  );
}
