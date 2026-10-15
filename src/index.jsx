import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  BellRing,
  CalendarDays,
  Cat,
  Check,
  ChevronDown,
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
    openPage("profile");
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
      {page === "profile" && <ProfileScreen onBack={() => openPage("home")} selectedPet={selectedPet} pets={pets} isNew={isCreatingPet} onSaved={(profile) => { setPets((currentPets) => isCreatingPet ? [...currentPets, profile] : currentPets.map((pet) => pet.name === selectedPet ? profile : pet)); setSelectedPet(profile.name); setIsCreatingPet(false); openPage("home"); showNotice(isCreatingPet ? "Pet profile created" : "Pet profile saved"); }} />}
      {page === "records" && <RecordsScreen pets={pets} onNavigate={openPage} />}
      {page === "schedule" && <ScheduleScreen pets={pets} onNavigate={openPage} onBooked={() => showNotice("Appointment added to your schedule")} />}
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
      <span className="page-eyebrow">BAT MAN'S CARE</span>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    {action}
  </div>
);

const PetPicker = ({ pets, value, onChange, label = "Select a pet" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activePet = pets.find((pet) => pet.name === value);
  return (
    <div className="pet-picker">
      <span className="field-label">{label}</span>
      <button className="pet-picker-trigger" type="button" aria-haspopup="listbox" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {activePet ? <>{activePet.species === "cat" ? <Cat aria-hidden="true" /> : <Dog aria-hidden="true" />}<span>{activePet.name}</span></> : <><PawPrint aria-hidden="true" /><span>Choose a pet</span></>}
        <ChevronDown aria-hidden="true" className={isOpen ? "is-open" : ""} />
      </button>
      {isOpen && <div className="pet-picker-options" role="listbox" aria-label={label}>{pets.map((pet) => <button className={pet.name === value ? "selected" : ""} type="button" role="option" aria-selected={pet.name === value} key={pet.name} onClick={() => { onChange(pet.name); setIsOpen(false); }}>
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

const RecordsScreen = ({ pets, onNavigate }) => {
  const [selectedPet, setSelectedPet] = useState("");
  const [activeTab, setActiveTab] = useState("vaccinations");
  return (
    <main className="page-content">
      <PageHeading title="Health records" subtitle={selectedPet ? `${selectedPet}'s vaccinations, visits and medications.` : "Choose a pet to view their health records."} onBack={() => onNavigate("home")} />
      <PetPicker pets={pets} value={selectedPet} onChange={setSelectedPet} label="View records for" />
      {!selectedPet ? <SelectionPrompt icon={<FileText />} title="Select a pet first" detail="Vaccines, medical history and medications will be shown for the pet you choose." /> : <>
      <div className="record-health-banner"><HeartPulse aria-hidden="true" /><span><strong>Looking good</strong><small>Next vaccine due in 14 days</small></span><button type="button" onClick={() => onNavigate("schedule")}>Book visit</button></div>
      <div className="segmented-tabs" role="tablist" aria-label="Record type">
        <button className={activeTab === "vaccinations" ? "selected" : ""} type="button" role="tab" aria-selected={activeTab === "vaccinations"} onClick={() => setActiveTab("vaccinations")}>Vaccines</button>
        <button className={activeTab === "history" ? "selected" : ""} type="button" role="tab" aria-selected={activeTab === "history"} onClick={() => setActiveTab("history")}>Medical history</button>
        <button className={activeTab === "medications" ? "selected" : ""} type="button" role="tab" aria-selected={activeTab === "medications"} onClick={() => setActiveTab("medications")}>Meds</button>
      </div>
      {activeTab === "vaccinations" && <section className="record-section"><h2>Upcoming</h2><RecordRow icon={<Syringe />} title="Rabies vaccine" meta="Due 29 Oct 2026" badge="Due soon" /><RecordRow icon={<Syringe />} title="DHPP booster" meta="Due 21 Oct 2026" badge="Scheduled" /><h2>Completed</h2><RecordRow icon={<Check />} title="Feline leukemia" meta="Given 12 Apr 2026 · Happy Pet Clinic" badge="Complete" /><RecordRow icon={<Check />} title="Rabies vaccine" meta="Given 29 Oct 2025 · Happy Pet Clinic" badge="Complete" /></section>}
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

const ScheduleScreen = ({ pets, onNavigate, onBooked }) => {
  const [selectedPet, setSelectedPet] = useState("");
  const [booked, setBooked] = useState(false);
  const [remindersOn, setRemindersOn] = useState(true);
  const handleBooking = (event) => { event.preventDefault(); setBooked(true); onBooked(); };
  return (
    <main className="page-content">
      <PageHeading title="Appointments" subtitle="Choose a pet before viewing or booking an appointment." onBack={() => onNavigate("home")} />
      <PetPicker pets={pets} value={selectedPet} onChange={(petName) => { setSelectedPet(petName); setBooked(false); }} label="Appointment for" />
      {!selectedPet ? <SelectionPrompt icon={<CalendarDays />} title="Who is this appointment for?" detail="Select a pet to see their upcoming visits, book care and manage reminders." /> : <>
      <section className="upcoming-section"><div className="section-heading"><h2>NEXT APPOINTMENT</h2></div><button className="appointment-card" type="button"><span className="appointment-icon"><CalendarDays aria-hidden="true" /></span><span className="appointment-copy"><strong>DHPP booster</strong><small>21 Oct · 10:30 AM · Happy Pet Clinic</small></span><ChevronRight aria-hidden="true" className="appointment-arrow" /></button></section>
      <form className="form-panel booking-form" onSubmit={handleBooking}>
        <h2>Book a visit for {selectedPet}</h2>
        {booked && <div className="success-banner"><Check aria-hidden="true" /> Appointment saved to your schedule.</div>}
        <label>Reason for visit<select defaultValue="Vaccination"><option>Vaccination</option><option>Wellness check</option><option>New concern</option><option>Follow-up</option></select></label>
        <div className="form-grid"><label>Preferred date<input type="date" required defaultValue="2026-10-21" /></label><label>Preferred time<select defaultValue="10:30"><option value="10:30">10:30 AM</option><option value="13:00">1:00 PM</option><option value="15:30">3:30 PM</option></select></label></div>
        <label>Clinic<select defaultValue="happy"><option value="happy">Happy Pet Clinic</option><option>Green Paws Veterinary</option><option>City Animal Hospital</option></select></label>
        <label>Notes for the vet<textarea rows="2" placeholder="Anything the clinic should know?" /></label>
        <button className="primary-button" type="submit"><CalendarDays aria-hidden="true" /> Confirm appointment</button>
        <button className="text-button" type="button" onClick={() => onNavigate("clinics")}><MapPin aria-hidden="true" /> Browse nearby clinics</button>
      </form>
      <section className="reminder-panel"><div><BellRing aria-hidden="true" /><span><strong>Care reminders</strong><small>Vaccines and recurring treatments</small></span></div><button className={`toggle ${remindersOn ? "on" : ""}`} type="button" role="switch" aria-checked={remindersOn} aria-label="Toggle care reminders" onClick={() => setRemindersOn(!remindersOn)}><span /></button></section>
      <section className="record-section compact-list"><h2>Recurring care</h2><RecordRow icon={<Pill />} title="Flea & tick prevention" meta="Monthly · Next dose 01 Nov" badge={remindersOn ? "Reminder on" : "Paused"} /><RecordRow icon={<Syringe />} title="Rabies vaccine" meta="Annual · Due 29 Oct" badge={remindersOn ? "Reminder on" : "Paused"} /></section>
      </>}
    </main>
  );
};

const ConsultScreen = ({ pets, onNavigate }) => {
  const [selectedPet, setSelectedPet] = useState("");
  const [triage, setTriage] = useState(false);
  const [channel, setChannel] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const sendMessage = (event) => { event.preventDefault(); if (!message.trim()) return; setMessages([...messages, { from: "you", text: message.trim() }]); setMessage(""); };
  return (
    <main className="page-content">
      <PageHeading title="Vet consultation" subtitle={selectedPet ? `For ${selectedPet} · non-emergency questions and follow-ups.` : "Choose a pet before starting a consultation."} onBack={() => triage ? setTriage(false) : onNavigate("home")} />
      <PetPicker pets={pets} value={selectedPet} onChange={(petName) => { setSelectedPet(petName); setTriage(false); setMessages([]); }} label="Consultation for" />
      {!selectedPet ? <SelectionPrompt icon={<Stethoscope />} title="Who needs care advice?" detail="Choose a pet so the veterinary team can see the right health context." /> : !triage ? <>
        <div className="vet-profile"><div className="vet-avatar"><Stethoscope aria-hidden="true" /></div><div><strong>Dr. Mina S.</strong><span>Small animal veterinarian</span><small><span className="online-dot" /> Available now · Usually replies in 5 min</small></div><span className="rating"><Star aria-hidden="true" /> 4.9</span></div>
        <section className="form-panel triage-panel"><span className="page-eyebrow">QUICK CHECK-IN</span><h2>What can we help with?</h2><p>Tell us a little about the concern so the vet can prepare.</p><div className="choice-grid"><button type="button" onClick={() => setChannel("chat")}>Eating or digestion</button><button type="button" onClick={() => setChannel("chat")}>Skin or itching</button><button type="button" onClick={() => setChannel("video")}>Behavior change</button><button type="button" onClick={() => setChannel("chat")}>Follow-up question</button></div><label>How long has this been happening?<select defaultValue="Today"><option>Today</option><option>1-3 days</option><option>More than 3 days</option><option>Ongoing</option></select></label><div className="consult-disclaimer"><CircleAlert aria-hidden="true" /> For urgent or life-threatening symptoms, contact an emergency clinic immediately.</div><div className="channel-picker"><button className={channel === "chat" ? "selected" : ""} type="button" onClick={() => setChannel("chat")}><MessageCircle aria-hidden="true" /> Chat</button><button className={channel === "video" ? "selected" : ""} type="button" onClick={() => setChannel("video")}><Video aria-hidden="true" /> Video</button></div><button className="primary-button" type="button" onClick={() => setTriage(true)}>Continue to {channel === "chat" ? "chat" : "video consult"}</button></section>
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
