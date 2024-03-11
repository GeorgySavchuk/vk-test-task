import React from "react";
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
export const vkuiProvider = (component: () => React.ReactNode) => () => (
    <ConfigProvider appearance="dark">
        <AdaptivityProvider>
            <AppRoot>
                {component()}
            </AppRoot>
        </AdaptivityProvider>
    </ConfigProvider>
)