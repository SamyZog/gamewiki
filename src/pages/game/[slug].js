import GameRoute from "../../routes/GameRoute/GameRoute";

export default function Game(props) {
	const { data } = props;
	return <GameRoute imageInfo={data} />;
}

export async function getStaticPaths(context) {
	// too many paths to pre-render, we set fallback to true https://nextjs.org/docs/basic-features/data-fetching#when-is-fallback-true-useful
	// used fallback: true over fallback: "blocking" to load the page faster from the user's perspective https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
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
			props: {},
		};
	}
}
