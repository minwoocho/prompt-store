import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TerminalIcon from "@mui/icons-material/Terminal";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(28, 28, 28, 0.8)",
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TerminalIcon
              sx={{
                fontSize: 28,
                color: "primary.main",
                filter: "drop-shadow(0 0 8px rgba(0, 188, 212, 0.3))",
              }}
            />
            PROMPT STORE
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={RouterLink}
              to="/create"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              프롬프트 공유
            </Button>
            <Button
              component={RouterLink}
              to="/generate"
              variant="contained"
              color="secondary"
              startIcon={<AutoFixHighIcon />}
            >
              프롬프트 생성
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
