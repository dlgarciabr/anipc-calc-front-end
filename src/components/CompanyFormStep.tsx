import { useSimulationStore } from "@/app/stores/simulation";
import { Box, TextField } from "@mui/material";

const CompanyFormStep = () => {

  const { company, setCompanyField, validateStepCompany } = useSimulationStore((state) => state);

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        error={validateStepCompany().some(error => error.name === 'name')}
        label="Nome"
        defaultValue={company.name}
        onChange={(e)=>setCompanyField('name', e.target.value)}
      />
      <TextField
        error={validateStepCompany().some(error => error.name === 'cae')}
        label="CAE"
        defaultValue={company.cae}
        onChange={(e)=>setCompanyField('cae', e.target.value)}
      />
    </Box>
  )
}

export default CompanyFormStep;