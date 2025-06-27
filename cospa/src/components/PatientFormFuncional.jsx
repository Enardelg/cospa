import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Paper,
  Box
} from '@mui/material';

const initialState = {
  nombre: '',
  dni: '',
  fechaNacimiento: '',
  edad: '',
  telefono: '',
  email: '',
  conociste: '',
  enfermedad: false,
  enfermedadDetalle: '',
  tratamiento: false,
  tratamientoDetalle: '',
  medicacion: false,
  medicacionDetalle: '',
  cirugias: false,
  cirugiasDetalle: '',
  alergias: false,
  alergiasDetalle: '',
  circulatorio: false,
  circulatorioDetalle: '',
  cardiaco: false,
  cardiacoDetalle: '',
  musculares: false,
  muscularesDetalle: '',
  embarazada: false,
  embarazadaDetalle: '',
  observaciones: '',
  firma: '',
  fecha: '',
  terminos: false
};

const PatientForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'Nombre requerido';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(form.nombre)) newErrors.nombre = 'Solo letras permitidas';

    if (!form.dni.trim()) newErrors.dni = 'DNI requerido';
    if (!/^[0-9]+$/.test(form.dni)) newErrors.dni = 'DNI inválido';

    if (!form.edad.trim()) newErrors.edad = 'Edad requerida';
    if (!/^[0-9]+$/.test(form.edad)) newErrors.edad = 'Solo números permitidos';

    if (!form.email.trim()) newErrors.email = 'Email requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email inválido';

    if (!form.fecha.trim()) newErrors.fecha = 'Fecha requerida';
    if (!form.firma.trim()) newErrors.firma = 'Firma requerida';
    if (!form.terminos) newErrors.terminos = 'Debe aceptar los términos para continuar';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', my: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            📑 Datos del Paciente
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre y Apellido" name="nombre" fullWidth value={form.nombre} onChange={handleChange} error={!!errors.nombre} helperText={errors.nombre} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="DNI" name="dni" fullWidth value={form.dni} onChange={handleChange} error={!!errors.dni} helperText={errors.dni} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha de nacimiento" name="fechaNacimiento" type="date" fullWidth InputLabelProps={{ shrink: true }} value={form.fechaNacimiento} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Edad" name="edad" fullWidth value={form.edad} onChange={handleChange} error={!!errors.edad} helperText={errors.edad} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Teléfono" name="telefono" fullWidth value={form.telefono} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" name="email" fullWidth value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="¿Cómo nos conociste?" name="conociste" select fullWidth value={form.conociste} onChange={handleChange}>
                <MenuItem value="Redes">Redes</MenuItem>
                <MenuItem value="Recomendación">Recomendación</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="h6" gutterBottom>
                    🧬 Salud Actual
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column" alignItems="flex-start">
                    {[
                      { label: '¿Padece alguna enfermedad crónica?', name: 'enfermedad', detalle: 'enfermedadDetalle' },
                      { label: '¿Está bajo tratamiento médico?', name: 'tratamiento', detalle: 'tratamientoDetalle' },
                      { label: '¿Toma medicación actualmente?', name: 'medicacion', detalle: 'medicacionDetalle' },
                      { label: '¿Ha tenido cirugías o lesiones importantes?', name: 'cirugias', detalle: 'cirugiasDetalle' },
                      { label: '¿Tiene alergias a medicamentos, aceites o cremas?', name: 'alergias', detalle: 'alergiasDetalle' },
                      { label: '¿Problemas circulatorios (varices, trombosis)?', name: 'circulatorio', detalle: 'circulatorioDetalle' },
                      { label: '¿Hipertensión o problemas cardíacos?', name: 'cardiaco', detalle: 'cardiacoDetalle' },
                      { label: '¿Molestias musculares o contracturas actuales?', name: 'musculares', detalle: 'muscularesDetalle' },
                      { label: '¿Está embarazada?', name: 'embarazada', detalle: 'embarazadaDetalle' }
                    ].map(({ label, name, detalle }) => (
                      <React.Fragment key={name}>
                        <Grid item>
                          <FormControlLabel
                            control={<Checkbox name={name} checked={form[name]} onChange={handleChange} />}
                            label={label}
                          />
                        </Grid>
                        {form[name] && (
                          <Grid item>
                            <TextField
                              label="Especificar"
                              name={detalle}
                              fullWidth
                              value={form[detalle]}
                              onChange={handleChange}
                            />
                          </Grid>
                        )}
                      </React.Fragment>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                ¿Hay algo que debamos saber antes del masaje?
              </Typography>
              <TextField name="observaciones" multiline rows={6} fullWidth value={form.observaciones} onChange={handleChange} />
            </Grid>

            <Grid item xs={6} sx={{ mt: 10 }}>
              <TextField label="Firma del paciente" name="firma" fullWidth value={form.firma} onChange={handleChange} error={!!errors.firma} helperText={errors.firma} />
            </Grid>
            <Grid item xs={6} sx={{ mt: 10 }}>
              <TextField label="Fecha" name="fecha" type="date" fullWidth InputLabelProps={{ shrink: true }} value={form.fecha} onChange={handleChange} error={!!errors.fecha} helperText={errors.fecha} />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="terminos" checked={form.terminos} onChange={handleChange} />}
                label="Acepto los términos y condiciones del servicio, confirmo que los datos ingresados son verídicos y autorizo al personal de CoSpa Masajes a realizar el tratamiento correspondiente."
              />
              {errors.terminos && (
                <Typography variant="caption" color="error">
                  {errors.terminos}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                {initialData ? 'Actualizar Ficha' : 'Registrar Ficha'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default PatientForm;
