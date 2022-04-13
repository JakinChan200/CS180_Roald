import { NavBar } from "../../components/NavBar/NavBar";
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export const Home = () => {
    return (<NavBar><ComposableMap>  <Geographies geography={geoUrl}>
        {({ geographies }) =>
            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
    </Geographies></ComposableMap></NavBar>)
};