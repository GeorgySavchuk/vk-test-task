import React from 'react';
import {FormItem, FormLayoutGroup} from "@vkontakte/vkui";
import {GetCatFact} from "../../features/get-cat-fact";
import {EnterCatFact} from "../../features/enter-cat-fact";
import {useAppSelector} from "../../shared/lib";

export const CatFactForm : React.FC = () => {
    const {isError} = useAppSelector(state => state.catFactReducer)
    return (
        <FormLayoutGroup>
            <FormItem htmlFor="catFact" bottom={isError && "Произошла ошибка при запросе!"} status={isError ? "error" : "default"}>
                <EnterCatFact/>
            </FormItem>
            <FormItem>
                <GetCatFact/>
            </FormItem>
        </FormLayoutGroup>
    );
};
