# PROMPT STORE 코드 스타일 가이드라인

## 1. 파일 구조

### 디렉토리 구조

```
src/
├── components/         # 재사용 가능한 컴포넌트
│   ├── common/        # 공통 컴포넌트
│   ├── layout/        # 레이아웃 관련 컴포넌트
│   └── features/      # 기능별 컴포넌트
├── hooks/             # 커스텀 훅
├── pages/             # 페이지 컴포넌트
├── stores/            # Zustand 스토어
├── styles/            # 전역 스타일
├── types/             # TypeScript 타입 정의
├── utils/             # 유틸리티 함수
└── api/               # API 관련 코드
```

### 파일 명명 규칙

- 컴포넌트: PascalCase.tsx (예: RuleCard.tsx)
- 훅: use{Name}.ts (예: useRules.ts)
- 유틸리티: camelCase.ts (예: formatDate.ts)
- 타입: PascalCase.types.ts (예: Rule.types.ts)
- 테스트: {FileName}.test.tsx (예: RuleCard.test.tsx)
- 스타일: {FileName}.styles.ts (예: RuleCard.styles.ts)

### 임포트 순서

```typescript
// 1. React 관련
import React, { useState, useEffect } from "react";

// 2. 외부 라이브러리
import { styled } from "styled-components";
import { create } from "zustand";
import { Button } from "@mui/material";

// 3. 내부 컴포넌트
import { Header } from "@/components/common";
import { RuleCard } from "@/components/features";

// 4. 훅, 유틸리티
import { useRules } from "@/hooks";
import { formatDate } from "@/utils";

// 5. 타입
import type { Rule } from "@/types";

// 6. 스타일
import { StyledContainer } from "./styles";
```

## 2. 코드 포맷팅

### 기본 규칙

- 들여쓰기: 2칸 스페이스
- 최대 줄 길이: 100자
- 세미콜론: 필수
- 따옴표: 작은따옴표 사용
- 후행 쉼표: 사용

### 중괄호 스타일

```typescript
// 올바른 예시
if (condition) {
  doSomething();
}

// 잘못된 예시
if (condition) {
  doSomething();
}
```

### 공백 규칙

```typescript
// 올바른 예시
const foo = { a: 1, b: 2 };
if (condition) { ... }
function foo(a: string, b: number) { ... }

// 잘못된 예시
const foo={a:1,b:2};
if(condition){ ... }
function foo(a:string,b:number){ ... }
```

## 3. 네이밍 컨벤션

### 변수

- camelCase 사용
- 의미있는 이름 사용
- 약어 사용 자제

```typescript
// 올바른 예시
const userName = 'John';
const isLoading = true;
const handleSubmit = () => { ... };

// 잘못된 예시
const u = 'John';
const flag = true;
const submit = () => { ... };
```

### 컴포넌트

- PascalCase 사용
- 명사 또는 명사구 사용
- 의미와 역할을 명확히 표현

```typescript
// 올바른 예시
const RuleCard: React.FC = () => { ... };
const UserProfile: React.FC = () => { ... };
const NavigationBar: React.FC = () => { ... };

// 잘못된 예시
const rule: React.FC = () => { ... };
const profile: React.FC = () => { ... };
const nav: React.FC = () => { ... };
```

### 타입/인터페이스

- PascalCase 사용
- 접미사로 용도 표시
- Props는 컴포넌트 이름 + Props

```typescript
// 타입/인터페이스
interface RuleCardProps {
  rule: Rule;
  onEdit?: (id: string) => void;
}

type RuleStatus = "draft" | "published" | "archived";

// 스토어 상태
interface RuleStore {
  rules: Rule[];
  isLoading: boolean;
  error: Error | null;
}
```

## 4. TypeScript 가이드라인

### 타입 정의

```typescript
// 인터페이스 사용 (객체)
interface Rule {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  status: RuleStatus;
}

// 타입 별칭 사용 (유니온, 인터섹션)
type RuleStatus = "draft" | "published" | "archived";
type RuleWithMeta = Rule & { metadata: Record<string, unknown> };
```

### 제네릭 사용

```typescript
// API 응답 타입
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 커스텀 훅
function useAsync<T>(
  asyncFn: () => Promise<T>,
  deps: DependencyList = []
): { data: T | null; loading: boolean; error: Error | null } {
  // ...
}
```

### Null 처리

```typescript
// 옵셔널 체이닝 사용
const title = rule?.title ?? "Untitled";

// 타입 가드 사용
function isRule(value: unknown): value is Rule {
  return (
    typeof value === "object" &&
    value !== null &&
    "title" in value &&
    "content" in value
  );
}
```

## 5. 컴포넌트 가이드라인

### 컴포넌트 구조

```typescript
interface RuleCardProps {
  rule: Rule;
  onEdit?: (id: string) => void;
}

export const RuleCard: React.FC<RuleCardProps> = ({ rule, onEdit }) => {
  // 1. 상태 및 훅
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoading } = useRuleStore();

  // 2. 메모이제이션
  const handleEdit = useCallback(() => {
    onEdit?.(rule.id);
  }, [onEdit, rule.id]);

  // 3. 이펙트
  useEffect(() => {
    // ...
  }, [rule.id]);

  // 4. 핸들러
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 5. 렌더 헬퍼
  const renderContent = () => {
    if (isLoading) return <Spinner />;
    return <p>{rule.content}</p>;
  };

  // 6. 렌더
  return (
    <StyledCard onClick={handleExpand}>
      <h2>{rule.title}</h2>
      {isExpanded && renderContent()}
      <Button onClick={handleEdit}>Edit</Button>
    </StyledCard>
  );
};
```

### 스타일 정의

```typescript
// RuleCard.styles.ts
import styled from "styled-components";

export const StyledCard = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;
```

## 6. 문서화 표준

### JSDoc 주석

````typescript
/**
 * .cursorrules 파일의 내용을 표시하는 카드 컴포넌트
 *
 * @example
 * ```tsx
 * <RuleCard
 *   rule={ruleData}
 *   onEdit={handleEdit}
 * />
 * ```
 *
 * @param props.rule - 표시할 규칙 데이터
 * @param props.onEdit - 편집 버튼 클릭 핸들러
 */
````

### README 구조

```markdown
# 컴포넌트/모듈 이름

## 개요

간단한 설명

## 사용법

코드 예시

## Props/매개변수

상세 설명

## 주의사항

특이사항 기술
```

## 7. 테스트 표준

### 테스트 구조

```typescript
describe("RuleCard", () => {
  // 1. 설정
  const mockRule = {
    id: "1",
    title: "Test Rule",
    content: "Test Content",
  };

  // 2. 테스트 케이스
  it("renders correctly", () => {
    render(<RuleCard rule={mockRule} />);
    expect(screen.getByText("Test Rule")).toBeInTheDocument();
  });

  it("handles edit click", () => {
    const onEdit = jest.fn();
    render(<RuleCard rule={mockRule} onEdit={onEdit} />);
    fireEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith("1");
  });
});
```

## 8. 상태 관리 (Zustand)

### 스토어 정의

```typescript
interface RuleStore {
  rules: Rule[];
  isLoading: boolean;
  error: Error | null;
  fetchRules: () => Promise<void>;
  addRule: (rule: Rule) => void;
}

const useRuleStore = create<RuleStore>((set) => ({
  rules: [],
  isLoading: false,
  error: null,
  fetchRules: async () => {
    try {
      set({ isLoading: true });
      const rules = await api.getRules();
      set({ rules, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
  addRule: (rule) =>
    set((state) => ({
      rules: [...state.rules, rule],
    })),
}));
```

## 9. Git 워크플로우

### 브랜치 명명

- feature/기능명
- bugfix/버그명
- hotfix/긴급수정명
- release/버전

### 커밋 메시지

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드
chore: 빌드 업무 수정
```

## 10. 보안 가이드라인

### 환경 변수

```typescript
// .env
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_KEY=your-api-key

// 사용
const apiUrl = process.env.REACT_APP_API_URL;
```

### API 보안

```typescript
// api/client.ts
const api = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },

  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, { headers: this.headers });
    if (!response.ok) throw new Error("API Error");
    return response.json();
  },
};
```

## 11. 성능 최적화

### 컴포넌트 최적화

```typescript
// 메모이제이션
const MemoizedRuleCard = React.memo(RuleCard);

// 지연 로딩
const RuleEditor = lazy(() => import("./RuleEditor"));

// 가상화
import { VirtualList } from "react-window";
```

### 이미지 최적화

```typescript
const optimizedImage = {
  loading: "lazy",
  srcSet: `
    /images/rule-small.jpg 300w,
    /images/rule-medium.jpg 600w,
    /images/rule-large.jpg 900w
  `,
  sizes: "(max-width: 300px) 100vw, 50vw",
};
```

## 도구 설정

### ESLint 설정

```json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

### Prettier 설정

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

### VS Code 설정

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
