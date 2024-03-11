import React, {useEffect} from 'react';
import {Button} from "@vkontakte/vkui";
import {getCatFact} from "../../shared/api";
import {useAppDispatch, useAppSelector} from "../../shared/lib";
import {setCatFact} from "../../shared/model";
import {setError, setWasRequested} from "../../shared/model/slices/catFactSlice.ts";
import {useQuery} from "@tanstack/react-query";

export const GetCatFact: React.FC = () => {
    const {data, refetch, isLoading, isRefetching, isError} = useQuery({
        queryKey: ["cat-fact"],
        queryFn: getCatFact,
        enabled: false
    })
    const {wasRequested} = useAppSelector(state => state.catFactReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (wasRequested && data) {
            dispatch(setError(false))
            dispatch(setCatFact(data))
        } else if (isError || (wasRequested && !data)) {
            dispatch(setError(true))
        }
    }, [data, isError])
    const makeRequest = async () => {
        await refetch()
        dispatch(setWasRequested(true))
    }
    return (
        <Button
            appearance="accent-invariable"
            size="m"
            onClick={makeRequest}
            loading={isLoading || isRefetching}
        >
            Запросить факт о котах
        </Button>
    );
};
