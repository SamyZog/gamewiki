import { useEffect, useRef } from "react";
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
	const startRef = useRef(28);

	async function fetchMoreGames() {
		try {
			const res = await fetch(nextUrl);
			const data = await res.json();
			const { next, results } = data;
			dispatch(addGames({ next, results }));
			startRef.current += results.length - 1;
		} catch (error) {}
	}

	useEffect(() => {
		const gallery = galleryRef.current;
		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchMoreGames();
				}
			},
			{ threshold: 1 },
		);
		observerRef.current.observe(gallery);
		return () => observerRef.current.unobserve(gallery);
	}, [nextUrl]);

	return (
		<>
			<Grid as="ul" className={styles.Gallery}>
				{games?.map(({ id, ...rest }, i) => {
					let counter = i;
					if (counter >= startRef.current) {
						counter -= startRef.current;
					}
					return (
						<Box key={id} as="li" style={{ "--delay": `${counter++ * 100}ms` }} className={styles.listItem}>
							<GameCard {...rest} id={id} />
						</Box>
					);
				})}
			</Grid>
			<Box ref={galleryRef} className={styles.trigger} />
		</>
	);
};

export default Gallery;
