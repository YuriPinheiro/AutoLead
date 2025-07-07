import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  IconButton,
  Divider,
  Chip,
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material"
import ProfileModal from "../../ProfileModal";

const VehicleDetailsModal = ({ open, onClose, vehicle, onEdit, onDelete, view }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const theme = useTheme();
  const modalRef = useRef(null);

  if (!vehicle) return null;

  // Format date
  const date = vehicle.createdAt.toDate();
  const formattedDate = date.toLocaleDateString('pt-BR');

  const photoTypes = [
    { id: "front", label: "Frente", description: "Foto diretamente da frente do veículo" },
    { id: "diagonalFrontLeft", label: "Diagonal frontal - lado 1", description: "Foto diagonal frontal do lado do motorista" },
    { id: "diagonalRearLeft", label: "Diagonal traseira - lado 1", description: "Foto diagonal traseira do lado do motorista" },
    { id: "back", label: "Traseira", description: "Foto diretamente da traseira do veículo" },
    { id: "trunk", label: "Porta-malas", description: "Foto do porta-malas aberto" },
    { id: "diagonalRearRight", label: "Diagonal traseira - lado 2", description: "Foto diagonal traseira do lado do passageiro" },
    { id: "diagonalFrontRight", label: "Diagonal frontal - lado 2", description: "Foto diagonal frontal do lado do passageiro" },
    { id: "engine", label: "Motor", description: "Foto do compartimento do motor com o capô aberto" },
    { id: "Km", label: "Quilometragem", description: "Foto do contador de quilometros do veículo" },
    { id: "backSeat", label: "Banco traseiro", description: "Foto dos bancos traseiros do veículo" },
    { id: "damage1", label: "Avarias - Foto 1 (Opcional)", description: "Foto de avarias ou danos no veículo" },
    { id: "damage2", label: "Avarias - Foto 2 (Opcional)", description: "Foto de avarias ou danos no veículo" },
    { id: "damage3", label: "Avarias - Foto 3 (Opcional)", description: "Foto de avarias ou danos no veículo" }
  ];


  const vehicleItems = {
    hydraulic_steering: "Direção hidráulica",
    air_conditioning: "Ar condicionado",
    electric_windows: "Vidros elétricos",
    electric_locks: "Travas elétricas",
    electric_steering: "Direção elétrica",
    airbag: "Air bag",
    dual_airbag: "Air bag duplo",
    abs_brakes: "Freios ABS",
    ebd_brakes: "Freios EBD",
    traction_control: "Controle de tração",
    stability_control: "Controle de estabilidade",
    alarm: "Alarme",
    parking_sensor: "Sensor de estacionamento",
    reverse_sensor: "Sensor de ré",
    reverse_camera: "Câmera de ré",
    heater: "Ar quente",
    electric_seats: "Bancos elétricos",
    leather_seats: "Bancos em couro",
    electric_mirrors: "Retrovisores elétricos",
    height_adjustable_steering: "Volante com regulagem de altura",
    sunroof: "Teto solar",
    onboard_computer: "Computador de bordo",
    interface: "Interface",
    multimedia_center: "Central multimídia",
    rear_defroster: "Desembaçador traseiro",
    fog_lights: "Farol neblina",
    rear_wiper: "Limpador traseiro",
    green_windows: "Vidros verdes",
    alloy_wheels: "Rodas liga leve",
    turbo: "Turbo",
    tonneau_cover: "Lona marítima",
    bed_liner: "Protetor de caçamba",
    assisted_steering: "Direção assistida"
  };

  const ownershipTimeMap = {
    "less_than_6_months": "Menos de 6 meses",
    "6_to_12_months": "6 meses a 1 ano",
    "1_to_3_years": "1 a 3 anos",
    "3_to_5_years": "3 a 5 anos",
    "more_than_5_years": "Mais de 5 anos"
  }

  // Mapeamento de condições
  const conditionMap = {
    "excellent": "Excelente",
    "good": "Bom",
    "regular": "Regular",
    "bad": "Ruim"
  };


  const generateVehiclePDF = async (vehicle) => {
    const doc = new jsPDF();
    const mainColor = [24, 232, 219];
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let y = 15; // Posição vertical inicial

    // Função para adicionar nova página quando necessário
    const checkPageBreak = (requiredHeight) => {
      if (y + requiredHeight > pageHeight - margin) {
        doc.addPage();
        y = 15; // Reset Y position for new page
        addHeader(); // Adiciona cabeçalho na nova página
        return true;
      }
      return false;
    };

    // Função para adicionar cabeçalho (reutilizável em todas as páginas)
    const addHeader = async () => {
      const logoUrl = '/logoPDF.png';
      let logoBase64 = null;

      try {
        const response = await fetch(logoUrl);
        const blob = await response.blob();
        logoBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Erro ao carregar o logo:', error);
      }

      if (logoBase64) {
        const logoWidth = 70;
        const logoHeight = 30;
        const pageWidth = doc.internal.pageSize.getWidth();
        const logoX = (pageWidth - logoWidth) / 2;

        doc.addImage({
          imageData: logoBase64,
          x: logoX,
          y: y,
          width: logoWidth,
          height: logoHeight,
          format: 'PNG'
        });

        y += logoHeight + 10;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(...mainColor);
      doc.text("Ficha Técnica do Veículo", 105, y, { align: "center" });
      y += 10;

      doc.setFontSize(16);
      doc.setTextColor(33, 37, 41);
      doc.text(
        `${vehicle?.brand?.nome} ${vehicle.model} (${vehicle.year}/${vehicle.modelYear})`,
        105,
        y,
        { align: "center" }
      );
      y += 10;

      doc.setDrawColor(...mainColor);
      doc.setLineWidth(0.5);
      doc.line(20, y, 190, y);
      y += 10;
    };

    // Adiciona o cabeçalho inicial
    await addHeader();

    // Seção: Informações Básicas (código existente, mas com verificação de quebra de página)
    checkPageBreak(30); // Verifica espaço para esta seção

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...mainColor);
    doc.text("Informações Básicas", 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(33, 37, 41);
    doc.text(`Placa: ${vehicle.plate}`, 20, y);
    doc.text(`Quilometragem: ${vehicle.mileage} km`, 105, y);
    y += 8;

    doc.text(
      `Tempo de posse: ${ownershipTimeMap[vehicle.ownershipTime] || vehicle.ownershipTime}`,
      20,
      y
    );

    y += 8;
    doc.text(`Chave Reserva: ${vehicle.hasSpareKey}`, 20, y);
    doc.text(`Manual de fábrica: ${vehicle.hasManual}`, 105, y);

    y += 10;
    doc.setDrawColor(...mainColor);
    doc.line(20, y, 190, y);
    y += 5;

    // Seção: Estados do Veículo (com verificação de quebra)
    checkPageBreak(30);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...mainColor);
    doc.text("Estados do Veículo", 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(33, 37, 41);

    const getColorForCondition = (value) => {
      const val = (value || "").toLowerCase();
      if (val.includes("bom") || val.includes("excelente")) return [0, 200, 0];
      if (val.includes("regular")) return [255, 165, 0];
      return [255, 0, 0];
    };

    const drawConditionItem = (label, value, x, y) => {
      const text = `${label}: ${conditionMap[value] || "Não informado"}`;
      const color = getColorForCondition(conditionMap[value] || "");

      doc.setFillColor(...color);
      doc.circle(x, y - 1.5, 2, 'F');
      doc.text(text, x + 5, y);
    };

    drawConditionItem("Pintura", vehicle.paintCondition, 20, y);
    drawConditionItem("Interior", vehicle.interiorCondition, 20, y + 8);
    drawConditionItem("Pneus", vehicle.tiresCondition, 105, y);
    y += 18;

    doc.setDrawColor(...mainColor);
    doc.line(20, y, 190, y);
    y += 5;

    // Seção: Itens do Veículo (com layout de 2 colunas corretamente alinhadas)
    if (vehicle.items?.length > 0) {
      checkPageBreak(20); // Verifica espaço para o título

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...mainColor);
      doc.text("Itens do Veículo", 20, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(33, 37, 41);

      const drawItemSquare = (x, y) => {
        doc.setFillColor(0, 0, 0);
        doc.rect(x, y - 3, 3, 3, 'F');
      };

      const itemsList = vehicle.items.map(
        item => `${vehicleItems[item]?.label || item}`
      );

      // Largura das colunas
      const colWidth = 85; // Largura de cada coluna
      const startX1 = 20; // Posição X da primeira coluna
      const startX2 = startX1 + colWidth; // Posição X da segunda coluna

      // Adiciona os itens em pares (2 por linha)
      for (let i = 0; i < itemsList.length; i += 2) {
        // Verifica se há espaço para mais uma linha
        if (y + 7 > pageHeight - margin) {
          doc.addPage();
          y = 15;
          addHeader();
          // Repete o título se necessário
          doc.setFont("helvetica", "bold");
          doc.setTextColor(...mainColor);
          doc.text("Itens do Veículo (continuação)", 20, y);
          y += 8;
          doc.setFont("helvetica", "normal");
          doc.setTextColor(33, 37, 41);
        }

        // Primeiro item da linha (coluna esquerda)
        drawItemSquare(startX1, y);
        doc.text(itemsList[i], startX1 + 5, y);

        // Segundo item da linha (coluna direita) - se existir
        if (i + 1 < itemsList.length) {
          drawItemSquare(startX2, y);
          doc.text(itemsList[i + 1], startX2 + 5, y);
        }

        y += 7; // Move para a próxima linha
      }

      y += 5;
      doc.setDrawColor(...mainColor);
      doc.line(20, y, 190, y);
      y += 5;
    }

    // Seção: Cotações (com verificação de espaço)
    if (vehicle.fipeValue && vehicle.askingPrice) {
      checkPageBreak(30);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...mainColor);
      doc.text("Cotações", 20, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(33, 37, 41);

      const fipeFormatted = `Valor FIPE: R$ ${vehicle.fipeValue}`;
      const askingFormatted = `Pedida: R$ ${vehicle.askingPrice}`;

      doc.setFillColor(240, 240, 240);
      doc.rect(20, y - 6, 170, 24, 'F');

      doc.text(fipeFormatted, 25, y);
      doc.text(askingFormatted, 25, y + 7);
      doc.setFont("helvetica", "bold");
      doc.text("Aceitamos contra oferta!", 25, y + 16);
      doc.setFont("helvetica", "normal");

      y += 22;
      doc.setDrawColor(...mainColor);
      doc.line(20, y, 190, y);
      y += 5;
    }

    // Seção: Descrição Adicional (com paginação automática)
    if (vehicle.description) {
      checkPageBreak(20);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...mainColor);
      doc.text("Descrição Adicional", 20, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(33, 37, 41);
      const lines = doc.splitTextToSize(vehicle.description, 170);

      for (let i = 0; i < lines.length; i++) {
        if (y + 7 > pageHeight - margin) {
          doc.addPage();
          y = 15;
          addHeader(); // Adiciona cabeçalho na nova página
          // Repete o título se necessário
          doc.setFont("helvetica", "bold");
          doc.setTextColor(...mainColor);
          doc.text("Descrição Adicional (continuação)", 20, y);
          y += 8;
          doc.setFont("helvetica", "normal");
          doc.setTextColor(33, 37, 41);
        }
        doc.text(lines[i], 20, y);
        y += 7;
      }
    }

    // Adiciona rodapé em todas as páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Documento gerado em: ${new Date().toLocaleString("pt-BR")}`, 20, 280);
      doc.text(`Página ${i} de ${pageCount}`, 180, 280, { align: "right" });
    }

    doc.save(`Ficha_${vehicle?.brand?.nome}_${vehicle.model}_${vehicle.plate}.pdf`);
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          maxHeight: "90vh",
        },
        ref: modalRef
      }}
    >
      {console.log(vehicle)}
      {/* Cabeçalho do modal */}
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: theme.palette.background.primary }}>
        <Grid container justifyContent={'center'} sx={{ justifyContent: "center", alignItems: "center" }}>
          <Grid item size={11}>
            <Typography variant="h6" component="div" fontWeight="bold">
              {vehicle?.brand?.nome} {vehicle.model} ({vehicle.year})
            </Typography>
          </Grid>
          <Grid item size={1}>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.text.primary,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3, bgcolor: theme.palette.background.default }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 4, md: 6 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Marca
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle?.brand?.nome}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 8, md: 6 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Modelo
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.model}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Ano (Fabricação/Modelo)
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.year + "/" + vehicle.modelYear}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Placa
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.plate}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Quilometragem
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.mileage} km
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Tempo de posse
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {ownershipTimeMap[vehicle.ownershipTime] || vehicle.ownershipTime}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Adicionado em
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formattedDate}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

            </Box>
          </Grid>

          {/* NOVA SEÇÃO: ESTADOS DO VEÍCULO */}
          <Grid item size={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Estados do Veículo
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Pintura
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {conditionMap[vehicle.paintCondition] || vehicle.paintCondition || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Mecânica
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {conditionMap[vehicle.mechanicalCondition] || vehicle.mechanicalCondition || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Interior
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {conditionMap[vehicle.interiorCondition] || vehicle.interiorCondition || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Pneus
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {conditionMap[vehicle.tiresCondition] || vehicle.tiresCondition || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Chave Reserva
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {vehicle.hasSpareKey || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Manual de fábrica
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {vehicle.hasManual || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* {Cotação do viculo} */}
          {view &&
            <Grid size={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Cotações
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.primary">
                      Valor fipe
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.fipeValue || "Não informado"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.primary">
                      Valor pedido
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.askingPrice || "Não informado"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          }

          {vehicle.user && (
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1 }} />
              <Box>
                <Typography variant="subtitle2" color="text.primary" gutterBottom>
                  Proprietário
                </Typography>

                <Button
                  sx={{ color: theme.palette.text.primary }}
                  onClick={() => { setProfileOpen(true); }}
                >
                  {vehicle?.user?.name}
                </Button>
              </Box>
            </Grid>
          )}

          {vehicle.description && (
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1 }} />
              <Box>
                <Typography variant="subtitle2" color="text.primary" gutterBottom>
                  Descrição
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {vehicle.description}
                </Typography>
              </Box>
            </Grid>
          )}

          {vehicle.items?.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1 }} />
              <Box>
                <Typography variant="subtitle2" color="text.primary" gutterBottom>
                  Itens do veículo
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {vehicle.items.map(item => (
                    <Chip
                      key={item}
                      label={vehicleItems[item]}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.getContrastText(theme.palette.primary.light)
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="title" fontWeight="bold" gutterBottom>
              Fotos do Veículo
            </Typography>
          </Grid>

          {/* Foto principal (frente) */}
          <Grid item xs={12}>
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Foto Principal - Frente
              </Typography>
              <Box
                component="img"
                src={vehicle.photos.front}
                alt={`${vehicle?.brand?.nome} ${vehicle.model} - Frente`}
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                  borderRadius: 1,
                  boxShadow: 3,
                }}
              />
            </Box>
          </Grid>

          {/* Other photos - smaller */}
          {/* Grid de fotos secundárias */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Galeria de Fotos
            </Typography>
            <Grid container spacing={2}>
              {photoTypes.slice(1)
                .filter(type => vehicle.photos[type.id] && vehicle.photos[type.id] !== "")
                .map((type) => (
                  <Grid item key={type.id} xs={12} sm={6} md={4} lg={3}>
                    <Box sx={{
                      position: 'relative',
                      height: '100%',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1,
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: 2,
                        transform: 'scale(1.02)',
                        transition: 'all 0.3s ease',
                      }
                    }}>
                      <Box
                        component="img"
                        src={vehicle.photos[type.id]}
                        alt={`${vehicle?.brand?.nome} ${vehicle.model} - ${type.label}`}
                        sx={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                        }}
                      />
                      <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        p: 1,
                      }}>
                        <Typography variant="body2">{type.label}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, bgcolor: theme.palette.background.default }}>
        <Button
          size="small"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          sx={{
            color: theme.palette.error.main,
            mr: "auto",
          }}
        >
          Excluir
        </Button>
        {view &&
          <Button
            size="small"
            startIcon={<DownloadIcon />}
            onClick={() => generateVehiclePDF(vehicle)}
            sx={{ color: "primary.main" }}
          >
            PDF
          </Button>
        }
        <Button
          size="small"
          onClick={onClose}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          Fechar
        </Button>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={onEdit}
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#15d5c9",
            },
          }}
        >
          Editar
        </Button>
      </DialogActions>
      <ProfileModal open={profileOpen} onClose={() => { setProfileOpen(false); }} userProvider={{ ...vehicle.user, uid: vehicle.user?.id }} mode={'view'} />

    </Dialog>
  )
}

export default VehicleDetailsModal;