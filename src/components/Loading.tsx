import { CircularProgress, Container, Grid2 as Grid, Typography } from "@mui/material";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message }: LoadingProps) => (
  <Container maxWidth="md">
    <Grid container>
      <Grid size={{ xs: 12, md: 12 }} sx={{minHeight: '780px'}} alignContent='center' justifyItems='center' display="grid">
        <Typography variant="h6">{message || 'Aguarde'}</Typography>
        <CircularProgress color="inherit"/>
      </Grid>
    </Grid>
  </Container>
);

export default Loading;