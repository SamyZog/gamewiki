import { Provider } from "react-redux";
import Header from "../containers/Header/Header";
import Layout from "../containers/Layout/Layout";
import store from "../features/store";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Header />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
