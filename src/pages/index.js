import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, selectGames } from "../features/gamesSlice/gamesSlice";
import HomeRoute from "../routes/HomeRoute/HomeRoute";

export default function Home(props) {
	const { data } = props;
	const { next, results } = data;
	const dispatch = useDispatch();
	const games = useSelector(selectGames);

	useEffect(() => {
		if (games.length > 0) return;
		dispatch(getGames({ next, results }));
	}, []);

	return (
		<>
			<HomeRoute />
		</>
	);
}

export async function getStaticProps() {
	try {
		const res = await fetch(
			`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&ordering=-released&metacritic=80,100&page_size=28`,
		);
		const data = await res.json();

		return {
			props: { data },
			revalidate: 60 * 60 * 24,
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}
