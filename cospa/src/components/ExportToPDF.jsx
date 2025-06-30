import React from 'react';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import Logo from '../assets/logoNavBar.png'; // Asegurate de que esta ruta sea válida

const ExportToPDF = ({ form }) => {
  if (!form) return null;

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

    const agregarLinea = (label, value) => {
      doc.setTextColor(azul);
      doc.text(`${label}`, 20, y);
      doc.setTextColor(0, 0, 0);
      doc.text(`${value || 'No'}`, 70, y);
      y += 8;
    };

    // Datos personales
    agregarLinea('Nombre y Apellido:', form.nombre);
    agregarLinea('DNI:', form.dni);
    agregarLinea('Fecha de Nacimiento:', form.fechaNacimiento);
    agregarLinea('Edad:', form.edad);
    agregarLinea('Teléfono:', form.telefono);
    agregarLinea('Email:', form.email);

    const conocisteTexto = form.conociste === 'Otro'
      ? `Otro: ${form.otroConocisteDetalle || 'Sin especificar'}`
      : form.conociste;
    agregarLinea('¿Cómo nos conociste?:', conocisteTexto);

    y += 5;
    doc.setTextColor(azul);
    doc.setFontSize(14);
    doc.text('Salud Actual', 20, y);
    y += 8;
    doc.setFontSize(12);

    agregarLinea('- Enfermedad crónica:', form.enfermedad ? 'Sí' : 'No');
    if (form.enfermedad) agregarLinea('   Detalle:', form.enfermedadDetalle);

    agregarLinea('- Tratamiento médico:', form.tratamiento ? 'Sí' : 'No');
    if (form.tratamiento) agregarLinea('   Detalle:', form.tratamientoDetalle);

    agregarLinea('- Toma medicación:', form.medicacion ? 'Sí' : 'No');
    if (form.medicacion) agregarLinea('   Detalle:', form.medicacionDetalle);

    agregarLinea('- Cirugías o lesiones:', form.cirugias ? 'Sí' : 'No');
    if (form.cirugias) agregarLinea('   Detalle:', form.cirugiasDetalle);

    agregarLinea('- Alergias medicamentos/aceites:', form.alergias ? 'Sí' : 'No');
    if (form.alergias) agregarLinea('   Detalle:', form.alergiasDetalle);

    agregarLinea('- Problemas circulatorios:', form.circulatorio ? 'Sí' : 'No');
    if (form.circulatorio) agregarLinea('   Detalle:', form.circulatorioDetalle);

    agregarLinea('- Hipertensión o cardíacos:', form.cardiaco ? 'Sí' : 'No');
    if (form.cardiaco) agregarLinea('   Detalle:', form.cardiacoDetalle);

    agregarLinea('- Molestias musculares:', form.musculares ? 'Sí' : 'No');
    if (form.musculares) agregarLinea('   Detalle:', form.muscularesDetalle);

    agregarLinea('- Embarazada:', form.embarazada ? 'Sí' : 'No');
    if (form.embarazada) agregarLinea('   Detalle:', form.embarazadaDetalle);

    y += 5;
    agregarLinea('Observaciones:', form.observaciones);
    agregarLinea('Aclaración de firma:', form.firma);

    if (form.firmaDibujo) {
      doc.setTextColor(azul);
      doc.text('Firma digital:', 20, y);
      y += 2;
      doc.addImage(form.firmaDibujo, 'PNG', 20, y, 60, 25);
      y += 30;
    }

    agregarLinea('Fecha:', form.fecha);

    // Footer
    y = 280;
    doc.setDrawColor(180);
    doc.line(20, y, 190, y);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text('CoSpa Masajes - Av. Bienestar 1234 - Córdoba', 20, y + 5);
    doc.text('cospamasajes@gmail.com', 20, y + 10);
    doc.text('Documento generado digitalmente. Válido sin firma.', 20, y + 15);

    doc.save(`ficha_clinica_${form.nombre || 'paciente'}.pdf`);
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
