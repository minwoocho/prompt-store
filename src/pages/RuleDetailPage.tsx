import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  Paper,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useRuleStore from "@/stores/useRuleStore";

const RuleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { rules } = useRuleStore();
  const rule = rules.find((r) => r.id === id);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!rule) {
      navigate("/");
    }
  }, [rule, navigate]);

  if (!rule) {
    return null;
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        돌아가기
      </Button>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar
          src={rule.author.avatar}
          alt={rule.author.name}
          sx={{ mr: 2 }}
        />
        <Box>
          <Typography variant="h4" component="h1">
            {rule.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            작성자: {rule.author.name}
          </Typography>
        </Box>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {rule.description}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Chip label={rule.platform.name} sx={{ mr: 1 }} variant="outlined" />
        <Chip label={rule.framework.name} sx={{ mr: 1 }} variant="outlined" />
        {rule.packages.map((pkg) => (
          <Chip
            key={pkg.id}
            label={pkg.name}
            sx={{ mr: 1 }}
            variant="outlined"
          />
        ))}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label=".cursorrules" />
          <Tab label="PRD.md" />
          <Tab label="PROGRESS.md" />
          <Tab label="CODE_STYLE.md" />
        </Tabs>
      </Box>

      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={() => {
            const content =
              activeTab === 0
                ? rule.content
                : activeTab === 1
                ? `# ${rule.title} - 제품 요구사항 문서 (PRD)

## 1. 개요

### 제품 비전 및 목표

- **비전**: ${rule.description}
- **목표**:
  - 사용자 중심의 ${rule.platform.name} 애플리케이션 개발
  - 최신 기술 스택을 활용한 안정적인 서비스 구축
  - 확장 가능하고 유지보수가 용이한 아키텍처 설계

### 기술 스택

- **플랫폼**: ${rule.platform.name}
- **프레임워크**: ${rule.framework.name}
- **빌드 도구**: ${rule.builder.name}
- **주요 패키지**:
${rule.packages
  .map((pkg) => `  - ${pkg.name} (${pkg.version}): ${pkg.description}`)
  .join("\n")}`
                : activeTab === 2
                ? `# ${rule.title} - 프로젝트 진행 현황

## 프로젝트 개요

### 기본 정보

- 프로젝트 시작일: ${new Date().toISOString().split("T")[0]}
- 현재 단계: 초기 설정
- 전체 진행률: 0%
- 다음 마일스톤: 기본 기능 구현
- 현재 스프린트: Sprint 1

### 기술 스택

- 플랫폼: ${rule.platform.name}
- 프레임워크: ${rule.framework.name}
- 빌드 도구: ${rule.builder.name}
- 주요 패키지:
${rule.packages.map((pkg) => `  - ${pkg.name} v${pkg.version}`).join("\n")}`
                : `# ${rule.title} 코드 스타일 가이드

## 1. 일반 규칙

### 명명 규칙
- 변수/함수: camelCase
- 클래스/컴포넌트: PascalCase
- 상수: UPPER_SNAKE_CASE
- 타입/인터페이스: PascalCase

### 포맷팅
- 들여쓰기: 2칸 스페이스
- 최대 줄 길이: 100자
- 세미콜론: 필수
- 따옴표: 작은따옴표

## 2. ${rule.framework.name} 관련 규칙

### 컴포넌트 구조
\`\`\`typescript
// 임포트 순서
import React from 'react';
import type { FC } from 'react';
import { styled } from 'styled-components';

// 타입 정의
interface Props {
  // ...
}

// 스타일 컴포넌트
const StyledComponent = styled.div\`
  // ...
\`;

// 컴포넌트 구현
export const Component: FC<Props> = () => {
  return (
    // ...
  );
};
\`\`\`

### 패키지 사용 규칙
${rule.packages
  .map(
    (pkg) => `
#### ${pkg.name}
- 버전: ${pkg.version}
- 사용 목적: ${pkg.description}
- 주요 규칙:
  - 일관된 사용 패턴 유지
  - 성능 고려사항 준수
  - 타입 안정성 확보`
  )
  .join("\n")}`;
            handleCopyToClipboard(content);
          }}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <ContentCopyIcon />
        </IconButton>

        <Paper
          sx={{
            p: 3,
            mb: 3,
            bgcolor: "transparent",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            color: "text.primary",
          }}
        >
          {activeTab === 0
            ? rule.content
            : activeTab === 1
            ? `# ${rule.title} - 제품 요구사항 문서 (PRD)

## 1. 개요

### 제품 비전 및 목표

- **비전**: ${rule.description}
- **목표**:
  - 사용자 중심의 ${rule.platform.name} 애플리케이션 개발
  - 최신 기술 스택을 활용한 안정적인 서비스 구축
  - 확장 가능하고 유지보수가 용이한 아키텍처 설계

### 기술 스택

- **플랫폼**: ${rule.platform.name}
- **프레임워크**: ${rule.framework.name}
- **빌드 도구**: ${rule.builder.name}
- **주요 패키지**:
${rule.packages
  .map((pkg) => `  - ${pkg.name} (${pkg.version}): ${pkg.description}`)
  .join("\n")}`
            : activeTab === 2
            ? `# ${rule.title} - 프로젝트 진행 현황

## 프로젝트 개요

### 기본 정보

- 프로젝트 시작일: ${new Date().toISOString().split("T")[0]}
- 현재 단계: 초기 설정
- 전체 진행률: 0%
- 다음 마일스톤: 기본 기능 구현
- 현재 스프린트: Sprint 1

### 기술 스택

- 플랫폼: ${rule.platform.name}
- 프레임워크: ${rule.framework.name}
- 빌드 도구: ${rule.builder.name}
- 주요 패키지:
${rule.packages.map((pkg) => `  - ${pkg.name} v${pkg.version}`).join("\n")}`
            : `# ${rule.title} 코드 스타일 가이드

## 1. 일반 규칙

### 명명 규칙
- 변수/함수: camelCase
- 클래스/컴포넌트: PascalCase
- 상수: UPPER_SNAKE_CASE
- 타입/인터페이스: PascalCase

### 포맷팅
- 들여쓰기: 2칸 스페이스
- 최대 줄 길이: 100자
- 세미콜론: 필수
- 따옴표: 작은따옴표

## 2. ${rule.framework.name} 관련 규칙

### 컴포넌트 구조
\`\`\`typescript
// 임포트 순서
import React from 'react';
import type { FC } from 'react';
import { styled } from 'styled-components';

// 타입 정의
interface Props {
  // ...
}

// 스타일 컴포넌트
const StyledComponent = styled.div\`
  // ...
\`;

// 컴포넌트 구현
export const Component: FC<Props> = () => {
  return (
    // ...
  );
};
\`\`\`

### 패키지 사용 규칙
${rule.packages
  .map(
    (pkg) => `
#### ${pkg.name}
- 버전: ${pkg.version}
- 사용 목적: ${pkg.description}
- 주요 규칙:
  - 일관된 사용 패턴 유지
  - 성능 고려사항 준수
  - 타입 안정성 확보`
  )
  .join("\n")}`}
        </Paper>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<ThumbUpIcon />}
          onClick={() => {
            /* TODO: Implement like functionality */
          }}
        >
          좋아요 ({rule.likes})
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DownloadIcon />}
          onClick={() => {
            /* TODO: Implement download functionality */
          }}
        >
          다운로드 ({rule.downloads})
        </Button>
      </Box>
    </div>
  );
};

export default RuleDetailPage;
