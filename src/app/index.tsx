import {withProviders} from "./providers";
import {HomePage} from "../pages/home-page";

const App = () => {
    return (
        <HomePage/>
    );
}
export default withProviders(App)
