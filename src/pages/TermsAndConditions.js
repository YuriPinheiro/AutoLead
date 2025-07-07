import React from 'react';
import { 
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const TermsAndConditions = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            📄 Termos de Uso e Política de Privacidade
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
            Última atualização: {formattedDate}
          </Typography>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Termos de Uso
            </Typography>
            
            <Typography paragraph>
              Este aplicativo é oferecido por <strong>GoodbyeCarBrasil - Caxias do sul/RS</strong>, com o objetivo de facilitar o processo de avaliação e proposta de compra de veículos usados, conectando proprietários a revendas interessadas.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              1. Aceitação dos Termos
            </Typography>
            <Typography paragraph>
              Ao utilizar este aplicativo, você concorda com os presentes Termos de Uso e com a Política de Privacidade. Caso não concorde, por favor, não utilize este serviço.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              2. Objetivo do Serviço
            </Typography>
            <Typography paragraph>
              O aplicativo permite que o usuário cadastre veículos de sua propriedade, incluindo informações e imagens, para que sejam avaliados por um corretor que buscará a melhor proposta de venda.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              3. Cadastro e Acesso
            </Typography>
            <Typography paragraph>
              O acesso ao sistema é feito por login com conta Google ou cadastro por e-mail e senha. O usuário se compromete a fornecer informações verdadeiras e manter a confidencialidade de sua conta.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              4. Uso Correto do Aplicativo
            </Typography>
            <Typography paragraph>
              Você se compromete a:
            </Typography>
            <Typography component="ul" paragraph sx={{ pl: 4 }}>
              <li>Não fornecer dados ou imagens falsas;</li>
              <li>Utilizar o app apenas para fins legítimos;</li>
              <li>Não tentar explorar falhas ou prejudicar o sistema.</li>
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              5. Exclusão e Alteração de Dados
            </Typography>
            <Typography paragraph>
              Você pode editar ou excluir seus próprios dados e veículos a qualquer momento.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              6. Alterações nos Termos
            </Typography>
            <Typography paragraph>
              Estes termos podem ser atualizados periodicamente. Recomendamos que você os revise regularmente.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              7. Contato
            </Typography>
            <Typography paragraph>
              Em caso de dúvidas, entre em contato pelo e-mail: <Link href="mailto:goodbyecarbrasil@gmail.com">goodbyecarbrasil@gmail.com</Link>.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              🔐 Política de Privacidade
            </Typography>
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
              Última atualização: {formattedDate}
            </Typography>
            
            <Typography paragraph>
              A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              1. Dados que coletamos
            </Typography>
            <Typography component="ul" paragraph sx={{ pl: 4 }}>
              <li>Nome e e-mail (via login Google ou cadastro direto);</li>
              <li>Dados dos veículos cadastrados (marca, modelo, ano, fotos etc.);</li>
              <li>Dados de navegação, como endereço IP, navegador e data/hora de acesso.</li>
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              2. Como usamos esses dados
            </Typography>
            <Typography component="ul" paragraph sx={{ pl: 4 }}>
              <li>Para identificar o usuário e permitir acesso à plataforma;</li>
              <li>Para permitir que o corretor avalie os veículos;</li>
              <li>Para buscar propostas de venda;</li>
              <li>Para garantir a segurança e o bom funcionamento do aplicativo.</li>
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              3. Compartilhamento com terceiros
            </Typography>
            <Typography paragraph>
              Os dados do veículo (fotos e descrições) podem ser compartilhados com empresas parceiras ou interessados na compra do veículo, exclusivamente para fins de avaliação e proposta de compra. Dados pessoais (como e-mail e telefone) não são compartilhados.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              4. Armazenamento e Segurança
            </Typography>
            <Typography paragraph>
              Todos os dados são armazenados com segurança em servidores da <strong>Firebase/Google Cloud</strong>. Aplicamos medidas técnicas para proteger seus dados contra acesso não autorizado.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              5. Seus direitos (LGPD)
            </Typography>
            <Typography paragraph>
              Você tem direito a:
            </Typography>
            <Typography component="ul" paragraph sx={{ pl: 4 }}>
              <li>Saber quais dados seus tratamos;</li>
              <li>Solicitar correção ou exclusão de dados;</li>
              <li>Revogar seu consentimento a qualquer momento.</li>
            </Typography>
            <Typography paragraph>
              Para exercer esses direitos, envie um e-mail para: <Link href="mailto:goodbyecarbrasil@gmail.com">goodbyecarbrasil@gmail.com</Link>.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              6. Cookies e dados técnicos
            </Typography>
            <Typography paragraph>
              Este aplicativo pode usar cookies e ferramentas de análise para melhorar sua experiência. Nenhum dado sensível é coletado para fins de publicidade.
            </Typography>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © {today.getFullYear()} [GOODBYECARBRASIL]. Todos os direitos reservados.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default TermsAndConditions;