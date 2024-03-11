import React, {useState} from 'react'
import {
    AdaptivityProvider,
    AppRoot,
    Cell,
    ConfigProvider, Group,
    Panel,
    SplitCol,
    SplitLayout,
    useAdaptivityWithJSMediaQueries,
    View,
} from "@vkontakte/vkui";

import '@vkontakte/vkui/dist/vkui.css';
import {CatFactForm} from "../widgets/cat-fact-form";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";
import {setupStore} from "../shared/model/store.ts";
import {PersonAgeForm} from "../widgets/person-age-form";
import {PANELS} from "../shared/config";
export const App : React.FC = () => {
    const { isDesktop} = useAdaptivityWithJSMediaQueries()
    const [panel, setPanel] = useState<string>("Часть 1")
    return (
        <Provider store={setupStore()}>
            <QueryClientProvider client={new QueryClient()}>
                <ConfigProvider appearance="dark">
                    <AdaptivityProvider>
                        <AppRoot>
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
                                                <Group>
                                                    {PANELS.map((i) => (
                                                        <Cell key={i} hovered={i === panel} onClick={() => setPanel(i)}>
                                                            {i}
                                                        </Cell>
                                                    ))}
                                                </Group>
                                            </Panel>
                                        </SplitCol>
                                    )
                                }
                                <SplitCol width="100%" maxWidth="450px" autoSpaced>
                                    <View activePanel={panel}>
                                        <Panel id="Часть 1">
                                            <Group>
                                                <CatFactForm/>
                                                {!isDesktop && <Cell onClick={() => setPanel("Часть 2")}>Часть 2</Cell>}
                                            </Group>
                                        </Panel>
                                        <Panel id="Часть 2">
                                            <Group>
                                                <PersonAgeForm/>
                                                {!isDesktop && <Cell onClick={() => setPanel("Часть 1")}>Часть 1</Cell>}
                                            </Group>
                                        </Panel>
                                    </View>
                                </SplitCol>
                            </SplitLayout>
                        </AppRoot>
                    </AdaptivityProvider>
                </ConfigProvider>
            </QueryClientProvider>
        </Provider>
    );
}

