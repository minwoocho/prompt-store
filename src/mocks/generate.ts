import type {
  Platform,
  Framework,
  Builder,
  Package,
} from "@/types/Generate.types";

export const platforms: Platform[] = [
  {
    id: "web",
    name: "웹",
    type: "web",
    description: "웹 브라우저에서 실행되는 애플리케이션",
    icon: "WebAsset",
  },
  {
    id: "mobile",
    name: "모바일",
    type: "mobile",
    description: "iOS/Android 모바일 애플리케이션",
    icon: "PhoneAndroid",
  },
  {
    id: "desktop",
    name: "데스크톱",
    type: "desktop",
    description: "Windows/macOS/Linux 데스크톱 애플리케이션",
    icon: "DesktopWindows",
  },
  {
    id: "server",
    name: "서버",
    type: "server",
    description: "백엔드 서버 애플리케이션",
    icon: "Storage",
  },
];

export const frameworks: Framework[] = [
  {
    id: "react",
    name: "React",
    platformId: "web",
    description: "유연하고 효율적인 UI 라이브러리",
    icon: "Code",
  },
  {
    id: "vue",
    name: "Vue.js",
    platformId: "web",
    description: "직관적이고 현대적인 프레임워크",
    icon: "Code",
  },
  {
    id: "angular",
    name: "Angular",
    platformId: "web",
    description: "엔터프라이즈급 프레임워크",
    icon: "Code",
  },
  {
    id: "next",
    name: "Next.js",
    platformId: "web",
    description: "React 기반 풀스택 프레임워크",
    icon: "Code",
  },
  {
    id: "react-native",
    name: "React Native",
    platformId: "mobile",
    description: "크로스 플랫폼 모바일 프레임워크",
    icon: "DeveloperMode",
  },
  {
    id: "flutter",
    name: "Flutter",
    platformId: "mobile",
    description: "구글의 UI 프레임워크",
    icon: "DeveloperMode",
  },
  {
    id: "electron",
    name: "Electron",
    platformId: "desktop",
    description: "크로스 플랫폼 데스크톱 프레임워크",
    icon: "DesktopMac",
  },
  {
    id: "express",
    name: "Express",
    platformId: "server",
    description: "Node.js 웹 프레임워크",
    icon: "Storage",
  },
];

export const builders: Builder[] = [
  {
    id: "vite",
    name: "Vite",
    frameworkId: "react",
    description: "차세대 프론트엔드 빌드 도구",
    icon: "Build",
  },
  {
    id: "webpack",
    name: "Webpack",
    frameworkId: "react",
    description: "모듈 번들러",
    icon: "Build",
  },
  {
    id: "cli",
    name: "Vue CLI",
    frameworkId: "vue",
    description: "Vue.js 개발 도구",
    icon: "Build",
  },
  {
    id: "expo",
    name: "Expo",
    frameworkId: "react-native",
    description: "React Native 개발 플랫폼",
    icon: "Build",
  },
];

export const packages: Package[] = [
  {
    id: "mui",
    name: "Material-UI",
    builderId: "vite",
    description: "React UI 컴포넌트 라이브러리",
    version: "5.0.0",
    icon: "Widgets",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    builderId: "vite",
    description: "유틸리티 우선 CSS 프레임워크",
    version: "3.0.0",
    icon: "Style",
  },
  {
    id: "zustand",
    name: "Zustand",
    builderId: "vite",
    description: "간단한 상태 관리 라이브러리",
    version: "4.0.0",
    icon: "DataObject",
  },
];
