import { useSimulationStore } from "@/app/stores/simulation";
import { RequestField, RequestGroup } from "@/types";
import { Alert, FormControl, FormHelperText, Grid2 as Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface DynamicCategoryFormProps {
  group: RequestGroup;
}

const DynamicGroupForm = ({ group }: DynamicCategoryFormProps) => {
  const { setInput, getInput, errors } = useSimulationStore((state) => state);

  const renderTextField = (field: RequestField): JSX.Element => {
    const value = getInput(group.Name, field.ID).value;
    const textFieldSize = field.Units.length > 0 ? 9 : 12;
    return (
      <Grid size={{ xs: 12, md: 12 }} container spacing={1}>
        <Grid size={{ xs: textFieldSize, md: textFieldSize }}>
          <TextField
            fullWidth
            label={field.Name}
            required={field.Required}
            onChange={ event => setInput({id: field.ID, groupId: group.Name,value: event.target.value})}
            error={errors.some(error => error.id === field.ID.toString())}
            helperText={errors.find(error => error.id === field.ID.toString())?.message}
          />
        </Grid>
        {
        field.Units.length > 0 ? 
        <Grid size={{ xs: 3, md: 3 }}>
          <FormControl error={errors.some(error => error.id === `${field.ID}_un`)} required={field.Required} fullWidth>
            <InputLabel id={`combo-unit-${field.ID}`}>Unidade</InputLabel>
              <Select
                labelId={`combo-unit-${field.ID}`}
                id={`combo-unit-${field.ID}-label`}
                value={getInput(group.Name, field.ID).unit}
                onChange={ e => setInput({id: field.ID, groupId: group.Name, value, unit: e.target.value})}
                fullWidth
              >
                {
                  field.Units.map(unit => <MenuItem key={unit.Unit} value={unit.Unit}>{unit.Unit}</MenuItem>)
                }
              </Select>
            <FormHelperText>{errors.find(error => error.id === `${field.ID}_un`)?.message}</FormHelperText>
          </FormControl>
        </Grid>
        : undefined}
      </Grid>
    );
  };

  const renderCombo = (field: RequestField): JSX.Element => {
    const options = field.Values.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>);
    if(field.CustomValue){
      const customOption = <MenuItem key='other' value='other'>Outro</MenuItem>;
      options.push(customOption);
    }
    return (
      <FormControl sx={{ minWidth: 150 }} error={errors.some(error => error.id === field.ID.toString())} required={field.Required}>
        <InputLabel id={`combo-${field.ID}`}>{field.Name}</InputLabel>
          <Select
            labelId={`combo-${field.ID}`}
            id={`combo-${field.ID}-label`}
            value={getInput(group.Name, field.ID).value}
            onChange={ event => setInput({id: field.ID, groupId: group.Name, value: event.target.value})}
            fullWidth
          >
            {options}
          </Select>
        <FormHelperText>{errors.find(error => error.id === field.ID.toString())?.message}</FormHelperText>
      </FormControl>
    );
  }

  const renderMultifields = (field: RequestField): JSX.Element  => {
    return <>multifield</>;
  }

  const renderField = (field: RequestField) => {
    const currentValue = getInput(group.Name, field.ID).value;
    const isOtherOption = !!currentValue && field.CustomValue && (currentValue === 'other' || !field.Values.some(value => value === currentValue));
    if(field.MultiField){
      return renderMultifields(field);
    }
    if(field.Values.length === 0 || isOtherOption){
      return renderTextField(field);
    }

    return renderCombo(field);
  }

  return (
    <>
      <Typography variant="h4" component="h4">{group.Name}</Typography>
      <Grid container>
        {
          group.Desc ? (
            <Grid size={{ xs: 12, md: 12 }} sx={{margin: '10px 0 20px 0'}}>
              <Alert icon={<InfoOutlinedIcon fontSize="inherit" />} severity="warning">
                {group.Desc}
              </Alert>
            </Grid>
          ): undefined
        }
        {group.Fields.map(field => (
          <Grid size={{ xs: 12, md: 12 }} key={field.ID} sx={{minHeight: '80px'}}>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default DynamicGroupForm;