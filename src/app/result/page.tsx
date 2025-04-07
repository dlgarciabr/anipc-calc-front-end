/* eslint-disable react/jsx-no-undef */
"use client"

import React, { Fragment } from "react";
import { Button, Container, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid2 as Grid, Stack, ThemeProvider, Tooltip, Typography } from "@mui/material";
import dynamic from "next/dynamic"
import { BarPlot, ChartsClipPath, ChartsXAxis, ChartsYAxis, PieChart, ResponsiveChartContainer } from "@mui/x-charts";
import { setupScheme } from "@/components/utils/scheme";
import { useSimulationStore } from "../stores/simulation";
import { redirect } from "next/navigation";
import { SimulationResultGroup, SimulationResultReport, SimulationResultValue } from "@/types";
import Decimal from "decimal.js";
import CustomItemTooltip from "./CustomItemTooltip";
import EditIcon from '@mui/icons-material/Edit';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import { useLeavePageConfirm } from "../utils/useLeavePageConfirm";
import { downloadExcel/*, downloadPDF */} from "../calculator/api";

const Result = () => {
  useLeavePageConfirm(true);
  const { form, result, setRouterParam, getData } = useSimulationStore((state) => state);
  const [resetModalOpened, setResetModalOpened] = React.useState<boolean>(false);
  const [isLoadingExcel, setLoadingExcel] = React.useState<boolean>(false);
  // const [isLoadingPDF, setLoadingPDF] = React.useState<boolean>(false);

  const id = React.useId();

  if(!form.ID || !result){
    redirect('calculator');
  }

  const primaryColor = `#${form.Colors[0]}`;
  const secondayColor = `#${form.Colors[1]}`;

  const handleClickEdit = () => {
    setRouterParam('edit');
    redirect('calculator');
  }

  const handleClickConfirmReset = () => {
    setRouterParam('new');
    redirect('calculator');
  }

  const handleClickExportExcel = async () => {
    setLoadingExcel(true);
    try {
      const file = await downloadExcel(getData());
      const url = window.URL.createObjectURL(file.content);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log('error', error);
    }
    setLoadingExcel(false);
  }

  // const handleClickExportPDF = async () => {
  //   setLoadingPDF(true);
  //   try {
  //     const file = await downloadPDF(getData());
  //     const url = window.URL.createObjectURL(file.content);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', file.name);
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  //   setLoadingPDF(false);
  // }

  const formatValue = (value: string, decimals: number) => {
    const nValue = Number(value);
    if(isNaN(nValue)){
      return value;
    }else{
      return formatNumber(nValue, decimals);
    }
  }

  const formatNumber = (value: number, decimals: number) => new Decimal(value).toFixed(decimals).replaceAll('.',',');

  const calcPercentual = (values: SimulationResultValue[], index: number) => {
    const total = values.slice(0,2).reduce((prev, {Value}) => prev + Number(Value), 0);
    return Number(values[index].Value) * 100 / total;
  }

  const renderGroups = (groups: SimulationResultGroup[], numberFormatEnabled: boolean) => {
    const fullWidth = groups.some(group => group.Type === 'blank');
    return (
      groups.map((group, i) => (
        <Grid key={i} container size={{ xs: 12, md: fullWidth ? 12 : 6 }} alignItems='start'>
          {renderGroup(group, numberFormatEnabled)}
        </Grid>
        )
      )
    );
  }

  const renderGroup = (group: SimulationResultGroup, numberFormatEnabled: boolean) => (
    group.Values.map(value => {
      let finalValue = value.Unit ? `${value.Value} ${value.Unit}` : value.Value;
      if(numberFormatEnabled){
        finalValue = value.Unit ? `${formatValue(value.Value, 2)} ${value.Unit}` : formatValue(value.Value, 2);
      }
      return ( 
        <Fragment key={value.Title}>
          <Grid size={{ xs: 6, md: 6 }} style={{textAlign: 'left'}}>
            <Typography variant="body1" color="secondary">
              {value.Title}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 6 }} style={{textAlign: 'left'}}>
            <Typography variant="body1" color="secondary">
              {finalValue}
            </Typography>
          </Grid> 
        </Fragment>
      )
    })
  );

  const renderGraphicGroups = (groups: SimulationResultGroup[]) => {
    return (
      <Grid container size={{ xs: 12, md: 12 }} style={{margin: '30px 0 30px 0'}}>
        {
          groups.map(group => {
            if(group.Type === 'graph:bars'){
              return renderBarGraphic(group);
            }else if(group.Type === 'graph:circular'){
              return renderCircularGraphic(group);
            }
          })
        }
      </Grid>
    );
  };

  const renderCircularGraphic = (group: SimulationResultGroup) => {
    return (
      <Grid key={group.Title} container size={{ xs: 12, md: 6 }}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h6">
            {group.Title}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }} justifyItems='center'>
          <PieChart
            width={270}
            height={320}
            colors={[primaryColor, secondayColor]}
            series={[
              {
                data: [
                  { id: 0, value: calcPercentual(group.Values, 0), label: group.Values[0].Title },
                  { id: 1, value: calcPercentual(group.Values, 1), label: group.Values[1].Title },
                ],
                innerRadius: 50,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: 0,
                cx: 130,
                cy: 130,
                valueFormatter: (v) => v === null ? '' : `${formatNumber(v.value, 2)}%`
              }
            ]}
            slotProps={{
              legend: {
                direction: 'column',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
              },
            }}
          />
        </Grid>
      </Grid>
    );
  }

  const renderBarGraphic = (group: SimulationResultGroup) => {
    const clipPathId = `${id}-clip-path`;
    return (
      <Grid key={group.Title} container size={{ xs: 12, md: 6 }} sx={{marginTop: {xs: '20px', md: '0'}}}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h6">
            {group.Title}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <ResponsiveChartContainer
            height={300}
            dataset={[
              { 
                shortLabel: group.Values[0].Label,
                value:  Number(group.Values[0].Value) 
              },
              { 
                shortLabel: group.Values[1].Label,
                value:  Number(group.Values[1].Value),
              },
              { 
                shortLabel: group.Values[2].Label,
                value:  Number(group.Values[2].Value),
              },
              { 
                shortLabel: group.Values[3].Label,
                value:  Number(group.Values[3].Value),
              },
            ]}
            series={[
              {type: 'bar', dataKey: 'value', },
            ]}
            xAxis={[
              { 
                scaleType: 'band', 
                dataKey: 'shortLabel',
                colorMap: {
                  type: 'ordinal',
                  colors: [ 
                    `#${group.Values[0].Color}`, 
                    `#${group.Values[1].Color}`, 
                    `#${group.Values[2].Color}`, 
                    `#${group.Values[3].Color}` 
                  ]
                },
              }
            ]}
          >
            <ChartsClipPath id={clipPathId} />
            <g clipPath={`url(#${clipPathId})`}>
              <BarPlot />
            </g>
            <ChartsXAxis />
            <ChartsYAxis />
            <CustomItemTooltip group={group}/>
          </ResponsiveChartContainer>
        </Grid>
      </Grid>
    );
  }

  const renderReport = (report: SimulationResultReport, index: number) => {
    if(report.Groups.length === 0){
      return null;
    }
    const dataGroups = report.Groups[0];
    const graphicGroups = report.Groups.length === 2 ? report.Groups[1] : undefined;

    return (
      <Grid container size={{ xs: 12, md: 12 }} key={report.Title}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Grid size={{ xs: 12, md: 12 }} style={{textAlign: 'left', marginTop: '20px'}}>
            <Typography variant="h5">
              {report.Title}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <Divider style={{marginBottom: '15px'}}/>
          </Grid>
          {
            report.Desc ? 
              report.Desc.map((desc, i) => (
                <Grid key={i} size={{ xs: 12, md: 12 }} style={{textAlign: 'left', marginBottom: '20px'}}>
                  <Typography variant='caption' color="secondary">{desc}</Typography>
                </Grid>
              ))
            : null
          }
        </Grid>
        {
          renderGroups(dataGroups, index != 0)
        }
        {
          graphicGroups ? renderGraphicGroups(graphicGroups) : null
        }
      </Grid>
    );
  }

  const renderDisclaimer = (report: SimulationResultReport) => (
    <Grid container size={{ xs: 12, md: 12 }} key={report.Title} style={{marginBottom: '20px'}}>
      <Grid size={{ xs: 12, md: 12 }}>
        <Grid size={{ xs: 12, md: 12 }} style={{textAlign: 'left'}}>
          <Typography variant="h5">
            {report.Title}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Divider style={{marginBottom: '15px'}}/>
        </Grid>
        {
          report.Desc ? 
            report.Desc.map((line, i) => (
              <Grid key={i} size={{ xs: 12, md: 12 }} style={{textAlign: 'left'}}>
                {
                  line === '' ? 
                  <Typography variant='caption' color="secondary">&nbsp;</Typography> :
                  <Typography variant='caption' color="secondary">{line}</Typography>
                }
              </Grid>
            ))
          : null
        }
      </Grid>
    </Grid>
  );

  const customTheme = createTheme(setupScheme(primaryColor, secondayColor));

  const renderResetDialog = () => (
    <Dialog
      open={resetModalOpened}
      onClose={()=>setResetModalOpened(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography color="secondary">Deseja preencher uma nova simulação?</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Ao continuar as informações previamente preenchidas serão perdidas.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setResetModalOpened(false)}>Cancelar</Button>
        <Button onClick={handleClickConfirmReset} autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <ThemeProvider theme={customTheme} defaultMode="light">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent='center'>
          <Grid>
            <Typography gutterBottom variant="h5" component="div" color="primary">
              <strong>{result.Title}</strong>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Stack direction="row" width="100%" textAlign="center" spacing={2}>
            <Grid container size={{ xs: 12, md: 12 }}>
              {result.Reports.map(renderReport)}
              {renderDisclaimer(result.Reports[3])}
            </Grid>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }} container justifyContent='space-evenly' alignContent='flex-start' sx={{marginBottom: '50px'}}>
          <Tooltip title='Voltar e editar a simulação atual' arrow>
            <Button variant="outlined" endIcon={<EditIcon />} onClick={handleClickEdit} size="large">
              voltar
            </Button>
          </Tooltip>
          <Tooltip title='Exportar simulação para Excel' arrow>
            <Button variant="contained" endIcon={<DescriptionIcon />} size="large" component="label" onClick={handleClickExportExcel} loading={isLoadingExcel}>
              Excel
            </Button>
          </Tooltip>
          {/* <Tooltip title='Exportar simulação para PDF' arrow>
            <Button variant="contained" endIcon={<PictureAsPdfIcon />} size="large" component="label"  onClick={handleClickExportPDF} loading={isLoadingPDF}>
              PDF
            </Button>
          </Tooltip> */}
          <Tooltip title='Iniciar o preenchimento de uma nova simulação' arrow>
            <Button variant="outlined" endIcon={<AddIcon />} onClick={()=>setResetModalOpened(true)} size="large">
              Nova
            </Button>
          </Tooltip>
        </Grid>
      </Container>
      {renderResetDialog()}
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(Result), {
  ssr: false
});
