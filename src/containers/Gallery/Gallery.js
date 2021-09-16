import { memo, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/Box/Box";
import GameCard from "../../components/GameCard/GameCard";
import Grid from "../../components/Grid/Grid";
import { addGames, selectGames, selectNextUrl } from "../../features/gamesSlice/gamesSlice";
import styles from "./Gallery.module.scss";

const Gallery = () => {
	const games = useSelector(selectGames);
	const observerRef = useRef();
	const galleryRef = useRef();
	const dispatch = useDispatch();
	const nextUrl = useSelector(selectNextUrl);

	async function fetchMoreGames() {
		try {
			const res = await fetch(nextUrl);
			const data = await res.json();
			const { next, results } = data;
			dispatch(addGames({ next, results }));
		} catch (error) {
			alert("Something went wrong!");
		}
	}

	useEffect(() => {
		const gallery = galleryRef.current;
		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && nextUrl) {
					fetchMoreGames();
				}
			},
			{ threshold: 1 },
		);
		observerRef.current.observe(gallery);
		return () => observerRef.current.unobserve(gallery);
	}, [nextUrl]);

	const gamesGrid = useMemo(() => {
		return games?.map(({ id, ...rest }) => (
			<Box key={id} as="li">
				<GameCard {...rest} id={id} />
			</Box>
		));
	}, [nextUrl]);

	return (
		<>
			<Grid as="ul">{gamesGrid}</Grid>
			<Box ref={galleryRef} className={styles.trigger} />
		</>
	);
};

export default memo(Gallery);
