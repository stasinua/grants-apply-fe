'use client';

import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';

import { graphQlClient } from '@/api/index';
import { addFeedbackMutation } from '@/api/applicantGrantFeedbacks/api';
import GrantCard from './components/GrantCard';
import usePaginatedGrants from '@/api/grants';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import GrantApplicationStatusChipRenderer from './components/GrantApplicationStatusChip';
import {
  deleteAllFeedbacksForApplicant,
  usePaginatedApplicantGrantFeedbacks,
} from '@/api/applicantGrantFeedbacks';
import GrantFeedbackDialog from './components/GrantFeedbackDialog';
import { formatTimeStamp } from '@/helpers/time';
import { Close } from '@mui/icons-material';

const grantApplicationColumns: GridColDef[] = [
  { field: 'col1', headerName: 'Foundation name', width: 300 },
  { field: 'col2', headerName: 'Grant name', width: 300 },
  { field: 'col3', headerName: 'Grant amount', width: 200 },
  {
    field: 'col4',
    headerName: 'Status',
    width: 200,
    renderCell: GrantApplicationStatusChipRenderer,
  },
  { field: 'col5', headerName: 'Deadline', width: 200 },
  { field: 'col6', headerName: 'Match date', width: 200 },
];

const grantFeedbackColumns: GridColDef[] = [
  { field: 'col1', headerName: 'Foundation name', width: 300 },
  { field: 'col2', headerName: 'Grant name', width: 300 },
  { field: 'col3', headerName: 'Grant amount', width: 200 },
  { field: 'col4', headerName: 'Deadline', width: 200 },
  { field: 'col5', headerName: 'Match date', width: 200 },
  { field: 'col6', headerName: 'Feedback', width: 200 },
];

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [mutationLoading, setMutationLoading] = useState('');
  const [openedAlert, setOpenedAlert] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [createFeedbackObj, setCreateFeedbackObj] = useState<{
    grantId: number;
    applicantId: number;
    positive: boolean;
    feedback: string;
  } | null>(null);
  const [grantFeedbackDialogOpen, setGrantFeedbackDialogOpen] = useState(false);
  // QUERIES
  const {
    refetch: refetchGrants,
    loading: loadingGrants,
    error: errorGetGrants,
    grants,
    // total: totalGrants,
  } = usePaginatedGrants(page, 4, 1);

  const {
    refetch: refetchGrantFeedbacks,
    loading: loadingApplicantGrantFeedbacks,
    error: errorGetApplicantGrantFeedbacks,
    applicantGrantFeedbacks,
    total: totalApplicantGrantFeedbacks,
  } = usePaginatedApplicantGrantFeedbacks(1, page, 10); // Fetch all grant feedbacks/applications

  const {
    refetch: refetchPastGrants,
    loading: loadingPastGrants,
    error: errorPastGrants,
    applicantGrantFeedbacks: pastGrants,
    total: totalPastGrants,
  } = usePaginatedApplicantGrantFeedbacks(1, page, 10, true); // We fetch only "positive" feedbacks to represent past grants

  console.log('applicantGrantFeedbacks ->>>', applicantGrantFeedbacks);
  console.log('grants ->>>', grants);

  const grantApplicationRows: GridRowsProp = applicantGrantFeedbacks
    ? applicantGrantFeedbacks.map(
        (applicationObj: GrantApplicationFeedback) => {
          return {
            id: applicationObj.id,
            col1: applicationObj.grant.institution?.name,
            col2: applicationObj.grant.name,
            col3: applicationObj.grant.grantAmount,
            col4: applicationObj.positive,
            col5: applicationObj.grant.deadlineAt
              ? formatTimeStamp(applicationObj.grant.deadlineAt)
              : '',
            col6: applicationObj.createdAt
              ? formatTimeStamp(applicationObj.createdAt)
              : '',
          };
        }
      )
    : [];

  const grantFeedbackRows: GridRowsProp = pastGrants
    ? pastGrants.map((applicationObj: GrantApplicationFeedback) => {
        return {
          id: applicationObj.id,
          col1: applicationObj.grant.institution?.name,
          col2: applicationObj.grant.name,
          col3: applicationObj.grant.grantAmount,
          col4: applicationObj.grant.deadlineAt
            ? formatTimeStamp(applicationObj.grant.deadlineAt)
            : '',
          col5: applicationObj.createdAt
            ? formatTimeStamp(applicationObj.createdAt)
            : '',
          col6: applicationObj.feedback,
        };
      })
    : [];
  // MUTIATIONS
  const [addFeedback] = useMutation(addFeedbackMutation.queryShema, {
    client: graphQlClient,
  });

  // Handlers

  const addApplicantGrantFeedback = async (
    grantId: number,
    applicantId: number,
    positive: boolean,
    feedback: string
  ) => {
    try {
      setMutationLoading(positive ? `${grantId}:like` : `${grantId}:dislike`);
      const { data: addFeedbackRes } = await addFeedback({
        variables: {
          grantId,
          applicantId,
          positive,
          feedback,
        },
      });
      refetchGrants({
        page: 1,
        applicantId: 1,
        limit: 4,
      });
      refetchPastGrants({
        page: 1,
        applicantId: 1,
        limit: 10,
        positive: true,
      });
      refetchGrantFeedbacks({
        page: 1,
        applicantId: 1,
        limit: 10,
      });
      console.log('addApplicantGrantFeedback ->>>', addFeedbackRes);
      setMutationLoading('');
      setNotificationMessage('Feedback saved successfully');
    } catch (err) {
      setMutationLoading('');
      // TODO: Add global notifications
      console.log('addApplicantGrantFeedback err ->>>', err);
    }
  };

  const resetGrants = async () => {
    try {
      await deleteAllFeedbacksForApplicant(1);
      setNotificationMessage('Feedbacks deleted successfully');
      refetchGrants({
        page: 1,
        applicantId: 1,
        limit: 4,
      });
      refetchPastGrants({
        page: 1,
        applicantId: 1,
        limit: 10,
        positive: true,
      });
      refetchGrantFeedbacks({
        page: 1,
        applicantId: 1,
        limit: 10,
      });
    } catch (err) {
      console.log('resetGrants err ->>>', err);
    }
  };

  console.log(mutationLoading);

  // console.log(loading, grants, error);

  const requestError =
    errorGetGrants || errorPastGrants || errorGetApplicantGrantFeedbacks;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Local error messaging */}
      {(requestError || notificationMessage) && openedAlert ? (
        <div
          style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1000 }}
        >
          <Alert
            sx={{ maxWidth: 400, zIndex: 1000 }}
            severity={requestError ? 'error' : 'info'}
          >
            {requestError ? requestError.message : notificationMessage}
            <IconButton
              onClick={() => {
                setOpenedAlert(false);
              }}
            >
              <Close sx={{ fontSize: 15 }} />
            </IconButton>
          </Alert>
        </div>
      ) : null}
      {/* Feedback dialog */}
      <GrantFeedbackDialog
        onClose={() => {
          setGrantFeedbackDialogOpen(false);
        }}
        open={grantFeedbackDialogOpen}
        onFeedback={(feedback: string) => {
          if (createFeedbackObj) {
            addApplicantGrantFeedback(
              createFeedbackObj?.grantId,
              createFeedbackObj?.applicantId,
              createFeedbackObj?.positive,
              feedback
            );
          } else {
            // We should not arrive here during normal operations
            console.log('State was not populated');
          }
        }}
      />
      {/* <SideMenu /> */}
      {/* <AppBar position="static">
        <Toolbar variant="regular">
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 100,
              width: '100%',
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'center' }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: 'text.primary' }}
              >
                Dashboard
              </Typography>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar> */}
      {/* Main content */}
      <Box
        sx={() => ({
          flexGrow: 1,
          width: '100%',
          overflow: 'auto',
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 10,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              New Matches
            </Typography>
            <Grid2
              container
              spacing={2}
              columns={12}
              sx={{ mb: (theme) => theme.spacing(2) }}
            >
              {loadingGrants ? (
                <Grid2 size={12}>
                  <CircularProgress />
                </Grid2>
              ) : (
                <Grid2 size={12}>
                  <Grid2
                    container
                    spacing={2}
                    columns={12}
                    justifyContent={'center'}
                    sx={{ mb: (theme) => theme.spacing(2) }}
                  >
                    {grants
                      ? grants.map((grantObj: Grant) => (
                          <Grid2 key={grantObj.id + grantObj.name} size={3}>
                            <GrantCard
                              mutationLoading={
                                mutationLoading.indexOf(
                                  grantObj.id.toString()
                                ) !== -1
                                  ? mutationLoading.split(':')?.[1]
                                  : ''
                              }
                              grant={grantObj}
                              onClickApply={() => {}}
                              onClickFeedback={(positive: boolean) => {
                                setCreateFeedbackObj({
                                  grantId: grantObj.id,
                                  applicantId: 1,
                                  positive: positive,
                                  feedback: '',
                                });
                                if (positive) {
                                  setGrantFeedbackDialogOpen(true);
                                } else {
                                  addApplicantGrantFeedback(
                                    grantObj.id,
                                    1,
                                    false,
                                    ''
                                  );
                                }
                              }}
                            />
                          </Grid2>
                        ))
                      : null}
                    {grants?.length === 0 ? (
                      <Grid2 size={3}>
                        <Grid2
                          container
                          spacing={2}
                          columns={12}
                          justifyContent={'center'}
                        >
                          <Typography variant="h2">That's all folks</Typography>{' '}
                          <Button
                            onClick={() => {
                              resetGrants();
                            }}
                          >
                            Run again
                          </Button>
                        </Grid2>
                      </Grid2>
                    ) : null}
                  </Grid2>
                </Grid2>
              )}
            </Grid2>
          </Box>
          <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Grid2
              container
              spacing={2}
              columns={12}
              sx={{ mb: (theme) => theme.spacing(2) }}
            >
              <Grid2>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                  All Grant Opportunities
                </Typography>
              </Grid2>
              <Grid2 size={12} height={400}>
                {loadingPastGrants ? (
                  <CircularProgress />
                ) : (
                  <DataGrid
                    sx={{
                      '& .MuiDataGrid-columnHeaders': {
                        fontWeight: 900, // Make header text bold
                      },
                    }}
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    rows={grantApplicationRows}
                    columns={grantApplicationColumns}
                    rowCount={totalApplicantGrantFeedbacks}
                  />
                )}
              </Grid2>
              <Grid2>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                  Previous grants
                </Typography>
              </Grid2>
              <Grid2 size={12} height={400}>
                {loadingApplicantGrantFeedbacks ? (
                  <CircularProgress />
                ) : (
                  <DataGrid
                    sx={{
                      '& .MuiDataGrid-columnHeaders': {
                        fontWeight: 900, // Make header text bold
                      },
                    }}
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    rows={grantFeedbackRows}
                    columns={grantFeedbackColumns}
                    rowCount={totalPastGrants}
                  />
                )}
              </Grid2>
            </Grid2>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
