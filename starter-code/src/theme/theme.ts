interface Spacing {
    space_2: number;
    space_4: number;
    space_6: number;
    space_8: number;
    space_10: number;
    space_12: number;
    space_14: number;
    space_16: number;
    space_18: number;
    space_20: number;
  }
  
  export const SPACING: Spacing = {
    space_2: 2,
    space_4: 4,
    space_6: 6,
    space_8: 8,
    space_10: 10,
    space_12: 12,
    space_14: 14,
    space_16: 16,
    space_18: 18,
    space_20: 20,
  };
  
  interface Color {
      darkBlue: string;
      lightBlue: string;
      yellow: string;
      lightYellow: string;
      lightGrey:string;
      black: string;
      white:string;
  }

  
  export const COLORS: Color = {
    darkBlue: '#0C356A',
    lightBlue: '#0174BE',
    yellow: '#FFC436',
    lightYellow: '#FFF0CE',
    lightGrey: '#E3E3E3',
    black: '#000000',
    white: '#FFFFFF',
  };
  
  interface FontFamily {
   //string
  }
  
  export const FONTFAMILY: FontFamily = {
    poppins_black: 'Poppins-Black',
    poppins_bold: 'Poppins-Bold',
  };
  
  interface FontSize {
    
  }
  
  export const FONTSIZE: FontSize = {
    size_8: 8,
    size_10: 10,
    size_12: 12,
  };
  