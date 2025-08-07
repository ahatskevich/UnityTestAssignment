import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { RootStore } from './RootStore';
import {FiltersMap} from "@/types/entities";

export class FilterStore {
    filters: FiltersMap = {};
    selectedFilters: Record<string, Set<number>> = {};
    isLoading: boolean = true;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            rootStore: false
        });
    }

    toggleFilter(category: string, filterId: number) {
        if (!this.selectedFilters[category]) {
            this.selectedFilters[category] = new Set();
        }

        if (this.selectedFilters[category].has(filterId)) {
            this.selectedFilters[category].delete(filterId);
        } else {
            this.selectedFilters[category].add(filterId);
        }
    }

    isFilterSelected(category: string, filterId: number): boolean {
        return this.selectedFilters[category]?.has(filterId) || false;
    }

    hasActiveFilters(): boolean {
        return Object.values(this.selectedFilters).some(set => set.size > 0);
    }

    async fetchFilters() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/filters`);
            if (!response.ok) {
                throw new Error('Failed to fetch filters');
            }
            const data = await response.json();
            runInAction(() => {
                this.filters = data;
                Object.keys(data).forEach(category => {
                    this.selectedFilters[category] = new Set();
                });
                this.isLoading = false;
            });
        } catch (error) {
            console.error('Error fetching filters:', error);
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}