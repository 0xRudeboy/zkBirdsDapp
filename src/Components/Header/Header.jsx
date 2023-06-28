import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import zkIcon from "../../Assets/zkIcon.png";

const Header = ({ isConnected }) => {
  return (
    <div className="fixed top-10 right-8">
      {isConnected ? (
        <div className="flex gap-6 items-center">
          <a
            href="https://goerli.explorer.zksync.io/address/0xcC0F014Db4F0269EFc89d0a50F506884E8d0f2d0"
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
