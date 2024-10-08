'use client';

import { CircularProgress, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface TopActionIconButtonProps {
  loading: boolean;
  type: string;
  onClick: () => void;
}

const TopActionIconButton = ({ loading, type, onClick }: TopActionIconButtonProps) => {
  return (
    <IconButton disabled={loading} onClick={onClick} sx={{ border: '1px solid grey', padding: 1 }}>
      {loading && <CircularProgress size={15} />}
      {!loading && type === 'like' && <ThumbUpIcon sx={{ fontSize: 15 }} />}
      {!loading && type !== 'like' && <ThumbDownIcon sx={{ fontSize: 15 }} />}
    </IconButton>
  );
};

export default TopActionIconButton;
