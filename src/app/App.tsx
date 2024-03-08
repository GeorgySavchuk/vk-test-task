import React, {useState} from 'react'
import {
    AdaptivityProvider,
    AppRoot,
    Cell,
    ConfigProvider, Group,
    Panel,
    PanelHeader,
    SplitCol,
    SplitLayout,
    useAdaptivityConditionalRender,
    View,
} from "@vkontakte/vkui";

import '@vkontakte/vkui/dist/vkui.css';
import {CatFactForm} from "../widgets/cat-fact-form";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";
import {setupStore} from "../shared/model/store.ts";
export const App : React.FC = () => {
    const { viewWidth } = useAdaptivityConditionalRender()
    const [panel, setPanel] = useState<string>("Часть 1")
    const panels = ["Часть 1", "Часть 2"]
    return (
        <Provider store={setupStore()}>
            <QueryClientProvider client={new QueryClient()}>
                <ConfigProvider appearance="dark">
                    <AdaptivityProvider>
                        <AppRoot>
                            <SplitLayout
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "1rem"
                                }}
                                header={<PanelHeader delimiter="none">Профильное задание</PanelHeader>}
                            >
                                {viewWidth.tabletPlus && (
                                    <SplitCol width={280} maxWidth={280}>
                                        <Panel>
                                            <Group>
                                                {panels.map((i) => (
                                                    <Cell key={i} hovered={i === panel} onClick={() => setPanel(i)}>
                                                        {i}
                                                    </Cell>
                                                ))}
                                            </Group>
                                        </Panel>
                                    </SplitCol>
                                )}
                                <SplitCol width="100%" maxWidth="450px" autoSpaced>
                                    <View
                                        activePanel={panel}
                                    >
                                        <Panel id="Часть 1">
                                            <Group>
                                                <CatFactForm/>
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

