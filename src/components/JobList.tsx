import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { JobItem } from "../lib/types";
import { useActiveId } from "../lib/hooks";

type JobListProps = {
	loading: boolean;
	jobItems: JobItem[];
};

export function JobList({ loading, jobItems }: JobListProps) {
	const isActive = useActiveId();

 	return <ul className="job-list">
		{
			loading ? <Spinner /> : jobItems.map((jobItem) => <JobListItem key={jobItem.id} jobItem={jobItem} isActive={jobItem.id === isActive}/>)
		}
	</ul>;
}

export default JobList;
