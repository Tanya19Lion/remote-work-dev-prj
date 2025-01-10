import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { JobItem, SortByValue } from "../lib/types";

type SidebarProps = {
	loading: boolean;
	jobItems: JobItem[];
	totalNumberOfResults: number;
	currentPage: number;	
	onSetCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	sortBy: SortByValue;
	handleSortByChange: (newSortBy: SortByValue) => void;
};

export default function Sidebar({ loading, jobItems, totalNumberOfResults, currentPage, onSetCurrentPage, sortBy, handleSortByChange }: SidebarProps) {
    return (
		<div className="sidebar">
			<div className="sidebar__top">
				<ResultsCount totalNumberOfResults={totalNumberOfResults}/>
				<SortingControls sortBy={sortBy} handleSortByChange={handleSortByChange}/>	
			</div>

			<JobList loading={loading} jobItems={jobItems}/>
			<PaginationControls currentPage={currentPage} onSetCurrentPage={onSetCurrentPage} totalNumberOfResults={totalNumberOfResults}/>
		</div>
    );
}
