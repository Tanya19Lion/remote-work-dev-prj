import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "../contexts/BookmarkContextProvider";

type BookmarkIconProps = {
	id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
	const { bookmarkedIds, handleToogleBookmark } = useBookmarkContext()!;

	return (
		<button 
			onClick={(e) => {
					handleToogleBookmark(id);
					e.stopPropagation();
					e.preventDefault();
				}
			}  
			className="bookmark-btn"
		>
			<BookmarkFilledIcon className={`${bookmarkedIds.includes(id) ? 'filled' : ''}`} />
		</button>
	);
}


