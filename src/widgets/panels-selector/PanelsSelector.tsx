import React from 'react';
import {PANELS} from "../../shared/config";
import {Group} from "@vkontakte/vkui";
import {PanelsSelectorItem} from "../../entities/panels-selector-item";
import {useAppSelector} from "../../shared/lib";

export const PanelsSelector : React.FC = () => {
    const {activePanel} = useAppSelector(state => state.panelReducer)
    return (
        <Group>
            {PANELS.map((panel) => (
                <PanelsSelectorItem panelTitle={panel} key={panel} isHovered={panel === activePanel}/>
            ))}
        </Group>
    );
};
