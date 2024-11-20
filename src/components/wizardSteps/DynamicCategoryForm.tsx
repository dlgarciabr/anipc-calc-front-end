import { useSimulationStore } from "@/app/stores/simulation";
import { InputCategory } from "../../types";
import { Grid2 as Grid, TextField } from "@mui/material";

interface DynamicCategoryFormProps {
  category: InputCategory;
}

const DynamicCategoryForm = ({ category }: DynamicCategoryFormProps) => {
  const { inputCategories } = useSimulationStore((state) => state);
  const categoryInputs = inputCategories[category.id].inputs;
  return (
    <>
      {category.name}
      <Grid container spacing={2}>
          {
            Object.keys(categoryInputs).map(key => (
              <Grid size={{ xs: 12, md: 12 }} key={categoryInputs[key].id}>
                <TextField
                  fullWidth
                  label={categoryInputs[key].name}
                  defaultValue=''
                  required={true}
                />
              </Grid>
            ))
          }
      </Grid>
    </>


  )
  return category.name;
}

export default DynamicCategoryForm;