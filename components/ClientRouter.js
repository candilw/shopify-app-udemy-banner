import { ClientRouter as AppBridgeClientRouter } from "@shopify/app-bridge-react";
import { withRouter } from "next/router";
import React from "react";

function ClientRouter(props) {
  const { router } = props;

  return <AppBridgeClientRouter history={router}></AppBridgeClientRouter>;
}

export default withRouter(ClientRouter);
