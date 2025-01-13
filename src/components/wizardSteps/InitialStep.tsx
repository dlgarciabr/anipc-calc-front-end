import { Button, Grid2 as Grid, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

interface InitialStepProps {
  onBegin: () => void;
}

const InitialStep = ({onBegin}: InitialStepProps) => {
  const handleBegin = () => {
    onBegin();
  }

  return (
    <Grid container spacing={2} style={{height: '780px'}}>
      <Grid size={{ xs: 12, md: 12 }} container alignContent='center' justifyContent='center'>
        <Typography gutterBottom variant="h5" component="div">
          Calculadora de pegada de carbono
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Este cálculo – confidencial e sem custos para os participantes – é orientado pelo INEGI e pelo SerQ e irá mostrar quais são as principais ameaças e oportunidades de melhoria do setor e onde é mais produtivo atuar, com vista à descarbonização.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }} container justifyContent='center' alignContent='flex-start'>
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleBegin} size="large">
          Iniciar
        </Button>
      </Grid>
    </Grid>
  )
}

export default InitialStep;