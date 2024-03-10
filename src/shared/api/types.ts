export interface ICatFact {
    fact: string;
    length: number;
}
export interface IPerson {
    count: number;
    name: string;
    age: number | null;
}
export interface IPersonAgeFormValues {
    name: string;
    nameError: string;
}