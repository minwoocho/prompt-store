import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useRuleStore from "@/stores/useRuleStore";
import type { Platform, Framework, Package, Builder } from "@/types/Rule.types";

const steps = [
  "플랫폼 선택",
  "프레임워크 선택",
  "빌더 선택",
  "패키지 선택",
  "프롬프트 생성",
];

const CreateRulePage = () => {
  const navigate = useNavigate();
  const { addRule, platforms, frameworks, builders, packages } = useRuleStore();

  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(
    null
  );
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);

  const availableFrameworks = frameworks.filter(
    (f) => f.platformId === selectedPlatform?.id
  );

  const availableBuilders = builders.filter(
    (b) => b.frameworkId === selectedFramework?.id
  );

  const availablePackages = packages.filter(
    (p) => p.builderId === selectedBuilder?.id
  );

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPlatform || !selectedFramework || !selectedBuilder) {
      return;
    }

    const newRule = {
      id: Date.now().toString(),
      title,
      description,
      content,
      createdAt: new Date(),
      status: "published" as const,
      author: {
        id: "user1", // TODO: Implement real user management
        name: "김개발",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
      },
      platform: selectedPlatform,
      framework: selectedFramework,
      builder: selectedBuilder,
      packages: selectedPackages,
      likes: 0,
      downloads: 0,
    };

    addRule(newRule);
    navigate("/");
  };

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
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      setSelectedPlatform(platform);
                      setSelectedFramework(null);
                      setSelectedBuilder(null);
                      setSelectedPackages([]);
                    }}
                    sx={{ height: "100%" }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {platform.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {platform.description}
                      </Typography>
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
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      setSelectedFramework(framework);
                      setSelectedBuilder(null);
                      setSelectedPackages([]);
                    }}
                    sx={{ height: "100%" }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {framework.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {framework.description}
                      </Typography>
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
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      setSelectedBuilder(builder);
                      setSelectedPackages([]);
                    }}
                    sx={{ height: "100%" }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {builder.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {builder.description}
                      </Typography>
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
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
                        setSelectedPackages((prev) =>
                          prev.some((p) => p.id === pkg.id)
                            ? prev.filter((p) => p.id !== pkg.id)
                            : [...prev, pkg]
                        );
                      }}
                      sx={{ height: "100%" }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
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
                          label={pkg.version}
                          size="small"
                          variant="outlined"
                        />
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

      case 4:
        return (
          <Stack spacing={3}>
            <TextField
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
              multiline
              rows={2}
            />

            <TextField
              label="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={10}
              fullWidth
              required
            />
          </Stack>
        );

      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return !selectedPlatform;
      case 1:
        return !selectedFramework;
      case 2:
        return !selectedBuilder;
      case 3:
        return false; // 패키지는 선택 사항
      case 4:
        return !title || !description || !content;
      default:
        return true;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        프롬프트 공유
      </Typography>

      <Stepper
        activeStep={activeStep}
        sx={{
          mb: 4,
          "& .MuiStep-root": { flex: 1 },
          "& .MuiStepLabel-root": {
            whiteSpace: "nowrap",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
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
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={isNextDisabled()}
              >
                저장하기
              </Button>
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
        </form>
      </Paper>
    </Box>
  );
};

export default CreateRulePage;
