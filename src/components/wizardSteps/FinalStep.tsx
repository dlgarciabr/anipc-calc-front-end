import { sendData } from "@/app/calculator/api";
import { useSimulationStore } from "@/app/stores/simulation";
import { Button, Grid2 as Grid, Tooltip, Typography } from "@mui/material";
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { exportToJSONFile } from "@/app/calculator/utils";
import FileDownload from '@mui/icons-material/Download';
import { redirect } from "next/navigation";

const FinalStep = () => {
  const { getData, inputGroups } = useSimulationStore((state) => state);

  const handleSendData = async () => {
    const calcResponse = await sendData(getData());

    if(calcResponse.error){
      //TODO show error
    } else {
      //TODO redirect to result page
      redirect('result');
    }
  }

  return (
    <Grid container spacing={2} style={{height: '780px'}}>
      <Grid size={{ xs: 12, md: 12 }} container alignContent='center' justifyContent='center' flexDirection='column' style={{textAlign: 'center'}}>
        <Typography gutterBottom variant="h5" component="div">
          Preenchimento concluído
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Iremos agora efectuar os cálculos e gerar os resultados.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }} container justifyContent='center' alignContent='flex-start'>
        <Tooltip title='Exportar dados preenchidos para continuar mais tarde' arrow>
          <Button variant="outlined" onClick={()=>exportToJSONFile(inputGroups)} endIcon={<FileDownload />} >Exportar</Button>
        </Tooltip>
        <Tooltip title='Efectuar os calculos e visualizar os resultados' arrow>
          <Button variant="contained" endIcon={<EnergySavingsLeafIcon />} onClick={handleSendData} size="large">
            Calcular
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default FinalStep;