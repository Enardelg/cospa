import React from 'react';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import Logo from '../assets/logoNavBar.png'; // asegurate de que la ruta del logo sea correcta

const ExportToPDF = ({ paciente }) => {
  const generarPDF = () => {
    const doc = new jsPDF();
    const azul = '#1565c0';
    let y = 20;

    // Logo
    doc.addImage(Logo, 'PNG', 160, 10, 30, 30);

    // Título
    doc.setTextColor(azul);
    doc.setFontSize(16);
    doc.text('Ficha Clínica - CoSpa Masajes', 20, y);
    y += 10;

    doc.setDrawColor(azul);
    doc.line(20, y, 190, y);
    y += 10;

    doc.setFontSize(12);

    // Función para líneas
    const agregarLinea = (label, value) => {
      doc.setTextColor(azul);
      doc.text(`${label}`, 20, y);
      doc.setTextColor(0, 0, 0);
      doc.text(`${value || 'No'}`, 70, y);
      y += 8;
    };

    // Datos principales
    agregarLinea('Nombre y Apellido:', paciente.nombre);
    agregarLinea('DNI:', paciente.dni);
    agregarLinea('Fecha de Nacimiento:', paciente.fechaNacimiento);
    agregarLinea('Edad:', paciente.edad);
    agregarLinea('Teléfono:', paciente.telefono);
    agregarLinea('Email:', paciente.email);
    agregarLinea('¿Cómo nos conociste?:', paciente.conociste);

    y += 5;
    doc.setTextColor(azul);
    doc.setFontSize(14);
    doc.text('Salud Actual', 20, y);
    y += 8;
    doc.setFontSize(12);

    agregarLinea('- Enfermedad crónica:', paciente.enfermedad ? 'Sí' : 'No');
    if (paciente.enfermedad) agregarLinea('   Detalle:', paciente.enfermedadDetalle);

    agregarLinea('- Tratamiento médico:', paciente.tratamiento ? 'Sí' : 'No');
    if (paciente.tratamiento) agregarLinea('   Detalle:', paciente.tratamientoDetalle);

    agregarLinea('- Toma medicación:', paciente.medicacion ? 'Sí' : 'No');
    if (paciente.medicacion) agregarLinea('   Detalle:', paciente.medicacionDetalle);

    agregarLinea('- Cirugías o lesiones:', paciente.cirugias ? 'Sí' : 'No');
    if (paciente.cirugias) agregarLinea('   Detalle:', paciente.cirugiasDetalle);

    agregarLinea('- Alergias medicamentos/aceites:', paciente.alergias ? 'Sí' : 'No');
    if (paciente.alergias) agregarLinea('   Detalle:', paciente.alergiasDetalle);

    agregarLinea('- Problemas circulatorios:', paciente.circulatorio ? 'Sí' : 'No');
    if (paciente.circulatorio) agregarLinea('   Detalle:', paciente.circulatorioDetalle);

    agregarLinea('- Hipertensión o cardíacos:', paciente.cardiaco ? 'Sí' : 'No');
    if (paciente.cardiaco) agregarLinea('   Detalle:', paciente.cardiacoDetalle);

    agregarLinea('- Molestias musculares:', paciente.musculares ? 'Sí' : 'No');
    if (paciente.musculares) agregarLinea('   Detalle:', paciente.muscularesDetalle);

    agregarLinea('- Embarazada:', paciente.embarazada ? 'Sí' : 'No');
    if (paciente.embarazada) agregarLinea('   Detalle:', paciente.embarazadaDetalle);

    y += 5;
    agregarLinea('Observaciones:', paciente.observaciones);

    // Firma escrita
    if (paciente.firma) agregarLinea('Firma del paciente (escrita):', paciente.firma);

    // Firma dibujo
    if (paciente.firmaDibujo) {
      doc.setTextColor(azul);
      doc.text('Firma digital:', 20, y);
      y += 2;
      doc.addImage(paciente.firmaDibujo, 'PNG', 20, y, 60, 25);
      y += 30;
    }

    agregarLinea('Fecha:', paciente.fecha);

    // Footer
    y = 280;
    doc.setDrawColor(180);
    doc.line(20, y, 190, y);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text('CoSpa Masajes - Av. Bienestar 1234 - Córdoba', 20, y + 5);
    doc.text('cospamasajes@gmail.com', 20, y + 10);
    doc.text('Documento generado digitalmente. Válido sin firma.', 20, y + 15);

    doc.save(`ficha_clinica_${paciente.nombre}.pdf`);
  };

  return (
    <Button
      onClick={generarPDF}
      variant="contained"
      sx={{
        backgroundColor: '#c62828',
        '&:hover': { backgroundColor: '#b71c1c' },
        mt: 2
      }}
    >
      Exportar a PDF
    </Button>
  );
};

export default ExportToPDF;
