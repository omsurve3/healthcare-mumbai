import React from "react";
import "./Navbar.css";
import {
  LayoutDashboard,
  TrendingUp,
  BookOpen,
  Bot,
  Bell,
  ChevronDown
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="nav">
      {/* Left – Logo */}
      <div className="nav-left">
        <div className="logo-icon">
          {/* Simple logo mark */}
          <span className="logo-square" />
        </div>
        <Link href="/" className="logo-text nav-link" >SwasthiShield</Link>
      </div>

      {/* Center – Menu */}
      <nav className="nav-center">
      
      <Link href="/dashboard" className="nav-link">
        <LayoutDashboard size={18} />
        Dashboard
        <ChevronDown size={16} className="chevron" />
      </Link>

      {/* Surge Prediction */}
      <Link href="/surgepredictions" className="nav-link">
        <TrendingUp size={18} />
        Surge-Prediction
      </Link>

      {/* Resources */}
      <Link href="/resources" className="nav-link">
        <BookOpen size={18} />
        Resources
      </Link>

      {/* AI Agents */}
      <Link href="/aiagents" className="nav-link">
        <Bot size={18} />
        AI AGENTS
        <ChevronDown size={16} className="chevron" />
      </Link>

      {/* Alerts */}
      <Link href="/alerts" className="nav-link">
        <Bell size={18} />
        ALERTS
        <ChevronDown size={16} className="chevron" />
      </Link>
    </nav>

      {/* Right – Auth buttons */}
     
    </header>
  );
};

export default Navbar;
