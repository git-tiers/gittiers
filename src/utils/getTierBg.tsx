import { Color } from '@/styles/color';

export const getTierBg = (type: string) => {
  switch (type) {
    case 'light':
      return Color.TierBgLight;
    case 'dark':
      return Color.TierBgDark;
    case 'green':
      return Color.TierBgGreen;
    case 'red':
      return Color.TierBgRed;
    case 'blue':
      return Color.TierBgBlue;
    default:
      return Color.TierBgLight;
  }
};
