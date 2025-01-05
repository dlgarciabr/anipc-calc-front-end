import { sendData } from "@/app/calculator/api";
import { useSimulationStore } from "@/app/stores/simulation";
import { Grid2 as Grid } from "@mui/material";

const FinalStep = () => {
  const { getData } = useSimulationStore((state) => state);

  const handleSendData = () => {
    sendData(getData())
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, md: 6 }}>
        Step final
        <a href='#' onClick={handleSendData}>Send data</a>
      </Grid>
    </Grid>
  )
}

export default FinalStep;