import { useSimulationStore } from "@/app/stores/simulation";
import { RequestField, RequestGroup } from "@/types";
import { FormControl, FormHelperText, Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

interface DynamicCategoryFormProps {
  group: RequestGroup;
}

const DynamicGroupForm = ({ group }: DynamicCategoryFormProps) => {
  const { setInput, getInput, errors } = useSimulationStore((state) => state);

  const renderTextField = (field: RequestField): JSX.Element => {
    const value = getInput(group.Name, field.ID).value;
    return (
      <>
        <TextField
          fullWidth
          label={field.Name}
          required={field.Required}
          onChange={ event => setInput({id: field.ID, groupId: group.Name,value: event.target.value})}
          error={errors.some(error => error.id === field.ID)}
          helperText={errors.find(error => error.id === field.ID)?.message}
        />
        {
        field.Units.length > 0 ? 
        <FormControl sx={{ m: 1, minWidth: 120 }} error={false} required={field.Required}>
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
          <FormHelperText>error</FormHelperText>
        </FormControl>
        : undefined}
      </>
    );
  };

  const renderCombo = (field: RequestField): JSX.Element => {
    return (
      <FormControl sx={{ m: 1, minWidth: 400 }} error={errors.some(error => error.id === field.ID)} required={field.Required}>
        <InputLabel id={`combo-${field.ID}`}>{field.Name}</InputLabel>
          <Select
            labelId={`combo-${field.ID}`}
            id={`combo-${field.ID}-label`}
            value={getInput(group.Name, field.ID).value}
            onChange={ event => setInput({id: field.ID, groupId: group.Name, value: event.target.value})}
            fullWidth
          >
            {
              field.Values.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)
            }
          </Select>
        <FormHelperText>{errors.find(error => error.id === field.ID)?.message}</FormHelperText>
      </FormControl>
    );
  }

  return (
    <>
      {group.Name}
      <Grid container spacing={2}>
          {
            group.Fields.map(field => (
              <Grid size={{ xs: 12, md: 12 }} key={field.ID}>
                {field.Values.length > 0 ? renderCombo(field) : renderTextField(field)}
              </Grid>
            ))
          }
      </Grid>
    </>
  )
}

export default DynamicGroupForm;