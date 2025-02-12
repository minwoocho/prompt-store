export type PlatformType = "web" | "mobile" | "desktop" | "server";

export interface Platform {
  id: string;
  name: string;
  type: PlatformType;
  description: string;
  icon: string;
}

export interface Framework {
  id: string;
  name: string;
  platformId: string;
  description: string;
  icon: string;
}

export interface Builder {
  id: string;
  name: string;
  frameworkId: string;
  description: string;
  icon: string;
}

export interface Package {
  id: string;
  name: string;
  builderId: string;
  description: string;
  version: string;
  icon: string;
}

export interface GenerateConfig {
  projectName: string;
  projectDescription: string;
  platform: Platform | null;
  framework: Framework | null;
  builder: Builder | null;
  packages: Package[];
}

export type GenerateStep =
  | "프로젝트 설명"
  | "플랫폼 선택"
  | "프레임워크 선택"
  | "빌더 선택"
  | "패키지 선택"
  | "프롬프트 생성";

export interface GeneratedPrompt {
  prd: string;
  progress: string;
  cursorrules: string;
  codeStyle: string;
}
