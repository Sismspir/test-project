import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetEmployees } from '../hooks/useGetEmployees';
import { Loader } from './Loader';
import { Error } from './Error';

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: employees, isLoading: loading, error } = useGetEmployees();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error as Error} />;
  }

  const employee = employees?.find(emp => emp.id === id);

  if (!employee) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Employee not found
          </Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
            color="primary"
          >
            Back to Employee List1
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
        variant="contained"
        color={"primary"}
      >
        ← Back to Employee List
      </Button>

      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
            {employee.fullName}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" color="#286e97" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {employee.email}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" color="#286e97" gutterBottom>
                Employment Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Status:</strong>
                </Typography>
                <Chip
                  label={employee.status}
                  color={employee.status === 'Active' ? 'success' : 'error'}
                  variant="outlined"
                />
              </Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Hire Date:</strong> {employee.hireDate}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Department:</strong> {employee.department}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" color="#286e97" gutterBottom>
              Additional Notes
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
              <Typography variant="body1">
                {employee.notes || 'No additional notes available.'}
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeDetails;