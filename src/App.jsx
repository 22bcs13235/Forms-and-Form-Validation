import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Success from "./components/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
