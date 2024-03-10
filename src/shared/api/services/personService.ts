import {IPerson} from "../types.ts";
import axios from "axios";

export const getPersonAge = async (name: string) : Promise<IPerson> => {
    const {data} = await axios.get<IPerson>(`https://api.agify.io?name=${name}`)
    return data
}