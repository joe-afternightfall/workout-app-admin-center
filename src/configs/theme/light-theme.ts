import { Palette } from '@material-ui/core/styles/createPalette';
import createMuiTheme, {
  Theme,
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';

interface CustomPalette extends Palette {
  colors: {
    active: {
      highlight: string;
      hover: string;
      contrastColor: string;
    };
  };
}

export interface AppTheme extends Theme {
  palette: CustomPalette;
}

interface AppThemeOptions extends ThemeOptions {
  palette: CustomPalette;
}

export function getLightTheme(): Theme {
  return createMuiTheme({
    palette: {
      colors: {
        active: {
          // highlight: '#5532f1',
          highlight: '#674bf2',
          hover: '#E8E5F4',
          contrastColor: '#6B8E9B',
          // contrastColor: '#708C9B', // text and icon colors
          // background: '#b5aaf5', // left border highlight
        },
      },
      type: 'light',
      primary: {
        light: '#488fd4',
        main: '#1B73CA',
        dark: '#12508d',
        // contrastText: '#6B8E9B',
        contrastText: '#FFF',
      },
      secondary: {
        light: '#8B77F4',
        main: '#6F55F2',
        dark: '#4D3BA9',
        contrastText: '#FFF',
      },
    },
  } as unknown as AppThemeOptions);
}
