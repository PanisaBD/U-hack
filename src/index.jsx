import React from "react";
import {
  BellRing,
  CalendarDays,
  Cat,
  ChevronRight,
  Dog,
  FileText,
  FlaskConical,
  House,
  Lightbulb,
  MessageCircle,
  Stethoscope,
  Syringe,
  UserRound,
} from "lucide-react";
import catTuxedo1 from "./cat_tuxedo.svg";
import "./style.css";

export const Iphone = () => {
  return (
    <div className="iphone">
      <header className="app-header">
        <button className="avatar-button" type="button" aria-label="Open profile">
          <UserRound aria-hidden="true" />
        </button>
        <div className="header-spacer" />
        <button className="notification-button" type="button" aria-label="Notifications">
          <BellRing aria-hidden="true" />
          <span className="notification-dot" />
        </button>
      </header>

      <main className="dashboard">
        <div className="pet-switcher" aria-label="Choose a pet">
          <button className="pet-chip is-selected" type="button" aria-pressed="true">
            Bat Man <Cat aria-hidden="true" />
          </button>
          <button className="pet-chip" type="button" aria-pressed="false">
            Chok Dee <Dog aria-hidden="true" />
          </button>
          <button className="add-pet" type="button">+ Add pet</button>
        </div>

        <section className="welcome-card" aria-labelledby="welcome-title">
          <div className="welcome-copy">
            <h1 id="welcome-title">BAT<br />MAN</h1>
            <p className="pet-breed">Domestic Shorthair</p>
            <p className="pet-details">3 yrs - 4.2 kg</p>
            <button className="profile-action" type="button">View Profile</button>
          </div>
          <div className="welcome-art">
            <span className="welcome-sparkle" aria-hidden="true">✧</span>
            <img className="cat-tuxedo" alt="Tuxedo cat illustration" src={catTuxedo1} />
          </div>
          <button className="vaccine-alert" type="button">
            <Syringe aria-hidden="true" />
            <span><strong>Rabies</strong> due in 14 days</span>
          </button>
        </section>

        <section className="upcoming-section" aria-labelledby="upcoming-title">
          <div className="section-heading">
            <h2 id="upcoming-title">COMING UP</h2>
          </div>
          <button className="appointment-card" type="button">
            <span className="appointment-icon">
              <CalendarDays aria-hidden="true" />
            </span>
            <span className="appointment-copy">
              <strong>DHPP booster</strong>
              <small>21 Oct - 10:30 PM @Happy Pet Clinic</small>
            </span>
            <ChevronRight aria-hidden="true" className="appointment-arrow" />
          </button>
        </section>

        <section className="services-section" aria-labelledby="services-title">
          <div className="section-heading">
            <h2 id="services-title">WHAT DO YOU NEED ?</h2>
          </div>
          <div className="service-grid">
            <button className="service-card appointment-service" type="button">
              <CalendarDays aria-hidden="true" />
              <strong>Book Vet<br />Appointment</strong>
              <small>Find a nearby clinic and pick a time. Get a reminder before the visit.</small>
            </button>
            <button className="service-card telehealth-service" type="button">
              <MessageCircle aria-hidden="true" />
              <strong>Telehealth<br />Consultation</strong>
              <small>Chat or video call with a vet. Start with a quick symptom check.</small>
            </button>
            <button className="service-card lab-service" type="button">
              <FlaskConical aria-hidden="true" />
              <strong>Lab Results</strong>
              <small>View blood tests, X-rays and reports. Download or share them in one tap.</small>
            </button>
            <button className="service-card tips-service" type="button">
              <Lightbulb aria-hidden="true" />
              <strong>Care Tips</strong>
              <small>Advice based on breed, age and weight. Feeding, exercise and dental care.</small>
            </button>
          </div>
        </section>
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button className="nav-item is-active" type="button" aria-current="page">
          <House aria-hidden="true" />
          <span>Home</span>
        </button>
        <button className="nav-item" type="button">
          <FileText aria-hidden="true" />
          <span>Record</span>
        </button>
        <button className="nav-item" type="button">
          <Stethoscope aria-hidden="true" />
          <span>Consult</span>
        </button>
        <button className="nav-item" type="button">
          <CalendarDays aria-hidden="true" />
          <span>Schedule</span>
        </button>
      </nav>
    </div>
  );
};
