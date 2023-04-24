import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Busca el servicio que necesites, cada prestador tiene calificaciones y detalles de sus trabajos',
    'Selecciona a la persona indicada ',
    'Loguate en la página para poder realizar el pago parcial y seguir adelante',
];

const Info = () =>
 {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default Info;