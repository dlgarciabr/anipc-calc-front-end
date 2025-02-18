import { ThemeOptions } from "@mui/material";
import { formLabelClasses } from "@mui/material";

export const setupScheme = (primaryColor: string, secondayColor: string): ThemeOptions => ({
  palette: {
    primary: { main: primaryColor },
    secondary: { main: secondayColor },
    background: {  
      default: '#ffffff', // Background color  
      paper: '#f5f5f5', // Paper color  
    }, 
  },
  typography: {
    allVariants: {
      color: primaryColor
    }
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          padding: '0 10px 0 10px',
          color: secondayColor,
          [`&.${formLabelClasses.focused}`]: { 
            color: secondayColor
          }
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: primaryColor,
          '&:hover': { 
            borderColor: 'red'
          }
        },
      }
    },
    MuiButton:{
      styleOverrides: {
        outlined:{
          color: secondayColor,
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: secondayColor,
        },
      },
    }
  }
});
