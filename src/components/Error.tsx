import { Button, Container, Grid2 as Grid, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

interface ErrorProps {
  message?: string;
  description?: string;
  onRetry?: () => void;
}

const Error = ({ message, description, onRetry }: ErrorProps) => (
  <Container maxWidth="md">
    <Grid container>
      <Grid size={{ xs: 12, md: 12 }} sx={{minHeight: '620px'}} alignContent='center' justifyItems='center'>
        <ErrorIcon sx={{color: 'red', width: '50px', height: '50px'}}/>
        <Typography variant="h5">{message || 'Ocorreu um erro!'}</Typography>
        <Typography variant="h6" color="secondary">{description || 'Infelizmente nao fomos capazes de concluir a operação, por favor tente mais tarde.'}</Typography>
        {
          onRetry ? 
          <Button variant="contained" onClick={onRetry} size="large" sx={{marginTop: '50px'}}>
            tentar novamente
          </Button> : 
          null
        }
      </Grid>
    </Grid>
  </Container>
);

export default Error;