import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { useSearchQuery, useDebounce } from "../lib/hooks";
import { DEFAULT_PAGE_SIZE } from "../lib/constants";
import { JobItem, SortByValue } from "../lib/types";
import { Toaster } from "react-hot-toast";

function App() {
	const [searchText, setSearchText] = useState("");
	const [currentPage, setCurrentPage] = useState(1);	
	const [sortBy, setSortBy] = useState<SortByValue>('relevant');


	const debouncedSearchText = useDebounce<string>(searchText, 500);
	const { loading, jobItems } = useSearchQuery(debouncedSearchText);

	const totalNumberOfResults = jobItems.length;

	const jobItemsSorted = [...jobItems]?.sort((a: JobItem, b: JobItem) => {
		if (sortBy === 'relevant') {
			return b.relevanceScore - a.relevanceScore;
		} else {
			return a.daysAgo - b.daysAgo;
		} 
	});
	const jobItemsSortedAndSliced = jobItemsSorted.slice((currentPage - 1) * DEFAULT_PAGE_SIZE, currentPage * DEFAULT_PAGE_SIZE);

	const handleSortByChange = (newSortBy: SortByValue) => {
		setCurrentPage(1);
		setSortBy(newSortBy);
	};

	return ( 
		<>
			<Background />
			<Header searchText={searchText} setSearchText={setSearchText}/>
			<Container 
				loading={loading} 
				jobItems={jobItemsSortedAndSliced} 
				totalNumberOfResults={totalNumberOfResults} 
				currentPage={currentPage}
				onSetCurrentPage={setCurrentPage}
				sortBy={sortBy}
				handleSortByChange={handleSortByChange}
			/>
			<Footer />

			<Toaster position="top-center"/>
		</>
	);
}

export default App;
