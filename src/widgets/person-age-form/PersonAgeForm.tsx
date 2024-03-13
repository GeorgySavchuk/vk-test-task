import React, {useEffect, useRef} from 'react';
import {Button, FormItem} from "@vkontakte/vkui";
import {EnterPersonName} from "../../features/enter-person-name";
import {GetPersonAge} from "../../features/get-person-age";
import {useAppDispatch, useAppSelector, useDebounce} from "../../shared/lib";
import {PersonAge} from "../../entities/person-age";
import {setFirstVisit, setIsEmptyRequest, setPreviousRequest, setWasSubmitted} from "../../shared/model";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getPersonAge} from "../../shared/api";
import {Controller, SubmitHandler, useController, useForm} from "react-hook-form";
import {IPersonAgeFormValues} from "../../shared/api";

export const PersonAgeForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const formRef = useRef<HTMLFormElement>(null)
    const queryClient = useQueryClient()
    const {
        handleSubmit,
        formState: {errors},
        control,
        setError,
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
    const {wasSubmitted, firstVisit, isEmptyRequest, previousRequest} = useAppSelector(state => state.personFormReducer)
    const debouncedPersonName = useDebounce<string>(field.value)
    const {data, refetch, isLoading, isRefetching, isFetched} = useQuery({
        queryKey: ["person"],
        queryFn: ({signal}) => getPersonAge(field.value, signal),
        enabled: false
    })

    const confirmPersonName: SubmitHandler<IPersonAgeFormValues> = async () => {
        if (field.value !== previousRequest) {
            dispatch(setPreviousRequest(field.value))
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
        <form onSubmit={handleSubmit(confirmPersonName)} ref={formRef}>
            <FormItem
                htmlFor="personName"
                top="Имя"
                bottom={errors.name && errors.name.message}
                status={errors.name ? "error" : "default"}
            >
                <Controller
                    name="name"
                    control={control}
                    render={() => (
                        <EnterPersonName field={field}/>
                    )}
                />
            </FormItem>
            {
                (!isEmptyRequest && data?.age && !isLoading && !isRefetching) && <FormItem htmlFor="personAge" top="Возраст">
                    <PersonAge age={data.age}/>
                </FormItem>
            }
            <FormItem style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '.5rem'
            }}>
                <GetPersonAge formRef={formRef} queryClient={queryClient} isRequestNotProcessed={isRefetching || isLoading}/>
                {(isLoading || isRefetching) && <Button appearance="accent-invariable" size="m" loading={true}/>}
            </FormItem>
        </form>
    );
};
