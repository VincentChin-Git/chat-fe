export enum IThemeOption {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ITheme {
  themeColor: string;
  theme: IThemeOption;
}
