import '../NavBar/slidebar.css';
import Logoicon from '../icons/logo';
import { ImHome,ImUser } from "react-icons/im";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbDeviceAnalytics,TbFileInvoice,TbReceiptTax } from "react-icons/tb";
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
            <a href="/GeneralLedger" className="nav_logo" >
              <i ><Logoicon /></i>
            
            </a>
            <div className="nav_list">
              <a href="/GeneralLedger" className="nav_link" >
              <i ><ImHome /></i>
              </a>
              <a href="/Users" className="nav_link" >
                <i><ImUser /></i>
              </a>
              <a href="/Expenses" className="nav_link" >
                <i><AiOutlineShoppingCart /></i>
              </a>
              {/* <a href="/Analysis" className="nav_link" >
                <i><TbDeviceAnalytics /></i>
              </a> */}
              <a href="/Bill" className="nav_link" >
                <i><TbFileInvoice/></i>
              </a>
              <a href="/Inventory" className="nav_link" >
                <i><PiWarehouseBold/></i>
              </a>
              <a href="/Payroll" className="nav_link" >
                <i><MdPayment/></i>
              </a>
              <a href="/Tax" className="nav_link" >
                <i><TbReceiptTax/></i>
              </a>
          <a href="/Settings" className="nav_link" >
                <i><IoSettings/></i>
          </a>
            </div>
          </div>
          <a href="/login" className="nav_link" >
            <i><AiOutlineLogout/></i>
            
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Slidebar;
