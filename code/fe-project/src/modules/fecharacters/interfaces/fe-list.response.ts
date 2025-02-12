export interface FEListResponse {
  units: Unit[];
}

export interface Unit {
  Name: string;
  Lv: number;
  Class: string;
  HP: number;
  Str: number;
  Skl: number;
  Spd: number;
  Lck: number;
  Def: number;
  Res: number;
  Mov: number;
  Con: number;
  'Weapon Rank': WeaponRank[];
  Affin: string;
}

export interface WeaponRank {
  Weapon: string;
  Rank: null | string;
}
