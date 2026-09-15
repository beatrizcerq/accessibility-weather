import { useState } from "react";

function ReportForm() {
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const report = {
      issueType,
      location,
      description,
      duration,
    };

    try {
      const response = await fetch("http://localhost:3000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      const savedReport = await response.json();

      console.log("Saved report:", savedReport);

      alert("Accessibility issue reported!");

      // Clear the form
      setIssueType("");
      setLocation("");
      setDescription("");
      setDuration("");
    } catch (error) {
      console.error(error);
      alert("Could not submit the report.");
    }
  };

  return (
    <section className="report-section">
      <h2>Report an Accessibility Issue</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Issue Type
          <select
            value={issueType}
            onChange={(event) => setIssueType(event.target.value)}
            required
          >
            <option value="">Select an issue</option>
            <option value="Elevator">Elevator out of service</option>
            <option value="Entrance">Accessible entrance closed</option>
            <option value="Door">Automatic door broken</option>
            <option value="Pathway">Accessible pathway blocked</option>
            <option value="Restroom">
              Accessible restroom unavailable
            </option>
            <option value="Construction">Construction</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Location
          <input
            type="text"
            placeholder="e.g. Anderson Hall"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            placeholder="Describe the accessibility issue..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label>
          Expected Duration
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            required
          >
            <option value="">Select duration</option>
            <option value="Less than 1 hour">Less than 1 hour</option>
            <option value="Several hours">Several hours</option>
            <option value="Today">Today</option>
            <option value="Unknown">Unknown</option>
          </select>
        </label>

        <button type="submit">
          Report Issue
        </button>
      </form>
    </section>
  );
}

export default ReportForm;