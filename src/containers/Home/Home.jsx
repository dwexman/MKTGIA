import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import LoginIcon from '@mui/icons-material/Login';
import CircularProgress from '@mui/material/CircularProgress';
import './Home.css';
import logo from '../../assets/logoWhite.png';

const API_BASE = import.meta.env.VITE_API_URL;

export default function Home() {
    const [formData, setFormData] = useState({
        nombre: '', apellido: '', telefono: '', email: '',
        cargo: '', otherCargo: '',
        casoUso: '',
        newsletter: false, betatester: false
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        const payload = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            telefono: formData.telefono,
            email: formData.email,
            cargo: formData.cargo === 'Otro'
                ? formData.otherCargo
                : formData.cargo,
            casoUso: formData.casoUso,
            intereses: [
                ...(formData.newsletter ? ['newsletter'] : []),
                ...(formData.betatester ? ['betatester'] : [])
            ]
        };

        try {
            const res = await fetch(`${API_BASE}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(`HTTP ${res.status}\n${txt}`);
            }

            setSubmitted(true);
            setFormData({
                nombre: '', apellido: '', telefono: '', email: '',
                cargo: '', otherCargo: '',
                casoUso: '',
                newsletter: false, betatester: false
            });
        } catch (err) {
            console.error(err);
            alert('Ocurrió un error al enviar el formulario. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background: 'linear-gradient(135deg, #0a1929 0%, #1a237e 100%)',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <Button
                className='home-button'
                variant="contained"
                size="medium"
                onClick={() => navigate('/login')}
                startIcon={
                    <LoginIcon
                        sx={{
                            fontSize: 28,
                            color: '#3BED4F',
                            filter: 'drop-shadow(0 0 4px rgba(59, 237, 79, 0.5))'
                        }}
                    />
                }
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'rgba(15, 23, 18, 0.95)',
                    border: '2px solid #3BED4F',
                    color: '#3BED4F',
                    textTransform: 'none',
                    padding: '12px 28px',
                    fontSize: '1.3rem',
                    minWidth: 200,
                    borderRadius: 2,
                    boxShadow: `
            0 0 8px rgba(59, 237, 79, 0.3),
            0 0 15px rgba(59, 237, 79, 0.2),
            inset 0 0 10px rgba(59, 237, 79, 0.1)
          `,
                    textShadow: '0 0 8px rgba(59, 237, 79, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: 'rgba(25, 35, 28, 0.95)',
                        boxShadow: `
              0 0 15px rgba(59, 237, 79, 0.5),
              0 0 30px rgba(59, 237, 79, 0.3),
              inset 0 0 15px rgba(59, 237, 79, 0.2)
            `,
                        transform: 'scale(1.03)'
                    }
                }}
            >
                Login
            </Button>

            {/* contenedor principal (logo + formulario) */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    marginLeft: '10%',
                    gap: 8,
                    width: '90%',
                    maxWidth: 1200,
                    position: 'relative',
                    paddingTop: '2vh'
                }}
            >
                {/* logo + texto de marketing */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        marginTop: -12,
                        position: 'relative',
                        zIndex: 1,
                        pointerEvents: 'none'
                    }}
                >
                    <Fade in timeout={2000}>
                        <Box
                            sx={{
                                minWidth: 700,
                                width: '100%',
                                filter: 'drop-shadow(0 0 30px rgba(77, 171, 247, 0.7))'
                            }}
                        >
                            <img src={logo} alt="Logo MRKT21" style={{ width: '100%' }} />
                        </Box>
                    </Fade>

                    <Fade in timeout={1000} style={{ transitionDelay: '500ms' }}>
                        <Box sx={{ position: 'absolute', top: '70%', left: 0, mt: 5 }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    textAlign: 'center',
                                    textShadow: '0 0 15px rgba(77, 171, 247, 0.7)',
                                    fontWeight: 700,
                                    letterSpacing: 4,
                                    maxWidth: 800
                                }}
                            >
                                Únete a la{' '}
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
                                        animation: 'neonPulse 1.5s ease-in-out infinite',
                                        '@keyframes neonPulse': {
                                            '0%': { opacity: 0.8 },
                                            '50%': { opacity: 1 },
                                            '100%': { opacity: 0.8 }
                                        }
                                    }}
                                >
                                    revolución del marketing
                                </Box>{' '}
                                24/7 con MRKT21
                            </Typography>
                        </Box>
                    </Fade>
                </Box>

                {/* formulario de contacto */}
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
                        borderRadius: 3,
                        boxShadow: `
              0 0 40px rgba(77, 171, 247, 0.4),
              0 0 80px rgba(77, 171, 247, 0.2)
            `
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
                                required
                                fullWidth
                                sx={inputStyles}
                                onChange={handleChange}
                                value={formData.nombre}
                            />

                            <TextField
                                name="apellido"
                                label="Apellido"
                                required
                                fullWidth
                                sx={inputStyles}
                                onChange={handleChange}
                                value={formData.apellido}
                            />

                            <TextField
                                name="telefono"
                                label="Teléfono"
                                required
                                fullWidth
                                sx={inputStyles}
                                onChange={handleChange}
                                value={formData.telefono}
                            />

                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                required
                                fullWidth
                                sx={inputStyles}
                                onChange={handleChange}
                                value={formData.email}
                            />

                            <FormControl fullWidth sx={inputStyles}>
                                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    Cargo
                                </InputLabel>
                                <Select
                                    name="cargo"
                                    label="Cargo"
                                    required
                                    value={formData.cargo}
                                    onChange={handleChange}
                                    sx={{
                                        ...inputStyles,
                                        '& .MuiSelect-icon': { color: '#4dabf7' }
                                    }}
                                >
                                    <MenuItem value="Gerente de Marketing">
                                        Gerente de Marketing
                                    </MenuItem>
                                    <MenuItem value="CEO">CEO</MenuItem>
                                    <MenuItem value="Otro">Otro</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Campo "Otro cargo" */}
                            {formData.cargo === 'Otro' && (
                                <TextField
                                    name="otherCargo"
                                    label="Especifica tu cargo"
                                    required
                                    fullWidth
                                    sx={inputStyles}
                                    onChange={handleChange}
                                    value={formData.otherCargo}
                                />
                            )}

                            <FormControl fullWidth sx={inputStyles}>
                                <InputLabel
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        '&.Mui-focused': {
                                            color: '#4dabf7 !important',
                                            textShadow: '0 0 15px rgba(77, 171, 247, 0.7)'
                                        }
                                    }}
                                >
                                    Caso de uso
                                </InputLabel>
                                <Select
                                    name="casoUso"
                                    label="Caso de uso"
                                    required
                                    value={formData.casoUso}
                                    onChange={handleChange}
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
                                disabled={loading}
                            >
                                {loading
                                    ? <CircularProgress size={26} sx={{ color: '#fff' }} />
                                    : 'Enviar Solicitud'}
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Box>

            {/* Efectos de fondo decorativos */}
            <div className="background-effect"></div>
        </Box>
    );
}

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
    letterSpacing: 1,
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
    letterSpacing: 1
};
