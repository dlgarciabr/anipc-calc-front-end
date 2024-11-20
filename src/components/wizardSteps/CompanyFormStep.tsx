import { getCaeList } from "@/app/calculator/api";
import { useSimulationStore } from "@/app/stores/simulation";
import { Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const CompanyFormStep = () => {
  const { company, setCompanyField, validateSimulation } = useSimulationStore((state) => state);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 12 }}>
        <TextField
          error={validateSimulation().some(error => error.name === 'name')}
          label="Nome"
          defaultValue={company.name}
          onChange={(e)=>setCompanyField('name', e.target.value)}
          helperText={validateSimulation().find(error => error.name === 'name')?.message}
          required={true}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 6, md: 8 }}>
        <InputLabel id="demo-simple-select-label">CAE</InputLabel>
        <Select
          error={validateSimulation().some(error => error.name === 'cae')}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={company.cae}
          onChange={(e)=>setCompanyField('cae', e.target.value)}
          fullWidth
        >
          {
            getCaeList().map(cae => <MenuItem key={cae} value={cae}>{cae}</MenuItem>)
          }
        </Select>
      </Grid>
      <Grid size={{ xs: 6, md: 8 }}>
        <TextField
          error={validateSimulation().some(error => error.name === 'line')}
          label="Fileira"
          defaultValue={company.line}
          onChange={(e)=>setCompanyField('line', e.target.value)}
          helperText={validateSimulation().find(error => error.name === 'line')?.message}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TextField
          error={validateSimulation().some(error => error.name === 'submitterName')}
          label="Nome"
          defaultValue={company.submitterName}
          onChange={(e)=>setCompanyField('submitterName', e.target.value)}
          helperText={validateSimulation().find(error => error.name === 'submitterName')?.message}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TextField
          error={validateSimulation().some(error => error.name === 'submitterEmail')}
          label="E-mail"
          defaultValue={company.submitterEmail}
          onChange={(e)=>setCompanyField('line', e.target.value)}
          helperText={validateSimulation().find(error => error.name === 'submitterEmail')?.message}
          fullWidth
        />
      </Grid>
    </Grid>
  )
}

export default CompanyFormStep;