/* eslint-disable @next/next/no-img-element */
import { memo, useMemo } from "react";
import { IoGameController } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../../components/Badge/Badge";
import Box from "../../components/Box/Box";
import Center from "../../components/Center/Center";
import Hstack from "../../components/Hstack/Hstack";
import RouteLink from "../../components/RouteLink/RouteLink";
import Spinner from "../../components/Spinner/Spinner";
import Text from "../../components/Text/Text";
import Vstack from "../../components/Vstack/Vstack";
import { clearSearchResults, selectSearchData, selectStatus } from "../../features/searchSlice/searchSlice";
import styles from "./SearchResult.module.scss";

const SearchResult = () => {
	const data = useSelector(selectSearchData);
	const status = useSelector(selectStatus);
	const dispatch = useDispatch();

	function closeResults() {
		dispatch(clearSearchResults());
	}

	const dataShowcase = useMemo(
		() =>
			data.map(({ id, name, slug, rating, background_image }) => (
				<Hstack key={id} as="li" className={styles.listItem}>
					<Hstack>
						{background_image ? (
							<img className={styles.poster} src={background_image} alt={name} />
						) : (
							<Center className={styles.poster}>
								<IoGameController />
							</Center>
						)}
						<RouteLink href={`/game/${slug}`} onClick={closeResults}>
							{name}
						</RouteLink>
					</Hstack>
					<Badge>{rating.toFixed(2)}</Badge>
				</Hstack>
			)),
		[data],
	);

	return (
		<Box className={styles.SearchResult}>
			{status === "pending" && (
				<Center className={styles.noResponseBox}>
					<Spinner />
				</Center>
			)}
			{status === "rejected" && (
				<Center className={styles.noResponseBox}>
					<Text>An error occured</Text>
				</Center>
			)}
			{status === "fulfilled" && (
				<Vstack as="ul" className={styles.list}>
					{dataShowcase}
				</Vstack>
			)}
		</Box>
	);
};

export default memo(SearchResult);
