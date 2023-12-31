import React, { useState, useEffect } from "react";
import birdGif from "../../Assets/birds.gif";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  useBalance,
} from "wagmi";
import { syncBirdsContract } from "../../Utils/constant";
import { NotifyError, NotifyPending, NotifySuccess } from "../Notify/Notify";
import { toast } from "react-toastify";
import { ReactComponent as Eth } from "../../Assets/eth.svg";

const MintCard = ({ address }) => {
  const [mintAmount, setMintAmount] = useState(0);
  const [value, setValue] = useState("0");
  const [maxMinted, setMaxMinted] = useState(false);
  let toastId = React.useRef(null);

  // ====================== 💰 PRICING 💰 =======================
  useEffect(() => {
    setValue((mintAmount * 0.001).toFixed(3).toString());
  }, [mintAmount]);

  // ============================ 📝 CONTRACT WRITES 📝 =============================
  const { config } = usePrepareContractWrite({
    ...syncBirdsContract,
    functionName: "mint",
    args: [mintAmount],
    overrides: { value: ethers.utils.parseEther(value) },
  });

  const {
    write: Mint,
    data: mintData,
    isSuccess: isMintStarted,
  } = useContractWrite(config);

  const { isSuccess: txSuccess } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  // ============================ 📚 CONTRACT READS 📚 =============================
  const { data, refetch } = useContractRead({
    ...syncBirdsContract,
    functionName: "totalSupply",
    onSuccess(data) {
      if (data >= 10000) {
        setMaxMinted(true);
      } else setMaxMinted(false);
    },
  });
  const {
    data: balanceData,
    // refetch: fetchBalance
  } = useBalance({
    address: address,
    // watch: true,
  });

  // ========================== ➖ DECREMENT / INCREMENT ➕ ===========================
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount < 100) {
      setMintAmount(mintAmount + 1);
    }
  };

  // ========================== 🔄 PROCESSING & HANDLING 🛠 ===========================
  useEffect(() => {
    if (isMintStarted) {
      pendingMint();
    }
  }, [isMintStarted]);

  useEffect(() => {
    if (txSuccess) {
      const fetchData = async () => {
        await refetch();
        successfullyMinted();
        setMintAmount(0);
      };
      fetchData();
    }
  }, [txSuccess]);

  // ================ 🍞 TOAST / CHECKOUT 🛒 =================
  const checkOut = () => {
    if (balanceData.formatted < value) {
      NotifyError("Insufficient Funds !");
    } else {
      Mint?.();
    }
  };

  const pendingMint = () => {
    toastId.current = NotifyPending("Mint Processing");
  };

  const successfullyMinted = () => {
    toast.dismiss(toastId.current);
    toastId.current = NotifySuccess("Mint Successful !");
  };

  console.log(value);

  return (
    <div className=" flex flex-col justify-center items-center text-white pt-10 tab:pt-0">
      <p className="tab:pb-4 text-[40px] tab:text-[50px] shadowText text-[#00FFFF] shadowTextPurple font-albraMed">
        {data?.toString() ?? 0} / 10 000
      </p>
      <img
        src={birdGif}
        alt="SyncBirds"
        className="h-[300px] tab:h-[400px] rounded-2xl boxShadow"
      />
      <div className="text-[80px] tab:text-[100px] w-full flex justify-between items-center font-albraMed">
        <button
          onClick={handleDecrement}
          className="hover:scale-105 duration-300 w-[60px] h-[60px] tab:w-[75px] tab:h-[75px]   bg-[#4c33e9] boxShadow2 flex justify-center items-center rounded-lg  border border-[#00FFFF] mt-[12px] "
        >
          <p className="pl-0.5 text-[70px] text-[#00FFFF]">-</p>
        </button>

        <p className="w-[60px] flex justify-center pt-4 shadowText">
          {mintAmount}
        </p>

        <button
          onClick={handleIncrement}
          className=" hover:scale-105 duration-300 w-[60px] h-[60px] tab:w-[75px] tab:h-[75px]   bg-[#4c33e9] boxShadow2 flex justify-center items-center rounded-lg  border border-[#00FFFF] 
          mt-[12px]"
        >
          <p className="pl-0.5 text-[70px] text-[#00FFFF]">+</p>
        </button>
      </div>

      <div className="flex justify-between w-full px-4 pb-2 text-[20px] font-albraMed shadowTextPurple">
        <p>TOTAL :</p>
        <div className="flex items-center ">
          {mintAmount === 0 ? "0" : value}

          <Eth className="h-8 pb-0.5" />
        </div>
      </div>

      <button
        disabled={maxMinted}
        onClick={checkOut}
        className="w-full h-[55px] tab:h-[65px] bg-[#4c33e9] rounded-xl font-albraMed flex justify-center items-center cursor-pointer text-[30px] tab:text-[40px] border  border-[#00FFFF] pt-2 hoverUp"
      >
        MINT !
      </button>
    </div>
  );
};

export default MintCard;
