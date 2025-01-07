import { useSimulationStore } from "@/app/stores/simulation";
import { RequestField, RequestGroup } from "@/types";
import { Alert, FormControl, FormHelperText, Grid2 as Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

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
    const inputValue = getInput(field.ID);
    if(!inputValue){
      return <></>;
    }
    const value = inputValue.value;
    const textFieldSize = field.Units.length > 0 ? 8 : 12;
    const comboFieldSize = field.MultiField ? 3 : 4;
    return (
      <Grid size={{ xs: 12, md: 12 }} container spacing={1}>
        <Grid size={{ xs: textFieldSize, md: textFieldSize }}>
          <TextField
            fullWidth
            label={field.Name}
            required={field.Required}
            onChange={ event => setInput(group.ID, {id: field.ID, value: event.target.value})}
            error={errors.some(error => error.id === field.ID.toString())}
            helperText={errors.find(error => error.id === field.ID.toString())?.message}
          />
        </Grid>
        {
        field.Units.length > 0 ? 
          <>
            <Grid size={{ xs: comboFieldSize, md: comboFieldSize }}>
              <FormControl error={errors.some(error => error.id === `${field.ID}_un`)} required={field.Required} fullWidth>
                <InputLabel id={`combo-unit-${field.ID}`}>Unidade</InputLabel>
                <Select
                  labelId={`combo-unit-${field.ID}`}
                  id={`combo-unit-${field.ID}-label`}
                  value={inputValue.unit}
                  onChange={e => setInput(group.ID, { id: field.ID, value, unit: e.target.value })}
                  fullWidth
                >
                  {field.Units.map(unit => <MenuItem key={unit.Unit} value={unit.Unit}>{unit.Unit}</MenuItem>)}
                </Select>
                <FormHelperText>{errors.find(error => error.id === `${field.ID}_un`)?.message}</FormHelperText>
              </FormControl>
            </Grid>
            {
              field.MultiField ?
                <Grid size={{ xs: 1, md: 1 }} alignContent='center'>
                  <IconButton aria-label="delete" onClick={() => handleRemoveMultifield(field)} title="Remover">
                    <DeleteIcon />
                  </IconButton>
                </Grid> :
                undefined
            }
          </>
        : undefined}
      </Grid>
    );
  };

  const renderCombo = (field: RequestField): JSX.Element => {
    const inputValue = getInput(field.ID);
    if(!inputValue){
      return <></>;
    }
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
            value={inputValue.value}
            onChange={ event => setInput(group.ID, {id: field.ID, value: event.target.value})}
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
    const inputValue = getInput(field.ID);
    if(!inputValue){
      return <></>;
    }
    const currentValue = inputValue.value;
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