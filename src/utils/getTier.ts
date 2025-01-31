export const getTierImage = (contributions: number): string => {
  if (contributions >= 4800) return '/tiers/9_challenger.png';
  if (contributions >= 3200) return '/tiers/8_grandmaster.png';
  if (contributions >= 2000) return '/tiers/7_master.png';
  if (contributions >= 1200) return '/tiers/6_diamond.png';
  if (contributions >= 800) return '/tiers/5_platinum.png';
  if (contributions >= 600) return '/tiers/4_gold.png';
  if (contributions >= 400) return '/tiers/3_silver.png';
  if (contributions >= 200) return '/tiers/2_bronze.png';

  return '/tiers/1_iron.png';
};

export const getTierText = (contributions: number): string => {
  if (contributions >= 6300) return 'Challenger 1';
  if (contributions >= 5800) return 'Challenger 2';
  if (contributions >= 5300) return 'Challenger 3';
  if (contributions >= 4800) return 'Challenger 4';

  if (contributions >= 4400) return 'Grandmaster 1';
  if (contributions >= 4000) return 'Grandmaster 2';
  if (contributions >= 3600) return 'Grandmaster 3';
  if (contributions >= 3200) return 'Grandmaster 4';

  if (contributions >= 2900) return 'Master 1';
  if (contributions >= 2600) return 'Master 2';
  if (contributions >= 2300) return 'Master 3';
  if (contributions >= 2000) return 'Master 4';

  if (contributions >= 1800) return 'Diamond 1';
  if (contributions >= 1600) return 'Diamond 2';
  if (contributions >= 1400) return 'Diamond 3';
  if (contributions >= 1200) return 'Diamond 4';

  if (contributions >= 1100) return 'Platinum 1';
  if (contributions >= 1000) return 'Platinum 2';
  if (contributions >= 900) return 'Platinum 3';
  if (contributions >= 800) return 'Platinum 4';

  if (contributions >= 750) return 'Gold 1';
  if (contributions >= 700) return 'Gold 2';
  if (contributions >= 650) return 'Gold 3';
  if (contributions >= 600) return 'Gold 4';

  if (contributions >= 550) return 'Silver 1';
  if (contributions >= 500) return 'Silver 2';
  if (contributions >= 450) return 'Silver 3';
  if (contributions >= 400) return 'Silver 4';

  if (contributions >= 350) return 'Bronze 1';
  if (contributions >= 300) return 'Bronze 2';
  if (contributions >= 250) return 'Bronze 3';
  if (contributions >= 200) return 'Bronze 4';

  if (contributions >= 150) return 'Iron 1';
  if (contributions >= 100) return 'Iron 2';
  if (contributions >= 50) return 'Iron 3';

  return 'Iron 4';
};