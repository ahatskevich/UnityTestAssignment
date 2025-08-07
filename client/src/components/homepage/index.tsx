"use client";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {employeeStore, filterStore} from "@/stores/RootStore";

const ShimmerFilterItem = () => (
    <div className="animate-pulse space-y-2">
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
        {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-2 mb-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
        ))}
    </div>
);

const ShimmerTableRow = () => (
    <div className="flex hover:bg-gray-200 border-b border-gray-300 animate-pulse">
        <div className="flex-1 px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="flex-1 px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="flex-1 px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="flex-1 px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
    </div>
);

const HomePage = observer(() => {
    useEffect(() => {
        filterStore.fetchFilters();
        employeeStore.fetchEmployees();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Unity Test Assignment</h1>
            <div className="flex gap-8 align-start">
                <div className="w-64 p-6 bg-gray-100 rounded-lg h-fit">
                    <div className="space-y-6">
                        {filterStore.isLoading ? (
                            <>
                                <ShimmerFilterItem />
                                <ShimmerFilterItem />
                                <ShimmerFilterItem />
                            </>
                        ) : (
                            !!filterStore.filters && Object.entries(filterStore.filters).map(([category, filters]) => (
                                <div key={category}>
                                    <h2 className="font-semibold mb-2 capitalize">{category}</h2>
                                    {filters.map((filter) => (
                                        <label key={filter.id} className="flex items-center space-x-2 mb-1">
                                            <input
                                                type="checkbox"
                                                checked={filterStore.isFilterSelected(category, filter.id)}
                                                onChange={() => filterStore.toggleFilter(category, filter.id)}
                                                className="accent-black"
                                            />
                                            <span>{filter.name}</span>
                                        </label>
                                    ))}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex-1 bg-gray-100 rounded-lg p-6 h-fit">
                    <div className="min-w-full">
                        <div className="flex font-semibold border-b border-gray-300">
                            <div className="flex-1 px-4 py-2">Employee ID</div>
                            <div className="flex-1 px-4 py-2">Country</div>
                            <div className="flex-1 px-4 py-2">Department</div>
                            <div className="flex-1 px-4 py-2">Role</div>
                        </div>

                        {employeeStore.isLoading ? (
                            <>
                                <ShimmerTableRow />
                                <ShimmerTableRow />
                                <ShimmerTableRow />
                                <ShimmerTableRow />
                                <ShimmerTableRow />
                            </>
                        ) : (
                            <>
                                {employeeStore.filteredEmployees.map((employee) => (
                                    <div key={employee.id} className="flex hover:bg-gray-200 border-b border-gray-300">
                                        <div className="flex-1 px-4 py-2">{employee.id}</div>
                                        <div className="flex-1 px-4 py-2">{employee.country}</div>
                                        <div className="flex-1 px-4 py-2">{employee.department}</div>
                                        <div className="flex-1 px-4 py-2">{employee.role}</div>
                                    </div>
                                ))}

                                {employeeStore.filteredEmployees.length === 0 && (
                                    <div className="text-center py-4 text-gray-500">
                                        No data available.
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default HomePage;