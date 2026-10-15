import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  BellRing,
  CalendarDays,
  Cat,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  Dog,
  Download,
  FileText,
  FlaskConical,
  HeartPulse,
  House,
  Lightbulb,
  MapPin,
  MessageCircle,
  Navigation,
  PawPrint,
  Phone,
  Pill,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Stethoscope,
  Syringe,
  UserRound,
  Video,
} from "lucide-react";
import catTuxedo1 from "./cat_tuxedo.svg";
import "./style.css";

export const Iphone = () => {
  const [page, setPage] = useState("home");
  const [selectedPet, setSelectedPet] = useState("Bat Man");
  const [pets, setPets] = useState([
    { name: "Bat Man", species: "cat", breed: "Domestic Shorthair", weight: "4.2", age: "3 yrs" },
    { name: "Chok Dee", species: "dog", breed: "Thai Ridgeback", weight: "18", age: "5 yrs" },
  ]);
  const [appointments, setAppointments] = useState([
    { id: "wellness-batman", petName: "Bat Man", title: "Annual wellness exam", type: "Visit", date: "2026-09-18", time: "9:00 AM", clinic: "Happy Pet Clinic", notes: "Completed. Routine wellness check." },
    { id: "dental-batman", petName: "Bat Man", title: "Dental check", type: "Visit", date: "2026-10-06", time: "2:00 PM", clinic: "Green Paws Veterinary", notes: "Completed. No treatment needed." },
    { id: "dhpp-batman", petName: "Bat Man", title: "DHPP booster", type: "Vaccine", date: "2026-10-21", time: "10:30 AM", clinic: "Happy Pet Clinic", notes: "Bring vaccination book." },
    { id: "rabies-batman", petName: "Bat Man", title: "Rabies vaccine", type: "Vaccine", date: "2026-10-29", time: "11:00 AM", clinic: "Happy Pet Clinic", notes: "Annual booster." },
    { id: "checkup-chokdee", petName: "Chok Dee", title: "Wellness check", type: "Visit", date: "2026-10-23", time: "1:30 PM", clinic: "City Animal Hospital", notes: "Routine checkup." },
  ]);
  const [isCreatingPet, setIsCreatingPet] = useState(false);
  const [notice, setNotice] = useState("");

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const openPage = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAddPet = () => {
    setIsCreatingPet(true);
    openPage("edit-profile");
  };

  const navigateTab = (nextPage) => {
    openPage(nextPage);
  };

  return (
    <div className="iphone">
      <header className="app-header">
        <button className="avatar-button" type="button" aria-label="Open profile" onClick={() => openPage("profile")}>
          <UserRound aria-hidden="true" />
        </button>
        <div className="header-spacer" />
        <button className="notification-button" type="button" aria-label="Notifications" onClick={() => openPage("notifications")}>
          <BellRing aria-hidden="true" />
          <span className="notification-dot" />
        </button>
      </header>

      {page === "home" && <HomeScreen pets={pets} onNavigate={openPage} onAddPet={startAddPet} selectedPet={selectedPet} onSelectPet={setSelectedPet} />}
      {page === "profile" && <PetProfileScreen pet={pets.find((pet) => pet.name === selectedPet) || pets[0]} onBack={() => openPage("home")} onEdit={() => openPage("edit-profile")} />}
      {page === "edit-profile" && <ProfileScreen onBack={() => openPage(isCreatingPet ? "home" : "profile")} selectedPet={selectedPet} pets={pets} isNew={isCreatingPet} onSaved={(profile) => { setPets((currentPets) => isCreatingPet ? [...currentPets, profile] : currentPets.map((pet) => pet.name === selectedPet ? profile : pet)); setSelectedPet(profile.name); setIsCreatingPet(false); openPage(isCreatingPet ? "home" : "profile"); showNotice(isCreatingPet ? "Pet profile created" : "Pet profile saved"); }} />}
      {page === "records" && <RecordsScreen pets={pets} onSelectPet={setSelectedPet} onNavigate={openPage} />}
      {page === "schedule" && <ScheduleScreen pets={pets} appointments={appointments} onNavigate={openPage} onBooked={(appointment) => { setAppointments((current) => [...current, appointment]); showNotice("Appointment added to your schedule"); }} />}
      {page === "consult" && <ConsultScreen pets={pets} onNavigate={openPage} />}
      {page === "labs" && <LabsScreen pets={pets} onNotice={showNotice} onNavigate={openPage} />}
      {page === "tips" && <TipsScreen pets={pets} onNavigate={openPage} />}
      {page === "clinics" && <ClinicsScreen onNavigate={openPage} />}
      {page === "notifications" && <NotificationsScreen onNavigate={openPage} />}

      {notice && <div className="toast" role="status"><Check aria-hidden="true" />{notice}</div>}

      <nav className="bottom-nav" aria-label="Main navigation">
        <button className={`nav-item ${page === "home" ? "is-active" : ""}`} type="button" aria-current={page === "home" ? "page" : undefined} onClick={() => navigateTab("home")}>
          <House aria-hidden="true" />
          <span>Home</span>
        </button>
        <button className={`nav-item ${page === "records" || page === "labs" ? "is-active" : ""}`} type="button" aria-current={page === "records" || page === "labs" ? "page" : undefined} onClick={() => navigateTab("records")}>
          <FileText aria-hidden="true" />
          <span>Record</span>
        </button>
        <button className={`nav-item ${page === "consult" ? "is-active" : ""}`} type="button" aria-current={page === "consult" ? "page" : undefined} onClick={() => navigateTab("consult")}>
          <Stethoscope aria-hidden="true" />
          <span>Consult</span>
        </button>
        <button className={`nav-item ${page === "schedule" || page === "clinics" ? "is-active" : ""}`} type="button" aria-current={page === "schedule" || page === "clinics" ? "page" : undefined} onClick={() => navigateTab("schedule")}>
          <CalendarDays aria-hidden="true" />
          <span>Schedule</span>
        </button>
      </nav>
    </div>
  );
};

const PageHeading = ({ title, subtitle, onBack, action }) => (
  <div className="page-heading">
    <button className="back-button" type="button" aria-label="Back to home" onClick={onBack}>
      <ArrowLeft aria-hidden="true" />
    </button>
    <div className="page-heading-copy">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    {action}
  </div>
);

const PetPicker = ({ pets, value, onChange, label = "Select a pet", includeAll = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activePet = pets.find((pet) => pet.name === value);
  return (
    <div className="pet-picker">
      <span className="field-label">{label}</span>
      <button className="pet-picker-trigger" type="button" aria-haspopup="listbox" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {value === "all" ? <><PawPrint aria-hidden="true" /><span>All pets</span></> : activePet ? <>{activePet.species === "cat" ? <Cat aria-hidden="true" /> : <Dog aria-hidden="true" />}<span>{activePet.name}</span></> : <><PawPrint aria-hidden="true" /><span>Choose a pet</span></>}
        <ChevronDown aria-hidden="true" className={isOpen ? "is-open" : ""} />
      </button>
      {isOpen && <div className="pet-picker-options" role="listbox" aria-label={label}>{includeAll && <button className={value === "all" ? "selected" : ""} type="button" role="option" aria-selected={value === "all"} onClick={() => { onChange("all"); setIsOpen(false); }}><PawPrint aria-hidden="true" /><span>All pets</span><small>Show every pet's appointments</small>{value === "all" && <Check aria-hidden="true" className="picker-check" />}</button>}{pets.map((pet) => <button className={pet.name === value ? "selected" : ""} type="button" role="option" aria-selected={pet.name === value} key={pet.name} onClick={() => { onChange(pet.name); setIsOpen(false); }}>
        {pet.species === "cat" ? <Cat aria-hidden="true" /> : <Dog aria-hidden="true" />}<span>{pet.name}</span><small>{pet.breed}</small>{pet.name === value && <Check aria-hidden="true" className="picker-check" />}
      </button>)}</div>}
    </div>
  );
};

const HomeScreen = ({ pets, onNavigate, onAddPet, selectedPet, onSelectPet }) => {
  const activePet = pets.find((pet) => pet.name === selectedPet) || pets[0];
  const isCat = activePet.species === "cat";
  return (
    <main className="dashboard">
      <div className="pet-switcher" aria-label="Choose a pet">
        {pets.map((pet) => <button className={`pet-chip ${pet.name === selectedPet ? "is-selected" : ""}`} type="button" aria-pressed={pet.name === selectedPet} key={pet.name} onClick={() => onSelectPet(pet.name)}>
          {pet.name} {pet.species === "cat" ? <Cat aria-hidden="true" /> : <Dog aria-hidden="true" />}
        </button>)}
        <button className="add-pet" type="button" onClick={onAddPet}>+ Add pet</button>
      </div>

      <section className="welcome-card" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <h1 id="welcome-title">{activePet.name.toUpperCase().split(/\s+/).map((part, index) => <React.Fragment key={`${part}-${index}`}>{index > 0 && <br />}{part}</React.Fragment>)}</h1>
          <p className="pet-breed">{activePet.breed}</p>
          <p className="pet-details">{activePet.age || "Age not recorded"} - {activePet.weight || "--"} kg</p>
          <button className="profile-action" type="button" onClick={() => onNavigate("profile")}>View Profile</button>
        </div>
        <div className="welcome-art">
          <span className="welcome-sparkle" aria-hidden="true">✧</span>
          {isCat ? <img className="cat-tuxedo" alt="Tuxedo cat illustration" src={catTuxedo1} /> : <Dog className="dog-art" aria-label="Dog icon" />}
        </div>
        <button className="vaccine-alert" type="button" onClick={() => onNavigate("records")}>
          <Syringe aria-hidden="true" />
          <span><strong>{isCat ? "Rabies" : "Leptospirosis"}</strong> due in 14 days</span>
        </button>
      </section>

      <section className="upcoming-section" aria-labelledby="upcoming-title">
        <div className="section-heading"><h2 id="upcoming-title">COMING UP</h2></div>
        <button className="appointment-card" type="button" onClick={() => onNavigate("schedule")}>
          <span className="appointment-icon"><CalendarDays aria-hidden="true" /></span>
          <span className="appointment-copy"><strong>DHPP booster</strong><small>21 Oct - 10:30 AM @ Happy Pet Clinic</small></span>
          <ChevronRight aria-hidden="true" className="appointment-arrow" />
        </button>
      </section>

      <section className="services-section" aria-labelledby="services-title">
        <div className="section-heading"><h2 id="services-title">WHAT DO YOU NEED ?</h2></div>
        <div className="service-grid">
          <button className="service-card appointment-service" type="button" onClick={() => onNavigate("schedule")}>
            <CalendarDays aria-hidden="true" /><strong>Book Vet<br />Appointment</strong><small>Find a nearby clinic and pick a time. Get a reminder before the visit.</small>
          </button>
          <button className="service-card telehealth-service" type="button" onClick={() => onNavigate("consult")}>
            <MessageCircle aria-hidden="true" /><strong>Telehealth<br />Consultation</strong><small>Chat or video call with a vet. Start with a quick symptom check.</small>
          </button>
          <button className="service-card lab-service" type="button" onClick={() => onNavigate("labs")}>
            <FlaskConical aria-hidden="true" /><strong>Lab Results</strong><small>View blood tests, X-rays and reports. Download or share them in one tap.</small>
          </button>
          <button className="service-card tips-service" type="button" onClick={() => onNavigate("tips")}>
            <Lightbulb aria-hidden="true" /><strong>Care Tips</strong><small>Advice based on breed, age and weight. Feeding, exercise and dental care.</small>
          </button>
        </div>
        <button className="clinic-discovery-link" type="button" onClick={() => onNavigate("clinics")}><MapPin aria-hidden="true" /> Find a nearby clinic <ChevronRight aria-hidden="true" /></button>
      </section>
    </main>
  );
};

const ProfileScreen = ({ onBack, selectedPet, pets, isNew, onSaved }) => {
  const pet = pets.find((item) => item.name === selectedPet) || pets[0];
  return (
  <main className="page-content">
    <PageHeading title={isNew ? "Add a pet" : "Pet profile"} subtitle="Keep important details in one place." onBack={onBack} />
    <form className="form-panel" onSubmit={(event) => { event.preventDefault(); const formData = new FormData(event.currentTarget); onSaved({ name: formData.get("petName").toString().trim(), species: formData.get("species").toString(), breed: formData.get("breed").toString().trim(), weight: formData.get("weight").toString(), age: formData.get("age").toString() }); }}>
      <div className="profile-summary">
        <span className="profile-pet-icon">{(isNew ? "cat" : pet.species) === "cat" ? <Cat aria-hidden="true" /> : <Dog aria-hidden="true" />}</span>
        <div><strong>{isNew ? "New pet profile" : selectedPet}</strong><span>{isNew ? "Add health details to get started" : pet.breed}</span></div>
        {!isNew && <span className="verified-label"><ShieldCheck aria-hidden="true" /> Owner</span>}
      </div>
      <h2>About your pet</h2>
      <div className="form-grid">
        <label>Pet name<input name="petName" required defaultValue={isNew ? "" : selectedPet} placeholder="e.g. Bat Man" /></label>
        <label>Species<select name="species" defaultValue={isNew ? "cat" : pet.species}><option value="cat">Cat</option><option value="dog">Dog</option></select></label>
        <label>Breed<input name="breed" required defaultValue={isNew ? "" : pet.breed} placeholder="Breed" /></label>
        <label>Age<input name="age" defaultValue={isNew ? "" : pet.age} placeholder="e.g. 3 yrs" /></label>
        <label>Weight<input name="weight" type="number" defaultValue={isNew ? "" : pet.weight} step="0.1" /> <span className="input-suffix">kg</span></label>
        <label>Blood type<input placeholder="Not recorded" /></label>
        <label>Microchip ID<input placeholder="Add identification number" /></label>
        <label className="field-wide">Identification marks<input defaultValue={isNew ? "" : pet.species === "cat" ? "White chest and paws" : "Dark brindle coat"} /></label>
      </div>
      <h2>Health notes</h2>
      <div className="form-grid">
        <label>Allergies<input placeholder="None recorded" /></label>
        <label>Chronic conditions<input placeholder="None recorded" /></label>
        <label className="field-wide">Dietary restrictions<textarea placeholder="Add dietary notes" rows="2" /></label>
      </div>
      <button className="primary-button" type="submit">Save profile</button>
    </form>
  </main>
  );
};

const PetProfileScreen = ({ pet, onBack, onEdit }) => (
  <main className="page-content">
    <PageHeading title="Pet profile" subtitle="Your pet's details and health notes." onBack={onBack} action={<button className="icon-button" type="button" aria-label="Edit pet profile" onClick={onEdit}><PawPrint aria-hidden="true" /></button>} />
    <section className="pet-detail-hero">
      <span className="profile-pet-icon">{pet.species === "cat" ? <Cat aria-hidden="true" /> : <Dog aria-hidden="true" />}</span>
      <div><h2>{pet.name}</h2><p>{pet.breed}</p></div>
      <button className="outline-button" type="button" onClick={onEdit}>Edit</button>
    </section>
    <section className="record-section">
      <h2>Basic information</h2>
      <div className="pet-facts-grid"><div><span>Species</span><strong>{pet.species === "cat" ? "Cat" : "Dog"}</strong></div><div><span>Age</span><strong>{pet.age || "Not recorded"}</strong></div><div><span>Weight</span><strong>{pet.weight ? `${pet.weight} kg` : "Not recorded"}</strong></div><div><span>Blood type</span><strong>Not recorded</strong></div><div className="fact-wide"><span>Identification marks</span><strong>{pet.species === "cat" ? "White chest and paws" : "Dark brindle coat"}</strong></div></div>
    </section>
    <section className="record-section">
      <div className="list-heading"><h2>Health notes</h2><button className="text-button" type="button" onClick={onEdit}>Edit details</button></div>
      <RecordRow icon={<ShieldCheck />} title="Allergies" meta="None recorded" badge="Clear" />
      <RecordRow icon={<HeartPulse />} title="Chronic conditions" meta="None recorded" badge="Clear" />
      <RecordRow icon={<Pill />} title="Dietary restrictions" meta="No restrictions recorded" badge="Clear" />
    </section>
    <button className="primary-button" type="button" onClick={onEdit}>Edit pet details</button>
  </main>
);

const RecordsScreen = ({ pets, onSelectPet, onNavigate }) => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [activeTab, setActiveTab] = useState("vaccinations");
  return (
    <main className="page-content">
      <PageHeading title={selectedPet ? `${selectedPet.name}'s records` : "Health records"} subtitle={selectedPet ? `${selectedPet.breed} · ${selectedPet.weight || "--"} kg` : "Choose a pet to view their health records."} onBack={() => selectedPet ? setSelectedPet(null) : onNavigate("home")} />
      {!selectedPet ? <section className="pet-record-list" aria-label="Select a pet record">{pets.map((pet) => <button className="pet-record-card" type="button" key={pet.name} onClick={() => { setSelectedPet(pet); onSelectPet(pet.name); }}><span className="profile-pet-icon">{pet.species === "cat" ? <Cat aria-hidden="true" /> : <Dog aria-hidden="true" />}</span><span className="pet-record-copy"><strong>{pet.name}</strong><small>{pet.breed}</small><small>{pet.weight ? `${pet.weight} kg` : "Weight not recorded"} · {pet.age || "Age not recorded"}</small></span><ChevronRight aria-hidden="true" /></button>)}</section> : <>
      <div className="record-health-banner"><HeartPulse aria-hidden="true" /><span><strong>Looking good</strong><small>Next vaccine due in 14 days</small></span><button type="button" onClick={() => onNavigate("schedule")}>Book visit</button></div>
      <div className="segmented-tabs" role="tablist" aria-label="Record type">
        <button className={activeTab === "vaccinations" ? "selected" : ""} type="button" role="tab" aria-selected={activeTab === "vaccinations"} onClick={() => setActiveTab("vaccinations")}>Vaccines</button>
        <button className={activeTab === "history" ? "selected" : ""} type="button" role="tab" aria-selected={activeTab === "history"} onClick={() => setActiveTab("history")}>Medical history</button>
        <button className={activeTab === "medications" ? "selected" : ""} type="button" role="tab" aria-selected={activeTab === "medications"} onClick={() => setActiveTab("medications")}>Meds</button>
      </div>
      {activeTab === "vaccinations" && <section className="record-section"><h2>Upcoming</h2><RecordRow icon={<Syringe />} title={selectedPet.species === "cat" ? "Rabies vaccine" : "DHPP booster"} meta="Due 29 Oct 2026" badge="Due soon" /><RecordRow icon={<Syringe />} title={selectedPet.species === "cat" ? "Feline leukemia" : "Leptospirosis"} meta="Due 21 Oct 2026" badge="Scheduled" /><h2>Completed</h2><RecordRow icon={<Check />} title={selectedPet.species === "cat" ? "Feline leukemia" : "DHPP vaccine"} meta="Given 12 Apr 2026 · Happy Pet Clinic" badge="Complete" /><RecordRow icon={<Check />} title="Rabies vaccine" meta="Given 29 Oct 2025 · Happy Pet Clinic" badge="Complete" /></section>}
      {activeTab === "history" && <section className="record-section"><h2>Visit history</h2><RecordRow icon={<Stethoscope />} title="Annual wellness exam" meta="12 Apr 2026 · Dr. Mina S." badge="Healthy" /><RecordRow icon={<CircleAlert />} title="Seasonal skin irritation" meta="03 Feb 2026 · Follow-up complete" badge="Resolved" /><RecordRow icon={<FileText />} title="Dental check" meta="20 Sep 2025 · No treatment needed" badge="Note" /><h2>Conditions & sensitivities</h2><div className="note-panel"><ShieldCheck aria-hidden="true" /><span><strong>No chronic conditions recorded</strong><small>Add allergies or ongoing care notes in the pet profile.</small></span><button type="button" onClick={() => onNavigate("profile")}>Edit</button></div></section>}
      {activeTab === "medications" && <section className="record-section"><h2>Current treatments</h2><RecordRow icon={<Pill />} title="Flea & tick prevention" meta="Next dose 01 Nov 2026 · Monthly" badge="Recurring" /><RecordRow icon={<Pill />} title="Omega-3 supplement" meta="1 softgel with food · Daily" badge="Active" /><h2>Prescription log</h2><RecordRow icon={<FileText />} title="Cetirizine 5 mg" meta="Prescribed 03 Feb 2026 · 5 days" badge="Completed" /></section>}
      <button className="outline-button full-button" type="button" onClick={() => onNavigate("profile")}>Update health details <ChevronRight aria-hidden="true" /></button>
      </>}
    </main>
  );
};

const SelectionPrompt = ({ icon, title, detail }) => (
  <section className="selection-prompt"><span>{icon}</span><h2>{title}</h2><p>{detail}</p></section>
);

const RecordRow = ({ icon, title, meta, badge }) => (
  <article className="record-row"><span className="record-row-icon">{icon}</span><span className="record-row-copy"><strong>{title}</strong><small>{meta}</small></span><span className={`status-badge ${badge === "Due soon" ? "warning" : ""}`}>{badge}</span></article>
);

const ScheduleScreen = ({ pets, appointments, onNavigate, onBooked }) => {
  const [selectedPet, setSelectedPet] = useState("all");
  const [bookingPet, setBookingPet] = useState("");
  const [booked, setBooked] = useState(false);
  const [remindersOn, setRemindersOn] = useState(true);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const monthOffset = (new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay() + 6) % 7;
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const calendarCellCount = Math.ceil((monthOffset + daysInMonth) / 7) * 7;
  const calendarDates = Array.from({ length: calendarCellCount }, (_, index) => index - monthOffset + 1);
  const toIsoDate = (day) => `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const appointmentsForPet = appointments.filter((appointment) => selectedPet === "all" || appointment.petName === selectedPet);
  const selectedDayAppointments = appointmentsForPet.filter((appointment) => appointment.date === selectedDate);
  const handleBooking = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const bookedDate = data.get("date").toString();
    const [year, month, day] = bookedDate.split("-").map(Number);
    const appointment = { id: `appointment-${Date.now()}`, petName: data.get("petName").toString(), title: data.get("reason").toString(), type: data.get("reason").toString() === "Vaccination" ? "Vaccine" : "Visit", date: bookedDate, time: data.get("time").toString(), clinic: data.get("clinic").toString(), notes: data.get("notes").toString() };
    onBooked(appointment);
    setCalendarMonth(new Date(year, month - 1, 1));
    setSelectedDate(bookedDate);
    setSelectedAppointment(appointment);
    setBooked(true);
    setShowBookingForm(false);
  };
  return (
    <main className="page-content">
      <PageHeading title="Appointments" subtitle="Browse every pet's calendar or filter to one pet." onBack={() => onNavigate("home")} />
      <PetPicker pets={pets} value={selectedPet} onChange={(petName) => { setSelectedPet(petName); setBooked(false); setSelectedAppointment(null); }} label="Show appointments for" includeAll />
      <>
      <section className="calendar-panel">
        <div className="calendar-title-row"><div><span className="page-eyebrow">APPOINTMENT CALENDAR</span><h2>{calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2></div><div className="calendar-controls"><button className="icon-button" type="button" aria-label="Previous month" onClick={() => { const month = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1); setCalendarMonth(month); setSelectedDate(`${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}-01`); setSelectedAppointment(null); }}><ChevronLeft aria-hidden="true" /></button><button className="icon-button" type="button" aria-label="Next month" onClick={() => { const month = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1); setCalendarMonth(month); setSelectedDate(`${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}-01`); setSelectedAppointment(null); }}><ChevronRight aria-hidden="true" /></button></div></div>
        <div className="calendar-legend" aria-label="Calendar event types"><span><Syringe aria-hidden="true" /> Vaccine</span><span><CalendarDays aria-hidden="true" /> Visit</span><span className="past-legend"><Check aria-hidden="true" /> Past</span></div>
        <div className="calendar-grid calendar-weekdays">{"MTWTFSS".split("").map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
        <div className="calendar-grid calendar-days">{calendarDates.map((day, index) => {
          const dateValue = day > 0 && day <= daysInMonth ? toIsoDate(day) : "";
          const events = appointmentsForPet.filter((appointment) => appointment.date === dateValue);
          const isPast = dateValue && dateValue < new Date().toLocaleDateString("en-CA");
          const isToday = dateValue === new Date().toLocaleDateString("en-CA");
          return day > 0 && day <= daysInMonth ? <button className={`calendar-day ${selectedDate === dateValue ? "selected" : ""} ${events.length ? "has-event" : ""} ${events.length && isPast ? "past-event" : ""} ${isToday ? "is-today" : ""}`} type="button" key={dateValue} aria-label={`${day} ${calendarMonth.toLocaleDateString("en-US", { month: "long" })}${events.length ? `, ${events.map((event) => event.title).join(", ")}` : ""}`} onClick={() => { setSelectedDate(dateValue); setSelectedAppointment(events[0] || null); }}><span>{day}</span>{events.slice(0, 2).map((appointment) => <small className={`calendar-event-label ${appointment.type.toLowerCase()}`} key={appointment.id}>{appointment.type === "Vaccine" ? <Syringe aria-hidden="true" /> : appointment.type === "Medication" ? <Pill aria-hidden="true" /> : <CalendarDays aria-hidden="true" />}{appointment.type === "Vaccine" ? "Vax" : appointment.type === "Medication" ? "Meds" : "Visit"}</small>)}{events.length > 2 && <small className="calendar-more">+{events.length - 2}</small>}</button> : <span className="calendar-day empty" key={`empty-${index}`} />;
        })}</div>
      </section>
      <section className="selected-date-section"><div className="section-heading"><h2>{new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</h2></div>{selectedDayAppointments.length ? selectedDayAppointments.map((appointment) => <button className={`appointment-card ${selectedAppointment?.id === appointment.id ? "appointment-selected" : ""}`} type="button" key={appointment.id} onClick={() => setSelectedAppointment(appointment)}><span className="appointment-icon">{appointment.type === "Vaccine" ? <Syringe aria-hidden="true" /> : appointment.type === "Medication" ? <Pill aria-hidden="true" /> : <CalendarDays aria-hidden="true" />}</span><span className="appointment-copy"><strong>{appointment.title}</strong><small className="appointment-pet-name"><PawPrint aria-hidden="true" /> {appointment.petName}</small><small>{appointment.time} · {appointment.clinic}</small></span><ChevronRight aria-hidden="true" className="appointment-arrow" /></button>) : <p className="calendar-empty-day">No appointments on this date.</p>}{selectedAppointment && selectedDayAppointments.some((appointment) => appointment.id === selectedAppointment.id) && <article className="appointment-detail"><span className="appointment-type-label">{selectedAppointment.type === "Vaccine" ? <Syringe aria-hidden="true" /> : selectedAppointment.type === "Medication" ? <Pill aria-hidden="true" /> : <CalendarDays aria-hidden="true" />} {selectedAppointment.type}{selectedAppointment.date < new Date().toLocaleDateString("en-CA") && <span className="past-status">Completed</span>}</span><h3>{selectedAppointment.title}</h3><p><PawPrint aria-hidden="true" /> {selectedAppointment.petName}</p><p><Clock3 aria-hidden="true" /> {selectedAppointment.time}</p><p><MapPin aria-hidden="true" /> {selectedAppointment.clinic}</p>{selectedAppointment.notes && <p className="appointment-note">{selectedAppointment.notes}</p>}</article>}</section>
      <button className="primary-button" type="button" onClick={() => { setShowBookingForm(!showBookingForm); setBooked(false); }}><CalendarDays aria-hidden="true" /> {showBookingForm ? "Close booking form" : "Book appointment"}</button>
      {booked && <div className="success-banner"><Check aria-hidden="true" /> Appointment added to your calendar.</div>}
      {showBookingForm && <form className="form-panel booking-form" onSubmit={handleBooking}>
        <h2>Book an appointment</h2>
        <label>Appointment for<select name="petName" required value={bookingPet} onChange={(event) => setBookingPet(event.target.value)}><option value="" disabled>Select a pet</option>{pets.map((pet) => <option key={pet.name} value={pet.name}>{pet.species === "cat" ? "Cat" : "Dog"} · {pet.name}</option>)}</select></label>
        <label>Reason for visit<select name="reason" defaultValue="Vaccination"><option>Vaccination</option><option>Wellness check</option><option>New concern</option><option>Follow-up</option></select></label>
        <div className="form-grid"><label>Preferred date<input name="date" type="date" required value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} /></label><label>Preferred time<select name="time" defaultValue="10:30 AM"><option>10:30 AM</option><option>1:00 PM</option><option>3:30 PM</option></select></label></div>
        <label>Clinic<select name="clinic" defaultValue="Happy Pet Clinic"><option>Happy Pet Clinic</option><option>Green Paws Veterinary</option><option>City Animal Hospital</option></select></label>
        <label>Notes for the vet<textarea name="notes" rows="2" placeholder="Anything the clinic should know?" /></label>
        <button className="primary-button" type="submit"><CalendarDays aria-hidden="true" /> Confirm appointment</button>
        <button className="text-button" type="button" onClick={() => onNavigate("clinics")}><MapPin aria-hidden="true" /> Browse nearby clinics</button>
      </form>}
      <section className="reminder-panel"><div><BellRing aria-hidden="true" /><span><strong>Care reminders</strong><small>Vaccines and recurring treatments</small></span></div><button className={`toggle ${remindersOn ? "on" : ""}`} type="button" role="switch" aria-checked={remindersOn} aria-label="Toggle care reminders" onClick={() => setRemindersOn(!remindersOn)}><span /></button></section>
      <section className="record-section compact-list"><h2>Recurring care</h2><RecordRow icon={<Pill />} title="Flea & tick prevention" meta="Monthly · Next dose 01 Nov" badge={remindersOn ? "Reminder on" : "Paused"} /><RecordRow icon={<Syringe />} title="Rabies vaccine" meta="Annual · Due 29 Oct" badge={remindersOn ? "Reminder on" : "Paused"} /></section>
      </>
    </main>
  );
};

const ConsultScreen = ({ pets, onNavigate }) => {
  const [selectedPet, setSelectedPet] = useState("");
  const [triage, setTriage] = useState(false);
  const [channel, setChannel] = useState("chat");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const sendMessage = (event) => { event.preventDefault(); if (!message.trim()) return; setMessages([...messages, { from: "you", text: message.trim() }]); setMessage(""); };
  return (
    <main className="page-content">
      <PageHeading title="Vet consultation" subtitle={selectedPet ? `For ${selectedPet} · non-emergency questions and follow-ups.` : "Choose a pet before starting a consultation."} onBack={() => triage ? setTriage(false) : onNavigate("home")} />
      <PetPicker pets={pets} value={selectedPet} onChange={(petName) => { setSelectedPet(petName); setTriage(false); setMessages([]); }} label="Consultation for" />
      {!selectedPet ? <SelectionPrompt icon={<Stethoscope />} title="Who needs care advice?" detail="Choose a pet so the veterinary team can see the right health context." /> : !triage ? <>
        <section className="form-panel triage-panel"><span className="page-eyebrow">QUICK CHECK-IN</span><h2>What can we help with?</h2><p>Tell us a little about the concern so the vet can prepare.</p><div className="choice-grid">{["Eating or digestion", "Skin or itching", "Behavior change", "Follow-up question", "Other"].map((topic) => <button className={selectedTopic === topic ? "selected" : ""} type="button" key={topic} aria-pressed={selectedTopic === topic} onClick={() => setSelectedTopic(topic)}>{topic}</button>)}</div>{selectedTopic === "Other" && <label>Describe the concern<input placeholder="What would you like to discuss?" /></label>}<label>How long has this been happening?<select defaultValue="Today"><option>Today</option><option>1-3 days</option><option>More than 3 days</option><option>Ongoing</option></select></label><div className="consult-disclaimer"><CircleAlert aria-hidden="true" /> For urgent or life-threatening symptoms, contact an emergency clinic immediately.</div><div className="channel-picker"><button className={channel === "chat" ? "selected" : ""} type="button" onClick={() => setChannel("chat")}><MessageCircle aria-hidden="true" /> Chat</button><button className={channel === "video" ? "selected" : ""} type="button" onClick={() => setChannel("video")}><Video aria-hidden="true" /> Video</button></div><button className="primary-button" type="button" onClick={() => { setMessages(selectedTopic ? [{ from: "you", text: `Topic: ${selectedTopic}` }] : []); setTriage(true); }}>Continue to {channel === "chat" ? "chat" : "video consult"}</button></section>
      </> : <section className="chat-panel"><div className="chat-header"><div className="vet-avatar"><Stethoscope aria-hidden="true" /></div><span><strong>Dr. Mina S.</strong><small><span className="online-dot" /> Secure {channel} · Connected</small></span>{channel === "video" && <button className="icon-button" type="button" aria-label="Call"><Video aria-hidden="true" /></button>}</div><div className="chat-messages">{messages.length === 0 && <p className="chat-message received">Hi! I'm Dr. Mina. What would you like help with for {selectedPet}?</p>}{messages.map((item, index) => <p className={`chat-message ${item.from === "you" ? "sent" : "received"}`} key={`${item.from}-${index}`}>{item.text}</p>)}{channel === "video" && <div className="video-placeholder"><Video aria-hidden="true" /><span>Video consultation connected</span></div>}</div><form className="chat-compose" onSubmit={sendMessage}><input aria-label="Message vet" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a message..." /><button type="submit" aria-label="Send message"><Send aria-hidden="true" /></button></form></section>}
      <div className="privacy-note"><ShieldCheck aria-hidden="true" /> Your consultation is private and linked to {selectedPet}'s record.</div>
    </main>
  );
};

const LabsScreen = ({ pets, onNotice, onNavigate }) => {
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const reports = [
    { title: "Complete blood count", clinic: "Happy Pet Clinic", date: "12 Apr 2026", type: "Blood panel", result: "All values are within the expected range. Red and white blood cell counts are healthy." },
    { title: "Feline wellness panel", clinic: "Happy Pet Clinic", date: "12 Apr 2026", type: "Lab report", result: "Kidney and liver markers are within normal limits. Recheck during the next annual exam." },
    { title: "Dental X-ray summary", clinic: "Green Paws Veterinary", date: "20 Sep 2025", type: "Imaging", result: "No significant findings. Continue routine dental care and monitoring." },
  ];
  const downloadReport = (report) => {
    const content = `${report.title}\n${selectedPet}\n${report.date} · ${report.clinic}\n\nVet summary\n${report.result}\n`;
    const file = new Blob([content], { type: "text/plain" });
    const fileUrl = URL.createObjectURL(file);
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = `${report.title.toLowerCase().replaceAll(" ", "-")}.txt`;
    downloadLink.click();
    URL.revokeObjectURL(fileUrl);
    onNotice("Demo report downloaded");
  };
  return (
    <main className="page-content">
      <PageHeading title="Lab results" subtitle={selectedPet ? `Reports shared by ${selectedPet}'s veterinary team.` : "Choose a pet to view their results."} onBack={() => selectedReport ? setSelectedReport(null) : onNavigate("home")} />
      <PetPicker pets={pets} value={selectedPet} onChange={(petName) => { setSelectedPet(petName); setSelectedReport(null); }} label="Results for" />
      {!selectedPet ? <SelectionPrompt icon={<FlaskConical />} title="Select a pet first" detail="Lab reports and veterinary summaries are tied to an individual pet." /> : <>
      <div className="secure-banner"><ShieldCheck aria-hidden="true" /><span><strong>Private health records</strong><small>Only you and your care team can access these files.</small></span></div>
      {selectedReport ? <section className="form-panel report-detail"><button className="text-button" type="button" onClick={() => setSelectedReport(null)}><ArrowLeft aria-hidden="true" /> All results</button><span className="report-type"><FlaskConical aria-hidden="true" /> {selectedReport.type}</span><h2>{selectedReport.title}</h2><p>{selectedReport.date} · {selectedReport.clinic}</p><div className="result-summary"><HeartPulse aria-hidden="true" /><span><strong>Vet summary</strong><small>{selectedReport.result}</small></span></div><button className="primary-button" type="button" onClick={() => downloadReport(selectedReport)}><Download aria-hidden="true" /> Download report</button></section> : <section className="record-section"><div className="list-heading"><h2>All reports <span>3</span></h2><button className="icon-button" type="button" aria-label="Search reports"><Search aria-hidden="true" /></button></div>{reports.map((report) => <button className="report-row" type="button" key={report.title} onClick={() => setSelectedReport(report)}><span className="report-icon"><FileText aria-hidden="true" /></span><span className="record-row-copy"><strong>{report.title}</strong><small>{report.clinic} · {report.date}</small></span><ChevronRight aria-hidden="true" /></button>)}<div className="upload-placeholder"><FlaskConical aria-hidden="true" /><strong>New results are shared by your clinic</strong><small>When your vet uploads a report, it will appear here.</small></div></section>}
      </>}
    </main>
  );
};

const TipsScreen = ({ pets, onNavigate }) => {
  const [selectedPet, setSelectedPet] = useState("");
  const [topic, setTopic] = useState("All");
  const tips = [
    { tag: "Nutrition", title: "Portion sizes for a healthy weight", text: `${selectedPet} is at a healthy weight. Measure meals consistently and adjust portions with your vet if activity changes.`, color: "tip-green" },
    { tag: "Wellness", title: "Make dental care a daily habit", text: "Short, gentle brushing sessions help protect gums. Use pet-safe toothpaste and reward calm behavior.", color: "tip-yellow" },
    { tag: "Activity", title: "Build play into the day", text: "Several short play sessions can support healthy movement and reduce boredom indoors.", color: "tip-peach" },
    { tag: "Prevention", title: "Keep parasite prevention on schedule", text: "Set a recurring reminder for flea and tick treatment, and ask your clinic which product suits your pet.", color: "tip-lilac" },
  ];
  const topics = ["All", "Nutrition", "Wellness", "Activity", "Prevention"];
  return (
    <main className="page-content"><PageHeading title="Care tips" subtitle={selectedPet ? `Advice for ${selectedPet}, shaped by age, breed and weight.` : "Choose a pet to personalize care advice."} onBack={() => onNavigate("home")} /><PetPicker pets={pets} value={selectedPet} onChange={setSelectedPet} label="Care advice for" />{!selectedPet ? <SelectionPrompt icon={<Lightbulb />} title="Personalized for your pet" detail="Select a pet to see care advice matched to their breed, age and weight." /> : <><div className="topic-filters">{topics.map((item) => <button className={topic === item ? "selected" : ""} key={item} type="button" onClick={() => setTopic(item)}>{item}</button>)}</div><div className="tips-list">{tips.filter((item) => topic === "All" || item.tag === topic).map((tip) => <article className={`tip-card ${tip.color}`} key={tip.title}><span className="tip-tag">{tip.tag}</span><h2>{tip.title}</h2><p>{tip.text}</p><button type="button" className="text-button">Read more <ChevronRight aria-hidden="true" /></button></article>)}</div></>}</main>
  );
};

const ClinicsScreen = ({ onNavigate }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All pets");
  const [facility, setFacility] = useState("Any clinic");
  const clinics = [
    { name: "Happy Pet Clinic", type: "Local clinic", distance: "1.2 km away", rating: "4.9", hours: "Open until 8:00 PM", pets: "Standard pets" },
    { name: "City Animal Hospital", type: "24-hour hospital", distance: "2.8 km away", rating: "4.8", hours: "Open 24 hours", pets: "Standard · Exotic" },
    { name: "Green Paws Veterinary", type: "Specialty center", distance: "4.1 km away", rating: "4.7", hours: "Open until 7:00 PM", pets: "Standard · Large animals" },
  ];
  const filteredClinics = clinics.filter((clinic) => (facility === "Any clinic" || clinic.type === facility) && (category === "All pets" || clinic.pets.toLowerCase().includes(category.toLowerCase())) && clinic.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <main className="page-content"><PageHeading title="Find a clinic" subtitle="Explore veterinary care near you." onBack={() => onNavigate("home")} action={<button className="icon-button" type="button" aria-label="Clinic filters"><SlidersHorizontal aria-hidden="true" /></button>} /><div className="location-banner"><span className="location-icon"><Navigation aria-hidden="true" /></span><span><strong>Nearby clinics</strong><small>Location preview · Bangkok</small></span><button type="button">Change</button></div><label className="search-field"><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search clinics" /></label><div className="filter-row"><label>Pet type<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All pets</option><option>Standard</option><option>Exotic</option><option>Large animals</option></select></label><label>Facility<select value={facility} onChange={(event) => setFacility(event.target.value)}><option>Any clinic</option><option>Local clinic</option><option>24-hour hospital</option><option>Specialty center</option></select></label></div><div className="clinic-results-heading"><h2>Clinics nearby</h2><span>{filteredClinics.length} places</span></div><div className="clinic-list">{filteredClinics.map((clinic) => <article className="clinic-card" key={clinic.name}><div className="clinic-card-top"><span className="clinic-mark"><Stethoscope aria-hidden="true" /></span><span className="rating"><Star aria-hidden="true" /> {clinic.rating}</span></div><span className="clinic-type">{clinic.type}</span><h3>{clinic.name}</h3><p><MapPin aria-hidden="true" /> {clinic.distance} <span>·</span> {clinic.pets}</p><p><Clock3 aria-hidden="true" /> {clinic.hours}</p><div className="clinic-actions"><button className="outline-button" type="button"><Phone aria-hidden="true" /> Call</button><button className="primary-button" type="button"><Navigation aria-hidden="true" /> Directions</button></div></article>)}</div><p className="future-note">Clinic listings are a preview. Availability and location data are not live yet.</p></main>
  );
};

const NotificationsScreen = ({ onNavigate }) => {
  const [remindersOn, setRemindersOn] = useState(true);
  return (
    <main className="page-content"><PageHeading title="Notifications" subtitle="Health reminders and appointment updates." onBack={() => onNavigate("home")} /><section className="reminder-panel"><div><Bell aria-hidden="true" /><span><strong>Push notifications</strong><small>Appointments, vaccines and treatments</small></span></div><button className={`toggle ${remindersOn ? "on" : ""}`} type="button" role="switch" aria-checked={remindersOn} onClick={() => setRemindersOn(!remindersOn)}><span /></button></section><div className="notification-list"><h2>UPCOMING REMINDERS</h2><button className="notification-row" type="button" onClick={() => onNavigate("records")}><span className="notification-icon vaccine"><Syringe aria-hidden="true" /></span><span><strong>Rabies vaccine due soon</strong><small>Bat Man · 29 Oct · In 14 days</small></span><ChevronRight aria-hidden="true" /></button><button className="notification-row" type="button" onClick={() => onNavigate("schedule")}><span className="notification-icon visit"><CalendarDays aria-hidden="true" /></span><span><strong>DHPP booster appointment</strong><small>21 Oct · 10:30 AM · Happy Pet Clinic</small></span><ChevronRight aria-hidden="true" /></button><button className="notification-row" type="button" onClick={() => onNavigate("schedule")}><span className="notification-icon treatment"><Pill aria-hidden="true" /></span><span><strong>Flea & tick prevention</strong><small>Next monthly dose · 01 Nov</small></span><ChevronRight aria-hidden="true" /></button><div className="privacy-note"><BellRing aria-hidden="true" /> Reminder delivery is a local preview and does not send push notifications.</div></div></main>
  );
};
