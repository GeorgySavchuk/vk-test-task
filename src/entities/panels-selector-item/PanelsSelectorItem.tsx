import React from 'react';
import {Cell} from "@vkontakte/vkui";
import {useAppDispatch} from "../../shared/lib";
import {setActivePanel} from "../../shared/model";
interface PanelProps {
    isHovered?: boolean;
    panelTitle: string
}

export const PanelsSelectorItem : React.FC<PanelProps> = ({isHovered, panelTitle}) => {
    const dispatch = useAppDispatch()
    const setPanel = () => {
        dispatch(setActivePanel(panelTitle))
    }
    return (
        <Cell hovered={isHovered} onClick={setPanel}>
            {panelTitle}
        </Cell>
    );
};
