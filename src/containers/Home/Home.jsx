import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Stack,
    Alert,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Fade
} from '@mui/material';
import './Home.css';
import logo from '../../assets/logoWhite.png';

const Home = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        cargo: '',
        casoUso: '',
        newsletter: false,
        betatester: false
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Lógica de envío aquí
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0a1929 0%, #1a237e 100%)',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            {/* Contenedor principal */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: 8,
                    width: '90%',
                    maxWidth: '1200px',
                    position: 'relative',
                    paddingTop: '2vh' // Reducido el padding superior
                }}
            >
                {/* Contenedor del logo y texto */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        marginTop: '-120px', // Logo más arriba
                        transform: 'translateY(-40px)',
                        position: 'relative',
                        zIndex: 3
                    }}
                >
                    {/* Logo */}
                    <Fade in={true} timeout={2000}>
                        <Box
                            sx={{
                                minWidth: 400,
                                position: 'relative',
                                transform: 'rotate(-5deg) perspective(1000px) rotateY(-10deg)',
                                filter: 'drop-shadow(0 0 30px rgba(77, 171, 247, 0.7))',
                                '&:hover': {
                                    transform: 'rotate(-5deg) perspective(1000px) rotateY(-10deg) scale(1.02)',
                                    transition: 'transform 0.3s ease'
                                }
                            }}
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    width: '100%',
                                    height: 'auto'
                                }}
                            />
                        </Box>
                    </Fade>

                    {/* Texto con animación de entrada */}
                    <Fade in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
                        <Box
                            sx={{
                                transform: 'rotate(-3deg) perspective(800px) rotateY(-5deg) translateX(-50px)',
                                filter: 'drop-shadow(0 0 20px rgba(77, 171, 247, 0.5))',
                                transition: 'all 0.5s ease-out',
                                animation: 'slideIn 1s ease-out forwards',
                                position: 'absolute',
                                top: '70%',
                                left: '0%',
                                marginTop: '40px',
                                transformOrigin: 'left center',
                                '@keyframes slideIn': {
                                    '0%': { opacity: 0, transform: 'translateX(-100px) rotate(-3deg)' },
                                    '100%': { opacity: 1, transform: 'translateX(0) rotate(-3deg)' }
                                }
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    textAlign: 'center',
                                    textShadow: '0 0 15px rgba(77, 171, 247, 0.7))',
                                    fontFamily: 'Arial, sans-serif',
                                    fontWeight: 700,
                                    maxWidth: '800px',
                                    lineHeight: 1.2,
                                    letterSpacing: '4px',
                                    transform: 'skewY(-2deg)',
                                    fontSize: '3rem',
                                    whiteSpace: 'pre-line',
                                    display: '-webkit-box',       // Nuevo: Habilitar flexbox de WebKit
    WebkitBoxOrient: 'vertical',   // Nuevo: Orientación vertical
    WebkitLineClamp: 3,            // Nuevo: Limitar a 2 líneas
    overflow: 'hidden',            // Nuevo: Ocultar el exceso
    textOverflow: 'ellipsis',
                                
                                }}
                            >
                                Únete a la {' '}
                                <Box
                                    component="span"
                                    sx={{
                                        color: '#3BED4F',
                                        textShadow: `
                                        0 0 2px #000,
                                        0 0 3px #3BED4F,
                                        0 0 10px #3BED4F,
                                        0 0 20px #3BED4F
                                    `,
                                        display: 'inline',
                                        animation: 'neonPulse 1.5s ease-in-out infinite',
                                        '@keyframes neonPulse': {
                                            '0%': { opacity: 0.8 },
                                            '50%': { opacity: 1 },
                                            '100%': { opacity: 0.8 }
                                        }
                                    }}
                                >
                                    revolución del marketing
                                </Box>
                                {' '}24/7 con MRKT21
                            </Typography>
                        </Box>
                    </Fade>
                </Box>

                {/* Formulario con efecto 3D */}
                <Paper
                    elevation={24}
                    sx={{
                        flex: 1,
                        minWidth: 400,
                        maxWidth: 500,
                        p: 3,
                        background: 'rgba(16, 20, 55, 0.97)',
                        backdropFilter: 'blur(16px)',
                        border: '2px solid rgba(77, 171, 247, 0.5)',
                        borderRadius: '20px',
                        transform: 'perspective(1000px) rotateY(-10deg)',
                        boxShadow: `
              0 0 40px rgba(77, 171, 247, 0.4),
              0 0 80px rgba(77, 171, 247, 0.2),
              0 0 120px rgba(77, 171, 247, 0.1)
            `,
                        position: 'relative',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: '18px',
                            border: '2px solid rgba(77, 171, 247, 0.3)',
                            zIndex: -1
                        }
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={titleStyles}>
                        Registro de Contacto
                    </Typography>

                    {submitted && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            ¡Formulario enviado con éxito!
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                name="nombre"
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                required
                                sx={inputStyles}
                                onChange={handleChange}
                            />

                            <TextField
                                name="apellido"
                                label="Apellido"
                                variant="outlined"
                                fullWidth
                                required
                                sx={inputStyles}
                                onChange={handleChange}
                            />

                            <TextField
                                name="telefono"
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                required
                                sx={inputStyles}
                                onChange={handleChange}
                            />

                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                required
                                sx={inputStyles}
                                onChange={handleChange}
                            />

                            <FormControl fullWidth sx={inputStyles}>
                                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Cargo</InputLabel>
                                <Select
                                    name="cargo"
                                    value={formData.cargo}
                                    label="Cargo"
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Gerente de Marketing">Gerente de Marketing</MenuItem>
                                    <MenuItem value="CEO">CEO</MenuItem>
                                    <MenuItem value="Otro">Otro</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={inputStyles}>
                                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Caso de uso</InputLabel>
                                <Select
                                    name="casoUso"
                                    value={formData.casoUso}
                                    label="Caso de uso"
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="agencias">Agencias</MenuItem>
                                    <MenuItem value="enterprise">Enterprise</MenuItem>
                                </Select>
                            </FormControl>

                            <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="newsletter"
                                            checked={formData.newsletter}
                                            onChange={handleChange}
                                            sx={checkboxStyles}
                                        />
                                    }
                                    label="Newsletter"
                                    sx={{ color: 'white' }}
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="betatester"
                                            checked={formData.betatester}
                                            onChange={handleChange}
                                            sx={checkboxStyles}
                                        />
                                    }
                                    label="Beta Tester"
                                    sx={{ color: 'white' }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={buttonStyles}
                            >
                                Enviar Solicitud
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Box>

            {/* Efectos de fondo */}
            <div className="background-effect"></div>
        </Box>
    );
};

// Estilos reutilizables
const inputStyles = {
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)', borderWidth: 2 },
        '&:hover fieldset': { borderColor: '#4dabf7' },
        '&.Mui-focused fieldset': {
            borderColor: '#4dabf7',
            boxShadow: '0 0 15px rgba(77, 171, 247, 0.3)'
        }
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 500
    }
};

const checkboxStyles = {
    color: '#4dabf7',
    '&.Mui-checked': { color: '#4dabf7' },
    '& .MuiSvgIcon-root': { fontSize: 28 }
};

const buttonStyles = {
    background: 'linear-gradient(145deg, #4dabf7 0%, #1a237e 100%)',
    color: 'white',
    py: 1.5,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    border: '2px solid rgba(77, 171, 247, 0.5)',
    boxShadow: '0 4px 20px rgba(77, 171, 247, 0.3)',
    '&:hover': {
        background: 'linear-gradient(145deg, #1a237e 0%, #4dabf7 100%)',
        boxShadow: '0 6px 25px rgba(77, 171, 247, 0.5)'
    }
};

const titleStyles = {
    color: 'white',
    textAlign: 'center',
    mb: 3,
    fontWeight: 'bold',
    textShadow: '0 0 15px rgba(77, 171, 247, 0.7)',
    letterSpacing: '1px'
};

export default Home;