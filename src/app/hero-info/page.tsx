"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { heroPortrait } from "@/app/constants/hero_portrait";
import {
  health,
  healthRegen,
  mana,
  manaRegen,
  attackMin,
  attackMax,
  armor,
} from "@/app/models/dota_hero_model";
import {
  PrimaryAttr,
  mapPrimaryAttrToString,
} from "@/app/constants/primary_attr";
import { rolesArray } from "@/app/constants/roles";
import { baseDotaHeroURL } from "@/app/constants/app_api";

export default function HeroInfo() {
  const data = useSearchParams();

  return (
    <main className="bg-gradient-to-r from-[#181D23] to-[#7F8993] w-full min-h-screen items-center flex-col justify-center">
      <div className="px-36 py-16">
        <div className="flex items-center mb-4">
          <div className="relative h-8 w-8 mr-2 ">
            <Image
              src={`/images/${data.get("primary_attr")}.png`}
              alt={data.get("primary_attr") || ""}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="text-2xl font-bold">
            {mapPrimaryAttrToString(data.get("primary_attr") || "")}
          </p>
        </div>
        <p className="text-6xl font-bold mb-4">{data.get("localized_name")}</p>
        <div className="absolute inset-y-0 right-0">
          <div className="relative w-[1024px] h-[512px]">
            <Image
              src={`${heroPortrait}${
                data?.get("img")?.split("/")?.pop()?.split("?")[0] || ""
              }`}
              alt={data.get("localized_name") || ""}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="mb-32">
          <p className="text-xl mb-2 text-gray-400">Attack Type</p>
          <div className="flex items-center mb-2">
            <div className="relative h-8 w-8 mr-2 ">
              <Image
                src={`/images/${data.get("attack_type")}.svg`}
                alt={data.get("attack_type") || ""}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="text-xl">{data.get("attack_type")}</p>
          </div>
        </div>
      </div>

      <div className="absolute bg-gradient-to-r from-[#242627] to-[#111516] w-full h-auto py-8 px-16 grid grid-cols-3 divide-x">
        <div className="flex flex-col mx-4 w-full">
          <div className="flex flex-row mb-6">
            <div className="flex flex-col w-full items-center justify-center">
              <div className="relative h-[84px] w-[150px]">
                <Image
                  src={baseDotaHeroURL + data.get("img")}
                  alt={mapPrimaryAttrToString(PrimaryAttr.agi)}
                  fill
                  style={{ objectFit: "fill" }}
                />
              </div>
              <div className="relative h-[18px] w-[150px] bg-gradient-to-r from-[#2e6d25] to-[#74e63a] text-center items-center justify-center text-sm flex flex-row">
                <p className="font-bold">
                  {health(
                    parseFloat(data.get("base_health") || ""),
                    parseFloat(data.get("base_str") || "")
                  )}
                </p>
                <div className="absolute inset-y-0 right-0 mr-2 text-xs text-gray-900">
                  <p>
                    +
                    {healthRegen(
                      parseFloat(data.get("base_health") || ""),
                      parseFloat(data.get("base_str") || "")
                    )}
                  </p>
                </div>
              </div>
              <div className="relative h-[18px] w-[150px] bg-gradient-to-r from-[#155edd] to-[#70f0fd] text-center items-center justify-center text-sm flex flex-row">
                <p className="font-bold">
                  {mana(
                    parseFloat(data.get("base_mana") || ""),
                    parseFloat(data.get("base_int") || "")
                  )}
                </p>
                <div className="absolute inset-y-0 right-0 mr-2 text-xs text-gray-900">
                  <p>
                    +
                    {manaRegen(
                      parseFloat(data.get("base_mana") || ""),
                      parseFloat(data.get("base_int") || "")
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-center">
              <div className="flex flex-row items-center mb-2">
                <div className="relative h-8 w-8 mr-2">
                  <Image
                    src={`/images/str.png`}
                    alt={mapPrimaryAttrToString(PrimaryAttr.str)}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="text-2xl font-bold">
                  {data.get("base_str") || ""}
                </p>
              </div>
              <div className="flex flex-row items-center mb-2">
                <div className="relative h-8 w-8 mr-2 ">
                  <Image
                    src={`/images/agi.png`}
                    alt={mapPrimaryAttrToString(PrimaryAttr.agi)}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="text-2xl font-bold">
                  {data.get("base_agi") || ""}
                </p>
              </div>
              <div className="flex flex-row items-center mb-2">
                <div className="relative h-8 w-8 mr-2 ">
                  <Image
                    src={`/images/int.png`}
                    alt={mapPrimaryAttrToString(PrimaryAttr.str)}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="text-2xl font-bold">
                  {data.get("base_int") || ""}
                </p>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-300 text-center">ATTRIBUTES</p>
        </div>

        <div className="flex flex-col mx-4 text-base text-center w-full">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {rolesArray.map((role, index) => (
              <div
                key={index}
                className={`flex items-center justify-center font-bold ${
                  data.getAll("roles")?.includes(role)
                    ? "text-gray-100"
                    : "text-gray-400"
                }`}
              >
                <p className="mx-2">{role}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-300 text-lg">ROLES</p>
        </div>

        <div className="flex flex-col mx-4 w-full">
          <div className="flex flex-row text-lg justify-center mb-2">
            <div className="flex flex-col mx-4">
              <p className="text-gray-300 text-center mb-2">ATTACK</p>
              <div className="flex items-center mb-2">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={`/images/icon_damage.png`}
                    alt="icon_damage"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p>
                  {attackMin(
                    data.get("primary_attr") || "",
                    parseFloat(data.get("base_str") || ""),
                    parseFloat(data.get("base_agi") || ""),
                    parseFloat(data.get("base_int") || ""),
                    parseFloat(data.get("base_attack_min") || "")
                  ).toFixed(0)}
                  -
                  {attackMax(
                    data.get("primary_attr") || "",
                    parseFloat(data.get("base_str") || ""),
                    parseFloat(data.get("base_agi") || ""),
                    parseFloat(data.get("base_int") || ""),
                    parseFloat(data.get("base_attack_max") || "")
                  ).toFixed(0)}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={`/images/icon_attack_rate.png`}
                    alt="icon_attack_rate"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p>{data.get("attack_rate")}</p>
              </div>
              <div className="flex items-center mb-2">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={`/images/icon_attack_range.png`}
                    alt="icon_attack_range"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p>{data.get("attack_range")}</p>
              </div>
              <div className="flex items-center mb-2">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={`/images/icon_projectile_speed.png`}
                    alt="icon_projectile_speed"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p>{data.get("projectile_speed")}</p>
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <p className="text-gray-300 text-center mb-2">DEFENSE</p>
              <div className="flex items-center mb-2">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={`/images/icon_armor.png`}
                    alt="icon_armor"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p>
                  {armor(
                    parseFloat(data.get("base_armor") || ""),
                    parseFloat(data.get("base_agi") || "")
                  ).toFixed(1)}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={`/images/icon_magic_resist.png`}
                    alt="icon_magic_resist"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p>{data.get("base_mr")}%</p>
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <p className="text-gray-300 text-center mb-2">MOBILITY</p>
              <div className="flex items-center mb-2">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={`/images/icon_movement_speed.png`}
                    alt="icon_movement_speed"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p>{data.get("move_speed")}</p>
              </div>
              {data.get("turn_rate") !== "" ? (
                <div className="flex items-center mb-2">
                  <div className="relative h-6 w-6 mr-2">
                    <Image
                      src={`/images/icon_turn_rate.png`}
                      alt="icon_turn_rate"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p>{data.get("turn_rate")}</p>
                </div>
              ) : null}
              <div className="flex items-center mb-2">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={`/images/icon_vision.png`}
                    alt="icon_vision"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p>
                  {data.get("day_vision")}/{data.get("night_vision")}
                </p>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-300 text-center">STATS</p>
        </div>
      </div>

      {/* <div>
        <p>{healthData}</p>
      </div> */}

      {/* <p>
        {attackMin(
          data.get("primary_attr") || "",
          parseFloat(data.get("base_str") || ""),
          parseFloat(data.get("base_agi") || ""),
          parseFloat(data.get("base_int") || ""),
          parseFloat(data.get("base_attack_min") || "")
        )}
      </p>

      <p>
        {attackMax(
          data.get("primary_attr") || "",
          parseFloat(data.get("base_str") || ""),
          parseFloat(data.get("base_agi") || ""),
          parseFloat(data.get("base_int") || ""),
          parseFloat(data.get("base_attack_max") || "")
        )}
      </p> */}
    </main>
  );
}
