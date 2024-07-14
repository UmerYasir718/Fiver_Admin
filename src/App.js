import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import MainRoutes from "./mainComponents/MainRoutes";
function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;
