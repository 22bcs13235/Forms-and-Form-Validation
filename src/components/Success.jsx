import { useLocation } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();

  return (
    <div className="form">
      <h2>Form Submitted Successfully</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
