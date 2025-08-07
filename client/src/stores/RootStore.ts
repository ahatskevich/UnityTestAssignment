import {FilterStore} from './FilterStore';
import {EmployeeStore} from "@/stores/EmployeeStore";

export class RootStore {
    filterStore: FilterStore;
    employeeStore: EmployeeStore;

    constructor() {
        this.filterStore = new FilterStore(this);
        this.employeeStore = new EmployeeStore(this);
    }
}

export const rootStore = new RootStore();

export const filterStore = rootStore.filterStore;
export const employeeStore = rootStore.employeeStore;