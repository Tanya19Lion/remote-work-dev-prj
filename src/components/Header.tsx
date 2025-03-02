import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

type HeaderProps = {
	searchText: string;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({ searchText, setSearchText }: HeaderProps) {
	return (
		<header className="header">
			<div className="header__top">
				<Logo />
				<BookmarksButton />
			</div>

			<SearchForm searchText={searchText} setSearchText={setSearchText}/>
		</header>
	);
}
