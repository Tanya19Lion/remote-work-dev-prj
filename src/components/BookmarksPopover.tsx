import { forwardRef } from "react";
import JobList from "./JobList";
import { useBookmarkContext } from "../contexts/BookmarkContextProvider";

const BookmarksPopover = forwardRef<HTMLDivElement>( function(_, ref) {
	const { bookmarkedJobItems, loading } = useBookmarkContext();

	return (
		<div className="bookmarks-popover" ref={ref}>
			<JobList loading={loading} jobItems={bookmarkedJobItems}/>
		</div>
	);
} );

export default BookmarksPopover;