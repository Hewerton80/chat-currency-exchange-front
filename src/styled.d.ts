import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string, // background group name end inputs
    secondary: string, // background header top left
    third: string, // background send mensseger bar
    fourth: string, //serach top left
    fifth: string, //background group hover
    sixth: string, //border header
    seventh: string, //background group 
    greem: string, //
    gree2: string, //
    gree3: string, //
    gray1: string, //fonts
    gray2: string, //icons
    black: string, //fonts
    black2: string, //fonts msgs
    yellow: string,// background msg sended for me
    blue: string,
    red: string,
    bgInput: string,
    bgMessage: string,
    shadowMessage: string,
  }
}