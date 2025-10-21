import { Alert, Button, Grid2 as Grid, Snackbar, Tooltip, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';
import { readDataFromFile } from "@/app/calculator/utils";
import React, { ChangeEvent } from "react";
import { useSimulationStore } from "@/app/stores/simulation";

interface InitialStepProps {
  onBegin: () => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const InitialStep = ({onBegin}: InitialStepProps) => {
  const { form, setInputGroups } = useSimulationStore((state) => state);
  
  const handleBegin = () => {
    onBegin();
  }
  
  const [toastProps, setToastProps] = React.useState<{show: boolean; message?: string, severity?: 'error' | 'success'}>({show: false});

  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const content = await readDataFromFile(event);

    if(content.errorMessage){
      setToastProps({show: true, message: content.errorMessage, severity: 'error'});
      return;
    }

    if(!content.data){
      setToastProps({show: true, message: 'Erro na leitura do ficheiro', severity: 'error'});
      return;
    }

    setInputGroups(content.data);

    setToastProps({show: true, message: 'Ficheiro importado com sucesso!'});
  }

  return (
    <Grid container spacing={2} style={{height: '620px'}}>
      <Grid size={{ xs: 12, md: 12 }} container justifyContent='center' alignContent='center' style={{textAlign: 'center'}}>
        <Typography gutterBottom variant="h5" component="div">
          {form.Title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {form.Desc}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }} container justifyContent='center' alignContent='flex-start'>
        <Tooltip title='Importar dados de uma calculadora previamente preenchida' arrow>
          <Button variant="outlined" endIcon={<FileUploadIcon />} size="large" component="label">
            Importar
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => handleUploadFile(event)}
            />
          </Button>
        </Tooltip>
        <Tooltip title='Iniciar o preenchimento dos dados para a calculadora' arrow>
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleBegin} size="large">
            Iniciar
          </Button>
        </Tooltip>
      </Grid>
      <Snackbar 
        open={toastProps.show} 
        autoHideDuration={6000}
        onClose={()=>setToastProps({show: false})} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={()=>setToastProps({show: false})}
          severity={toastProps.severity || 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toastProps.message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default InitialStep;