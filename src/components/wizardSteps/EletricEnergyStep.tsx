import { getCategories } from "@/app/calculator/api";
import { useSimulationStore } from "@/app/stores/simulation";
import { Grid2 as Grid } from "@mui/material";
import InputTextField from "../InputTextField";

const EletricEnergyStep = () => {
  const { setInput, getInput } = useSimulationStore((state) => state);

  const category = getCategories('')[0];

  const handleChangeInput = (inputId: string, value: string, unit: string) => {
    const oldInput =  getInput(category.id, inputId);
    const newInput = { ...oldInput, unit: [unit], value };
    setInput(newInput);
  }

  return (
    <Grid container spacing={2}>
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