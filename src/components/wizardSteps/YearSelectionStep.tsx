import { getOpenedYears } from "@/app/calculator/api";
import { useSimulationStore } from "@/app/stores/simulation";
import { FormControl, FormHelperText, Grid2 as Grid, InputLabel, MenuItem, Select } from "@mui/material";

const YearSelectionStep = () => {
  const { year, setYear, validateSimulation } = useSimulationStore((state) => state);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, md: 6 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} error={validateSimulation().some(error => error.name === 'year')} required>
          <InputLabel id="demo-simple-select-label">Ano</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              onChange={(e)=>setYear(e.target.value)}
              fullWidth
            >
              {
                getOpenedYears().map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)
              }
            </Select>
          <FormHelperText>{validateSimulation().find(error => error.name === 'year')?.message}</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default YearSelectionStep;