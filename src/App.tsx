import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider, { GraphQLClient } from "@pankod/refine-hasura";
import "@pankod/refine-antd/dist/reset.css";
import {
  Layout,
  ChakraProvider,
  refineTheme,
  notificationProvider,
  ErrorComponent,
} from "@pankod/refine-chakra-ui";

import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";

// const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";
const API_URL =
  "https://lioubgleoigtjlwlojcf.hasura.sa-east-1.nhost.run/v1/graphql";
/* 
## Refine supports GraphQL subscriptions as out-of-the-box. For more detailed information, please visit here, https://refine.dev/docs/core/providers/live-provider/

const WS_URL = "ws://flowing-mammal-24.hasura.app/v1/graphql";

const gqlWebSocketClient = graphqlWS.createClient({
    url: WS_URL,
});
 */
const client = new GraphQLClient(API_URL, {
  headers: {
    "x-hasura-role": "public",
    // "x-hasura-admin-secret": "659ae0c24f9b6eb47832c7b757d6acbe",
  },
});

const gqlDataProvider = dataProvider(client);

const App: React.FC = () => {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={gqlDataProvider}
        // ## Refine supports GraphQL subscriptions as out-of-the-box. For more detailed information, please visit here, https://refine.dev/docs/core/providers/live-provider/
        //liveProvider={liveProvider(gqlWebSocketClient)}
        //options={{ liveMode: "auto" }}
        resources={[
          {
            name: "basic_users",
            list: ChakraUIInferencer,
            // show: ChakraUIInferencer,
            // create: ChakraUIInferencer,
            // edit: ChakraUIInferencer,
          },
          // {
          //   name: "categories",
          //   list: CategoriesList,
          //   create: CategoriesCreate,
          //   edit: CategoriesEdit,
          // },
        ]}
        notificationProvider={notificationProvider()}
        Layout={Layout}
        catchAll={<ErrorComponent />}
      />
    </ChakraProvider>
  );
};

export default App;
