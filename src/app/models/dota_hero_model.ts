import { PrimaryAttr } from "../constants/primary_attr";

export type DotaHeroesModel = {
  length: number;
  filter: any;
  map: any;
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_health_regen: number;
  base_mana: number;
  base_mana_regen: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  projectile_speed: number;
  attack_rate: number;
  base_attack_time: number;
  attack_point: number;
  move_speed: number;
  turn_rate: any;
  cm_enabled: boolean;
  legs: number;
  day_vision: number;
  night_vision: number;
  hero_id: number;
  turbo_picks: number;
  turbo_wins: number;
  pro_ban: number;
  pro_win: number;
  pro_pick: number;
  i1_pick: number;
  i1_win: number;
  i2_pick: number;
  i2_win: number;
  i3_pick: number;
  i3_win: number;
  i4_pick: number;
  i4_win: number;
  i5_pick: number;
  i5_win: number;
  i6_pick: number;
  i6_win: number;
  i7_pick: number;
  i7_win: number;
  i8_pick: number;
  i8_win: number;
  null_pick: number;
  null_win: number;
};

export function health(base_health: number, base_str: number) {
  return base_health + base_str * 20.0;
}

export function healthRegen(base_health_regen: number, base_str: number) {
  return base_health_regen + base_str * 0.1;
}

export function mana(base_mana: number, base_int: number) {
  return base_mana + base_int * 12.0;
}

export function manaRegen(base_mana: number, base_int: number) {
  return base_mana + base_int * 0.05;
}

export function armor(base_armor: number, base_agi: number) {
  return base_armor + base_agi * 0.167;
}

export function attackMin(
  primary_attr: string,
  base_str: number,
  base_agi: number,
  base_int: number,
  base_attack_min?: number
) {
  switch (primary_attr) {
    case PrimaryAttr.str:
      return (base_attack_min || 0.0) + base_str;
    case PrimaryAttr.agi:
      return (base_attack_min || 0.0) + base_agi;
    case PrimaryAttr.int:
      return (base_attack_min || 0.0) + base_int;
    case PrimaryAttr.all:
      return (
        (base_attack_min || 0.0) +
        base_str * 0.6 +
        base_agi * 0.6 +
        base_int * 0.6
      );
    default:
      return base_attack_min ?? 0.0;
  }
}

export function attackMax(
  primary_attr: string,
  base_str: number,
  base_agi: number,
  base_int: number,
  base_attack_max?: number
) {
  switch (primary_attr) {
    case PrimaryAttr.str:
      return (base_attack_max || 0.0) + base_str;
    case PrimaryAttr.agi:
      return (base_attack_max || 0.0) + base_agi;
    case PrimaryAttr.int:
      return (base_attack_max || 0.0) + base_int;
    case PrimaryAttr.all:
      return (
        (base_attack_max || 0.0) +
        base_str * 0.6 +
        base_agi * 0.6 +
        base_int * 0.6
      );
    default:
      return base_attack_max ?? 0.0;
  }
}
