import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, SxProps } from '@mui/material';
import CountUp from 'react-countup';
import { primaryColor } from '../styles/styles';
import { selectMainStats, selectMainStats_status } from '@/data/get_main_stats';
import { useSelector } from 'react-redux';

type Props = {
  numberStyles?: SxProps;
  textStyles?: SxProps
}

const StatsCard = ({
  numberStyles,
  textStyles
}: Props) => {

  const mainStats = useSelector(selectMainStats);
  const status = useSelector(selectMainStats_status)

  const [stats, setStats] = useState([
    { number: 11, label: 'партнеров' },
    { number: 626, label: '3D модели' },
    { number: 417, label: 'пользователя' },
  ])

  useEffect(() => {
    if(status === 'succeeded' && mainStats){
      
      setStats([
        {number: mainStats.brands_count, label: 'партнеров'},
        {number: mainStats.models_count, label: '3D модели'},
        {number: mainStats.users_count, label: 'пользователя'},
      ])
    }
  }, [status, mainStats])

  return (
    <Grid container gap="16px" justifyContent="center" margin={'12px 0'}>
      {stats.map((item, index) => (
        <Grid item key={index} xs={true} >
          <Paper elevation={1} sx={{ width: '100%', p: '10px 12px', textAlign: 'center', borderRadius: 0, border: '2px solid #F5F5F5' }}>
            <Typography
              variant="h6"
              color={primaryColor}
              sx={{
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '26px',
                letterSpacing: '-0.02em',
                ...numberStyles
              }}
            >
              <CountUp end={item.number} duration={2} />
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '24px',
                letterSpacing: '-0.01em',
                ...textStyles
              }}
            >
              {item.label}
            </Typography>

          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCard;
