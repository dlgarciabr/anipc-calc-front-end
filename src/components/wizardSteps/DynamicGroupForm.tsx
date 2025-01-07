import { useSimulationStore } from "@/app/stores/simulation";
import { RequestField, RequestGroup } from "@/types";
import { Alert, FormControl, FormHelperText, Grid2 as Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from "react";

interface DynamicCategoryFormProps {
  group: RequestGroup;
}

const DynamicGroupForm = ({ group }: DynamicCategoryFormProps) => {
  const { setInput, getInput, errors } = useSimulationStore((state) => state);
  const [ multifieldOptions, setMultifieldOptions ] = useState<RequestField[]>(group.Fields);
  const [ multifields, setMultifields ] = useState<RequestField[]>([]);

  const handleAddMultifield = (fieldId: number) => {
    const fieldToAdd = group.Fields.find(field => field.ID === fieldId);
    const newMultifieldOptions = multifieldOptions.filter(field => field.ID !== fieldId);
    setMultifieldOptions(newMultifieldOptions);
    setMultifields([...multifields, fieldToAdd!]);
  }

  const handleRemoveMultifield = (fieldToRemove: RequestField) => {
    const newMultifields = multifields.filter(field => field.ID !== fieldToRemove.ID);
    setMultifields(newMultifields);
    setMultifieldOptions([...multifieldOptions, fieldToRemove]);
  }

  const renderTextField = (field: RequestField): JSX.Element => {
    const value = getInput(group.ID, field.ID).value;
    const textFieldSize = field.Units.length > 0 ? 9 : 12;
    return (
      <Grid size={{ xs: 12, md: 12 }} container spacing={1}>
        <Grid size={{ xs: textFieldSize, md: textFieldSize }}>
          <TextField
            fullWidth
            label={field.Name}
            required={field.Required}
            onChange={ event => setInput({id: field.ID, groupId: group.ID, value: event.target.value})}
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
                value={getInput(group.ID, field.ID).unit}
                onChange={ e => setInput({id: field.ID, groupId: group.ID, value, unit: e.target.value})}
                fullWidth
              >
                {
                  field.Units.map(unit => <MenuItem key={unit.Unit} value={unit.Unit}>{unit.Unit}</MenuItem>)
                }
              </Select>
            <FormHelperText>{errors.find(error => error.id === `${field.ID}_un`)?.message}</FormHelperText>
          </FormControl>
          {
            field.MultiField ? <div onClick={()=>handleRemoveMultifield(field)}>X</div> : undefined
          }
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
            value={getInput(group.ID, field.ID).value}
            onChange={ event => setInput({id: field.ID, groupId: group.ID, value: event.target.value})}
            fullWidth
          >
            {options}
          </Select>
        <FormHelperText>{errors.find(error => error.id === field.ID.toString())?.message}</FormHelperText>
      </FormControl>
    );
  }

  const renderMultifieldCombo = (): JSX.Element => {
    const options = multifieldOptions.map(field => <MenuItem key={field.ID} value={field.ID}>{field.Name}</MenuItem>);
    return (
      <FormControl fullWidth>
        <InputLabel id={`combo-multifield-${group.Name}`}>Esolha ...</InputLabel>
          <Select
            labelId={`combo-multifield-${group.Name}`}
            id={`combo-multifield-${group.Name}-label`}
            value=''
            onChange={(event)=> handleAddMultifield(Number(event.target.value))}
            fullWidth
          >
            {options}
          </Select>
      </FormControl>
    );
  }

  const renderField = (field: RequestField) => {
    const currentValue = getInput(group.ID, field.ID).value;
    const isOtherOption = !!currentValue && field.CustomValue && (currentValue === 'other' || !field.Values.some(value => value === currentValue));
    if(!field.Values || !field.Values.length || isOtherOption){
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
        {
          group.Fields.some(field => field.MultiField) ? 
            <>
              {
                multifields.map(field => (
                  <Grid size={{ xs: 12, md: 12 }} key={field.ID} sx={{minHeight: '80px'}}>
                    {renderField(field)}
                  </Grid>
                ))
              }
              {renderMultifieldCombo()}
            </> : 
            group.Fields.map(field => (
              <Grid size={{ xs: 12, md: 12 }} key={field.ID} sx={{minHeight: '80px'}}>
                {renderField(field)}
              </Grid>
            ))
        }
      </Grid>
    </>
  )
}

export default DynamicGroupForm;