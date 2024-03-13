import React from 'react';
import {Input} from "@vkontakte/vkui";
import {ControllerRenderProps} from "react-hook-form";
import {IPersonAgeFormValues} from "../../shared/api";
interface EnterPersonNameProps {
    field: ControllerRenderProps<IPersonAgeFormValues, "name">
}

export const EnterPersonName: React.FC<EnterPersonNameProps> = (({field}) => {
    return (
        <Input
            id="personName"
            placeholder="Введите имя"
            onBlur={field.onBlur}
            onChange={field.onChange}
            getRef={field.ref}
        />
    );
});
