import { useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { JobItem, JobItemDetails } from "./types";
import handleError from "./utils";
import { BASE_URL } from "./constants";

type JobItemsAPIResponse = {
	public: boolean;
	sorted: boolean
	jobItems: JobItem[];
};
type JobItemAPIResponse = {
	public: boolean;
	jobItem: JobItemDetails;
};

async function fetchJobItems (searchText: string): Promise<JobItemsAPIResponse>;
async function fetchJobItems (activeId: number): Promise<JobItemAPIResponse>;
async function fetchJobItems (param: string | number): Promise<JobItemAPIResponse & JobItemsAPIResponse> {

	let response: Response;
	if (typeof param === "string") {
		response = await fetch(`${BASE_URL}?search=${param}`);
	} else {
		response = await fetch(`${BASE_URL}/${param}`);
	}

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.description);
	}

	const data = await response.json();
	return data;
};


export function useSearchQuery(searchText: string) {
	const { data, isInitialLoading } = useQuery(
		['job-items', searchText],	
		() => (searchText ? fetchJobItems(searchText) : null),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(searchText),
			onError: handleError,
		}	
	);

	return {
		jobItems: data?.jobItems ?? [],
		loading: isInitialLoading,
	} as const;
}

export function useJobItems(ids: number[]) {
	const results = useQueries({
		queries: ids.map(id => ({
			queryKey: ["job-item", id],
			queryFn: () => fetchJobItems(id),
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			onError: handleError,
		})),		
	});

	const loading = results.some(result => result.isLoading);
	const jobItems = results.map(result => result.data?.jobItem).filter(jobItem => jobItem !== undefined) as JobItemDetails[];
	return {
		jobItems,
		loading
	} as const;
}

export function useFetchDataWithActiveId(activeId: number | null) {
	const { data, isInitialLoading } = useQuery(
		["jobItem", activeId],
		() => (activeId ? fetchJobItems(activeId) : null),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(activeId),
			onError: handleError,
		}
	);

	return { 
		isLoading: isInitialLoading, 
		jobItem: data?.jobItem 
	} as const;
}

export function useActiveId() {	
	const [activeId, setActiveId] = useState<number | null>(null);	

	useEffect(() => {
		const handleHashChange = () => {
			const id = +window.location.hash.slice(1);
			setActiveId(id);
		}

		handleHashChange();
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	return activeId;
}

export function useDebounce<T>(value: T, delay: number = 1000): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timerId = setTimeout(() => setDebouncedValue(value), delay);		

		return () => clearTimeout(timerId);	
	}, [value, delay]);

	return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, setValue] = useState(JSON.parse(localStorage.getItem(key) || JSON.stringify([initialValue])));

	
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);	

	return [value, setValue] as const; 
}