import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DownloadIcon from "@mui/icons-material/Download";
import type { Rule } from "@/types/Rule.types";

interface RuleCardProps {
  rule: Rule;
}

const RuleCard = ({ rule }: RuleCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rules/${rule.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
        },
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={rule.author.avatar}
            alt={rule.author.name}
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Typography variant="subtitle2" color="text.secondary">
            {rule.author.name}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 2,
          }}
        >
          {rule.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {rule.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={rule.platform.name}
            size="small"
            variant="outlined"
            sx={{ mr: 0.5, mb: 0.5 }}
          />
          <Chip
            label={rule.framework.name}
            size="small"
            variant="outlined"
            sx={{ mr: 0.5, mb: 0.5 }}
          />
          {rule.packages.map((pkg) => (
            <Chip
              key={pkg.id}
              label={pkg.name}
              size="small"
              variant="outlined"
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" sx={{ mr: 0.5, color: "text.secondary" }}>
              <ThumbUpIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {rule.likes}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" sx={{ mr: 0.5, color: "text.secondary" }}>
              <DownloadIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {rule.downloads}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          onClick={handleClick}
          sx={{
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(0, 188, 212, 0.08)",
            },
          }}
        >
          자세히 보기
        </Button>
      </CardActions>
    </Card>
  );
};

export default RuleCard; 