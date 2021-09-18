import { useRouter } from "next/dist/client/router";
import Fallback from "../../components/Fallback/Fallback";
import GameRoute from "../../routes/GameRoute/GameRoute";

export default function Game(props) {
	const { data } = props;
	const router = useRouter();

	if (router.isFallback) {
		return <Fallback />;
	}

	return <GameRoute gameInfo={data} />;
}

export async function getStaticPaths() {
	return { paths: [], fallback: true };
}

export async function getStaticProps(context) {
	try {
		const res = await fetch(`https://api.rawg.io/api/games/${context.params.slug}?key=${process.env.RAWG_API_KEY}`);
		const data = await res.json();

		return {
			props: { data },
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}
