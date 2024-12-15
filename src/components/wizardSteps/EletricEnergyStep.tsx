import { useSimulationStore } from "@/app/stores/simulation";
import { Grid2 as Grid, Typography } from "@mui/material";
import InputTextField from "../InputTextField";

const EletricEnergyStep = () => {
  const { setInput, getInput, inputCategories } = useSimulationStore((state) => state);

  const category = inputCategories['ELETRICA'];

  const handleChangeInput = (inputId: string, value: string, unit: string) => {
    const oldInput =  getInput(category.id, inputId);
    const newInput = { ...oldInput, unit: [unit], value };
    setInput(newInput);
  }

  return (
    <Grid container spacing={2}>
      <Typography variant="h4">{category.name}</Typography>
      <Grid size={{ xs: 12, md: 12 }}>
        <InputTextField categoryId={category.id} inputId={Object.keys(category.inputs)[0]} onChangeInput={handleChangeInput}  />
        <InputTextField categoryId={category.id} inputId={Object.keys(category.inputs)[1]} onChangeInput={handleChangeInput}  />
        <InputTextField categoryId={category.id} inputId={Object.keys(category.inputs)[2]} onChangeInput={handleChangeInput}  />
        <InputTextField categoryId={category.id} inputId={Object.keys(category.inputs)[3]} onChangeInput={handleChangeInput}  />
        <InputTextField categoryId={category.id} inputId={Object.keys(category.inputs)[4]} onChangeInput={handleChangeInput}  />
      </Grid>
    </Grid>
  )
}

export default EletricEnergyStep;