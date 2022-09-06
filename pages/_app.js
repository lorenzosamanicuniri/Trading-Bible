import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { Reboot } from "../styles/Reboot";
import { Typography } from "../styles/Typography";
import client from "../apollo-client";
import store from "../state/store";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Reboot />
        <Typography />
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
