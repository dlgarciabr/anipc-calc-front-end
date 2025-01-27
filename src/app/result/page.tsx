"use client"

import React from "react";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dynamic from "next/dynamic";

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
            value: 1289
          },
          {
            title: 'Gasolina',
            value: 38
          }
        ] 
      }
    ]
  },
  {
    title: 'Ambito 2',
    groups: [{
      title: 'Energia Elétrica',
      items: [{
        title: 'Energia Elétrica (faturada)',
        value: 3616
      }] 
    }]
  }
];

interface DatagridRow {
  id: number; 
  span?: number;
  columnA: string | undefined;
  columnB?: string; 
  columnC?: number;
  columnD?: string;
}

const Result = () => {
  const calcTotal = () => {
    // return childRows.reduce((prev, { columnC }) => prev + (columnC ? columnC : 0), 0);
    return 999999;
  }

  const renderRows = () => {
    const rows: DatagridRow[] = [];

    mockedData.forEach(data => {
      rows.push({ id: 1, columnA: data.title, columnC: calcTotal()});
      data.groups.forEach(group => {
        if(group.items.length === 1){
          rows.push({ id: 1, columnA: group.title, columnB : group.items[0].title, columnC: group.items[0].value, columnD: 'CALCULAR' });
        } else if(group.items.length > 1 ) {
          rows.push({ id: 1, columnA: group.title, columnB : group.items[0].title, columnC: group.items[0].value, columnD: '99%', span: group.items.length })
          group.items.slice(1, group.items.length).forEach( item => { 
            rows.push({ id: 1, columnA: undefined, columnB : item.title, columnC: item.value, columnD: '99%' })
          });
        }
      });
    });
  
    rows.push({ id: 1, columnA: 'Total', columnC: 4962, columnD: '100%calc', span: 1 });

    return rows.map(renderRow);
  }

  const renderRow = (row: DatagridRow) => {
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
        <TableCell component="th" scope="row" align="center">
          {row.columnC}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.columnD}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Container maxWidth="md">
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
    </Container>
  );
}

export default dynamic(() => Promise.resolve(Result), {
  ssr: false
});