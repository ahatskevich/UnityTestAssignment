import {makeAutoObservable, runInAction, toJS} from 'mobx';
import { RootStore } from './RootStore';
import {Employee} from "@/types/entities";
import {filtersToPropertiesMap} from "@/utils";


export class EmployeeStore {
    employees: Employee[] = [];
    isLoading: boolean = true;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            rootStore: false
        });
    }

    async fetchEmployees() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/employees`);
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            runInAction(() => {
                console.log(data)
                this.employees = data;
                this.isLoading = false;
            });
        } catch (error) {
            console.error('Error fetching employees:', error);
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    get filteredEmployees() {
        const {filterStore} = this.rootStore;
        const result = !filterStore.hasActiveFilters()
            ? this.employees
            : this.employees.filter(employee => {
                return Object.entries(filterStore.selectedFilters).every(([category, selectedIds]) => {
                    if (selectedIds.size === 0) return true;

                    const employeeValue = employee[filtersToPropertiesMap[category.toLowerCase() as keyof typeof filtersToPropertiesMap] as keyof Employee];
                    console.log(employeeValue);
                    return Array.from(selectedIds).some(id => id === employeeValue);
                });
            });
        return result;
    }

}