import { IconWorld } from "@tabler/icons";
import "./NavBar.css";
import { countries } from "../../constants/countries";
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <IconWorld width="30" height="30" />
      </Link>
      <div className="pages">
        {countries.map((country) => (
          <Link
            to={`/${country}`}
            key={country}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h3>{country}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};
