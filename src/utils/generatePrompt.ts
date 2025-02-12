import type { GenerateConfig, GeneratedPrompt } from "@/types/Generate.types";

export const generatePrompt = (config: GenerateConfig): GeneratedPrompt => {
  const {
    projectName,
    projectDescription,
    platform,
    framework,
    builder,
    packages,
  } = config;

  const prd = `# ${projectName} - 제품 요구사항 문서 (PRD)

## 1. 개요

### 제품 비전 및 목표

- **비전**: ${projectDescription}
- **목표**:
  - 사용자 중심의 ${platform?.name} 애플리케이션 개발
  - 최신 기술 스택을 활용한 안정적인 서비스 구축
  - 확장 가능하고 유지보수가 용이한 아키텍처 설계

### 기술 스택

- **플랫폼**: ${platform?.name}
- **프레임워크**: ${framework?.name}
- **빌드 도구**: ${builder?.name}
- **주요 패키지**:
${packages
  .map((pkg) => `  - ${pkg.name} (${pkg.version}): ${pkg.description}`)
  .join("\n")}

### 개발 범위

1. 기본 기능
   - 사용자 인증/인가
   - 기본 CRUD 작업
   - 반응형 UI 구현

2. 추가 기능
   - 데이터 캐싱
   - 오프라인 지원
   - 성능 최적화

### 품질 요구사항

- 페이지 로드 시간: < 2초
- 테스트 커버리지: > 80%
- 웹 표준 준수
- 접근성 고려`;

  const progress = `# ${projectName} - 프로젝트 진행 현황

## 프로젝트 개요

### 기본 정보

- 프로젝트 시작일: ${new Date().toISOString().split("T")[0]}
- 현재 단계: 초기 설정
- 전체 진행률: 0%
- 다음 마일스톤: 기본 기능 구현
- 현재 스프린트: Sprint 1

### 기술 스택

- 플랫폼: ${platform?.name}
- 프레임워크: ${framework?.name}
- 빌드 도구: ${builder?.name}
- 주요 패키지:
${packages.map((pkg) => `  - ${pkg.name} v${pkg.version}`).join("\n")}

## 개발 단계

### 1. 프로젝트 설정 [진행 중]

#### 완료됨
- [x] 저장소 초기화
- [x] 기술 스택 선정
- [ ] 개발 환경 구성
- [ ] 기본 프로젝트 구조 구현

#### 진행 중
- [ ] 의존성 설치 및 설정
- [ ] 초기 컴포넌트 구현

### 2. 기본 기능 개발 [대기 중]

#### 예정된 작업
- [ ] 프로젝트 구조 설정
- [ ] 컴포넌트 개발
- [ ] API 연동
- [ ] 테스트 작성`;

  const cursorrules = `# ${projectName} Cursor AI 규칙

## 1. 프로젝트 구조

### 기본 구조
\`\`\`
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # 커스텀 훅
├── utils/         # 유틸리티 함수
├── types/         # TypeScript 타입 정의
├── styles/        # 스타일 관련 파일
└── api/           # API 관련 코드
\`\`\`

### 파일 명명 규칙
- 컴포넌트: PascalCase.tsx
- 훅: use{Name}.ts
- 유틸리티: camelCase.ts
- 타입: {Name}.types.ts
- 스타일: {Name}.styles.ts

## 2. 코드 생성 규칙

### 컴포넌트 템플릿
\`\`\`typescript
interface Props {
  // 프롭 정의
}

export const Component: React.FC<Props> = ({ }) => {
  // 구현
};
\`\`\`

### 훅 템플릿
\`\`\`typescript
export const useHook = () => {
  // 구현
};
\`\`\`

## 3. 기술 스택 가이드라인

### ${framework?.name} 규칙
- 컴포넌트 설계 원칙
- 상태 관리 전략
- 성능 최적화 방안

### ${builder?.name} 설정
- 빌드 최적화
- 개발 환경 구성
- 배포 설정

### 패키지 사용 가이드
${packages.map((pkg) => `- ${pkg.name} 활용 방안 및 모범 사례`).join("\n")}`;

  const codeStyle = `# ${projectName} 코드 스타일 가이드

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

## 2. ${framework?.name} 관련 규칙

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
${packages
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

  return {
    prd,
    progress,
    cursorrules,
    codeStyle,
  };
};
