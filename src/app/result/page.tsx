"use client"

import React from "react";
import { Container, Grid2 as Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Decimal from 'decimal.js';

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

  const calcPercentual = (value: number) => formatNumber(value * 100 / calcTotal(), 1);

  const renderRows = () => {
    const rows: TableRow[] = [];

    mockedData.forEach(data => {
      rows.push({ id: 1, columnA: data.title, columnC: formatNumber(calcGroupTotal(data.groups), 2), columnD: `${calcPercentual(calcGroupTotal(data.groups))}%`});
      data.groups.forEach(group => {
        if(group.items.length === 1){
          rows.push({ id: 1, columnA: group.title, columnB : group.items[0].title, columnC: formatNumber(group.items[0].value, 2), columnD: calcPercentual(group.items[0].value) });
        } else if(group.items.length > 1 ) {
          rows.push({ id: 1, columnA: group.title, columnB : 'total movel', columnC: formatNumber(calcSubgroupTotal(group.items), 2), columnD: `${calcPercentual(calcSubgroupTotal(group.items))}%`, span: group.items.length + 1 })
          group.items.forEach( item => { 
            rows.push({ id: 1, columnA: undefined, columnB : item.title, columnC: formatNumber(item.value, 2), columnD: calcPercentual(item.value) })
          });
        }
      });
    });
  
    rows.push({ id: 1, columnA: 'Total', columnC: formatNumber(calcTotal(), 2), columnD: '100%' });

    return rows.map(renderRow);
  }

  const renderRow = (row: TableRow) => {
    return (
      <TableRow
        key={1}
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
      <Grid container spacing={2} style={{height: '700px'}}>
        <Grid size={{ xs: 12, md: 12 }} container justifyContent='center' alignContent='center' style={{textAlign: 'center'}}>
          <Typography gutterBottom variant="h5" component="div">
            Resultado
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }} container justifyContent='center' alignContent='center' style={{textAlign: 'center'}}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(Result), {
  ssr: false
});