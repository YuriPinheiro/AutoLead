import React from "react"
import { useState, useEffect } from "react"
import {
    Box,
    Typography,
    Button,
    useTheme,
    IconButton,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    TextField,
    InputAdornment,
    CircularProgress,
    useMediaQuery,
    Menu,
    Alert,
    Snackbar,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    FilterList as FilterListIcon,
    Search as SearchIcon,
    Clear as ClearIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material"
import VehicleFormModal from "./vehicles/VehicleFormModal"
import VehicleDetailsModal from "./vehicles/VehiclesDetail"
import DeleteConfirmationModal from "./vehicles/DeleteModal"
import { deleteVehicle, getAllVehicles } from "../../stores/VeihcleService"
import userService from "../../stores/UserService"
import ProfileModal from "../ProfileModal"

const AdminVehiclesPage = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [loading, setLoading] = useState(true)
    const [vehicles, setVehicles] = useState([])
    const [filteredVehicles, setFilteredVehicles] = useState([])
    const [users, setUsers] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [currentVehicle, setCurrentVehicle] = useState(null)
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileUser, setProfileUser] = useState(null);

    // Modal states
    const [formModalOpen, setFormModalOpen] = useState(false)
    const [detailsModalOpen, setDetailsModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [feedbackAlert, setFeedbackAlert] = useState(null);


    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState("")
    const [brandFilter, setBrandFilter] = useState("")
    const [modelFilter, setModelFilter] = useState("")
    const [yearFilter, setYearFilter] = useState("")
    const [sortBy, setSortBy] = useState("createdAt_desc")

    // Marcas e modelos disponíveis
    const [availableBrands, setAvailableBrands] = useState([])
    const [availableModels, setAvailableModels] = useState([])
    const [allModels, setAllModels] = useState({})

    // Opções de ordenação
    const sortOptions = [
        {
            value: "brand_asc",
            label: "Marca (A-Z)",
            compareFn: (a, b) => a.brand.nome.localeCompare(b.brand.nome),
        },
        {
            value: "brand_desc",
            label: "Marca (Z-A)",
            compareFn: (a, b) => b.brand.nome.localeCompare(a.brand.nome),
        },
        {
            value: "model_asc",
            label: "Modelo (A-Z)",
            compareFn: (a, b) => a.model.localeCompare(b.model),
        },
        {
            value: "model_desc",
            label: "Modelo (Z-A)",
            compareFn: (a, b) => b.model.localeCompare(a.model),
        },
        {
            value: "year_asc",
            label: "Ano (Mais antigo)",
            compareFn: (a, b) => a.year.localeCompare(b.year),
        },
        {
            value: "year_desc",
            label: "Ano (Mais recente)",
            compareFn: (a, b) => b.year.localeCompare(a.year),
        },
        {
            value: "createdAt_asc",
            label: "Data de cadastro (Mais antigo)",
            compareFn: (a, b) => {
                // Converter timestamp do Firebase para milissegundos
                const aTime = a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000;
                const bTime = b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000;
                return aTime - bTime;
            },
        },
        {
            value: "createdAt_desc",
            label: "Data de cadastro (Mais recente)",
            compareFn: (a, b) => {
                // Converter timestamp do Firebase para milissegundos
                const aTime = a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000;
                const bTime = b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000;
                return bTime - aTime;
            },
        }
    ]

    // Years for dropdown
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString())

    useEffect(() => {
        fetchUsers();
        fetchVehicles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users, vehicles])

    useEffect(() => {
        if (users?.length > 0 && vehicles?.length > 0) {
            const updatedVehicles = addUsersToVehicles(vehicles, users);

            // Comparação simples para evitar atualização desnecessária
            if (JSON.stringify(updatedVehicles) !== JSON.stringify(vehicles)) {
                setVehicles(updatedVehicles);
            }
        }
    }, [users, vehicles]);

    // Extrai marcas e modelos únicos dos veículos
    useEffect(() => {
        if (vehicles.length > 0) {
            // Extrair marcas únicas
            const uniqueBrands = [...new Set(vehicles.map(v => v.brand.nome))].sort()
            setAvailableBrands(uniqueBrands)

            // Criar mapa de modelos por marca
            const modelsMap = {}
            vehicles.forEach(vehicle => {
                if (!modelsMap[vehicle.brand.nome]) {
                    modelsMap[vehicle.brand.nome] = []
                }
                if (!modelsMap[vehicle.brand.nome].includes(vehicle.model)) {
                    modelsMap[vehicle.brand.nome].push(vehicle.model)
                }
            })

            // Ordenar modelos para cada marca
            Object.keys(modelsMap).forEach(brand => {
                modelsMap[brand].sort()
            })

            setAllModels(modelsMap)
        }
    }, [vehicles])

    // Atualiza modelos disponíveis quando a marca muda
    useEffect(() => {
        if (brandFilter && allModels[brandFilter]) {
            setAvailableModels(allModels[brandFilter])
        } else {
            setAvailableModels([])
        }
        setModelFilter("") // Reset model filter when brand changes
    }, [brandFilter, allModels])

    const fetchVehicles = async () => {
        try {
            setLoading(true)
            const vehiclesData = await getAllVehicles()
            setVehicles(vehiclesData)
            setFilteredVehicles(vehiclesData)
        } catch (error) {
            console.error("Erro ao buscar veículos:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUsers = async () => {
        try {
            const usersData = await userService.getAllUsers();
            setUsers(usersData);
        } catch (error) {
            console.error("Erro ao buscar usuarios:", error)
        }
    }

    const addUsersToVehicles = (vehicles, users) => {
        // Criar um objeto (mapa) de usuários para acesso rápido por ID
        const userMap = {};
        users.forEach(user => {
            userMap[user.id] = user;
        });

        // Adicionar o usuário correspondente a cada veículo
        return vehicles.map(vehicle => {
            return {
                ...vehicle,
                year: vehicle.year.toString(),
                user: userMap[vehicle.userId] || null
            };
        });
    }

    // Aplica filtros e ordenação
    useEffect(() => {
        let result = [...vehicles]

        // Aplicar filtro de pesquisa
        if (searchTerm) {
            const search = searchTerm.toLowerCase()
            result = result.filter(
                (vehicle) =>
                    vehicle.brand.nome.toLowerCase().includes(search) ||
                    vehicle.model.toLowerCase().includes(search) ||
                    vehicle.year.toString().includes(search),
            )
        }

        // Aplicar filtro de marca
        if (brandFilter) {
            result = result.filter((vehicle) => vehicle.brand.nome === brandFilter)
        }

        // Aplicar filtro de modelo
        if (modelFilter) {
            result = result.filter((vehicle) => vehicle.model === modelFilter)
        }

        // Aplicar filtro de ano
        if (yearFilter) {
            result = result.filter((vehicle) => vehicle.year === yearFilter)
        }

        // Aplicar ordenação
        const selectedSort = sortOptions.find((option) => option.value === sortBy)
        if (selectedSort) {
            result.sort(selectedSort.compareFn)
        }

        setFilteredVehicles(result)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicles, searchTerm, brandFilter, modelFilter, yearFilter, sortBy])


    const handleViewVehicle = (vehicle) => {
        setSelectedVehicle(vehicle)
        setDetailsModalOpen(true)
    }

    const handleEditVehicle = (vehicle) => {
        setSelectedVehicle(vehicle)
        setIsEditing(true)
        setFormModalOpen(true)
    }

    const handleDeleteVehicle = (vehicle) => {
        setSelectedVehicle(vehicle)
        setDeleteModalOpen(true)
    }

    const confirmDeleteVehicle = () => {
        if (selectedVehicle) {
            let confirmation = deleteVehicle(selectedVehicle?.user?.id, selectedVehicle.id)
            if (confirmation) {
                setVehicles(vehicles.filter((v) => v.id !== selectedVehicle.id))
            }
            setDeleteModalOpen(false)
            setSelectedVehicle(null)
        }
    }

    const handleSaveVehicle = (vehicleData) => {
        if (isEditing && selectedVehicle) {
            // Update existing vehicle
            setVehicles(vehicles.map((v) => (v.id === selectedVehicle.id ? { ...v, ...vehicleData } : v)))
            fetchVehicles();
        } else {
            // Add new vehicle
            const newVehicle = {
                id: Date.now().toString(),
                ...vehicleData,
                createdAt: new Date().toISOString(),
            }
            setVehicles([newVehicle, ...vehicles])
        }
        setFormModalOpen(false)
    }


    const handleClearFilters = () => {
        setSearchTerm("")
        setBrandFilter("")
        setModelFilter("")
        setYearFilter("")
        setSortBy("createdAt_desc")
    }

    const handleMenuOpen = (event, vehicle) => {
        setAnchorEl(event.currentTarget)
        setCurrentVehicle(vehicle)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setCurrentVehicle(null)
    }

    const handleMenuAction = (action) => {
        handleMenuClose()
        if (!currentVehicle) return

        switch (action) {
            case 'view':
                handleViewVehicle(currentVehicle)
                break
            case 'edit':
                handleEditVehicle(currentVehicle)
                break
            case 'delete':
                handleDeleteVehicle(currentVehicle)
                break
            default:
                break
        }
    }

    // Formatar data para exibição
    const formatDate = (dateString) => {
        const date = dateString.toDate(); // Converte para objeto Date do JavaScript
        const formattedDate = date.toLocaleDateString('pt-BR');

        return formattedDate;
    }

    const onFeedback = (feedback) => {
        setFeedbackAlert(feedback);
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - 250px)` },
                    mt: "64px",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                        Administração de Veículos
                    </Typography>
                </Box>

                {/* Filtros */}
                <Paper sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: theme.palette.background.default }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                        <FilterListIcon sx={{ mr: 1 }} /> Filtros e Ordenação
                    </Typography>

                    <Grid container spacing={2}>
                        {/* Campo de pesquisa */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                fullWidth
                                label="Pesquisar"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.main,
                                        },
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: theme.palette.primary.main,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Filtro de Marca */}
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: theme.palette.text.primary }} id="brand-filter-label">Marca</InputLabel>
                                <Select
                                    labelId="brand-filter-label"
                                    id="brand-filter"
                                    value={brandFilter}
                                    onChange={(e) => setBrandFilter(e.target.value)}
                                    input={<OutlinedInput label="Marca" />}
                                >
                                    <MenuItem value="">
                                        <em>Todas</em>
                                    </MenuItem>
                                    {availableBrands.map((brand) => (
                                        <MenuItem key={brand} value={brand}>
                                            {brand}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Filtro de Modelo */}
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <FormControl fullWidth disabled={!brandFilter}>
                                <InputLabel sx={{ color: theme.palette.text.primary }} id="model-filter-label">Modelo</InputLabel>
                                <Select
                                    labelId="model-filter-label"
                                    id="model-filter"
                                    value={modelFilter}
                                    onChange={(e) => setModelFilter(e.target.value)}
                                    input={<OutlinedInput label="Modelo" />}
                                >
                                    <MenuItem value="">
                                        <em>Todos</em>
                                    </MenuItem>
                                    {availableModels.map((model) => (
                                        <MenuItem key={model} value={model}>
                                            {model}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Filtro de Ano */}
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: theme.palette.text.primary }} id="year-filter-label">Ano</InputLabel>
                                <Select
                                    labelId="year-filter-label"
                                    id="year-filter"
                                    value={yearFilter}
                                    onChange={(e) => setYearFilter(e.target.value)}
                                    input={<OutlinedInput label="Ano" />}
                                    sx={{
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: yearFilter ? theme.palette.primary.main : undefined,
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Todos</em>
                                    </MenuItem>
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Ordenação */}
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: theme.palette.text.primary }} id="sort-by-label">Ordenar por</InputLabel>
                                <Select
                                    labelId="sort-by-label"
                                    id="sort-by"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    input={<OutlinedInput label="Ordenar por" />}
                                >
                                    {sortOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Botão Limpar Filtros */}
                        <Grid size={{ xs: 12, md: 1 }} sx={{ display: "flex", alignItems: "center" }}>
                            <Button
                                variant="outlined"
                                startIcon={<ClearIcon />}
                                onClick={handleClearFilters}
                                fullWidth
                                sx={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                    "&:hover": {
                                        borderColor: "#15d5c9",
                                        bgcolor: "rgba(24, 232, 219, 0.04)",
                                    },
                                }}
                            >
                                Limpar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Tabela de Veículos */}
                <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, bgcolor: theme.palette.background.default }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
                            <Table stickyHeader aria-label="tabela de veículos">
                                <TableHead>
                                    <TableRow>
                                        {!isMobile && <TableCell sx={{ fontWeight: "bold", width: '150px' }}>Foto</TableCell>}
                                        <TableCell sx={{ fontWeight: "bold" }}>Marca</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Modelo</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Ano</TableCell>
                                        {!isMobile && (
                                            <>
                                                <TableCell sx={{ fontWeight: "bold" }}>Data de Cadastro</TableCell>
                                                <TableCell sx={{ fontWeight: "bold" }}>Proprietário</TableCell>
                                            </>
                                        )}
                                        <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ bgcolor: theme.palette.background.default }}>
                                    {filteredVehicles.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={isMobile ? 4 : 7} align="center" sx={{ py: 3 }}>
                                                <Typography variant="body1">Nenhum veículo encontrado</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredVehicles.map((vehicle) => (
                                            <TableRow key={vehicle.id} hover>
                                                {!isMobile && (
                                                    <TableCell>
                                                        <Box
                                                            component="img"
                                                            src={vehicle.photos?.front || '/placeholder-car.jpg'}
                                                            alt={`${vehicle.brand.nome} ${vehicle.model}`}
                                                            sx={{ width: 80, height: 50, objectFit: "cover", borderRadius: 1 }}
                                                        />
                                                    </TableCell>
                                                )}
                                                <TableCell>{vehicle.brand.nome}</TableCell>
                                                <TableCell>{vehicle.model}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={vehicle.year}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: theme.palette.primary.main,
                                                            color: theme.palette.text.primary,
                                                            fontWeight: "bold",
                                                        }}
                                                    />
                                                </TableCell>
                                                {!isMobile && (
                                                    <>
                                                        <TableCell>{formatDate(vehicle.createdAt)}</TableCell>
                                                        <TableCell>

                                                            <Button
                                                                sx={{ color: theme.palette.text.primary }}
                                                                onClick={() => { setProfileUser(vehicle?.user); setProfileOpen(true); }}
                                                            >

                                                                {vehicle?.user?.name || 'N/A'}
                                                            </Button>

                                                        </TableCell>
                                                    </>
                                                )}
                                                <TableCell>
                                                    {isMobile ? (
                                                        <>
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => handleMenuOpen(e, vehicle)}
                                                                sx={{ color: theme.palette.primary.main }}
                                                            >
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                            <Menu
                                                                anchorEl={anchorEl}
                                                                open={Boolean(anchorEl) && currentVehicle?.id === vehicle.id}
                                                                onClose={handleMenuClose}
                                                            >
                                                                <MenuItem onClick={() => handleMenuAction('view')}>
                                                                    <VisibilityIcon sx={{ mr: 1 }} /> Visualizar
                                                                </MenuItem>
                                                                <MenuItem onClick={() => handleMenuAction('edit')}>
                                                                    <EditIcon sx={{ mr: 1 }} /> Editar
                                                                </MenuItem>
                                                                <MenuItem onClick={() => handleMenuAction('delete')}>
                                                                    <DeleteIcon sx={{ mr: 1 }} /> Excluir
                                                                </MenuItem>
                                                            </Menu>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleViewVehicle(vehicle)}
                                                                sx={{ color: theme.palette.primary.main }}
                                                            >
                                                                <VisibilityIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleEditVehicle(vehicle)}
                                                                sx={{ color: theme.palette.primary.main }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleDeleteVehicle(vehicle)}
                                                                sx={{ color: theme.palette.error.main }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Box>

            {/* Modals */}
            <VehicleFormModal
                open={formModalOpen}
                onClose={() => setFormModalOpen(false)}
                onFeedback={onFeedback}
                onSave={handleSaveVehicle}
                view
                vehicle={isEditing ? selectedVehicle : null}
                isEditing={isEditing}
            />

            <VehicleDetailsModal
                open={detailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                vehicle={selectedVehicle}
                view
                onEdit={() => {
                    setDetailsModalOpen(false)
                    handleEditVehicle(selectedVehicle)
                }}
                onDelete={() => {
                    setDetailsModalOpen(false)
                    handleDeleteVehicle(selectedVehicle)
                }}
            />

            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDeleteVehicle}
                vehicleName={
                    selectedVehicle ? `${selectedVehicle.brand.nome} ${selectedVehicle.model} (${selectedVehicle.year})` : ""
                }
            />

            <ProfileModal open={profileOpen} onClose={() => { setProfileOpen(false); setProfileUser(null); }} userProvider={{ ...profileUser, uid: profileUser?.id }} mode={'view'} />
            
            <Snackbar
                open={Boolean(feedbackAlert)}
                autoHideDuration={3000}
                onClose={() => {
                    setFeedbackAlert(null);
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={feedbackAlert?.severity}>
                    {feedbackAlert?.text}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AdminVehiclesPage
