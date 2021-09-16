import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import Header from "../containers/Header/Header";
import Layout from "../containers/Layout/Layout";
import store from "../features/store";
import "../styles/main.scss";
import { fetcher } from "../utils/fetcher";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<SWRConfig
				value={{
					fetcher,
				}}
			>
				<Header />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SWRConfig>
		</Provider>
	);
}

export default MyApp;
