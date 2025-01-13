import { sendData } from "@/app/calculator/api";
import { useSimulationStore } from "@/app/stores/simulation";
import { Button, Grid2 as Grid, Typography } from "@mui/material";
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

const FinalStep = () => {
  const { getData } = useSimulationStore((state) => state);

  const handleSendData = () => {
    sendData(getData())
  }

  return (
    <Grid container spacing={2} style={{height: '700px'}}>
      <Grid size={{ xs: 12, md: 12 }} container alignContent='center' justifyContent='center' flexDirection='column' style={{textAlign: 'center'}}>
        <Typography gutterBottom variant="h5" component="div">
          Preenchimento concluído
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Iremos agora efectuar os cálculos e gerar os resultados.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }} container justifyContent='center' alignContent='flex-start'>
        <Button variant="contained" endIcon={<EnergySavingsLeafIcon />} onClick={handleSendData} size="large">
          Calcular
        </Button>
      </Grid>
    </Grid>
  )
}

export default FinalStep;