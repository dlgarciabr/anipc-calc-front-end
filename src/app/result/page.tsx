"use client"

import React from "react";
import { Box, Container, Grid2 as Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dynamic from "next/dynamic";
import Decimal from 'decimal.js';
import { PieChart } from "@mui/x-charts";

const mockedData = [
  {
    title: 'Ambito 1',
    groups: [
      {
        title: 'Combustão Estacionaria',
        items: [{
          title: 'Gás propano',
          value: 7.54
        }] 
      },
      {
        title: 'Combustão Móvel',
        items: [
          {
            title: 'Gasóleo',
            value: 1289.3
          },
          {
            title: 'Gasolina',
            value: 38.6
          },
          {
            title: 'GPL Auto',
            value: 6.6
          }
        ] 
      },
      {
        title: 'Emissões fugitivas',
        items: [{
          title: 'Gases fluorados',
          value: 3.4
        }] 
      },
    ]
  },
  {
    title: 'Ambito 2',
    groups: [{
      title: 'Energia Elétrica',
      items: [{
        title: 'Energia Elétrica (faturada)',
        value: 3616.90
      }] 
    }]
  }
];

interface TableRow {
  id: number; 
  span?: number;
  columnA: string | undefined;
  columnB?: string; 
  columnC: string;
  columnD: string;
}

const Result = () => {

  const formatNumber = (value: number, decimals: number) => new Decimal(value).toFixed(decimals).replaceAll('.',',');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calcSubgroupTotal = (items: any[]) => items.reduce((prev, {value}) => prev + value, 0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calcGroupTotal = (subgroups: any[]) => subgroups.reduce((prev, {items}) => prev + calcSubgroupTotal(items), 0);

  const calcTotal = () => mockedData.reduce((prev, {groups}) => prev + calcGroupTotal(groups), 0);

  const calcPercentual = (value: number) => value * 100 / calcTotal();

  const calcFormattedPercentual = (value: number) => formatNumber(calcPercentual(value), 1);

  let index = 0;

  const renderRows = () => {
    const rows: TableRow[] = [];

    mockedData.forEach(data => {
      rows.push({ id: index, columnA: data.title, columnC: formatNumber(calcGroupTotal(data.groups), 2), columnD: `${calcFormattedPercentual(calcGroupTotal(data.groups))}`});
      index++;
      data.groups.forEach(group => {
        if(group.items.length === 1){
          rows.push({ id: index, columnA: group.title, columnB : group.items[0].title, columnC: formatNumber(group.items[0].value, 2), columnD: calcFormattedPercentual(group.items[0].value) });
        } else if(group.items.length > 1 ) {
          rows.push({ id: index, columnA: group.title, columnB : 'total movel', columnC: formatNumber(calcSubgroupTotal(group.items), 2), columnD: `${calcFormattedPercentual(calcSubgroupTotal(group.items))}`, span: group.items.length + 1 });
          index++;
          group.items.forEach( item => {
            rows.push({ id: index, columnA: undefined, columnB : item.title, columnC: formatNumber(item.value, 2), columnD: calcFormattedPercentual(item.value) });
            index++;
          });
        }
        index++;
      });
    });

    rows.push({ id: index, columnA: 'Total', columnC: formatNumber(calcTotal(), 2), columnD: '100%' });

    return rows.map(renderRow);
  }

  const renderRow = (row: TableRow) => {
    return (
      <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        {
          row.columnA ?
          (
            <TableCell component="th" scope="row" rowSpan={row.span || 1}>
              {row.columnA}
            </TableCell>
          ): undefined
        }
        <TableCell component="th" scope="row">
          {row.columnB}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.columnC}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.columnD}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} style={{height: '900px'}}>
        {/* <Grid size={{ xs: 12, md: 12 }} container justifyContent='center' alignContent='center' style={{textAlign: 'center'}}>
          <Typography gutterBottom variant="h5" component="div">
            Resultado
          </Typography>
        </Grid> */}
        {/* <Grid size={{ xs: 12, md: 12 }} container justifyContent='center' alignContent='center' style={{textAlign: 'center'}}> */}
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Fontes de emissão</TableCell>
                  <TableCell align="center">Fontes de energia</TableCell>
                  <TableCell align="center">Emissão de CO2</TableCell>
                  <TableCell align="center">%</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderRows()}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        {/* </Grid> */}
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
          <Box flexGrow={1}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: calcPercentual(calcGroupTotal(mockedData[0].groups)), label: mockedData[0].title },
                    { id: 1, value: calcPercentual(calcGroupTotal(mockedData[1].groups)), label: mockedData[1].title },
                  ],
                  innerRadius: 50,
                  outerRadius: 130,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: 0,
                  // cx: 150,
                  // cy: 150,
                }
              ]}
            />
          </Box>
        </Stack>
      </Grid>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(Result), {
  ssr: false
});