import { useSimulationStore } from "@/app/stores/simulation";
import { Box, TextField } from "@mui/material";

const CompanyFormStep = () => {
  const { company, setCompanyField, validateSimulation } = useSimulationStore((state) => state);

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        error={validateSimulation().some(error => error.name === 'name')}
        label="Nome"
        defaultValue={company.name}
        onChange={(e)=>setCompanyField('name', e.target.value)}
        helperText={validateSimulation().find(error => error.name === 'name')?.message}
        required={true}
      />
      <TextField
        error={validateSimulation().some(error => error.name === 'cae')}
        label="CAE"
        defaultValue={company.cae}
        onChange={(e)=>setCompanyField('cae', e.target.value)}
        helperText={validateSimulation().find(error => error.name === 'cae')?.message}
        required={true}
      />
    </Box>
  )
}

export default CompanyFormStep;