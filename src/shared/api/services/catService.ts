import {ICatFact} from "../types.ts";
import axios from "axios";

export const getCatFact = async (): Promise<ICatFact> => {
    const {data} = await axios.get<ICatFact>("https://catfact.ninja/fact")
    return data
}