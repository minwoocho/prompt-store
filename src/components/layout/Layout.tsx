import { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          pt: { xs: 10, sm: 12 },
          pb: 4,
          px: { xs: 2, sm: 3 },
          mt: 4,
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
};

export default Layout;
