import { Table } from "react-bootstrap";

const LeaderboardTable = (props) => {
  const {sortedAccounts} = props
  return (
    <Table striped condensed hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Portfolio Value</th>
          </tr>
        </thead>
        <tbody>{sortedAccounts}</tbody>
    </Table>
  )
};

export default LeaderboardTable;