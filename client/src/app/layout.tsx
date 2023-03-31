import { FC, PropsWithChildren } from "react"

export const metadata = {
    title: 'Example title',
    description: 'Example description',
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}

export default RootLayout
