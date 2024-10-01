'use client';

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import TollIcon from '@mui/icons-material/Toll';
import { DateTime } from 'luxon';
import TopActionIconButton from './TopActionIconButton';

interface GrantCardProps {
  grant: Grant;
  onClickFeedback: (positive: boolean) => void;
  onClickApply: () => void;
}

const GrantCard = ({
  grant: {
    id,
    name,
    institution,
    description,
    grantAmount,
    location,
    startingAt,
    deadlineAt,
    fundingAreas,
  },
  onClickFeedback,
  onClickApply,
}: GrantCardProps) => (
  <Card
    sx={{
      minWidth: 250,
      minHeight: 250,
      height: 500,
    }}
  >
    <CardContent>
      <Grid2 container columns={12}>
        <Grid2 size={12} mb={2}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Avatar sx={{ width: 30, height: 30 }} />
            <Stack direction={'row'} spacing={1}>
              <TopActionIconButton
                type="like"
                onClick={() => onClickFeedback(true)}
              />
              <TopActionIconButton
                type="dislike"
                onClick={() => onClickFeedback(false)}
              />
              {/* <Button onClick={() => onClickFeedback(true)}> Like </Button>
              <Button onClick={() => onClickFeedback(false)}> Dislike </Button> */}
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Typography variant="body1">{institution?.name}</Typography>
          <Typography variant="h6">{name}</Typography>
        </Grid2>
        <Grid2 size={12} sx={{ my: 2 }}>
          <Grid2 container columns={12} justifyContent={'center'} spacing={2}>
            <Grid2
              size={6}
              sx={{
                minHeight: 150,
                borderRadius: 3,
                background: 'rgba(255,	127,	80, 0.3)',
                padding: 2,
              }}
            >
              <Grid2
                direction={'row'}
                justifyContent={'flex-start'}
                alignItems={'space-between'}
                columns={12}
              >
                <Grid2 size={12}>
                  <TollIcon fontSize="small" />
                </Grid2>
                <Grid2 size={12}>
                  <Typography
                    variant="body1"
                    fontWeight={'900'}
                    gutterBottom
                    color="warning"
                  >
                    ${grantAmount}
                  </Typography>
                  <Typography variant="body2">Avg Amount</Typography>
                </Grid2>
              </Grid2>
            </Grid2>
            <Grid2
              size={6}
              sx={{
                minHeight: 150,
                borderRadius: 3,
                background: 'rgba(188,	188,	188, 0.2)',
                padding: 2,
              }}
            >
              <Grid2 direction={'column'} justifyContent={'space-between'}>
                <Grid2 size={12}>
                  <Typography variant="body2" sx={{ color: 'grey' }}>
                    Deadline:
                  </Typography>
                  <Typography variant="body1" fontWeight={'900'}>
                    {DateTime.fromMillis(parseInt(deadlineAt)).toFormat(
                      'MMMM dd'
                    )}
                  </Typography>
                </Grid2>
                <Divider sx={{ my: 1 }} />
                <Grid2 size={12}>
                  <Typography variant="body2">Getting started</Typography>
                  <Typography variant="body1" fontWeight={'900'}>
                    Apply online
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={12} mb={2}>
          <Grid2
            container
            columns={12}
            justifyContent={'space-between'}
            spacing={2}
          >
            <Typography>Location:</Typography>
            <Typography fontWeight={'900'}>{location}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={12}>
          <Typography>Area of funding</Typography>
        </Grid2>
        <Grid2 size={12}>
          {fundingAreas.length > 0 ? (
            fundingAreas.map((tag, index) => (
              <Chip key={tag + index} sx={{ mx: 0.5, my: 0.5 }} label={tag} />
            ))
          ) : (
            <Typography>Not provided</Typography>
          )}
        </Grid2>
      </Grid2>
    </CardContent>
  </Card>
);

export default GrantCard;
