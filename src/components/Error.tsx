import React from 'react';
import { Box, Alert, Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

interface ErrorProps {
  error: Error | null;
  onRetry?: () => void;
}

export const Error: React.FC<ErrorProps> = ({ error, onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        p: 3,
      }}
    >
      <Alert severity="error" sx={{ mb: 2, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Error Loading Data
        </Typography>
        <Typography variant="body2">
          {error?.message || 'An unknown error occurred'}
        </Typography>
      </Alert>
      {onRetry && (
        <Button
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          variant="outlined"
          color="primary"
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};