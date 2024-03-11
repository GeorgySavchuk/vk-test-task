import React, {useEffect, useRef, useState} from 'react';
import {FormItem} from "@vkontakte/vkui";
import {EnterPersonName} from "../../features/enter-person-name";
import {GetPersonAge} from "../../features/get-person-age";
import {useAppDispatch, useAppSelector, useDebounce} from "../../shared/lib";
import {PersonAge} from "../../entities/person-age";
import {setFirstVisit, setIsEmptyRequest, setWasSubmitted} from "../../shared/model";
import {useQuery} from "@tanstack/react-query";
import {getPersonAge} from "../../shared/api/services/personService.ts";
import {Controller, SubmitHandler, useController, useForm} from "react-hook-form";
import {IPersonAgeFormValues} from "../../shared/api";

export const PersonAgeForm : React.FC = () => {
    const {
        handleSubmit,
        formState: {errors},
        control,
        setError
    } = useForm<IPersonAgeFormValues>()
    const {field} = useController({
        name: "name",
        control,
        defaultValue: "",
        rules: {
            required: "Данное поле не может быть пустым!",
            pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Имя может состоять только из латинских букв!"
            }
        }
    })
    const {wasSubmitted, firstVisit, isEmptyRequest} = useAppSelector(state => state.personFormReducer)
    const debouncedPersonName = useDebounce<string>(field.value)
    const [previousRequest, setPreviousRequest] = useState<string>("")
    const {data, refetch, isLoading, isRefetching, isFetched} = useQuery({
        queryKey: ["person"],
        queryFn: () => getPersonAge(field.value),
        enabled: false
    })
    const dispatch = useAppDispatch()
    const formRef = useRef<HTMLFormElement>(null)
    const confirmPersonName: SubmitHandler<IPersonAgeFormValues> = async () => {
        if (field.value !== previousRequest) {
            setPreviousRequest(field.value)
            dispatch(setWasSubmitted(true))
            await refetch()
            dispatch(setWasSubmitted(false))
            dispatch(setIsEmptyRequest(false))
        }
    }
    useEffect(() => {
        if (firstVisit) {
            dispatch(setFirstVisit(false))
        } else if (!wasSubmitted
            && debouncedPersonName
            && debouncedPersonName !== data?.name
            && formRef.current
            && debouncedPersonName !== previousRequest) {
            formRef.current.requestSubmit()
        }
    }, [debouncedPersonName])
    useEffect(() => {
        if (!field.value) {
            dispatch(setIsEmptyRequest(true))
        }
    }, [field]);
    useEffect(() => {
        if (!data?.age && isFetched) {
            setError("name", {
                type: "custom",
                message: "Не удалось получить возраст:("
            })
        }
    }, [data])
    return (
        <form onSubmit={handleSubmit(confirmPersonName)} ref={formRef} >
            <FormItem htmlFor="personName" top="Имя" bottom={errors.name && errors.name.message} status={errors.name ? "error" : "default"}>
                <Controller
                    name="name"
                    control={control}
                    render={() => (
                        <EnterPersonName field={field}/>
                    )}
                />
            </FormItem>
            {
                (isFetched && !isEmptyRequest && data?.age) && <FormItem htmlFor="personAge" top="Возраст">
                    <PersonAge age={data.age}/>
                </FormItem>
            }
            <FormItem>
                <GetPersonAge isLoading={isLoading} isRefetching={isRefetching}/>
            </FormItem>
        </form>
    );
};