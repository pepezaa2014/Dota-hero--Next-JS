import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { baseDotaHeroURL, dotaHeroApi } from "@/app/constants/app_api";

export async function getDotaHero() {
  try {
    const response = await axios.get<DotaHeroesModel>(
      baseDotaHeroURL + dotaHeroApi
    );

    const heroData = response.data;
    return heroData;
  } catch (error) {
    console.error("Error fetching hero stats:", error);
  }
}
