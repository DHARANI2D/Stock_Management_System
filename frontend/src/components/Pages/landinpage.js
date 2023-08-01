import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Footer from '../NavBar/footer';

function landinpage() {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
            <a class="navbar-brand" href="#"><strong>ACCOUNTER</strong></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#features">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#pricing">Pricing</a>
                </li>
                </ul>
                <a class="btn btn-primary ms-lg-3" href="/login">Login</a>
            </div>
            </div>
        </nav>
        <div class="py-4 text-left">
            <div class="container py-5">
            <div class="row">
                <div class="col-md-6">
                <h1 class="display-3"><b>ACCOUNTING MADE SIMPLE</b></h1>
                <p>Stop guessing and start fixing your company's financial statements now. With ACCOUNTER, all you need to do is focus on your business while we handle the rest.Our comprehensive solution simplifies financial management, providing accurate and reliable statements. Say goodbye to uncertainty and leave the complexities of financial management to us. With ACCOUNTER, you can confidently take control of your company's finances and achieve peace of mind.</p>
                <button type="button" class="btn btn-success btn-lg"><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Get Started</Link></button>
                </div>
                <div class="col-md-6">
                <img src="https://omniaccounts.co.za/wp-content/uploads/2021/03/Everything-you-need-to-know-about-Corporate-Accounting.jpg" class="img-fluid" alt="Image"/>
                </div>
            </div>
            </div>
        </div>
        <section id="features" class="py-5 bg-light">
            <div class="container py-5">
            <div class="row">
                <div class="col-md-3">
                <div class="card mb-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3WjPZr32a0LN5LJ0JckonaeOMG9FndKukj_l8iSSrPZ5QsMSS2eXctG9GLsehNVQlko&usqp=CAU" class="card-img-top" alt="Image 1"/>
                    <div class="card-body">
                    <h5 class="card-title">End-to-end accounting</h5>
                    <p class="card-text">Right from negotiating deals to raising sales orders and invoicing handles mundane accounting tasks so you can focus on your business.</p>
                    </div>
                </div>
                </div>
                <div class="col-md-3">
                <div class="card mb-3">
                    <img src="data:image/png;base64,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" class="card-img-top" alt="Image 2"/>
                    <div class="card-body">
                    <h5 class="card-title">GST compliance</h5>
                    <p class="card-text">Create GST invoices, know your tax liability, and file your tax returns directly keeps your business GST compliant.</p>
                    </div>
                </div>
                </div>
                <div class="col-md-3">
                <div class="card mb-3">
                    <img src="https://img.freepik.com/free-vector/invoice-concept-illustration_114360-2411.jpg?w=360" class="card-img-top" alt="Image 3"/>
                    <div class="card-body">
                    <h5 class="card-title">E-Way Bills</h5>
                    <p class="card-text">Create e-Way bills from within your accounting software automatically detects transactions that require e-Way bills and helps you capture.</p>
                    </div>
                </div>
                </div>
                <div class="col-md-3">
                <div class="card mb-3">
                    <img src="https://t3.ftcdn.net/jpg/00/99/06/92/360_F_99069227_PFoEBBRbgx6kLSqLzkRGkTUtjnFmkMm0.jpg" class="card-img-top" alt="Image 3"/>
                    <div class="card-body">
                    <h5 class="card-title">Integrated platform</h5>
                    <p class="card-text">As your business grows we help you manage and run every aspect of your business seemlessly from wherever you are.</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        <section id="pricing" class="py-5">
            <div class="container py-5">
            <div class="row">
                <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-header">
                    <h4 class="card-title">Basic</h4>
                    </div>
                    <div class="card-body">
                    <h1 class="display-4">₹0</h1>
                    <h6>/month billed annually</h6>
                    <h6>1 month trial</h6>
                    <a href="/register" class="btn btn-primary">Sign Up</a>
                    </div>
                </div>
                </div>
                <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-header">
                    <h4 class="card-title">Pro</h4>
                    </div>
                    <div class="card-body">
                    <h1 class="display-4">₹499</h1>
                    <h6>/month billed annually</h6>
                    <h6>₹599 billed monthly</h6>
                    <a href="/register" class="btn btn-primary">Sign Up</a>
                    </div>
                </div>
                </div>
                <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-header">
                    <h4 class="card-title">Enterprise</h4>
                    </div>
                    <div class="card-body">
                    <h1 class="display-4">₹999</h1>
                    <h6>/month billed annually</h6>
                    <h6>₹1299 billed monthly</h6>
                    <a href="/register" class="btn btn-primary">Sign Up</a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </section>
            <div class="bg-light text-center text-muted py-3">
                <div class="container">
                    <p>&copy; 2023 ACCOUNTER. All rights reserved.</p>
                </div>
            </div>
    </div>
  )
}

export default landinpage