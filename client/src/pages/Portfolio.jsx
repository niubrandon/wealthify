import axios from "axios";
import { useEffect } from "react";
import PortfolioDonutChart from "../components/PortfolioDonutChart"; 
import PortfolioCard from "../components/PortfolioCard";
import Transactions from "../components/Transactions";

const Portfolio = (props) => {

  //const [ account, setAccount ] = useState(null)
  //use hardcoded jwt token first
  useEffect(() => {
  /*   if (!account) {
      return
    } */
    const url = "http://localhost:3000/api/accounts/4";
    const config = {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzgxMzMzNTksImlzcyI6Imlzc3Vlcl9uYW1lIiwiYXVkIjoiY2xpZW50IiwidXNlcl9pZCI6NH0.bt5pZyy7RzYDsV1TEJV66fjy5xrqsJFGnUnr-JpCB50"
      }
    }
    axios.get(url, config).then( (response) => {
      console.log(response.data);
      props.setAccount(response.data)
    }).catch((err) => {
      console.log(err)
    })

  }, [])

  const flexWrapperVertical = {
    display:'flex', 
    flexDirection:'column', 
    justifyContent:'center', 
    alignItems:'center', 
    gap:'10px'
  }

  return (
    <>
    <div style={flexWrapperVertical} >
    { props.account && <PortfolioDonutChart />}
    { props.account && <PortfolioCard account={props.account} />}
    { props.account && <Transactions account={props.account} />}
    </div>
    </>
  )
}

export default Portfolio;