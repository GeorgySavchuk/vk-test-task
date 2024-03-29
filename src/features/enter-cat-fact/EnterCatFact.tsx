import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {Textarea} from "@vkontakte/vkui";
import {useAppSelector} from "../../shared/lib";

export const EnterCatFact: React.FC = () => {
    const {catFact, isError} = useAppSelector(state => state.catFactReducer)
    const [input, setInput] = useState<string>("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (!isError) {
            setInput(catFact.fact)
        }
    }, [catFact, isError]);
    useEffect(() => {
        if (input && textAreaRef.current && input === catFact.fact) {
            const newPointerPosition = input.trim().split(" ")[0].length
            textAreaRef.current.setSelectionRange(newPointerPosition, newPointerPosition)
            textAreaRef.current.focus()
        }
    }, [input]);
    const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
        setInput(e.currentTarget.value)
    }
    return (
        <Textarea
            placeholder="Введите факт о котах"
            value={input}
            rows={7}
            onChange={handleChange}
            grow={true}
            id="catFact"
            getRef={textAreaRef}
        />
    );
};