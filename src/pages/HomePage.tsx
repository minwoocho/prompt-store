import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Chip,
  InputAdornment,
  Paper,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import useRuleStore from "@/stores/useRuleStore";
import RuleCard from "@/components/features/RuleCard";

const steps = ["플랫폼 선택", "프레임워크 선택", "빌더 선택", "패키지 선택"];

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

const HomePage = () => {
  const {
    filteredRules,
    searchQuery,
    platforms,
    frameworks,
    builders,
    packages,
    selectedPlatform,
    selectedFramework,
    selectedBuilder,
    selectedPackages,
    fetchRules,
    setSearchQuery,
    setSelectedPlatform,
    setSelectedFramework,
    setSelectedBuilder,
    togglePackage,
    clearFilters,
  } = useRuleStore();

  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const handleOpenFilterDialog = () => {
    setIsFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setIsFilterDialogOpen(false);
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const availableFrameworks = frameworks.filter(
    (f) => f.platformId === selectedPlatform?.id
  );

  const availableBuilders = builders.filter(
    (b) => b.frameworkId === selectedFramework?.id
  );

  const availablePackages = packages.filter(
    (p) => p.builderId === selectedBuilder?.id
  );

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {platforms.map((platform) => (
              <Grid item xs={12} sm={6} md={4} key={platform.id}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    position: "relative",
                    border:
                      selectedPlatform?.id === platform.id
                        ? "2px solid"
                        : "1px solid",
                    borderColor:
                      selectedPlatform?.id === platform.id
                        ? "primary.main"
                        : "divider",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: (theme) => theme.shadows[4],
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      setSelectedPlatform(platform);
                      setSelectedFramework(null);
                      setSelectedBuilder(null);
                      clearFilters();
                      setActiveStep(1);
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
                          p: 2,
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
                      {selectedPlatform?.id === platform.id && (
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
        );

      case 1:
        return (
          <Grid container spacing={3}>
            {availableFrameworks.map((framework) => (
              <Grid item xs={12} sm={6} md={4} key={framework.id}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    position: "relative",
                    border:
                      selectedFramework?.id === framework.id
                        ? "2px solid"
                        : "1px solid",
                    borderColor:
                      selectedFramework?.id === framework.id
                        ? "primary.main"
                        : "divider",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: (theme) => theme.shadows[4],
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      setSelectedFramework(framework);
                      setSelectedBuilder(null);
                      clearFilters();
                      setActiveStep(2);
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
                          p: 2,
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
                      {selectedFramework?.id === framework.id && (
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
        );

      case 2:
        return (
          <Grid container spacing={3}>
            {availableBuilders.map((builder) => (
              <Grid item xs={12} sm={6} md={4} key={builder.id}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    position: "relative",
                    border:
                      selectedBuilder?.id === builder.id
                        ? "2px solid"
                        : "1px solid",
                    borderColor:
                      selectedBuilder?.id === builder.id
                        ? "primary.main"
                        : "divider",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: (theme) => theme.shadows[4],
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      setSelectedBuilder(builder);
                      clearFilters();
                      setActiveStep(3);
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
                          p: 2,
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
                      {selectedBuilder?.id === builder.id && (
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
        );

      case 3:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              선택된 패키지: {selectedPackages.length}개
            </Typography>
            <Grid container spacing={3}>
              {availablePackages.map((pkg) => (
                <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      position: "relative",
                      border: selectedPackages.some((p) => p.id === pkg.id)
                        ? "2px solid"
                        : "1px solid",
                      borderColor: selectedPackages.some((p) => p.id === pkg.id)
                        ? "primary.main"
                        : "divider",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: (theme) => theme.shadows[4],
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => togglePackage(pkg)}
                      sx={{ height: "100%" }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            p: 2,
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
                          <Chip
                            label={`v${pkg.version}`}
                            size="small"
                            variant="outlined"
                            sx={{ mt: 1 }}
                          />
                        </Box>
                        {selectedPackages.some((p) => p.id === pkg.id) && (
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

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #00BCD4 30%, #4DD0E1 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          PROMPT STORE
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
        >
          AI 코딩의 효율성을 높이는 다양한 프롬프트들을 찾아보세요.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            maxWidth: 600,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            gap: 1,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            bgcolor: "rgba(42, 42, 42, 0.8)",
            backdropFilter: "blur(8px)",
          }}
        >
          <TextField
            fullWidth
            placeholder="제목, 설명, 내용으로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            sx={{ bgcolor: "transparent" }}
          />
          <Button
            color="inherit"
            sx={{ minWidth: "auto", opacity: 0.7 }}
            onClick={handleOpenFilterDialog}
          >
            <FilterListIcon />
          </Button>
        </Paper>
      </Box>

      {(selectedPlatform ||
        selectedFramework ||
        selectedBuilder ||
        selectedPackages.length > 0) && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ color: "text.secondary" }}
          >
            선택된 필터:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {selectedPlatform && (
              <Chip
                key={selectedPlatform.id}
                label={selectedPlatform.name}
                onDelete={() => setSelectedPlatform(null)}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {selectedFramework && (
              <Chip
                key={selectedFramework.id}
                label={selectedFramework.name}
                onDelete={() => setSelectedFramework(null)}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {selectedBuilder && (
              <Chip
                key={selectedBuilder.id}
                label={selectedBuilder.name}
                onDelete={() => setSelectedBuilder(null)}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {selectedPackages.map((pkg) => (
              <Chip
                key={pkg.id}
                label={pkg.name}
                onDelete={() => togglePackage(pkg)}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
            <Chip
              label="필터 초기화"
              size="small"
              variant="outlined"
              onClick={clearFilters}
            />
          </Box>
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {filteredRules.length}개의 프롬프트 찾음
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {filteredRules.map((rule) => (
          <Grid item xs={12} sm={6} md={4} key={rule.id}>
            <RuleCard rule={rule} />
          </Grid>
        ))}
        {filteredRules.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" align="center">
              검색된 프롬프트가 없습니다.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Dialog
        open={isFilterDialogOpen}
        onClose={handleCloseFilterDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">필터 설정</Typography>
            {(selectedPlatform ||
              selectedFramework ||
              selectedBuilder ||
              selectedPackages.length > 0) && (
              <Chip
                label="초기화"
                size="small"
                variant="outlined"
                onClick={() => {
                  clearFilters();
                  setActiveStep(0);
                }}
              />
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilterDialog} color="inherit">
            취소
          </Button>
          {activeStep > 0 && (
            <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
              이전
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button
              onClick={handleNext}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              disabled={
                (activeStep === 0 && !selectedPlatform) ||
                (activeStep === 1 && !selectedFramework)
              }
            >
              다음
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button
              onClick={handleCloseFilterDialog}
              variant="contained"
              color="primary"
            >
              적용
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
