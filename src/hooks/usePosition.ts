import { Geolocation, Position } from "@capacitor/geolocation";
import { useEffect, useState } from "react";

export function usePosition() {
    const [position, setPosition] = useState<Position>();

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            {
                enableHighAccuracy: true,
                maximumAge: 250,
            },
            (newPos, err) => {
                err && console.error(err);
                console.log("position updated " + Date.now());
                setPosition(newPos ?? undefined);
            }
        );

        // return () => {
        //     (async () => Geolocation.clearWatch({ id: await watchId }))();
        // };
    }, []);

    return position;
}
