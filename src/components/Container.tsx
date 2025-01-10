import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";
import { JobItem, SortByValue } from "../lib/types";

type ContainerProps = {
	loading: boolean;
	jobItems: JobItem[];
	totalNumberOfResults: number;
	currentPage: number;
	onSetCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	sortBy: SortByValue;
	handleSortByChange: (newSortBy: SortByValue) => void;
};

export default function Container({ loading, jobItems, totalNumberOfResults, currentPage, onSetCurrentPage, sortBy, handleSortByChange }: ContainerProps) {
 	return (
		<div className="container">
			<Sidebar 
				loading={loading} 
				jobItems={jobItems} 
				totalNumberOfResults={totalNumberOfResults} 
				currentPage={currentPage}
				onSetCurrentPage={onSetCurrentPage}
				handleSortByChange={handleSortByChange}
				sortBy={sortBy}
			/>
			<JobItemContent />
		</div>
	);
}
