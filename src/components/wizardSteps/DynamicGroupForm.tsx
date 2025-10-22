import React, { Fragment, useState } from "react";
import { useSimulationStore } from "@/app/stores/simulation";
import { InputValue, RequestField, RequestGroup } from "@/types";
import { Alert, Button, FormControl, FormHelperText, Grid2 as Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { exportToJSONFile } from "@/app/calculator/utils";
import FileDownloadIcon from '@mui/icons-material/Download';
import BackspaceIcon from '@mui/icons-material/Backspace';

interface DynamicCategoryFormProps {
  group: RequestGroup;
}

const DynamicGroupForm = ({ group }: DynamicCategoryFormProps) => {
  const { setInput, getInput, errors, inputGroups, deleteInput } = useSimulationStore((state) => state);
  const [ multifieldOptions, setMultifieldOptions ] = useState<RequestField[]>(group.Fields);
  const [ multifields, setMultifields ] = useState<RequestField[]>([]);

  const handleChangeInput = (field: RequestField, value: string) => {
    if(field.Units.length === 1){
      setInput(group.ID, {id: field.ID, value, unit: field.Units[0].Unit});
    }else{
      setInput(group.ID, {id: field.ID, value});
    }
  }

  const handleAddMultifield = (fieldId: number) => {
    const fieldToAdd = group.Fields.find(field => field.ID === fieldId);
    if(!fieldToAdd){
      return;
    }
    const newMultifieldOptions = multifieldOptions.filter(field => field.ID !== fieldId);
    setMultifieldOptions(newMultifieldOptions);
    setMultifields([...multifields, fieldToAdd]);
  };

  const handleAddMultifields = React.useCallback((fieldsId: number[]) => {
    const fieldsToAdd = group.Fields.filter(field => fieldsId.some(fieldId => fieldId === field.ID));
    if(!fieldsToAdd.length){
      return;
    }
    const newMultifieldOptions = multifieldOptions.filter(field => !fieldsId.some(fieldId => fieldId === field.ID));
    setMultifieldOptions(newMultifieldOptions);
    setMultifields([...multifields, ...fieldsToAdd]);
  },[group.Fields, multifieldOptions, multifields]);

  const handleRemoveMultifield = (fieldToRemove: RequestField) => {
    const newMultifields = multifields.filter(field => field.ID !== fieldToRemove.ID);
    deleteInput(group.ID, fieldToRemove.ID);
    setMultifields(newMultifields);
    setMultifieldOptions([...multifieldOptions, fieldToRemove]);
  }

  const renderUnitField = (field: RequestField, inputValue: InputValue) => {
    if(field.Units.length === 0){
      return undefined;
    }
    const comboFieldSize = field.MultiField ? 3 : 4;
    const isOnlyOneUnit = field.Units.length === 1;

    return (
      isOnlyOneUnit ? 
        <TextField
          label="Unidade"
          value={field.Units[0].Unit}
          disabled={true}
        /> :
        <Grid size={{ xs: comboFieldSize, md: comboFieldSize }}>
          <FormControl error={errors.some(error => error.id === `${field.ID}_un`)} required={field.Required} fullWidth>
            <InputLabel id={`combo-unit-${field.ID}`}>Unidade</InputLabel>
            <Select
              labelId={`combo-unit-${field.ID}`}
              id={`combo-unit-${field.ID}-label`}
              value={inputValue.unit}
              onChange={e => setInput(group.ID, { id: field.ID, value: inputValue.value, unit: e.target.value })}
              fullWidth
            >
              <MenuItem key='' value='empty'>&nbsp;</MenuItem>
              {field.Units.map(unit => <MenuItem key={unit.Unit} value={unit.Unit}>{unit.Unit}</MenuItem>)}
            </Select>
            <FormHelperText>{errors.find(error => error.id === `${field.ID}_un`)?.message}</FormHelperText>
          </FormControl>
        </Grid>
    );
  }

  const renderTextField = (field: RequestField): JSX.Element => {
    const inputValue = getInput(field.ID);

    if(!inputValue){
      return <></>;
    }

    const isFixedValue = field.Values.length === 1;

    const textFieldSize = field.Units.length > 0 ? 8 : (inputValue.customValue ? 11 : 12);
    return (
      <Grid size={{ xs: 12, md: 12 }} container spacing={1}>
        <Grid size={{ xs: textFieldSize, md: textFieldSize }}>
          <Tooltip title={field.Desc} arrow>
            <TextField
              fullWidth
              label={field.Name}
              required={field.Required}
              onChange={ e => handleChangeInput(field, e.target.value) }
              error={errors.some(error => error.id === field.ID.toString())}
              helperText={errors.find(error => error.id === field.ID.toString())?.message}
              value={inputValue.value}
              disabled={isFixedValue}
            />
          </Tooltip>
        </Grid>
        {
        field.Units.length > 0 ? 
          <>
            {renderUnitField(field, inputValue)}
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
       {
        inputValue.customValue ? 
        <Tooltip title="Cancelar edição" placement="top">
          <IconButton size="large"
            onClick={()=>setInput(group.ID, {id: field.ID, value: '', customValue: false})} >
            <BackspaceIcon />
          </IconButton>
        </Tooltip>
          : null
       } 
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

    const handleChange = (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      const isOtherOption = event.target.value === 'other';
      setInput(group.ID, {id: field.ID, value: isOtherOption ? '' : value, customValue: isOtherOption});
    }

    return (
        <FormControl sx={{ minWidth: '50%' }} error={errors.some(error => error.id === field.ID.toString())} required={field.Required}>
          <InputLabel id={`combo-${field.ID}`}>{field.Name}</InputLabel>
            <Tooltip title={field.Desc} arrow>
              <Select
                labelId={`combo-${field.ID}`}
                id={`combo-${field.ID}-label`}
                value={inputValue.value}
                onChange={ handleChange }
                fullWidth
              >
                {options}
              </Select>
            </Tooltip>
          <FormHelperText>{errors.find(error => error.id === field.ID.toString())?.message}</FormHelperText>
        </FormControl>
    );
  }

  const renderMultifieldCombo = (): JSX.Element => {
    let options: JSX.Element[] = [];
    const multifieldGroups = new Set(multifieldOptions.filter(field => !!field.MultiFieldGroup).map(field => field.MultiFieldGroup));

    if(multifieldGroups.size){
      const itemsPerGroup = Array.from(multifieldGroups).map(group => ({
        name: group,
        items: multifieldOptions.filter(field => field.MultiFieldGroup === group)
      }));
      itemsPerGroup.forEach(group => {
        options.push(<MenuItem style={{backgroundColor: "#e1dbda"}} key={group.name} value={group.name}>{group.name}</MenuItem>);
        options.push(...group.items.map(item => (<MenuItem key={item.ID} value={item.ID}>{item.Name}</MenuItem>)))
      });
    }else{
      options = multifieldOptions.map(field => <MenuItem key={field.ID} value={field.ID}>{field.Name}</MenuItem>);
    }

    const handleChangeMultifield = (value: string) => {
      if(!Array.from(multifieldGroups).some(item => item === value)){
        handleAddMultifield(Number(value));
      }
    }
    
    return (
      <FormControl fullWidth>
        <InputLabel id={`combo-multifield-${group.Name}`}>Escolha ...</InputLabel>
          <Select
            labelId={`combo-multifield-${group.Name}`}
            id={`combo-multifield-${group.Name}-label`}
            value=''
            onChange={(event)=> handleChangeMultifield(event.target.value)}
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
    const isOtherOption = field.CustomValue && (inputValue.customValue);
    const isFixedValue = field.Values.length === 1;
    if(!field.Values || !field.Values.length || isOtherOption || isFixedValue){
      return renderTextField(field);
    }

    return renderCombo(field);
  }

  React.useEffect(()=>{
    const fieldsMultifield = group.Fields.filter(field => field.MultiField);
    const inputGroup = inputGroups.get(group.ID);
    if(!multifields.length && fieldsMultifield.length && inputGroup && inputGroup.inputs){
      const fieldsIdToAdd = Array.from(inputGroup.inputs.keys())
        .filter(inputId => fieldsMultifield.some(multifield => multifield.ID === Number(inputId)))
        .map(inputId => Number(inputId));
      handleAddMultifields(fieldsIdToAdd);
    }
  },[group, inputGroups, multifields, handleAddMultifields]);

  return (
      <div style={{height: '600px', overflowY: "auto"}}>
        <Grid container>
          <Grid size={{ xs: 10, md: 10 }}>
            <Typography variant="h5" component="h5" style={{ margin: '20px 0 20px 0' }}>{group.Name}</Typography>
          </Grid>
          <Grid alignContent='center'>
            <Tooltip title='Exportar dados preenchidos para continuar mais tarde' arrow>
              <Button variant="outlined" onClick={() => exportToJSONFile(inputGroups)} endIcon={<FileDownloadIcon />}>Exportar</Button>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container>
          {
            group.Desc ? (
              <Grid size={{ xs: 12, md: 12 }} sx={{ margin: '10px 0 20px 0' }}>
                <Alert icon={<InfoOutlinedIcon fontSize="inherit" />} severity="warning">
                  {group.Desc}
                </Alert>
              </Grid>
            ) : undefined
          }
          {
            group.Fields.some(field => field.MultiField) ?
            <>
              {multifields.map(field => (
                <Grid size={{ xs: 12, md: 12 }} key={field.ID} sx={{ minHeight: '85px' }}>
                  {renderField(field)}
                </Grid>
              ))}
              {renderMultifieldCombo()}
            </> :
            group.Fields.map(field => (
              <Grid size={{ xs: 12, md: 12 }} key={field.ID} sx={{ minHeight: '85px' }}>
                {renderField(field)}
              </Grid>
            ))
          }
        </Grid>
      </div>
  )
}

export default DynamicGroupForm;