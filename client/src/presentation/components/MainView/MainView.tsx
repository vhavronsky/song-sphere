import { FC, PropsWithChildren } from "react";

export const MainView: FC<PropsWithChildren> = ({ children }) => {
    return (
        <main className="main-view">
            {children}
        </main>
    )
}
