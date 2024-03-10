import React from 'react';
import {Div} from "@vkontakte/vkui";
interface PersonAgeProps {
    age: number;
}

export const PersonAge : React.FC<PersonAgeProps> = ({age}) => {
    return (
        <Div
            id="personAge"
            style={{
                height: '36px',
                padding: '0 12px',
                color: '#e1e3e6',
                backgroundColor: '#232324',
                border: '.5px solid hsla(0, 0%, 100%, .12)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {age}
        </Div>
    );
};