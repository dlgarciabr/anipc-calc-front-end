import { useSimulationStore } from "@/app/stores/simulation";
import { Box, TextField } from "@mui/material";

const YearSelectionStep = () => {
  const { year, setYear, validateSimulation } = useSimulationStore((state) => state);

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        error={validateSimulation().some(error => error.name === 'year')}
        label="Ano"
        defaultValue={year}
        onChange={(e)=>setYear(e.target.value)}
        helperText={validateSimulation().find(error => error.name === 'year')?.message}
      />
    </Box>
  )
}

export default YearSelectionStep;