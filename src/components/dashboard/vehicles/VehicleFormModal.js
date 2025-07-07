import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  FormHelperText,
  Autocomplete,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Close as CloseIcon, CloudUpload as CloudUploadIcon, CameraAlt as CameraAltIcon, Search as SearchIcon } from "@mui/icons-material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { uploadVehiclePhoto, addVehicle, updateVehicle, fetchCarBrands, fetchCarModels, fetchFipeByPlate } from "../../../stores/VeihcleService";

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

const vehicleItems = [
  // Mantidos
  { id: "hydraulic_steering", label: "Direção hidráulica" },
  { id: "air_conditioning", label: "Ar condicionado" },
  { id: "electric_windows", label: "Vidros elétricos" },
  { id: "electric_locks", label: "Travas elétricas" },
  { id: "electric_steering", label: "Direção elétrica" },
  { id: "airbag", label: "Air bag" },
  { id: "dual_airbag", label: "Air bag duplo" },
  { id: "abs_brakes", label: "Freios ABS" },

  // Segurança
  { id: "ebd_brakes", label: "Freios EBD" },
  { id: "traction_control", label: "Controle de tração" },
  { id: "stability_control", label: "Controle de estabilidade" },
  { id: "alarm", label: "Alarme" },
  { id: "parking_sensor", label: "Sensor de estacionamento" },
  { id: "reverse_sensor", label: "Sensor de ré" },
  { id: "reverse_camera", label: "Câmera de ré" },

  // Conforto e conveniência
  { id: "heater", label: "Ar quente" },
  { id: "electric_seats", label: "Bancos elétricos" },
  { id: "leather_seats", label: "Bancos em couro" },
  { id: "electric_mirrors", label: "Retrovisores elétricos" },
  { id: "height_adjustable_steering", label: "Volante com regulagem de altura" },
  { id: "sunroof", label: "Teto solar" },

  // Tecnologia
  { id: "onboard_computer", label: "Computador de bordo" },
  { id: "interface", label: "Interface" },
  { id: "multimedia_center", label: "Central multimídia" },

  // Externos e visibilidade
  { id: "rear_defroster", label: "Desembaçador traseiro" },
  { id: "fog_lights", label: "Farol neblina" },
  { id: "rear_wiper", label: "Limpador traseiro" },
  { id: "green_windows", label: "Vidros verdes" },

  // Estilo e performance
  { id: "alloy_wheels", label: "Rodas liga leve" },
  { id: "turbo", label: "Turbo" },

  // Itens de caçamba (pickup)
  { id: "tonneau_cover", label: "Lona marítima" },
  { id: "bed_liner", label: "Protetor de caçamba" },

  // Extra
  { id: "assisted_steering", label: "Direção assistida" }
];

const ownershipTimeOptions = [
  { value: "less_than_6_months", label: "Menos de 6 meses" },
  { value: "6_to_12_months", label: "6 meses a 1 ano" },
  { value: "1_to_3_years", label: "1 a 3 anos" },
  { value: "3_to_5_years", label: "3 a 5 anos" },
  { value: "more_than_5_years", label: "Mais de 5 anos" },
];

const conditionOptions = [
  { value: "excellent", label: "Excelente" },
  { value: "good", label: "Bom" },
  { value: "regular", label: "Regular" },
  { value: "bad", label: "Ruim" },
];

const steps = ['Informações do Veículo', 'Fotos do Veículo'];

const apiKey = process.env.REACT_APP_FIPE_API_KEY;

const VehicleFormModal = ({ open, onClose, onSave, vehicle, isEditing, userId, onFeedback, view }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const dialogContentRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [vehicleId, setVehicleId] = useState(null);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [plate, setPlate] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [paintCondition, setPaintCondition] = useState("");
  const [mechanicalCondition, setMechanicalCondition] = useState("");
  const [interiorCondition, setInteriorCondition] = useState("");
  const [tiresCondition, setTiresCondition] = useState("");
  const [ownershipTime, setOwnershipTime] = useState("");
  const [hasSpareKey, setHasSpareKey] = useState("");
  const [hasManual, setHasManual] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [photoFiles, setPhotoFiles] = useState({});
  const [availableFipes, setAvailableFipes] = useState([]);
  const [selectedFipe, setSelectedFipe] = useState(null);


  const fileInputsRef = useRef({});

  const [fipeValue, setFipeValue] = useState("");
  const [askingPrice, setAskingPrice] = useState("");


  const [photos, setPhotos] = useState({
    front: "",
    side: "",
    back: "",
    interior: "",
    trunk: "",
    damage1: "",
    damage2: "",
    damage3: ""
  });

  const [errors, setErrors] = useState({});
  const [availableModels, setAvailableModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [fipeLoading, setFipeLoading] = useState(false);
  const [availableBrands, setAvailableBrands] = useState([]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 36 }, (_, i) => (currentYear - i).toString());

  useEffect(() => {

    const loadBrands = async () => {
      if (open && availableBrands.length === 0) {
        setBrandsLoading(true);
        try {
          const brands = await fetchCarBrands();
          setAvailableBrands(brands);
        } catch (error) {
          console.error("Error loading car brands:", error);
          setErrorMessage("Erro ao carregar marcas de veículos. Por favor, tente novamente.");
        } finally {
          setBrandsLoading(false);
        }
      }
    };

    loadBrands();
  }, [open, availableBrands.length]);

  useEffect(() => {
    const loadModels = async () => {
      if (brand) {
        setModelsLoading(true);
        try {
          const models = await fetchCarModels(brand);
          setAvailableModels(models);
        } catch (error) {
          console.error(`Error loading models for ${brand}:`, error);
          setErrorMessage(`Erro ao carregar modelos da marca ${brand}. Por favor, tente novamente.`);
        } finally {
          setModelsLoading(false);
        }
      } else {
        setAvailableModels([]);
      }
    };

    loadModels();
  }, [brand]);

  useEffect(() => {
    if (vehicle && isEditing) {
      setBrand(vehicle.brand || "");
      setModel(vehicle.model || "");
      setYear(vehicle.year || "");
      setModelYear(vehicle.modelYear || "");
      setPlate(vehicle.plate || "");
      setDescription(vehicle.description || "");
      const formatted = Number(vehicle.mileage).toLocaleString('pt-BR');
      setMileage(formatted);
      setPaintCondition(vehicle.paintCondition || "");
      setMechanicalCondition(vehicle.mechanicalCondition || "");
      setInteriorCondition(vehicle.interiorCondition || "");
      setTiresCondition(vehicle.tiresCondition || "");
      setOwnershipTime(vehicle.ownershipTime || "");
      setHasSpareKey(vehicle.hasSpareKey || "");
      setHasManual(vehicle.hasManual || "");
      setSelectedItems(vehicle.items || []);
      setPhotos(vehicle.photos || {
        front: "",
        side: "",
        back: "",
        interior: "",
        trunk: "",
        damage1: "",
        damage2: "",
        damage3: ""
      });
      setVehicleId(vehicle.id || null);
      setFipeValue(vehicle.fipeValue || "");
      setAskingPrice(vehicle.askingPrice || "");
    } else {
      resetForm();
    }
  }, [vehicle, isEditing, open]);

  useEffect(() => {
    if (!open) {
      Object.values(photoFiles).forEach(fileData => {
        if (fileData?.previewUrl) {
          URL.revokeObjectURL(fileData.previewUrl);
        }
      });
    }
  }, [open, photoFiles]);

  useEffect(() => {

    if (dialogContentRef.current) {
      dialogContentRef.current.scrollTop = 0;
    }
  }, [activeStep]);

  const resetForm = () => {
    setBrand("");
    setModel("");
    setYear("");
    setModelYear("");
    setPlate("");
    setDescription("");
    setMileage("");
    setOwnershipTime("");
    setSelectedItems([]);
    setPhotos({
      front: "",
      side: "",
      back: "",
      interior: "",
      trunk: "",
      damage1: "",
      damage2: "",
      damage3: ""
    });
    setErrors({});
    setErrorMessage("");
    setPhotoFiles({});
    setUploadProgress({});
    setPaintCondition("");
    setMechanicalCondition("");
    setInteriorCondition("");
    setTiresCondition("");
    setHasSpareKey("");
    setHasManual("");
    setVehicleId(null);
    setActiveStep(0);
    setFipeValue("");
    setAskingPrice("");
    setAvailableFipes([]);
    setSelectedFipe(null);
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!brand) newErrors.brand = "Marca é obrigatória";
    if (!model) newErrors.model = "Modelo é obrigatório";
    if (!year) newErrors.year = "Ano é obrigatório";
    if (!modelYear) newErrors.modelYear = "Ano do modelo é obrigatório";
    if (!plate) newErrors.plate = "Placa é obrigatória";
    if (!mileage) newErrors.mileage = "Quilometragem é obrigatória";
    if (!ownershipTime) newErrors.ownershipTime = "Tempo de posse é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    // Validate all required photos
    photoTypes
      .filter(type => !type.id.startsWith('damage'))
      .forEach(type => {
        if (!photos[type.id]) {
          newErrors[`photo_${type.id}`] = `Foto ${type.label.toLowerCase()} é obrigatória`;
        }
      });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!validateStep1()) return;

      try {
        setLoading(true);
        console.log(mileage)
        const vehicleData = {
          brand,
          model,
          year: parseInt(year),
          modelYear: parseInt(modelYear),
          plate: plate.toUpperCase(),
          description,
          mileage: parseInt(mileage.replace(/\D/g, '')),
          ownershipTime,
          items: selectedItems,
          photos: {}, // Inicialmente sem fotos
          paintCondition,
          mechanicalCondition,
          interiorCondition,
          tiresCondition,
          hasSpareKey,
          hasManual,
          fipeValue,
          askingPrice
        };
        if (isEditing) {
          await updateVehicle(vehicle.id, vehicleData);
          setVehicleId(vehicle.id);
        } else {
          const newVehicle = await addVehicle(userId, vehicleData);
          setVehicleId(newVehicle.id);
        }

        setActiveStep(activeStep + 1);
      } catch (error) {
        console.error("Error saving vehicle data:", error);
        setErrorMessage("Erro ao salvar dados do veículo. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    // Remove tudo que não é dígito
    let num = value.replace(/\D/g, '');
    // Converte para número e formata como moeda
    return (num / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).replace('R$', '').trim();
  };

  const handleSave = async () => {
    if (!validateStep2()) return;

    try {
      setLoading(true);

      // Atualiza o veículo com as URLs das fotos já enviadas
      await updateVehicle(vehicleId, { photos });

      onFeedback({ text: "Veículo salvo com sucesso!", severity: "success" });
      onSave();
      resetForm();
      onClose();
    } catch (error) {
      onFeedback({ text: "Houve um erro ao salvar o veículo!", severity: "error" });
      console.error("Error saving vehicle:", error);
      setErrorMessage("Erro ao salvar veículo. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const captureFromCamera = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      await handlePhotoUpload(type, file);
    };

    input.click();
  };

  const handlePhotoUpload = async (type, file) => {
    if (!vehicleId) return;

    try {
      setUploadProgress(prev => ({ ...prev, [type]: 0 }));

      const previewUrl = URL.createObjectURL(file);

      setPhotoFiles(prev => ({
        ...prev,
        [type]: { file, previewUrl }
      }));

      setPhotos(prev => ({
        ...prev,
        [type]: previewUrl
      }));

      // Upload imediato da foto
      const downloadURL = await uploadVehiclePhoto(
        userId,
        vehicleId,
        file,
        (progress) => {
          setUploadProgress(prev => ({ ...prev, [type]: progress }));
        }
      );

      // Atualiza o estado com a URL definitiva
      setPhotos(prev => ({
        ...prev,
        [type]: downloadURL
      }));

      // Remove o progresso
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[type];
        return newProgress;
      });

      if (errors[`photo_${type}`]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[`photo_${type}`];
          return newErrors;
        });
      }
    } catch (error) {
      console.error(`Error uploading photo ${type}:`, error);
      setErrorMessage(`Erro ao enviar foto ${type}. Por favor, tente novamente.`);

      // Reverte o estado em caso de erro
      setPhotos(prev => ({
        ...prev,
        [type]: ""
      }));

      setPhotoFiles(prev => {
        const newFiles = { ...prev };
        if (newFiles[type]?.previewUrl) {
          URL.revokeObjectURL(newFiles[type].previewUrl);
        }
        delete newFiles[type];
        return newFiles;
      });

      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[type];
        return newProgress;
      });
    }
  };

  const handleFileChange = (type, event) => {
    const file = event.target.files[0];
    if (!file) return;

    handlePhotoUpload(type, file);
  };

  const handleFileUpload = (type, event) => {
    handleFileChange(type, event);
  };

  const handleItemToggle = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleFipeSearch = async () => {
    if (!plate || plate.length < 7) return;

    setFipeLoading(true);
    try {
      const response = await fetchFipeByPlate(plate, apiKey);

      if (response.success) {

        const veiculo = response.data.veiculo;
        const fipes = response.data.fipes;

        setAvailableFipes(fipes);

        if (fipes.length > 0) {
          setSelectedFipe(fipes[0]);
        }

        // 1. Tratar marca e modelo (exemplo: "Nissan/march Sv Flex")
        const marcaModelo = veiculo.marca_modelo || "";
        let marca = "";
        let modelo = "";

        // Separar marca e modelo (dividindo por '/')
        if (marcaModelo.includes('/')) {
          const parts = marcaModelo.split('/');
          marca = parts[0]?.trim() || "";
          console.log(marca)
          modelo = parts[1]?.trim() || "";

          // Remover "Flex" do modelo se existir (opcional)
          modelo = modelo.replace(/Flex$/i, '').trim();

          const foundBrand = availableBrands.find(b =>
            normalizeText(marca).includes(normalizeText(b.nome)) ||
            normalizeText(b.nome).includes(normalizeText(marca))
          );

          if (foundBrand) {
            marca = foundBrand;
          }

        } else {
          // Se não estiver no formato esperado, tentar encontrar a marca na lista disponível
          const foundBrand = availableBrands.find(b =>
            normalizeText(marcaModelo).includes(normalizeText(b.nome)) ||
            normalizeText(b.nome).includes(normalizeText(marcaModelo))
          );

          if (foundBrand) {
            marca = foundBrand;
            modelo = marcaModelo.replace(foundBrand.nome, '').trim();
          } else {
            marca = marcaModelo;
            modelo = "";
          }
        }
        // 2. Tratar ano (exemplo: "2012/2013")
        const anoCompleto = veiculo.ano || "";
        let anoFabricacao = "";
        let anoModelo = "";

        if (anoCompleto.includes('/')) {
          const anos = anoCompleto.split('/');
          anoFabricacao = anos[0]?.trim() || "";
          anoModelo = anos[1]?.trim() || "";

          // Se o ano do modelo não foi preenchido, usar o mesmo ano de fabricação
          if (!anoModelo && anoFabricacao) {
            anoModelo = anoFabricacao;
          }
        } else {
          anoFabricacao = anoCompleto;
          anoModelo = anoCompleto;
        }

        // Preencher os campos com os dados da FIPE
        setBrand(marca);
        setModel(modelo);
        setYear(anoFabricacao);
        setModelYear(anoModelo);

        // Preencher valor da FIPE (pegar o primeiro valor da lista de fipes)
        if (fipes.length > 0) {
          const selected = selectedFipe || fipes[0];
          setFipeValue(`R$ ${selected.valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`);
        } else {
          setFipeValue("");
        }

        // Mostrar alerta de sucesso
        setErrorMessage(null);
        onFeedback({
          text: "Dados da FIPE carregados com sucesso!",
          severity: "success"
        });
      } else {
        // Mostrar alerta de erro
        setErrorMessage(response.error.message);
        onFeedback({
          text: response.error.message,
          severity: "warning"
        });
      }
    } catch (error) {
      console.error("Erro na busca FIPE:", error);
      setErrorMessage("Erro ao consultar dados da FIPE");
      onFeedback({
        text: "Erro ao consultar dados da FIPE",
        severity: "error"
      });
    } finally {
      setFipeLoading(false);
    }
  };

  const normalizeText = (text) => {
    if (!text) return '';

    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ''); // Remove caracteres especiais
  };

  const renderStep1 = () => (
    <Grid container spacing={3} alignItems={"center"}>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Placa"
          value={plate}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            setPlate(value.replace(/[^A-Z0-9]/g, '').substring(0, 7));
            if (value && errors.plate) {
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.plate;
                return newErrors;
              });
            }
          }}
          required
          error={!!errors.plate}
          helperText={errors.plate}
          inputProps={{
            maxLength: 7,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleFipeSearch}
                  edge="end"
                  disabled={!plate || plate.length < 7 || fipeLoading}
                >
                  {fipeLoading ? <CircularProgress size={24} /> : <SearchIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {availableFipes.length > 1 && (
        <Grid size={{ xs: 12, md: 4 }}>
          <Autocomplete
            options={availableFipes}
            getOptionLabel={(option) => option.marca_modelo}
            value={selectedFipe}
            onChange={(_, newValue) => {
              setSelectedFipe(newValue);
              if (newValue) {
                setFipeValue(`R$ ${newValue.valor.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selecione o modelo FIPE correto"
                fullWidth
              />
            )}
          />
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={brand}
          onChange={(_, newValue) => {
            setBrand(newValue || null);
            setModel("");
            if (newValue && errors.brand) {
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.brand;
                return newErrors;
              });
            }
          }}
          options={availableBrands}
          getOptionLabel={(option) => option?.nome || ""}
          isOptionEqualToValue={(option, value) =>
            option?.codigo === value?.codigo
          }
          loading={brandsLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Marca"
              required
              error={!!errors.brand}
              helperText={errors.brand}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {brandsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={model}
          onChange={(_, newValue) => {
            setModel(newValue || "");
            if (newValue && errors.model) {
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.model;
                return newErrors;
              });
            }
          }}
          options={availableModels}
          disabled={!brand || modelsLoading}
          loading={modelsLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Modelo"
              required
              error={!!errors.model}
              helperText={errors.model}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {modelsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={year}
          onChange={(_, newValue) => {
            setYear(newValue || "");
            if (newValue && errors.year) {
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.year;
                return newErrors;
              });
            }
          }}
          options={years}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ano de Fabricação"
              required
              error={!!errors.year}
              helperText={errors.year}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={modelYear}
          onChange={(_, newValue) => {
            setModelYear(newValue || "");
            if (newValue && errors.modelYear) {
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.modelYear;
                return newErrors;
              });
            }
          }}
          options={years}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ano do Modelo"
              required
              error={!!errors.modelYear}
              helperText={errors.modelYear}
            />
          )}
        />
      </Grid>
      {!(availableFipes.length > 1) &&
        <Grid size={{ xs: 12, md: 4 }}>

        </Grid>
      }
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Quilometragem"
          value={mileage}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.slice(0, 6);
            const formattedValue = value.length > 0
              ? Number(value).toLocaleString('pt-BR')
              : '';
            setMileage(formattedValue);
            if (value && errors.mileage) {
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.mileage;
                return newErrors;
              });
            }
          }}
          required
          error={!!errors.mileage}
          InputProps={{
            endAdornment: <Typography variant="body2">km</Typography>,
            inputProps: {
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={ownershipTime}
          onChange={(_, newValue) => {
            setOwnershipTime(newValue || "");
            if (newValue && errors.ownershipTime) {
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.ownershipTime;
                return newErrors;
              });
            }
          }}
          options={ownershipTimeOptions.map(opt => opt.value)}
          getOptionLabel={(option) =>
            ownershipTimeOptions.find(opt => opt.value === option)?.label || ""
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tempo de posse"
              required
              error={!!errors.ownershipTime}
              helperText={errors.ownershipTime}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={paintCondition}
          onChange={(_, newValue) => {
            setPaintCondition(newValue || "");
          }}
          options={conditionOptions.map(opt => opt.value)}
          getOptionLabel={(option) =>
            conditionOptions.find(opt => opt.value === option)?.label || ""
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Estado da pintura"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={mechanicalCondition}
          onChange={(_, newValue) => {
            setMechanicalCondition(newValue || "");
          }}
          options={conditionOptions.map(opt => opt.value)}
          getOptionLabel={(option) =>
            conditionOptions.find(opt => opt.value === option)?.label || ""
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Estado da mecânica"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={interiorCondition}
          onChange={(_, newValue) => {
            setInteriorCondition(newValue || "");
          }}
          options={conditionOptions.map(opt => opt.value)}
          getOptionLabel={(option) =>
            conditionOptions.find(opt => opt.value === option)?.label || ""
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Estado interior"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={tiresCondition}
          onChange={(_, newValue) => {
            setTiresCondition(newValue || "");
          }}
          options={conditionOptions.map(opt => opt.value)}
          getOptionLabel={(option) =>
            conditionOptions.find(opt => opt.value === option)?.label || ""
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Estado dos pneus"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={hasSpareKey}
          onChange={(_, newValue) => setHasSpareKey(newValue || "")}
          options={["Sim", "Não"]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Possui Chave Reserva"
              fullWidth
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          value={hasManual}
          onChange={(_, newValue) => setHasManual(newValue || "")}
          options={["Sim", "Não"]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Possui Manual de Fábrica"
              fullWidth
            />
          )}
        />
      </Grid>
      {fipeValue && (
        <Grid size={{ xs: 12, md: 4 }}>
          <Chip
            icon={<MonetizationOnIcon />}
            label={`Valor FIPE: ${fipeValue}`}
            color="success"
            variant="outlined"
            sx={{
              py: 2,
              px: 3,
              fontSize: '1rem',
              '& .MuiChip-icon': {
                fontSize: '1.2rem',
                color: theme.palette.success.main
              }
            }}
          />
          {availableFipes.length > 1 && selectedFipe && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Modelo selecionado: {selectedFipe.marca_modelo}
            </Typography>
          )}
        </Grid>
      )}
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Descrição do veículo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          placeholder="Descreva o estado geral do veículo, histórico de manutenção, etc."
        />
      </Grid>
      {view && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Valor da Fipe"
              value={fipeValue}
              onChange={(e) => {
                // Formata o valor enquanto digita
                const formatted = formatCurrency(e.target.value);
                setFipeValue(formatted);
              }}
              InputProps={{
                startAdornment: (
                  <Typography variant="body2" sx={{ mr: 1 }}>R$</Typography>
                ),
              }}
              placeholder="0,00"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Valor da Pedida"
              value={askingPrice}
              onChange={(e) => {
                // Formata o valor enquanto digita
                const formatted = formatCurrency(e.target.value);
                setAskingPrice(formatted);
              }}
              InputProps={{
                startAdornment: (
                  <Typography variant="body2" sx={{ mr: 1 }}>R$</Typography>
                ),
              }}
              placeholder="0,00"
            />
          </Grid>
        </>
      )}
      <Grid xs={12}>
        <Box
          sx={{
            p: 3,
            mt: 2,
            mb: 3,
            backgroundColor: 'background.default',
            borderRadius: 2,
            boxShadow: 1,
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: 3,
            }
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            Itens do Veículo
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            paragraph
            sx={{ mb: 2 }}
          >
            Marque os itens que seu veículo possui:
          </Typography>
          <FormGroup row sx={{ gap: 2 }}>
            {vehicleItems.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemToggle(item.id)}
                    name={item.id}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 28,
                      }
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{
                    color: selectedItems.includes(item.id) ? 'primary.main' : 'text.primary',
                    fontWeight: selectedItems.includes(item.id) ? 500 : 400
                  }}>
                    {item.label}
                  </Typography>
                }
                sx={{
                  m: 0,
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  bgcolor: selectedItems.includes(item.id) ? 'rgba(24, 232, 219, 0.08)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              />
            ))}
          </FormGroup>
        </Box>
      </Grid>
    </Grid>
  );

  const renderStep2 = () => (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Grid spacing={1}>
          <Grid size={12}>
            <Grid container alignItems="start" wrap="nowrap">
              <Grid>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Fotos do Veículo
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" color="text.primary">
              Adicione as {photoTypes.length} fotos obrigatórias do seu veículo. Todas as fotos são necessárias para prosseguir.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {photoTypes.map(type => (
        <Grid key={type.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              border: "1px dashed",
              borderColor: errors[`photo_${type.id}`] ? theme.palette.error.main : "divider",
              borderRadius: 1,
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
              minHeight: 200,
              position: "relative",
              backgroundImage: !photos[type.id] ? `url(/images/${type.id}.png)` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.76)',
                zIndex: 1,
              },
            }}
          >
            {photos[type.id] ? (
              <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                <Box
                  component="img"
                  src={photos[type.id]}
                  alt={`Foto ${type.label}`}
                  sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 1,
                    mb: 1,
                  }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    component="label"
                    sx={{
                      color: theme.palette.primary.main,
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    Alterar
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFileUpload(type.id, e)}
                      ref={el => fileInputsRef.current[type.id] = el}
                    />
                  </Button>
                  {isMobile && (
                    <Button
                      size="small"
                      onClick={() => captureFromCamera(type.id)}
                      sx={{
                        color: theme.palette.primary.main,
                        position: 'relative',
                        zIndex: 2
                      }}
                      startIcon={<CameraAltIcon fontSize="small" />}
                    >
                      Tirar foto
                    </Button>
                  )}
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      setPhotos(prev => ({ ...prev, [type.id]: "" }));
                      setPhotoFiles(prev => {
                        const newFiles = { ...prev };
                        if (newFiles[type.id]?.previewUrl) {
                          URL.revokeObjectURL(newFiles[type.id].previewUrl);
                        }
                        delete newFiles[type.id];
                        return newFiles;
                      });
                      if (fileInputsRef.current[type.id]) {
                        fileInputsRef.current[type.id].value = "";
                      }
                    }}
                    sx={{ position: 'relative', zIndex: 2 }}
                  >
                    Remover
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                {uploadProgress[type.id] ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 99 }}>
                    <CircularProgress
                      variant="determinate"
                      value={uploadProgress[type.id]}
                      sx={{ mb: 2, color: theme.palette.colors.primary }}
                    />
                    <Typography variant="caption" color="text.primary">
                      Enviando... {uploadProgress[type.id]}%
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <CloudUploadIcon
                      sx={{
                        fontSize: 40,
                        color: errors[`photo_${type.id}`] ? theme.palette.error.main : "primary.main",
                        mb: 1,
                      }}
                    />
                    <Typography variant="subtitle2" align="center" color="text.primary" gutterBottom>
                      {type.label}
                    </Typography>
                    <Typography variant="body2" color="text.primary" align="center" sx={{ mb: 2 }}>
                      {type.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, textAlign: "center" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        component="label"
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          "&:hover": {
                            borderColor: "#15d5c9",
                            bgcolor: "rgba(24, 232, 219, 0.04)",
                          },
                        }}
                      >
                        Selecionar
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleFileUpload(type.id, e)}
                        />
                      </Button>
                      {isMobile && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => captureFromCamera(type.id)}
                          sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            "&:hover": {
                              borderColor: "#15d5c9",
                              bgcolor: "rgba(24, 232, 219, 0.04)",
                            },
                          }}
                          startIcon={<CameraAltIcon fontSize="small" />}
                        >
                          Tirar foto
                        </Button>
                      )}
                    </Box>
                  </>
                )}
                {errors[`photo_${type.id}`] && (
                  <FormHelperText error sx={{ position: "absolute", bottom: 8, left: 16, zIndex: 2 }}>
                    {errors[`photo_${type.id}`]}
                  </FormHelperText>
                )}
              </Box>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
        onClose();
      }}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: theme.palette.background.primary }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          {isEditing ? "Editar Veículo" : "Adicionar Novo Veículo"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent ref={dialogContentRef} dividers sx={{ p: 3, bgcolor: theme.palette.background.default }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}
        <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 3 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel sx={{ '& .MuiStepLabel-label': { color: 'black' } }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ height: '100%', overflowY: 'auto', paddingTop: "5px" }}>
          {activeStep === 0 && renderStep1()}
          {activeStep === 1 && renderStep2()}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, bgcolor: theme.palette.background.default }}>
        <Button
          onClick={activeStep === 0 ? onClose : handleBack}
          disabled={loading}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          {activeStep === 0 ? 'Cancelar' : 'Voltar'}
        </Button>

        <Box sx={{ flex: '1 1 auto' }} />

        {activeStep === steps.length - 1 ? (
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={loading || Object.keys(uploadProgress).length > 0}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.text.primary,
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#15d5c9",
              },
              minWidth: 120,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : isEditing ? "Atualizar" : "Salvar"}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.text.primary,
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#15d5c9",
              },
              minWidth: 120,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Próximo'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default VehicleFormModal;