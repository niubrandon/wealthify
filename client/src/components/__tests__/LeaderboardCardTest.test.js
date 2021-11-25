import React from "react";
import LeaderboardCard from "../LeaderboardCard";

import {MemoryRouter} from 'react-router-dom'
import { render, cleanup, fireEvent } from "@testing-library/react";


afterEach(cleanup);

describe("Leaderboard", () => {
  const accounts = [
    {
    "id": 2,
    "cash_balance": 1770,
    "stock_balance": 8232.6597,
    "total_balance": 10002.6597,
    "created_at": "2021-11-24T17:53:02.292Z",
    "updated_at": "2021-11-24T19:42:22.320Z",
    "user_id": 2,
    "referral_bonus": 0,
    "signup_bonus": false
    },
    {
    "id": 4,
    "cash_balance": 5.5,
    "stock_balance": 10095.5401,
    "total_balance": 10101.0401,
    "created_at": "2021-11-24T17:53:02.389Z",
    "updated_at": "2021-11-24T19:42:22.326Z",
    "user_id": 4,
    "referral_bonus": 0,
    "signup_bonus": false
    },
    {
    "id": 1,
    "cash_balance": 2000,
    "stock_balance": 9540.043,
    "total_balance": 11540.043,
    "created_at": "2021-11-24T17:53:02.212Z",
    "updated_at": "2021-11-24T19:42:22.331Z",
    "user_id": 1,
    "referral_bonus": 0,
    "signup_bonus": false
    },
    {
    "id": 3,
    "cash_balance": 4515,
    "stock_balance": 5409.351,
    "total_balance": 9924.350999999999,
    "created_at": "2021-11-24T17:53:02.329Z",
    "updated_at": "2021-11-24T19:42:22.335Z",
    "user_id": 3,
    "referral_bonus": 0,
    "signup_bonus": false
    }
    ]
    
    const users = [
      {
      "id": 1,
      "first_name": "wealthify",
      "last_name": "wealthify",
      "email": "admin@wealthify.com",
      "password_digest": "$2a$12$8YSWbJd/Yy5ykN.9t/Q90.SrtHX10q1j.2ougPE/x6adjrqVCDzJS",
      "created_at": "2021-11-24T17:53:02.182Z",
      "updated_at": "2021-11-24T17:53:02.182Z",
      "referral_code": "aX6b7e"
      },
      {
      "id": 2,
      "first_name": "Adriana",
      "last_name": "Calvo-Matos",
      "email": "adriana@wealthify.com",
      "password_digest": "$2a$12$8YSWbJd/Yy5ykN.9t/Q90.SrtHX10q1j.2ougPE/x6adjrqVCDzJS",
      "created_at": "2021-11-24T17:53:02.273Z",
      "updated_at": "2021-11-24T17:53:02.273Z",
      "referral_code": "ac6b9h"
      },
      {
      "id": 3,
      "first_name": "Aaron",
      "last_name": "Tenn",
      "email": "aaron@gmail.com",
      "password_digest": "$2a$12$8YSWbJd/Yy5ykN.9t/Q90.SrtHX10q1j.2ougPE/x6adjrqVCDzJS",
      "created_at": "2021-11-24T17:53:02.323Z",
      "updated_at": "2021-11-24T17:53:02.323Z",
      "referral_code": "hz6b9e"
      },
      {
      "id": 4,
      "first_name": "Brandon",
      "last_name": "Niu",
      "email": "niubrandon@gmail.com",
      "password_digest": "$2a$12$8YSWbJd/Yy5ykN.9t/Q90.SrtHX10q1j.2ougPE/x6adjrqVCDzJS",
      "created_at": "2021-11-24T17:53:02.383Z",
      "updated_at": "2021-11-24T17:53:02.383Z",
      "referral_code": "z16b7z"
      }
      ]

      it('should render without crashing', () => {
        render(
        <MemoryRouter>
          <LeaderboardCard accounts={accounts} users={users} />
        </MemoryRouter>
        )
      });
});