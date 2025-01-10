import { createContext, useContext } from "react";
import { useLocalStorage, useJobItems } from "../lib/hooks";
import { JobItemDetails } from "../lib/types";

type BookmarkContextType = {
    bookmarkedIds: number[]; 
    handleToogleBookmark: (id: number) => void;
    bookmarkedJobItems: JobItemDetails[];
    loading: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export const BookmarkContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>('bookmarkedIds', []);
    const { jobItems: bookmarkedJobItems, loading } = useJobItems(bookmarkedIds); 

    const handleToogleBookmark = (id: number) => {
        if (bookmarkedIds.includes(id)) {
            setBookmarkedIds(prev => prev.filter(bookmarkedId => bookmarkedId !== id));
        } else {
            setBookmarkedIds(prev => [...prev, id]);
        }	
    };

    return (
        <BookmarkContext.Provider value={
            {
                bookmarkedIds, 
                handleToogleBookmark,
                bookmarkedJobItems,
                loading
            }}
        >
            {children}
        </BookmarkContext.Provider>
    );
    
};

export function useBookmarkContext() {
	const context = useContext(BookmarkContext);
	if (!context) {
		throw new Error("useBookmarkContext must be used within a BookmarkContextProvider");
	}

    return context;
}