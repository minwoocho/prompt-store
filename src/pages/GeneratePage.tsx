import { useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import StorageIcon from "@mui/icons-material/Storage";
import CodeIcon from "@mui/icons-material/Code";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import BuildIcon from "@mui/icons-material/Build";
import WidgetsIcon from "@mui/icons-material/Widgets";
import StyleIcon from "@mui/icons-material/Style";
import DataObjectIcon from "@mui/icons-material/DataObject";
import type {
  GenerateStep,
  GenerateConfig,
  GeneratedPrompt,
} from "@/types/Generate.types";
import { platforms, frameworks, builders, packages } from "@/mocks/generate";
import { generatePrompt } from "@/utils/generatePrompt";

const steps: GenerateStep[] = [
  "프로젝트 설명",
  "플랫폼 선택",
  "프레임워크 선택",
  "빌더 선택",
  "패키지 선택",
  "프롬프트 생성",
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "WebAsset":
      return <WebAssetIcon sx={{ width: 48, height: 48 }} />;
    case "PhoneAndroid":
      return <PhoneAndroidIcon sx={{ width: 48, height: 48 }} />;
    case "DesktopWindows":
      return <DesktopWindowsIcon sx={{ width: 48, height: 48 }} />;
    case "Storage":
      return <StorageIcon sx={{ width: 48, height: 48 }} />;
    case "Code":
      return <CodeIcon sx={{ width: 48, height: 48 }} />;
    case "DeveloperMode":
      return <DeveloperModeIcon sx={{ width: 48, height: 48 }} />;
    case "DesktopMac":
      return <DesktopMacIcon sx={{ width: 48, height: 48 }} />;
    case "Build":
      return <BuildIcon sx={{ width: 48, height: 48 }} />;
    case "Widgets":
      return <WidgetsIcon sx={{ width: 48, height: 48 }} />;
    case "Style":
      return <StyleIcon sx={{ width: 48, height: 48 }} />;
    case "DataObject":
      return <DataObjectIcon sx={{ width: 48, height: 48 }} />;
    default:
      return null;
  }
};

const GeneratePage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [generatedPrompt, setGeneratedPrompt] =
    useState<GeneratedPrompt | null>(null);
  const [config, setConfig] = useState<GenerateConfig>({
    projectName: "",
    projectDescription: "",
    platform: null,
    framework: null,
    builder: null,
    packages: [],
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return !config.projectName || !config.projectDescription;
      case 1:
        return !config.platform;
      case 2:
        return !config.framework;
      case 3:
        return !config.builder;
      case 4:
        return false; // 패키지는 선택 사항
      default:
        return false;
    }
  };

  const availableFrameworks = frameworks.filter(
    (f) => f.platformId === config.platform?.id
  );

  const availableBuilders = builders.filter(
    (b) => b.frameworkId === config.framework?.id
  );

  const availablePackages = packages.filter(
    (p) => p.builderId === config.builder?.id
  );

  const handleGeneratePrompt = () => {
    const prompt = generatePrompt(config);
    setGeneratedPrompt(prompt);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <Typography variant="h6" gutterBottom>
              프로젝트의 이름과 설명을 입력해주세요
            </Typography>
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="프로젝트 이름"
                value={config.projectName}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    projectName: e.target.value,
                  }))
                }
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="프로젝트 설명"
                value={config.projectDescription}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    projectDescription: e.target.value,
                  }))
                }
                multiline
                rows={4}
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              프로젝트의 실행 환경을 선택해주세요
            </Typography>
            <Grid container spacing={3}>
              {platforms.map((platform) => (
                <Grid item xs={12} sm={6} md={3} key={platform.id}>
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      position: "relative",
                      border:
                        config.platform?.id === platform.id
                          ? "2px solid"
                          : "1px solid",
                      borderColor:
                        config.platform?.id === platform.id
                          ? "primary.main"
                          : "divider",
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
                        setConfig((prev) => ({
                          ...prev,
                          platform,
                          framework: null,
                          builder: null,
                          packages: [],
                        }));
                      }}
                      sx={{ height: "100%" }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          {getIcon(platform.icon)}
                          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            {platform.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {platform.description}
                          </Typography>
                        </Box>
                        {config.platform?.id === platform.id && (
                          <CheckCircleIcon
                            color="primary"
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                            }}
                          />
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              프레임워크를 선택해주세요
            </Typography>
            <Grid container spacing={3}>
              {availableFrameworks.map((framework) => (
                <Grid item xs={12} sm={6} md={3} key={framework.id}>
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      position: "relative",
                      border:
                        config.framework?.id === framework.id
                          ? "2px solid"
                          : "1px solid",
                      borderColor:
                        config.framework?.id === framework.id
                          ? "primary.main"
                          : "divider",
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
                        setConfig((prev) => ({
                          ...prev,
                          framework,
                          builder: null,
                          packages: [],
                        }));
                      }}
                      sx={{ height: "100%" }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          {getIcon(framework.icon)}
                          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            {framework.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {framework.description}
                          </Typography>
                        </Box>
                        {config.framework?.id === framework.id && (
                          <CheckCircleIcon
                            color="primary"
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                            }}
                          />
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              빌드 도구를 선택해주세요
            </Typography>
            <Grid container spacing={3}>
              {availableBuilders.map((builder) => (
                <Grid item xs={12} sm={6} md={3} key={builder.id}>
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      position: "relative",
                      border:
                        config.builder?.id === builder.id
                          ? "2px solid"
                          : "1px solid",
                      borderColor:
                        config.builder?.id === builder.id
                          ? "primary.main"
                          : "divider",
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
                        setConfig((prev) => ({
                          ...prev,
                          builder,
                          packages: [],
                        }));
                      }}
                      sx={{ height: "100%" }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          {getIcon(builder.icon)}
                          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            {builder.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {builder.description}
                          </Typography>
                        </Box>
                        {config.builder?.id === builder.id && (
                          <CheckCircleIcon
                            color="primary"
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                            }}
                          />
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              필요한 패키지를 선택해주세요
            </Typography>
            <Grid container spacing={3}>
              {availablePackages.map((pkg) => (
                <Grid item xs={12} sm={6} md={3} key={pkg.id}>
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      position: "relative",
                      border: config.packages.some((p) => p.id === pkg.id)
                        ? "2px solid"
                        : "1px solid",
                      borderColor: config.packages.some((p) => p.id === pkg.id)
                        ? "primary.main"
                        : "divider",
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
                        setConfig((prev) => ({
                          ...prev,
                          packages: prev.packages.some((p) => p.id === pkg.id)
                            ? prev.packages.filter((p) => p.id !== pkg.id)
                            : [...prev.packages, pkg],
                        }));
                      }}
                      sx={{ height: "100%" }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          {getIcon(pkg.icon)}
                          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            {pkg.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {pkg.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            v{pkg.version}
                          </Typography>
                        </Box>
                        {config.packages.some((p) => p.id === pkg.id) && (
                          <CheckCircleIcon
                            color="primary"
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                            }}
                          />
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 5:
        if (!generatedPrompt) {
          return (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" gutterBottom>
                프롬프트 생성 준비 완료
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                선택하신 설정으로 프롬프트를 생성합니다.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGeneratePrompt}
                sx={{ mt: 2 }}
              >
                프롬프트 생성하기
              </Button>
            </Box>
          );
        }

        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              프롬프트 생성 결과
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="PRD.md" />
                <Tab label="PROGRESS.md" />
                <Tab label=".cursorrules" />
                <Tab label="CODE_STYLE.md" />
              </Tabs>
            </Box>
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={() => {
                  const content =
                    activeTab === 0
                      ? generatedPrompt.prd
                      : activeTab === 1
                      ? generatedPrompt.progress
                      : activeTab === 2
                      ? generatedPrompt.cursorrules
                      : generatedPrompt.codeStyle;
                  handleCopyToClipboard(content);
                }}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <ContentCopyIcon />
              </IconButton>
              <Paper
                sx={{
                  p: 2,
                  maxHeight: "60vh",
                  overflow: "auto",
                  bgcolor: "transparent",
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  color: "text.primary",
                }}
              >
                {activeTab === 0
                  ? generatedPrompt.prd
                  : activeTab === 1
                  ? generatedPrompt.progress
                  : activeTab === 2
                  ? generatedPrompt.cursorrules
                  : generatedPrompt.codeStyle}
              </Paper>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          프롬프트 생성
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          프로젝트의 이름과 설명을 입력하고, 필요한 환경을 선택하여 프롬프트를
          생성하세요.
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3, mb: 3 }}>
        {renderStepContent(activeStep)}

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          {activeStep > 0 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              이전
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            generatedPrompt ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
              >
                완료
              </Button>
            ) : null
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForwardIcon />}
              disabled={isNextDisabled()}
            >
              다음
            </Button>
          )}
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ ml: "auto" }}
          >
            취소
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default GeneratePage;
