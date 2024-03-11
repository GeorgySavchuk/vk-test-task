import React from 'react';
import {Group, Panel, SplitCol, SplitLayout, useAdaptivityWithJSMediaQueries, View} from "@vkontakte/vkui";
import {PanelsSelector} from "../../widgets/panels-selector";
import {CatFactForm} from "../../widgets/cat-fact-form";
import {PanelsSelectorItem} from "../../entities/panels-selector-item";
import {PersonAgeForm} from "../../widgets/person-age-form";
import {useAppSelector} from "../../shared/lib";

export const HomePage : React.FC = () => {
    const {isDesktop} = useAdaptivityWithJSMediaQueries()
    const {activePanel} = useAppSelector(state => state.panelReducer)
    return (
        <SplitLayout
            style={{
                justifyContent: "center",
                marginTop: isDesktop ? '1rem' : 0
            }}
        >
            {
                isDesktop && (
                    <SplitCol width={280} maxWidth={280}>
                        <Panel>
                            <PanelsSelector/>
                        </Panel>
                    </SplitCol>
                )
            }
            <SplitCol width="100%" maxWidth="450px" autoSpaced>
                <View activePanel={activePanel}>
                    <Panel id="Часть 1">
                        <Group>
                            <CatFactForm/>
                            {!isDesktop && <PanelsSelectorItem panelTitle="Часть 2"/>}
                        </Group>
                    </Panel>
                    <Panel id="Часть 2">
                        <Group>
                            <PersonAgeForm/>
                            {!isDesktop && <PanelsSelectorItem panelTitle="Часть 1"/>}
                        </Group>
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
