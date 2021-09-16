import { RiExternalLinkFill } from "react-icons/ri";
import useSWR from "swr";
import Badge from "../../components/Badge/Badge";
import BaseLink from "../../components/BaseLink/BaseLink";
import Box from "../../components/Box/Box";
import Center from "../../components/Center/Center";
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
		<Center as="section" className={styles.GameRoute}>
			<Box className={styles.content}>
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
				<Divider />
				<Vstack>
					<Box style={{ backgroundImage: `url(${background_image})` }} className={styles.sliderContainer}>
						{data && <Slider images={data.results} />}
						{error && (
							<Center>
								<Text>Failed to load images</Text>
							</Center>
						)}
					</Box>

					<Text as="h3">Description:</Text>
					<Text dangerouslySetInnerHTML={{ __html: description }}></Text>
				</Vstack>
			</Box>
		</Center>
	);
};

export default GameRoute;
