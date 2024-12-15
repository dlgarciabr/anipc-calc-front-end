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
    const fieldSize = field.Units.length > 0 ? 8 : 12;
    return (
      <Grid size={{ xs: 12, md: 12 }} container>
        <Grid size={{ xs: fieldSize, md: fieldSize }}>
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
        <Grid size={{ xs: 4, md: 4 }}>
          <FormControl sx={{ minWidth: 200 }} error={errors.some(error => error.id === `${field.ID}_un`)} required={field.Required}>
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
      {group.Name}
      <Grid container spacing={2}>
        {group.Fields.map(field => (
          <Grid size={{ xs: 12, md: 12 }} key={field.ID}>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default DynamicGroupForm;