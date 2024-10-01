import { Chip } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

interface StatusProps {
  status: boolean | null;
}

const GrantApplicationStatusChip = ({ status }: StatusProps) => {
  console.log('GrantApplicationStatusChip ->>>', status);

  return (
    <Chip
      sx={{
        backgroundColor: (theme) =>
          status === null
            ? theme.palette.info.main
            : status
            ? 'green'
            : theme.palette.error.main,
      }}
      label={status === null ? 'Applied' : status ? 'Accepted' : 'Rejected'}
    />
  );
};

const GrantApplicationStatusChipRenderer = (
  params: GridRenderCellParams<any, boolean | null>
) => {
  // console.log('GrantApplicationStatusChipRenderer ->>>', params);

  return <GrantApplicationStatusChip status={params.value} />;
};

export default GrantApplicationStatusChipRenderer;
