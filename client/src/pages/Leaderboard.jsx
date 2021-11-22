import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import LeaderboardTable from "../components/LeaderboardTable";

const findEmailById = (id, users) => {
  for (const user of users) {
    if (user.id === id) {
      return user.email;
    }
  }
};

const Leaderboard = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);
  //use hardcoded jwt token first
  useEffect(() => {
    const url = "http://localhost:3000/api/accounts";
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
        setAccounts(response.data.accounts);
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  accounts.sort((a, b) => b.total_balance - a.total_balance);

  const sortedAccounts = accounts.map((account) => {
    const email = findEmailById(account.user_id, users);
    return (
      <tr>
        <td>
        <Link to={`/account/${account.user_id}`}>
        {email}
        </Link>
        </td>
        <td>{account.total_balance}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Leaderboard</h1>
      <LeaderboardTable
        sortedAccounts={sortedAccounts}
      />
    </>
  );
};

export default Leaderboard;
