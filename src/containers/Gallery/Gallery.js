import { useRouter } from "next/dist/client/router";
import { memo, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/Box/Box";
import GameCard from "../../components/GameCard/GameCard";
import Grid from "../../components/Grid/Grid";
import { addGames, addScrollPosition, getGames } from "../../features/gamesSlice/gamesSlice";
import styles from "./Gallery.module.scss";

const Gallery = ({ data }) => {
	const { games, nextUrl, scrollPosition } = useSelector((state) => state.games);
	const observerRef = useRef();
	const triggerRef = useRef();
	const dispatch = useDispatch();

	const router = useRouter();

	function setScrollPosition() {
		dispatch(addScrollPosition(window.scrollY));
	}

	useEffect(() => {
		if (games.length > 0) return;
		const { next, results } = data;
		dispatch(getGames({ next, results }));
	}, []);

	useEffect(() => {
		if (scrollPosition) {
			window.scrollTo({ top: scrollPosition, behavior: "auto" });
		}
		router.events.on("routeChangeStart", setScrollPosition);
		return () => router.events.off("routeChangeStart", setScrollPosition);
	}, []);

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
		const trigger = triggerRef.current;
		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && nextUrl) {
					fetchMoreGames();
				}
			},
			{ threshold: 1 },
		);
		observerRef.current.observe(trigger);
		return () => observerRef.current.unobserve(trigger);
	}, [nextUrl]);

	const gamesGrid = useMemo(() => {
		const array = games.length > 0 ? games : data.results;
		return array.map(({ id, ...rest }) => (
			<Box key={id} as="li">
				<GameCard {...rest} id={id} />
			</Box>
		));
	}, [games]);

	return (
		<>
			<Grid as="ul">{gamesGrid}</Grid>
			<Box ref={triggerRef} className={styles.trigger} />
		</>
	);
};

export default memo(Gallery);
