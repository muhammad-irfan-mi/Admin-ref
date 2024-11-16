import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Typography,
    InputAdornment,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useTheme } from '@emotion/react';
import { ColorModeContext, tokens } from '../theme';

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const adminEmail = 'test@example.com';
    const adminPassword = '123456789';

    const handleLogin = () => {
        if (email === adminEmail && password === adminPassword) {
            navigate('/allUser');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <Box
            backgroundColor={colors.primary[900]}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 3,

            }}
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <Box
                backgroundColor={colors.primary[900]}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
