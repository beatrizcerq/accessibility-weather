import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import ReportForm from "./ReportForm";

function App() {
  const [reports, setReports] = useState([]);

  const center = [39.9812, -75.1550];

  useEffect(() => {
    fetch("http://localhost:3000/api/reports")
      .then((response) => response.json())
      .then((data) => {
        setReports(data);
      })
      .catch((error) => {
        console.error("Error loading reports:", error);
      });
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Accessibility Weather</h1>
        <p>
          Check current accessibility conditions before you travel.
        </p>
      </header>

      <main>
        <section className="map-section">
          <h2>Accessibility Conditions</h2>

          <MapContainer
            center={center}
            zoom={16}
            className="map"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {reports.map((report) => (
              <Marker
                key={report.id}
                position={center}
              >
                <Popup>
                  <strong>{report.issue_type}</strong>
                  <br />
                  {report.location}
                  <br />
                  {report.description}
                  <br />
                  <br />
                  Expected duration: {report.duration}
                  <br />
                  Reported: {report.created_at}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </section>

        <ReportForm />
      </main>
    </div>
  );
}

export default App;