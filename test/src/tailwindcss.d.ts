declare module 'tailwindcss/lib/util/flattenColorPalette' {
    import { Color } from 'tailwindcss/types/config';
  
    function flattenColorPalette(colors: Record<string, Color | Color[]>): Record<string, string>;
  
    export default flattenColorPalette;
  }
  