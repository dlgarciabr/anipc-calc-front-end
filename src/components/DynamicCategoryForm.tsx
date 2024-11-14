import { useSimulationStore } from "@/app/stores/simulation";
import { InputCategory } from "../types";
import { Box, TextField } from "@mui/material";

interface DynamicCategoryFormProps {
  category: InputCategory;
}

const DynamicCategoryForm = ({ category }: DynamicCategoryFormProps) => {
  const { inputCategories } = useSimulationStore((state) => state);
  const categoryInputs = inputCategories[category.id].inputs;
  return (
    <>
      {category.name}
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
          {
            Object.keys(categoryInputs).map(key => (
              <TextField
                key={categoryInputs[key].id}
                label={categoryInputs[key].name}
                defaultValue=''
                required={true}
              />
            ))
          }
      </Box>
    </>


  )
  return category.name;
}

export default DynamicCategoryForm;