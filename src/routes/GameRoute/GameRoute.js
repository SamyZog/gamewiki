import { RiExternalLinkFill } from "react-icons/ri";
import useSWR from "swr";
import Badge from "../../components/Badge/Badge";
import BaseLink from "../../components/BaseLink/BaseLink";
import Box from "../../components/Box/Box";
import Center from "../../components/Center/Center";
import Container from "../../components/Container/Container";
import Divider from "../../components/Divider/Divider";
import Hstack from "../../components/Hstack/Hstack";
import Slider from "../../components/Slider/Slider";
import Text from "../../components/Text/Text";
import Vstack from "../../components/Vstack/Vstack";
import styles from "./GameRoute.module.scss";

const GameRoute = ({ gameInfo }) => {
	const { name, website, slug, description, background_image, released, rating } = gameInfo;

	const { data, error } = useSWR(
		`https://api.rawg.io/api/games/${slug}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`,
	);

	return (
		<Center
			as="section"
			className={styles.GameRoute}
			style={{ backgroundImage: `radial-gradient(rgba(0,0,0,0.8),var(--dark)), url(${background_image})` }}
		>
			<Container className={styles.content}>
				<Hstack>
					<Box>
						<Text as="h1" className={styles.banner}>
							{name}
						</Text>
						<Text>Release date: {released}</Text>
						<BaseLink href={website || ""} target="_blank" rel="noopener noreferrer">
							Official Website
							<RiExternalLinkFill />
						</BaseLink>
					</Box>
					<Badge>{rating.toFixed(2)}</Badge>
				</Hstack>
				<Vstack>
					<Divider />
					<Box style={{ backgroundImage: `url(${background_image})` }} className={styles.sliderContainer}>
						{data && <Slider images={data.results} />}
						{error && (
							<Center>
								<Text>Failed to load images</Text>
							</Center>
						)}
					</Box>
					<Divider />

					<Text as="h3">Description:</Text>
					<Box dangerouslySetInnerHTML={{ __html: description }} />
				</Vstack>
			</Container>
		</Center>
	);
};

export default GameRoute;
