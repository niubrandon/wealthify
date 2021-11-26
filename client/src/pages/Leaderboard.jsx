import axios from "axios";
import React, { useEffect, useState } from "react";
import LeaderboardCard from "../components/LeaderboardCard";
import '../styles/pages/leaderboard.scss';

const Leaderboard = (props) => {
  const [data, setData] = useState([]);
  //use hardcoded jwt token first
  useEffect(() => {
    const url = "http://localhost:3000/api/accounts/leaderboard";
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzgxMzMzNTksImlzcyI6Imlzc3Vlcl9uYW1lIiwiYXVkIjoiY2xpZW50IiwidXNlcl9pZCI6NH0.bt5pZyy7RzYDsV1TEJV66fjy5xrqsJFGnUnr-JpCB50",
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        console.log(response.data);
        // setAccounts(response.data.accounts);
        // setUsers(response.data.users);
        // setPortfolios(response.data.portfolios)
        setData(response.data.leaderboard)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  data.sort((a, b) => b.total_balance - a.total_balance);

  return (
    <section id="leaderboard" class='page'>
      <h1 className='leaderboard-title'>Leading on <span>Wealthify</span></h1>
      <LeaderboardCard
        data={data}
      />
    </section>
  );
};

export default Leaderboard;
