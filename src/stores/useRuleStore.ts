import { create } from "zustand";
import type { RuleStore, Builder } from "@/types/Rule.types";
import {
  mockRules,
  platforms,
  frameworks,
  packages,
  builders,
} from "@/mocks/rules";

const useRuleStore = create<RuleStore>((set, get) => ({
  rules: mockRules,
  filteredRules: mockRules,
  platforms,
  frameworks,
  builders,
  packages,
  selectedPlatform: null,
  selectedFramework: null,
  selectedBuilder: null,
  selectedPackages: [],
  searchQuery: "",
  isLoading: false,
  error: null,
  selectedRule: null,

  setSelectedRule: (rule) => set({ selectedRule: rule }),

  setSelectedPlatform: (platform) => {
    set({
      selectedPlatform: platform,
      selectedFramework: null,
      selectedBuilder: null,
      selectedPackages: [],
      filteredRules: get().rules.filter((rule) =>
        platform ? rule.platform.id === platform.id : true
      ),
    });
  },

  setSelectedFramework: (framework) => {
    set({
      selectedFramework: framework,
      selectedBuilder: null,
      selectedPackages: [],
      filteredRules: get().rules.filter(
        (rule) =>
          (get().selectedPlatform
            ? rule.platform.id === get().selectedPlatform?.id
            : true) && (framework ? rule.framework.id === framework.id : true)
      ),
    });
  },

  setSelectedBuilder: (builder: Builder | null) => {
    set({
      selectedBuilder: builder,
      selectedPackages: [],
      filteredRules: get().rules.filter(
        (rule) =>
          (get().selectedPlatform
            ? rule.platform.id === get().selectedPlatform?.id
            : true) &&
          (get().selectedFramework
            ? rule.framework.id === get().selectedFramework?.id
            : true) &&
          (builder ? rule.builder.id === builder.id : true)
      ),
    });
  },

  togglePackage: (pkg) => {
    set((state) => {
      const isSelected = state.selectedPackages.some((p) => p.id === pkg.id);
      const newSelectedPackages = isSelected
        ? state.selectedPackages.filter((p) => p.id !== pkg.id)
        : [...state.selectedPackages, pkg];

      return {
        selectedPackages: newSelectedPackages,
        filteredRules: state.rules.filter(
          (rule) =>
            (state.selectedPlatform
              ? rule.platform.id === state.selectedPlatform.id
              : true) &&
            (state.selectedFramework
              ? rule.framework.id === state.selectedFramework.id
              : true) &&
            (state.selectedBuilder
              ? rule.builder.id === state.selectedBuilder.id
              : true) &&
            (newSelectedPackages.length > 0
              ? newSelectedPackages.every((pkg) =>
                  rule.packages.some((p) => p.id === pkg.id)
                )
              : true)
        ),
      };
    });
  },

  fetchRules: async () => {
    try {
      set({ isLoading: true });
      // TODO: API 호출로 변경
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ rules: mockRules, filteredRules: mockRules, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  addRule: (rule) => {
    set((state) => ({
      rules: [...state.rules, rule],
      filteredRules: [...state.filteredRules, rule],
    }));
  },

  updateRule: (id, updates) => {
    set((state) => {
      const updatedRules = state.rules.map((rule) =>
        rule.id === id ? { ...rule, ...updates } : rule
      );
      return {
        rules: updatedRules,
        filteredRules: updatedRules.filter((rule) =>
          state.selectedPlatform
            ? rule.platform.id === state.selectedPlatform.id
            : true
        ),
      };
    });
  },

  deleteRule: (id) => {
    set((state) => ({
      rules: state.rules.filter((rule) => rule.id !== id),
      filteredRules: state.filteredRules.filter((rule) => rule.id !== id),
    }));
  },

  setSearchQuery: (query) => {
    set((state) => ({
      searchQuery: query,
      filteredRules: state.rules.filter(
        (rule) =>
          (state.selectedPlatform
            ? rule.platform.id === state.selectedPlatform.id
            : true) &&
          (state.selectedFramework
            ? rule.framework.id === state.selectedFramework.id
            : true) &&
          (state.selectedBuilder
            ? rule.builder.id === state.selectedBuilder.id
            : true) &&
          (state.selectedPackages.length > 0
            ? state.selectedPackages.every((pkg) =>
                rule.packages.some((p) => p.id === pkg.id)
              )
            : true) &&
          (query
            ? rule.title.toLowerCase().includes(query.toLowerCase()) ||
              rule.description.toLowerCase().includes(query.toLowerCase()) ||
              rule.content.toLowerCase().includes(query.toLowerCase())
            : true)
      ),
    }));
  },

  clearFilters: () => {
    set({
      selectedPlatform: null,
      selectedFramework: null,
      selectedBuilder: null,
      selectedPackages: [],
      searchQuery: "",
      filteredRules: get().rules,
    });
  },
}));

export default useRuleStore;
