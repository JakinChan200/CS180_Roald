import { IconWorld } from '@tabler/icons';
import "./NavBar.css";

const pages = [
    "US",
    "DE",
    "CA"
];

export const NavBar: React.FC = () => {
    return <div className="navbar"><IconWorld width="30" height="30" /><div className="pages">{pages.map((pg) => <h3>{pg}</h3>)}</div></div>
}