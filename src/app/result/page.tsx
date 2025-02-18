"use client"

import React from "react";
import { Container, createTheme, Divider, Grid2 as Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import dynamic from "next/dynamic"
import { BarChart, PieChart } from "@mui/x-charts";

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

const primaryColor = '#53534a';
const secondayColor = '#c3cf21';

const theme = createTheme({
  palette: {
    primary: { main: primaryColor },
    secondary: { main: secondayColor },
  },
  typography: {
    allVariants: {
      color: primaryColor
    }
  }
});

const Result = () => {

  // const formatNumber = (value: number, decimals: number) => new Decimal(value).toFixed(decimals).replaceAll('.',',');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calcSubgroupTotal = (items: any[]) => items.reduce((prev, {value}) => prev + value, 0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calcGroupTotal = (subgroups: any[]) => subgroups.reduce((prev, {items}) => prev + calcSubgroupTotal(items), 0);

  const calcTotal = () => mockedData.reduce((prev, {groups}) => prev + calcGroupTotal(groups), 0);

  const calcPercentual = (value: number) => value * 100 / calcTotal();

  // const calcFormattedPercentual = (value: number) => formatNumber(calcPercentual(value), 1);

  interface Data {
    key: string;
    value: string;
  }

  interface Line {
    title: string;
    description?: string;
    data: (Data | undefined)[];
    type: 'data' | 'graphic'
  }

  const records: Line[] = [
    {
      title: 'Empresa',
      type: 'data',
      data: [
        {
          key: 'Entidade',
          value: 'Empresa XPTO'
        },
        {
          key: 'NIPC',
          value: '3545453'
        },
        {
          key: 'Ano',
          value: '2025'
        },
        undefined,
        {
          key: 'Produção',
          value: '19000 unidade'
        }
      ]
    },
    {
      title: 'Emissão de gases com efeito de estufa - resumo',
      type: 'data',
      description: 'A pegada de carbono reflete a quantidade total de gases com efeito de estufa (GEE) que são emitidos direta ou indiretamente como resultado das atividades da sua indústria. O resultado apresentado apenas considera o âmbito 1 (emissões diretas) e âmbito 2 (emissões com a aquisição de energia)',
      data: [
        {
          key: 'Emissões',
          value: '6775.65 tCO2e'
        },
        undefined,
        {
          key: 'Emissões específicas',
          value: '234 tCO2e/Unidade'
        }
      ]
    },
    {
      title: 'Emissão de gases com efeito de estufa - por âmbito',
      type: 'data',
      data: [
        {
          key: 'Emissões diretas (scope 1)',
          value: '6775.65 tCO2e'
        },
        undefined,
        {
          key: 'Emissões indiretas (scope 2)',
          value: '234 tCO2e'
        },
        undefined,
        {
          key: 'Outras emissões (biomassa)',
          value: '234 tCO2e'
        }
      ]
    },
    {
      title: 'Graphic',
      type: 'graphic',
      data: []
    },
    {
      title: 'Disclaimer',
      type: 'data',
      description: `
Esta ferramenta de cálculo de emissões de Gases com Efeito de Estufa (GEE) enquadra-se no âmbito do projeto Paper4Neutral – Roteiro para a descarbonização do setor do papel e cartão desenvolvido pela ANIPC – Associação Nacional dos Industriais do Papel e Cartão.

O cálculo das emissões de GEE considera apenas as emissões diretas de âmbito 1 (e.g., consumo de combustíveis, utilização de colas e tintas com solventes, utilização de fluídos refrigerantes) e as emissões indiretas de âmbito 2 (consumo de eletricidade adquirida) das instalações e processos industriais do setor do papel e cartão.

Os dados e informações utilizadas no preenchimento dos campos da ferramenta são da única e inteira responsabilidade dos utilizadores. Omissões ou inexatidões poderão influenciar a fiabilidade dos resultados apresentados. A ANIPC não se responsabiliza pela precisão dos resultados obtidos.

Notas metedológicas são apresentadas no relatório das emissão de gases com efeito de estufa (após  download).


powered by impact partners www.impactpartners.pt
      `,
      data: []
    }
  ];

  const renderLines = (lines: Line[]) => {
    return (
      lines.map((line, i) => {
        if(line.type === 'data'){
          return renderLine(line, i); 
        }else {
          return renderGraphic(line, i);
        }
      }
    ));
  };

  const renderLine = (line: Line, index: number) => (
    <Grid container size={{ xs: 12, md: 12 }} key={`line${index}`} style={{marginBottom: '20px'}}>
      <Grid size={{ xs: 12, md: 12 }}>
        <Grid size={{ xs: 12, md: 12 }} style={{textAlign: 'left'}}>
          <Typography variant="h5" color="secondary">
            <strong>{line.title}</strong>
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Divider style={{marginBottom: '15px'}}/>
        </Grid>
        {
          line.description ? 
          <Grid size={{ xs: 12, md: 12 }} style={{textAlign: 'left'}}>
            <Typography variant='caption'>{line.description}</Typography>
          </Grid> : 
          null
        }
      </Grid>
      {
        line.data.map((item, j) => (
          <Grid container size={{ xs: 12, md: 6 }} key={`item${j}`} alignItems='center'>
            {
              item ? 
              <>
                <Grid size={{ xs: 6, md: 6 }} style={{textAlign: 'left'}}>
                  <Typography variant="h6">
                    <strong>{item.key}</strong>
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 6 }} style={{textAlign: 'left'}}>
                  <Typography variant="body1">{item.value}</Typography>
                </Grid> 
              </> : null
            }
          </Grid>
        ))
      }
    </Grid>
  );

  const renderGraphic = (line: Line, index: number) => {
    return (
      <Grid container size={{ xs: 12, md: 12 }} key={`line${index}`} style={{margin: '30px 0 30px 0', height: '400px'}}>
        <Grid container size={{ xs: 12, md: 6 }}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="button" color="secondary">
              <strong>Pegada de carbono</strong>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <PieChart
              colors={[secondayColor, primaryColor]}
              series={[
                {
                  data: [
                    { id: 0, value: calcPercentual(calcGroupTotal(mockedData[1].groups)), label: mockedData[0].title },
                    { id: 1, value: calcPercentual(calcGroupTotal(mockedData[0].groups)), label: mockedData[1].title },
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
        <Grid container size={{ xs: 12, md: 6 }}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="button" color="secondary">
              <strong>Impacto das emissões de gases com efeito estufa</strong>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: [
                    'Combustão estacionária', 
                    'Combustao móvel', 
                    'Emissões de processo e fugitivas', 
                    'Emissões indiretas: energia elétrica'
                  ],
                  scaleType: 'band',
                  colorMap: {
                    type: 'ordinal',
                    colors: [secondayColor, secondayColor, secondayColor, primaryColor]
                  }
                },
              ]}
              barLabel="value"
              series={[
                {
                  data: [22, 7.7, 1.54, 1.3],
                },
              ]}
              width={500}
              height={300}
              grid={{ horizontal: true }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent='center'>
          <Grid>
            <Typography gutterBottom variant="h5" component="div" color="secondary">
              <strong>Resumo da Pegada de carbono</strong>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Stack direction="row" width="100%" textAlign="center" spacing={2}>
            <Grid container size={{ xs: 12, md: 12 }}>
              {renderLines(records)}
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