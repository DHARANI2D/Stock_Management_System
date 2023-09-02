import '../NavBar/slidebar.css';
import Logoicon from '../icons/logo';
import { ImHome, ImUser } from "react-icons/im";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbDeviceAnalytics, TbFileInvoice, TbReceiptTax } from "react-icons/tb";
import { PiWarehouseBold } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import AiOutlineLogout from '../icons/logout'
import { IoSettings } from "react-icons/io5";

function Slidebar() {
  return (
    <div>
      <div className={`l-navbar `} id="nav-bar">
        <nav className="nav">
          <div>
            <a href="/GeneralLedger" className="nav_logo">
              <i title="General Ledger"><Logoicon /></i>
            </a>
            <a><br></br></a>
            <a><br></br></a>
            <a><br></br></a>
            <a><br></br></a>
            <a><br></br></a>
            <a><br></br></a>
            <div className="nav_list">
              <a href="/GeneralLedger" className="nav_link">
                <i title="Home"><ImHome /></i>
              </a>
              <a href="/Expenses" className="nav_link">
                <i title="Expenses"><AiOutlineShoppingCart /></i>
              </a>
              <a href="/Bill" className="nav_link">
                <i title="Bill"><TbFileInvoice /></i>
              </a>
              <a href="/Inventory" className="nav_link">
                <i title="Inventory"><PiWarehouseBold /></i>
              </a>
              <a href="/Users" className="nav_link">
                <i title="Users"><ImUser /></i>
              </a>
            </div>
          </div>
          <a href="/login" className="nav_link">
            <i title="Logout"><AiOutlineLogout /></i>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Slidebar;
