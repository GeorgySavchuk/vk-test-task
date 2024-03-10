import React  from 'react';
import {Button} from "@vkontakte/vkui";
interface GetPersonAgeProps {
    isLoading: boolean;
    isRefetching: boolean;
}

export const GetPersonAge : React.FC<GetPersonAgeProps> = ({isLoading, isRefetching}) => {
    return (
        <Button
            appearance="accent-invariable"
            size="m"
            loading={isLoading || isRefetching}
            type="submit"
        >
            Получить возраст человека
        </Button>
    );
};
