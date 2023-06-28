import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  // lightTheme,
} from "@rainbow-me/rainbowkit";
import merge from "lodash.merge";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli, zkSyncTestnet } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [zkSyncTestnet],
  // [publicProvider()]
  [
    infuraProvider({
      apiKey: "b6bf7d3508c941499b10025c0776eaf8",
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "SyncBirds",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const myTheme = merge(darkTheme(), {
  blurs: {
    modalOverlay: "small",
  },
  colors: {
    accentColor: "#4c33e9",
  },
  fonts: {
    body: "albraLight",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
