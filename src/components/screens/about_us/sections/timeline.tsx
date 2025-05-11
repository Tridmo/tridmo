import React from 'react';
import { Timeline as MuiTimeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Avatar, Box, Typography } from '@mui/material';

const timelineSx = (steps: any) => ({
    width: '100%',
    height: 'auto !important',
    display: 'flex',
    flexDirection: 'row',
    minWidth: 'max-content',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0',
    padding: '0',
    '& .MuiTimelineItem-root': {
        width: `${100 / steps.length}%`,
        display: 'flex',
        '&::before': {
            content: 'none',
        },
        flexDirection: 'column',
        justifyContent: 'center',

        '& .MuiTimelineSeparator-root': {
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            '& .MuiTimelineDot-root': {
                display: 'flex',
                padding: '2px',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '40px',
                minHeight: '40px',
                maxWidth: '40px',
                maxHeight: '40px',
                margin: '0 4px',
                backgroundColor: '#008DDD',
            },
            '& .MuiTimelineConnector-root': {
                width: '100%',
                height: '7px',
                backgroundColor: '#008DDD33'
            },
        }
    }
})

const timelineContentWrapperSx = (steps: any) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: '89px',
    width: '100%',

    '& .timeline-content-wrapper': {
        width: `${100 / steps.length}%`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const TimeLineTextContent = ({ label, index }: { label: string, index: number }) => {

    const textSx = {
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: '130%',
        letterSpacing: '0%',
        textAlign: 'center',
    }

    return (
        <Box display="flex" justifyContent={index % 2 === 0 ? "flex-start" : "flex-end"} alignItems="center" flexDirection="column" minHeight={'89px'}
        maxWidth={'192px'}
        >
            {index % 2 !== 0 &&
                <Typography sx={textSx} variant="body2">{label}</Typography>

            }
            <Box
                sx={{
                    width: '100%',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '4px 0',
                }}
            >
                <TimelineConnector sx={{
                    flexGrow: 0,
                    width: '2px !important',
                    height: '40px',
                    backgroundColor: '#E6E6E6'
                }} className='MuiTimelineConnector-root-custom' />
            </Box>
            {index % 2 === 0 &&
                <Typography sx={textSx} variant="body2">{label}</Typography>
            }
        </Box>
    )
}

const TimeLineImageContent = ({ image, id }: { image: string, id: number }) => {

    const margin = id % 2 === 0 ? '9px 0 0 0' : '0 0 9px 0';

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Box component="img" src={image} alt={`Step ${id}`} sx={{ width: 148, height: 148, objectFit: 'cover', margin }} />
        </Box>
    )
}

export default function Timeline() {
    const steps = [
        {
            id: 1,
            image: '/img/person.png',
            label: 'Абдусаттор Абдурахимов',
        },
        {
            id: 2,
            image: '/img/star.png',
            label: 'Более 200 000 3D-моделей продано по всему миру',
        },
        {
            id: 3,
            image: '/img/dizipro.png',
            label: 'Основатель команды Dizipro, 10 лет опыта, 30+ сотрудников',
        },
        {
            id: 4,
            image: '/img/number1.png',
            label: 'Команда с наибольшим количеством 3D-моделей в СНГ',
        },
    ];

    return (
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box display="flex" flexDirection="row" alignItems="center" sx={{...timelineContentWrapperSx(steps), alignItems: 'flex-end'}}>
                {steps.map((step, index) => (
                    <Box className='timeline-content-wrapper'>
                        {index % 2 === 0 ?
                            <TimeLineImageContent image={step.image} id={step.id} />
                        :
                        <TimeLineTextContent label={step.label} index={index} />
                    }
                </Box>
            ))}
            </Box>

            <MuiTimeline position="alternate" sx={timelineSx(steps)}>
                {steps.map((step, index) => (

                    <TimelineItem key={step.id}>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="primary">{step.id}</TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                    </TimelineItem>

                ))}
            </MuiTimeline>
            <Box display="flex" flexDirection="row" alignItems="center" sx={{...timelineContentWrapperSx(steps), alignItems: 'flex-start'}}>
                {steps.map((step, index) => (
                    <Box className='timeline-content-wrapper'>
                        {index % 2 === 0 ?
                        <TimeLineTextContent label={step.label} index={index} />
                        :
                        <TimeLineImageContent image={step.image} id={step.id} />
                    }
                </Box>
            ))}
</Box>
        </Box>
    );
}
