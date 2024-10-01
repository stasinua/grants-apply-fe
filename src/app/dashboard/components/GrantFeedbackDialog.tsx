'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface GrantFeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  onFeedback: (feedback: string) => void;
}

const GrantFeedbackDialog = ({
  open,
  onClose,
  onFeedback,
}: GrantFeedbackDialogProps) => {
  const [feedback, setFeedback] = useState('');
  const [feedbackError, setFeedbackError] = useState('');

  const checkFeedback = () => {
    if (feedback.length > 50) {
      setFeedbackError(
        'Please keep your feedback shorter than 300 charachters'
      );
    } else if (feedback.includes('@') || feedback.includes('+')) {
      setFeedbackError(
        'No contact information needed. We already have the information :)'
      );
    } else {
      onFeedback(feedback);
      onClose();
    }
  };

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Send grant feedback</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Great match. Leave us a feedback so we can communicate with you more.
          Please keep your feedback shorter than 300 charachters
        </Typography>
        <TextField
          label="Your feedback here"
          variant="outlined"
          onChange={(evt) => setFeedback(evt.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        {feedbackError ? (
          <Typography sx={{ color: (theme) => theme.palette.error.main }}>
            {feedbackError}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!!feedbackError}
          autoFocus
          onClick={() => {
            checkFeedback();
          }}
        >
          Send
        </Button>
        <Button
          autoFocus
          onClick={() => {
            onClose();
            setFeedbackError('')
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GrantFeedbackDialog;
