export interface Rule {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  status: RuleStatus;
  author: Author;
  platform: Platform;
  framework: Framework;
  builder: Builder;
  packages: Package[];
  likes: number;
  downloads: number;
}

export type RuleStatus = "draft" | "published" | "archived";

export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Platform {
  id: string;
  name: string;
  description: string;
  type: PlatformType;
  icon: string;
}

export type PlatformType = "web" | "mobile" | "desktop" | "server" | "embedded";

export interface Framework {
  id: string;
  name: string;
  description: string;
  platformId: string;
  icon: string;
}

export interface Builder {
  id: string;
  name: string;
  description: string;
  frameworkId: string;
  icon: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  version: string;
  builderId: string;
  icon: string;
}

export interface RuleStore {
  rules: Rule[];
  filteredRules: Rule[];
  platforms: Platform[];
  frameworks: Framework[];
  builders: Builder[];
  packages: Package[];
  selectedPlatform: Platform | null;
  selectedFramework: Framework | null;
  selectedBuilder: Builder | null;
  selectedPackages: Package[];
  searchQuery: string;
  isLoading: boolean;
  error: Error | null;
  selectedRule: Rule | null;

  setSelectedRule: (rule: Rule | null) => void;
  setSelectedPlatform: (platform: Platform | null) => void;
  setSelectedFramework: (framework: Framework | null) => void;
  setSelectedBuilder: (builder: Builder | null) => void;
  togglePackage: (pkg: Package) => void;
  fetchRules: () => Promise<void>;
  addRule: (rule: Rule) => void;
  updateRule: (id: string, updates: Partial<Rule>) => void;
  deleteRule: (id: string) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}
