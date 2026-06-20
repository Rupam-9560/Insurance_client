import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  HeartPulse,
  Car,
  Users,
  CheckCircle2,
  Star,
  Moon,
  Sun,
} from "lucide-react";

/* ========================================= */

function Mainpg() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  // enable dark class on body
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="font-sans transition-colors duration-500
      bg-gradient-to-br from-indigo-50 to--50
      dark:from-gray-900 dark:to-gray-800
      text-gray-800 dark:text-gray-200">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-4
        bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-md">

        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent">
          SecureLife
        </h1>

        <div className="flex gap-3 items-center">
          <Button variant="ghost" onClick={() => setDark(!dark)}>
            {dark ? <Sun /> : <Moon />}
          </Button>

          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>

          <Button
            className="bg-gradient-to-r from-indigo-600 to-indigo-600 text-white"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>

          <Button variant="ghost" onClick={() => navigate("/admin/login")}>
            Admin
          </Button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[95vh] overflow-hidden">

        {/* floating animated blobs */}
        <div className="absolute w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-3xl animate-pulse -top-20 -left-20" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-3xl animate-pulse bottom-0 right-0" />

        <h1 className="text-5xl md:text-6xl font-extrabold">
          Protect What Matters{" "}
          <span className="text-indigo-600">Most</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg opacity-80">
          Reliable and affordable insurance plans for your life, health,
          and vehicles.
        </p>

        <div className="mt-10 flex gap-6">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>

          <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>

        {/* STATS */}
        <Stats />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24">
        <SectionTitle text="Our Insurance Services" />

        <div className="grid md:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto">
          <Service icon={<ShieldCheck />} title="Life Insurance" />
          <Service icon={<HeartPulse />} title="Health Insurance" />
          <Service icon={<Car />} title="Vehicle Insurance" />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-indigo-50 dark:bg-gray-900">
        <SectionTitle text="Why Choose Us?" />

        <div className="grid md:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto">
          <Feature icon={<Users />} title="Trusted Provider" />
          <Feature icon={<CheckCircle2 />} title="Reliable Coverage" />
          <Feature icon={<Star />} title="Top Rated" />
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-24">
        <SectionTitle text="Pricing Plans" />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <Pricing title="Basic" price="₹299" />
          <Pricing title="Standard" price="₹599" highlight />
          <Pricing title="Premium" price="₹999" />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 bg-gray-100 dark:bg-gray-900">
        <SectionTitle text="Frequently Asked Questions" />
        <FAQ />
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center bg-gradient-to-r from-indigo-600 to-indigo-600 text-white">
        <h2 className="text-4xl font-bold">Start Your Journey Today</h2>
        <Button
          className="mt-6 bg-white text-indigo-700"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>
      </section>

      <footer className="text-center py-8 opacity-70">
        © {new Date().getFullYear()} SecureLife Insurance
      </footer>
    </div>
  );
}

/* =====================================================
   COMPONENTS
===================================================== */

const SectionTitle = ({ text }) => (
  <h2 className="text-4xl font-bold text-center mb-16">{text}</h2>
);

/* -------- STATS COUNTER -------- */
const Stats = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 50;
      setCount(i);
      if (i >= 5000) clearInterval(interval);
    }, 10);
  }, []);

  return (
    <div className="flex gap-10 mt-20 text-lg font-semibold">
      <p>{count}+ Users</p>
      <p>99% Satisfaction</p>
      <p>24/7 Support</p>
    </div>
  );
};

/* -------- SERVICE CARD -------- */
const Service = ({ icon, title }) => (
  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-10 text-center hover:-tranindigo-y-2 transition">
    <div className="text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
  </div>
);

/* -------- FEATURE -------- */
const Feature = ({ icon, title }) => (
  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow text-center">
    <div className="text-indigo-600 mb-3">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
  </div>
);

/* -------- PRICING -------- */
const Pricing = ({ title, price, highlight }) => (
  <div
    className={`rounded-3xl shadow-lg p-8 text-center
      ${highlight ? "bg-indigo-600 text-white scale-105" : "bg-white dark:bg-gray-800"}`}
  >
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-4">{price}/mo</p>
    <Button className="mt-6 w-full">Choose</Button>
  </div>
);

/* -------- FAQ (PLUS → CROSS ACCORDION) -------- */
import { Plus, X } from "lucide-react";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const items = [
    {
      q: "How do I purchase an insurance policy?",
      a: "Create an account, compare plans, and purchase securely from your dashboard.",
    },
    {
      q: "Can I update my policy details later?",
      a: "Yes, you can manage and update your profile and policy information anytime.",
    },
    {
      q: "Is customer support available?",
      a: "Our support team is available 24/7 for assistance.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4 px-6">
      {items.map((item, i) => {
        const isOpen = open === i;

        return (
          <div
            key={i}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg
                       rounded-2xl shadow transition-all"
          >
            {/* HEADER */}
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-semibold">{item.q}</span>

              {isOpen ? (
                <X className="text-blue-500" size={20} />
              ) : (
                <Plus className="text-blue-600" size={20} />
              )}
            </button>

            {/* BODY */}
            <div
              className={`overflow-hidden transition-all duration-300 px-5
                ${isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <p className="text-sm opacity-80">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default Mainpg;
