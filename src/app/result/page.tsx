"use client"

import React, { Fragment } from "react";
import { Container, createTheme, Divider, Grid2 as Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import dynamic from "next/dynamic"
import { BarChart, PieChart } from "@mui/x-charts";
import { setupScheme } from "@/components/utils/scheme";
import { useSimulationStore } from "../stores/simulation";
import { redirect } from "next/navigation";
import { SimulationResultGroup, SimulationResultReport, SimulationResultValue } from "@/types";
import Decimal from "decimal.js";

const Result = () => {
  const { form, result } = useSimulationStore((state) => state);

  if(!form.ID || !result){
    redirect('calculator');
  }

  const primaryColor = `#${form.Colors[0]}`;
  const secondayColor = `#${form.Colors[1]}`;

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
              <Typography variant="h6" color="secondary">
                <strong>{value.Title}</strong>
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
    console.log(groups)
    return (
      <Grid container size={{ xs: 12, md: 12 }} style={{margin: '30px 0 30px 0', height: '400px'}}>
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
      <Grid container size={{ xs: 12, md: 6 }}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h6">
            <strong>{group.Title}</strong>
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <PieChart
            colors={[primaryColor, secondayColor]}
            series={[
              {
                data: [
                  { id: 0, value: calcPercentual(group.Values, 0), label: group.Values[0].Title },
                  { id: 1, value: calcPercentual(group.Values, 1), label: group.Values[1].Title },
                ],
                innerRadius: 50,
                outerRadius: 130,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: 0,
              }
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  const renderBarGraphic = (group: SimulationResultGroup) => {
    return (
      <Grid container size={{ xs: 12, md: 6 }}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h6">
            <strong>{group.Title}</strong>
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <BarChart
            xAxis={[
              {
                id: 'barCategories',
                data: [
                  group.Values[0].Title, 
                  group.Values[1].Title, 
                  group.Values[2].Title, 
                  group.Values[3].Title
                ],
                scaleType: 'band',
                colorMap: {
                  type: 'ordinal',
                  colors: [ 
                    `#${group.Values[0].Color}`, 
                    `#${group.Values[1].Color}`, 
                    `#${group.Values[2].Color}`, 
                    `#${group.Values[3].Color}` 
                  ]
                }
              },
            ]}
            barLabel="value"
            series={[
              {
                data: [
                  Number(group.Values[0].Value),
                  Number(group.Values[1].Value),
                  Number(group.Values[2].Value),
                  Number(group.Values[3].Value)
                ],
              },
            ]}
            width={500}
            height={300}
            grid={{ horizontal: true }}
          />
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
      <Grid container size={{ xs: 12, md: 12 }} key={report.Title} style={{marginBottom: '20px'}}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Grid size={{ xs: 12, md: 12 }} style={{textAlign: 'left'}}>
            <Typography variant="h5">
              <strong>{report.Title}</strong>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <Divider style={{marginBottom: '15px'}}/>
          </Grid>
          {
            report.Desc ? 
              report.Desc.map((desc, i) => (
                <Grid key={i} size={{ xs: 12, md: 12 }} style={{textAlign: 'left'}}>
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

  const customTheme = createTheme(setupScheme(primaryColor, secondayColor));

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
            </Grid>
          </Stack>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(Result), {
  ssr: false
});
