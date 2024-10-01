'use client';

import { IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface TopActionIconButtonProps {
  type: string;
  onClick: () => void;
}

const TopActionIconButton = ({ type, onClick }: TopActionIconButtonProps) => {
  return (
    <IconButton onClick={onClick} sx={{ border: '1px solid grey', padding: 1 }}>
      {type === 'like' ? (
        <ThumbUpIcon sx={{ fontSize: 15 }} />
      ) : (
        <ThumbDownIcon sx={{ fontSize: 15 }} />
      )}
    </IconButton>
  );
};

export default TopActionIconButton;
