
/**
 * Interface for the list of units
 */
export interface FEListResponse {
  units: Unit[];
}

/**
 * Interface for the unit
 */
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


/**
 * Interface for the weapons of the unit
 */
export interface WeaponRank {
  Weapon: string;
  Rank: null | string;
}
