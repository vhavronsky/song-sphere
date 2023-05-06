import { FC } from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'SongSphere TrackPage',
}

interface TrackPageProps {
    params: {
        id: string
    }
}

export const TrackPage: FC<TrackPageProps> = ({ params }) => {
    const { id } = params

    return ( 
        <>
            <h1>TrackPage</h1>
            <span>Track ID: {id}</span>
        </>
    )
}
