import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    warning: { main: orange[500] },
  },
});

export { theme };
