//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Nav.scss";


const Nav = () => {
  
  //   //create initial menuCollapse state using useState hook
  //   const [menuCollapse, setMenuCollapse] = useState(false)

  //   //create a custom function that will change menucollapse state from false to true and true to false
  // const menuIconClick = () => {
  //   //condition checking to change state from true to false and vice versa
  //   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  // };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
          <SidebarHeader>
            <p>Header</p>
          </SidebarHeader>
          <SidebarContent>
            {/* <Menu iconShape="square"> */}
            <ul>
              <Link to="/">
                Home
                {/* <MenuItem icon={<FiHome />}>Home</MenuItem> */}
              </Link>
            </ul>
            <ul>
              <Link to="/stock">
                Stock
                {/* <MenuItem icon={<FaRegHeart />}>Stock</MenuItem> */}
              </Link>
            </ul>
              {/* <Link to="search">
                <MenuItem>Search</MenuItem>
              </Link> */}
              {/* <Link to="/portfolio">
                <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
              </Link>
              <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem> */}
            {/* </Menu> */}
          </SidebarContent>
          {/* <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter> */}
      </div>
    </>
  );
};

export default Nav;