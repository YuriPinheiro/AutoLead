import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, useTheme } from "@mui/material"
import { Warning as WarningIcon } from "@mui/icons-material"

const DeleteConfirmationModal = ({ open, onClose, onConfirm, vehicleName }) => {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: 400,
        },
      }}
    >
      <DialogTitle sx={{ bgcolor: theme.palette.background.default }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <WarningIcon sx={{ color: theme.palette.error.main, mr: 1 }} />
          <Typography variant="h6" component="div" fontWeight="bold">
            Confirmar exclusão
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 2, bgcolor: theme.palette.background.default }}>
        <Typography variant="body1">
          Tem certeza que deseja excluir o veículo <strong>{vehicleName}</strong>?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Esta ação não poderá ser desfeita.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, bgcolor: theme.palette.background.default }}>
        <Button
          onClick={onClose}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: theme.palette.error.main,
            color: theme.palette.common.white,
            "&:hover": {
              bgcolor: theme.palette.error.dark,
            },
          }}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmationModal
