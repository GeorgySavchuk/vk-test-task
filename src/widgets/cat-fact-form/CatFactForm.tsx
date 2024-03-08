import React from 'react';
import {FormItem, FormLayoutGroup} from "@vkontakte/vkui";
import {GetCatFact} from "../../features/get-cat-fact";
import {EnterCatFact} from "../../features/enter-cat-fact";

export const CatFactForm : React.FC = () => {
    return (
        <FormLayoutGroup>
            <FormItem>
                <EnterCatFact/>
            </FormItem>
            <FormItem>
                <GetCatFact/>
            </FormItem>
        </FormLayoutGroup>
    );
};
