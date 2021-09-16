import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Box from "../components/Box/Box";
import Spinner from "../components/Spinner/Spinner";
import { getGames } from "../features/gamesSlice/gamesSlice";
import HomeRoute from "../routes/HomeRoute/HomeRoute";

export default function Home(props) {
	const { data } = props;
	const { next, results } = data;
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		dispatch(getGames({ next, results }));
	}, []);

	if (router.isFallback) {
		return (
			<Box>
				<Spinner />
			</Box>
		);
	}

	return (
		<>
			<HomeRoute />
		</>
	);
}

export async function getStaticPaths() {
	return { paths: [], fallback: true };
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
