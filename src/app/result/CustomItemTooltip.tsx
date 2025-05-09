import * as React from 'react';
import NoSsr from '@mui/material/NoSsr';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useItemTooltip, useMouseTracker } from '@mui/x-charts/ChartsTooltip';
import { generateVirtualElement } from './generateVirtualElement';
import { SimulationResultGroup } from '@/types';
import Decimal from "decimal.js";

interface CustomItemTooltipProps {
  group: SimulationResultGroup;
}

const formatNumber = (value: number, decimals: number) => new Decimal(value).toFixed(decimals).replaceAll('.',',');

const CustomItemTooltip = ({group}:CustomItemTooltipProps) => {
  const tooltipData = useItemTooltip();
  const mousePosition = useMouseTracker(); // Track the mouse position on chart.

  if (!tooltipData || !tooltipData.identifier || tooltipData.identifier.dataIndex === undefined || !mousePosition) {
    return null;
  }

  // The pointer type can be used to have different behavior based on pointer type.
  const isMousePointer = mousePosition?.pointerType === 'mouse';
  // Adapt the tooltip offset to the size of the pointer.
  const yOffset = isMousePointer ? 0 : 40 - mousePosition.height;

  return (
    <NoSsr>
      <Popper
        sx={{
          pointerEvents: 'none',
          zIndex: (theme) => theme.zIndex.modal,
        }}
        open
        placement={isMousePointer ? 'top-end' : 'top'}
        anchorEl={generateVirtualElement(mousePosition)}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, yOffset],
            },
          },
        ]}
      >
        <Paper
          elevation={0}
          sx={{
            m: 1,
            p: 1.5,
            border: 'solid',
            borderWidth: 2,
            borderColor: 'divider',
          }}
        >
          <Stack direction="row" alignItems="center">
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                backgroundColor: tooltipData.color,
              }}
            />
            <Typography sx={{ ml: 2 }} color="secondary" fontWeight="light">
              {group.Values[tooltipData.identifier.dataIndex].Title}
            </Typography>
            <Typography sx={{ ml: 2, color: 'black' }}>{tooltipData.value === null ? '' : formatNumber(tooltipData.value as number, 2)}</Typography>
          </Stack>
        </Paper>
      </Popper>
    </NoSsr>
  );
}

export default CustomItemTooltip;
