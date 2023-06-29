import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import zkIcon from "../../Assets/zkIcon.png";

const Header = ({ isConnected }) => {
  return (
    <div className="fixed top-3 tab:top-10 right-4 tab:right-8">
      {isConnected ? (
        <div className="flex gap-6 items-center">
          <a
            href="https://explorer.zksync.io/address/0xc7380fc0b0b232d57d1660362d0b5827d39a909f"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={zkIcon}
              alt="zkSync"
              className="h-[34px] border border-gray-400 rounded-md cursor-pointer hover:scale-105 duration-300"
            />
          </a>

          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
