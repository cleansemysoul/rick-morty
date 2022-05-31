import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as Switch,
} from "react-router-dom";
import Character from "./pages/Character";
import Home from "./pages/Home";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/home/:page" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Switch>
    </Router>
  );
}
