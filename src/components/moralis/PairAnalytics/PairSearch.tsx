import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import NavBar from "../Misc/NavBar";
import Form from "./Form";
import PairDashboard from "./PairDashboard";
import Loader from "../Misc/Loader";
import { useData } from "../../DataContext";
import "../../custom.scss";
import { debounce } from "lodash";

const PairSearch: React.FC = () => {
  const { globalDataCache, setGlobalDataCache } = useData();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { tokenAddress } = useParams<{ tokenAddress: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const debouncedSubmit = debounce(() => {
      if (tokenAddress) {
        handleWalletSubmit(tokenAddress);
      }
    }, 300); // Adjust the delay as needed

    debouncedSubmit();

    return () => debouncedSubmit.cancel();
  }, [tokenAddress]);

  const handleWalletSubmit = async (address: string) => {
    try {
      setLoading(true);
      setError(null);
      // Use the chain and address correctly in the navigate function
      navigate(`/chain/${globalDataCache.selectedChain}/pairs/${address}`);
    } catch (err) {
      setError("Error submitting wallet address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container text-center">
        <h1>
          🔍 <br />
          Pair Analytics
        </h1>
        <div id="wallet-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              <p>
                Explore pair insights, prices, liquidity providers, and more 🔥
              </p>
              <Form
                onSubmit={handleWalletSubmit}
                loading={loading}
                placeholder={"Enter a pair address"}
                buttonText={"Search"}
              />
              {error && <div className="mt-2 text-red-500">{error}</div>}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PairSearch;
