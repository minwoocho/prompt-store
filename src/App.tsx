import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/styles/theme";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import RuleDetailPage from "@/pages/RuleDetailPage";
import CreateRulePage from "@/pages/CreateRulePage";
import GeneratePage from "@/pages/GeneratePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rules/:id" element={<RuleDetailPage />} />
            <Route path="/create" element={<CreateRulePage />} />
            <Route path="/generate" element={<GeneratePage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
