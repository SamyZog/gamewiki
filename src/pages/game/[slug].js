import GameRoute from "../../routes/GameRoute/GameRoute";

export default function Game(props) {
	const { data } = props;
	return <GameRoute imageInfo={data} />;
}

export async function getServerSideProps(context) {
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
