import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Header from "./Components/Header/Header";
import MintCard from "./Components/MintCard/MintCard";

function App() {
  const { isConnected, address } = useAccount();
  return (
    <div className="h-screen bg-birds bg-center bg-cover font-albraLight flex flex-col justify-center items-center ">
      <Header isConnected={isConnected} />

      {isConnected ? (
        <MintCard address={address} />
      ) : (
        <div className="flex flex-col justify-center items-center space-y-16 pt-44">
          <ConnectButton />
          <p className="text-white text-[80px] shadowText">Syncbirds</p>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
