// import AppNavbar from '../NavBar/Navbar';
// import Slidebar from '../NavBar/Slidebar';
// import { Row, Col, Card } from 'react-bootstrap';
// import { ProgressBar } from 'react-bootstrap';
// import React, { Component } from 'react';
// import './css/GeneralLedger.css'; // Import the CSS file
// import SalesExpenseGraph from '../icons/chart';
// import InventoryManagementChart from '../icons/piechart';
// import Footer from '../NavBar/footer';

// function GeneralLedger() {
//   return (
//     <div>
//       <AppNavbar />
//       <div className="container-fluid">
//         <div className="row">
//           <div style={{ width: '95px' }}>
//             <Slidebar />
//           </div>
//           <div className="col-md-11">
//           <Row>
//       <Col sm={4}>
//         <Card>
//           <Card.Body>
//             <div>TOTAL RECIVABLES</div>
//             <hr />
//             <div>TOTAL UNPAID INVOICE</div>
//             <div><ProgressBar>
//               <ProgressBar variant="success " now={75} key={1} />
//               <ProgressBar variant="danger" now={25} key={2} />
//             </ProgressBar>
//             </div>
//             <hr />
//             <div>
//             <Row>
//               <Col>
//                 <Card className="border-0">
//                   <div>CURRENT</div>
//                   <div>$75</div>
//                 </Card>
//               </Col>
//               <Col>
//                 <Card className="border-0">
//                   <div>OVERDUE</div>
//                   <div>$25</div>
//                 </Card>
//               </Col>
              
//             </Row>
//             </div>
//           </Card.Body>
//         </Card>
//       </Col>
      
//       <Col sm={4}>
//         <Card>
//           <Card.Body>
//             <div>TOTAL PAYABLES</div>
//             <hr />
//             <div>TOTAL UNPAID BILLS</div>
//             <div><ProgressBar>
//               <ProgressBar variant="danger " now={75} key={1} />
//               <ProgressBar variant="success" now={25} key={2} />
//             </ProgressBar>
//             </div>
//             <hr />
//             <div>
//             <Row>
//               <Col>
//                 <Card className="border-0">
//                   <div>CURRENT</div>
//                   <div>$75</div>
//                 </Card>
//               </Col>
//               <Col>
//                 <Card className="border-0">
//                   <div>OVERDUE</div>
//                   <div>$25</div>
//                 </Card>
//               </Col>
              
//             </Row>
//             </div> 
//           </Card.Body>
//         </Card>
//       </Col>
      
//       <Col sm={4}>
//         <Card>
//           <Card.Body>
//             <div>GST PAYABLE</div>
//             <hr />
//             <div>DUEABLE TAX</div>
//             <div><ProgressBar>
//               <ProgressBar variant="info " now={75} key={1} />
//               <ProgressBar variant="warning" now={25} key={2} />
//             </ProgressBar>
//             </div>
//             <hr />
//             <div>
//             <Row>
//               <Col>
//                 <Card className="border-0">
//                   <div>CURRENT</div>
//                   <div>$75</div>
//                 </Card>
//               </Col>
//               <Col>
//                 <Card className="border-0">
//                   <div>OVERDUE</div>
//                   <div>$25</div>
//                 </Card>
//               </Col>
              
//             </Row>
//             </div>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//     <br />
//     <Row>
//     <Col sm={8}>
//         <Card style={{ height: '450px' }}>
//           <Card.Body >
//             <div className="row">
//           <div className="col">
//             <div className="left-column">
//               <div>SALES AND EXPENSES</div>
//               <SalesExpenseGraph />
//             </div>
//           </div>
//           <div className="col">
//             <div className="vertical-line"></div>
//           </div>
//           <div className="col">
//             <div className="right-column">
//               <Card className="border-0">
//                 <Card.Body>
//                   <h6 className='text-success'>Total Income</h6>
//                   <h3>$123456</h3>
//                 </Card.Body>
//               </Card>
//               <Card className="border-0">
//                 <Card.Body>
//                   <h6 className='text-danger'>Total Expenses</h6>
//                   <h3>$123456</h3>
//                 </Card.Body>
//               </Card>
//               <Card className="border-0">
//                 <Card.Body>
//                 <h6 className='text-warning'>Profit</h6>
//                   <h3>$123456</h3>
//                 </Card.Body>
//               </Card>
//             </div>
//           </div>
//         </div>
//           </Card.Body>
//         </Card>
//       </Col>
//       <Col sm={4}>
//         <Card style={{ height: '450px' }}>
//           <Card.Body>
//             <div>INVENTORY STOCKS</div><br /><br />
//             <InventoryManagementChart />
//             <br /><br />
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';
import AppNavbar from '../NavBar/Navbar';
import Slidebar from '../NavBar/Slidebar';
import Footer from '../NavBar/footer';
import SalesExpenseGraph from '../icons/chart';
import InventoryManagementChart from '../icons/piechart';
import './css/GeneralLedger.css'; // Import the CSS file



function GeneralLedger() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totaltax, setTotaltax] = useState(0);
  const [Totaltaxpaid, setTotaltaxpaid] = useState(0);

const  vfe=localStorage.getItem('email');

  // Function to fetch total sales and total expenses
  const fetchSalesAndExpenses = () => {
    const token = localStorage.getItem('token'); // Replace with the actual JWT token obtained during authentication
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get('http://localhost:8181/api/expenses/sales-total', config)
      .then(response => {
        setTotalSales(response.data);
      })
      .catch(error => {
        console.error('Error fetching total sales:', error);
      });

    axios.get('http://localhost:8181/api/expenses/expense-total', config)
      .then(response => {
        setTotalExpenses(response.data);
        console.log(totalExpenses);
      })
      .catch(error => {
        console.error('Error fetching total expenses:', error);
      });
      

      axios.get('http://localhost:8181/api/tax/sumnettax', config)
      .then(response => {
        setTotaltax(response.data);
      })
      .catch(error => {
        console.error('Error fetching total expenses:', error);
      });
      axios.get('http://localhost:8181/api/tax/totalsumnettaxpaid', config)
      .then(response => {
        setTotaltaxpaid(response.data);
      })
      .catch(error => {
        console.error('Error fetching total expenses:', error);
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSalesAndExpenses();
  }, []);
  return (
    <div>
      <AppNavbar />
      <div className="container-fluid">
        <div className="row">
          <div style={{ width: '95px' }}>
            <Slidebar />
          </div>
          <div className="col-md-11">
            <Row>
              <Col sm={4}>
                <Card>
                  <Card.Body>
                    <div>TOTAL RECEIVABLES</div>
                    <hr />
                    <div>TOTAL UNPAID INVOICE</div>
                    <div>
                      <ProgressBar>
                        <ProgressBar variant="success " now={totalSales} key={1} />
                        <ProgressBar variant="danger" now={totalSales - totalExpenses} key={2} />
                      </ProgressBar>
                    </div>
                    <hr />
                    <div>
                      <Row>
                        <Col>
                          <Card className="border-0">
                            <div>CURRENT</div>
                            <div>${totalSales}</div>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="border-0">
                            <div>OVERDUE</div>
                            <div>${totalSales - totalExpenses}</div>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4}>
                <Card>
                  <Card.Body>
                    <div>TOTAL PAYABLES</div>
                    <hr />
                    <div>TOTAL UNPAID BILLS</div>
                    <div>
                      <ProgressBar>
                        <ProgressBar variant="danger " now={totalExpenses} key={1} />
                        <ProgressBar variant="success" now={totalExpenses - totalSales} key={2} />
                      </ProgressBar>
                    </div>
                    <hr />
                    <div>
                      <Row>
                        <Col>
                          <Card className="border-0">
                            <div>CURRENT</div>
                            <div>${totalExpenses}</div>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="border-0">
                            <div>OVERDUE</div>
                            <div>${totalExpenses - totalSales}</div>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4}>
        <Card>
          <Card.Body>
            <div>GST PAYABLE</div>
            <hr />
            <div>DUEABLE TAX</div>
            <div><ProgressBar>
              <ProgressBar variant="info " now={totaltax} key={1} />
              <ProgressBar variant="warning" now={totaltax-Totaltaxpaid} key={2} />
            </ProgressBar>
            </div>
            <hr />
            <div>
            <Row>
              <Col>
                <Card className="border-0">
                  <div>CURRENT</div>
                  <div>${totaltax}</div>
                </Card>
              </Col>
              <Col>
                <Card className="border-0">
                  <div>OVERDUE</div>
                  <div>${totaltax-Totaltaxpaid}</div>
                </Card>
              </Col>
              
            </Row>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <br />
    <Row>
    <Col sm={8}>
        <Card style={{ height: '450px' }}>
          <Card.Body >
            <div className="row">
          <div className="col">
            <div className="left-column">
              <div>SALES AND EXPENSES</div>
              <SalesExpenseGraph />
            </div>
          </div>
          <div className="col">
            <div className="vertical-line"></div>
          </div>
          <div className="col">
            <div className="right-column">
              <Card className="border-0">
                <Card.Body>
                  <h6 className='text-success'>Total Income</h6>
                  <h3>${totalSales}</h3>
                </Card.Body>
              </Card>
              <Card className="border-0">
                <Card.Body>
                  <h6 className='text-danger'>Total Expenses</h6>
                  <h3>${totalExpenses}</h3>
                </Card.Body>
              </Card>
              <Card className="border-0">
                <Card.Body>
                <h6 className='text-warning'>Profit</h6>
                  <h3>${totalSales - totalExpenses}</h3>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={4}>
        <Card style={{ height: '450px' }}>
          <Card.Body>
            <div>INVENTORY STOCKS</div><br /><br />
            <InventoryManagementChart />
            <br /><br />
          </Card.Body>
        </Card>
      </Col>
    </Row>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GeneralLedger;