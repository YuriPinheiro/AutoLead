import { useState } from "react"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Chip,
} from "@mui/material"
import {
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"



const VehicleCard = ({ vehicle, onView, onEdit, onDelete }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleView = () => {
    handleClose()
    onView()
  }

  const handleEdit = () => {
    handleClose()
    onEdit()
  }

  const handleDelete = () => {
    handleClose()
    onDelete()
  }

  // Format date
  const date = vehicle.createdAt.toDate(); // Converte para objeto Date do JavaScript
  const formattedDate = date.toLocaleDateString('pt-BR');


  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="160"
          image={vehicle.photos.front}
          alt={`${vehicle.brand} ${vehicle.model}`}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 1,
          }}
        >
          <IconButton
            aria-label="more"
            id={`vehicle-menu-button-${vehicle.id}`}
            aria-controls={open ? `vehicle-menu-${vehicle.id}` : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.8)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id={`vehicle-menu-${vehicle.id}`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": `vehicle-menu-button-${vehicle.id}`,
            }}
          >
            <MenuItem onClick={handleView}>
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Visualizar</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Editar</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
              </ListItemIcon>
              <ListItemText sx={{ color: theme.palette.error.main }}>Excluir</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
        <Chip
          label={vehicle.year}
          size="small"
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            fontWeight: "bold",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="div" fontWeight="bold" color="text.secondary" noWrap>
          {vehicle.brand.nome} {vehicle.model}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: "auto", pt: 1 }}>
          Adicionado em {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default VehicleCard
