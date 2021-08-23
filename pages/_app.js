import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import ClientRouter from "../components/ClientRouter";
import createApp from "@shopify/app-bridge";

/* function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
} */

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    fetch: authenticatedFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps, host, shopOrigin } = this.props;
    const shopHost = shopOrigin + "/admin";
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: API_KEY,
            host: Buffer.from(shopHost).toString("base64"),
            //host: host,
            shopOrigin: shopOrigin,
            forceRedirect: true,
          }}
        >
          <ClientRouter></ClientRouter>
          <MyProvider
            Component={Component}
            {...pageProps}
            shopOrigin={shopOrigin}
          />
        </Provider>
      </AppProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    //host: ctx.query.host,
    shopOrigin: ctx.query.shop,
  };
};

export default MyApp;
