import { RiExternalLinkFill } from "react-icons/ri";
import useSWR from "swr";
import BaseLink from "../../components/BaseLink/BaseLink";
import Box from "../../components/Box/Box";
import Center from "../../components/Center/Center";
import Divider from "../../components/Divider/Divider";
import Slider from "../../components/Slider/Slider";
import Text from "../../components/Text/Text";
import Vstack from "../../components/Vstack/Vstack";
import { fetcher } from "../../utils/fetcher";
import styles from "./GameRoute.module.scss";

const GameRoute = ({ imageInfo }) => {
	const { name, website, slug, description, background_image } = imageInfo;

	const { data, error } = useSWR(
		`https://api.rawg.io/api/games/${slug}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`,
		fetcher,
	);

	console.log(data);
	console.log(imageInfo);

	return (
		<Center as="section" className={styles.GameRoute}>
			<Box className={styles.content}>
				<Text as="h1" className={styles.banner}>
					{name}
				</Text>
				<BaseLink href={website || ""} target="_blank" rel="noopener noreferrer">
					Official Website
					<RiExternalLinkFill />
				</BaseLink>
				<Divider />
				<Vstack>
					<Box style={{ backgroundImage: `url(${background_image})` }} className={styles.sliderContainer}>
						{data && <Slider images={data.results} />}
					</Box>

					<Text as="h3">Description:</Text>
					<Text dangerouslySetInnerHTML={{ __html: description }}></Text>
				</Vstack>
			</Box>
		</Center>
	);
};

export default GameRoute;
