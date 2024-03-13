import React from 'react';
import {Button} from "@vkontakte/vkui";
import {QueryClient} from "@tanstack/react-query";
import {useAppDispatch} from "../../shared/lib";
import {setPreviousRequest} from "../../shared/model";

interface GetPersonAgeProps {
    formRef: React.RefObject<HTMLFormElement>;
    queryClient: QueryClient;
    isRequestNotProcessed: boolean;
}

export const GetPersonAge: React.FC<GetPersonAgeProps> = ({formRef, queryClient, isRequestNotProcessed}) => {
    const dispatch = useAppDispatch()
    const handleClick = () => {
        if (isRequestNotProcessed) {
            queryClient.cancelQueries({
                queryKey: ["person"],
                exact: true
            })
            dispatch(setPreviousRequest(""))
            formRef.current?.requestSubmit()
        }
    }
    return (
        <Button
            appearance="accent-invariable"
            size="m"
            type="submit"
            onClick={handleClick}
        >
            Получить возраст человека
        </Button>
    );
};
