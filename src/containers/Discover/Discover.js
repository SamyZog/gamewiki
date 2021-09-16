import { useRouter } from "next/dist/client/router";
import { memo, useEffect, useMemo, useRef } from "react";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import BaseButton from "../../components/BaseButton/BaseButton";
import Box from "../../components/Box/Box";
import DropDown from "../../components/DropDown/DropDown";
import Hstack from "../../components/Hstack/Hstack";
import {
	clearPlatformIds,
	clearSort,
	setFilters,
	setPlatformIds,
	setSortMethod,
} from "../../features/discoverSlice/discoverSlice";
import { getGames } from "../../features/gamesSlice/gamesSlice";
import styles from "./Discover.module.scss";

const Discover = () => {
	const router = useRouter();
	const { platforms, platformIds, sort } = useSelector((state) => state.discover);
	const dispatch = useDispatch();
	const mountedRef = useRef(true);

	const url = useMemo(() => {
		const apiUrl = `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`;
		const sortMethod = `&ordering=${sort.method}`;
		const filterMethods = `&platforms=${platformIds.join(",")}`;
		const additionalQueries = `&metacritic=80,100`;
		const defaultPageSize = `&page_size=28`;

		if (!mountedRef.current) {
			if (sort.method && platformIds.length) {
				return apiUrl + sortMethod + filterMethods + defaultPageSize;
			}
			if (sort.method) {
				return apiUrl + sortMethod + additionalQueries + defaultPageSize;
			} else {
				return apiUrl + defaultPageSize;
			}
		}
		return null;
	}, [sort.method, platformIds.length]);

	const { data } = useSWR(url);

	useEffect(() => {
		if (mountedRef.current) {
			mountedRef.current = false;
			return;
		}
		data && dispatch(getGames({ results: data.results, next: data.next }));
	}, [data]);

	useEffect(() => {
		fetch(`https://api.rawg.io/api/platforms?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&ordering=name`)
			.then((res) => res.json())
			.then((platforms) => dispatch(setFilters({ name: "platforms", filters: platforms.results })))
			.catch(() => {
				const result = window.confirm("Something went wrong, reload?");
				if (result) {
					router.reload();
				}
			});
	}, []);

	const dispatchPLatformIds = (id) => {
		dispatch(setPlatformIds(id));
	};

	const dispatchSortMethod = ({ option, method }) => {
		dispatch(setSortMethod({ option, method }));
	};

	const dispatchClearPLatformIds = () => {
		dispatch(clearPlatformIds());
	};

	const dispatchClearSort = () => {
		dispatch(clearSort());
	};

	const PlatformFilters = useMemo(() => {
		if (platforms.length) {
			return (
				<>
					<BaseButton className={styles.clearButton} onClick={dispatchClearPLatformIds}>
						Clear
						<RiCloseFill />
					</BaseButton>
					{platforms.map(({ id, name }) => {
						const included = platformIds?.includes(id);
						return (
							<Box as="li" key={id}>
								<BaseButton
									className={included ? styles.chosen : ""}
									onClick={dispatchPLatformIds.bind(null, id)}
								>
									{name}
								</BaseButton>
							</Box>
						);
					})}
				</>
			);
		}
	}, [platforms, platformIds]);

	const SortOptions = useMemo(() => {
		return (
			<>
				<BaseButton className={styles.clearButton} onClick={dispatchClearSort}>
					Clear
					<RiCloseFill />
				</BaseButton>
				{[
					{ option: "Rating High", method: "-rating" },
					{ option: "Rating Low", method: "rating" },
					{ option: "Newest", method: "-released" },
					{ option: "Oldest", method: "released" },
				].map(({ option, method }) => {
					return (
						<Box as="li" key={option}>
							<BaseButton onClick={dispatchSortMethod.bind(null, { option, method })}>
								{option}
								{sort.method === method && <RiCheckFill />}
							</BaseButton>
						</Box>
					);
				})}
			</>
		);
	}, [sort]);

	return (
		<Hstack className={styles.Discover}>
			<DropDown initialChoice={sort?.option || "sort"}>{SortOptions}</DropDown>
			<DropDown filter isLoading={!platforms} initialChoice="Platforms" choices={platformIds?.length}>
				{PlatformFilters}
			</DropDown>
		</Hstack>
	);
};

export default memo(Discover);
