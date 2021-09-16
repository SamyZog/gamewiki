import { memo, useEffect, useRef, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import BaseButton from "../../components/BaseButton/BaseButton";
import Hstack from "../../components/Hstack/Hstack";
import Input from "../../components/Input/Input";
import { addSearchResults, clearSearchResults, selectStatus } from "../../features/searchSlice/searchSlice";
import useDebounce from "../../hooks/useDebounce";
import { useMounted } from "../../hooks/useMounted";
import SearchResult from "../SearchResult/SearchResult";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
	const [value, setValue] = useState("");
	const debouncedInput = useDebounce(value, 500);
	const inputRef = useRef();
	const searchBarRef = useRef();
	const mounted = useMounted();

	const status = useSelector(selectStatus);
	const dispatch = useDispatch();

	const { data, error } = useSWR(
		debouncedInput
			? `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search_precise=true&search=${debouncedInput}&ordering=-rating`
			: null,
	);

	function handleChange(e) {
		setValue(e.target.value);
	}

	function clearInput() {
		setValue("");
		dispatch(clearSearchResults());
	}

	function closeResults(e) {
		if (!searchBarRef.current.contains(e.target)) {
			dispatch(clearSearchResults());
		}
	}

	useEffect(() => {
		if (!mounted) {
			return;
		}
		!value.length && clearInput();
	}, [value]);

	useEffect(() => {
		debouncedInput && dispatch(addSearchResults({ data, error }));
	}, [data, error]);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	useEffect(() => {
		window.addEventListener("click", closeResults);
		return () => window.removeEventListener("click", closeResults);
	}, []);

	return (
		<Hstack ref={searchBarRef} className={styles.SearchBar}>
			<Input
				value={value}
				ref={inputRef}
				type="search"
				placeholder="Search games..."
				onChange={handleChange}
				className={styles.searchInput}
			/>
			<BaseButton className={styles.clearButton} onClick={clearInput}>
				<RiCloseFill />
			</BaseButton>
			{status && <SearchResult />}
		</Hstack>
	);
};

export default memo(SearchBar);
