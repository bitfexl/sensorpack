import { Geolocation, Position } from "@capacitor/geolocation";
import { useEffect, useState } from "react";
import { usePosition } from "../hooks/usePosition";

export function Location() {
    const [position, setPosition] = useState<Position>();
    const [updateCounter, setUpdateCounter] = useState(0);
    const [updatesOn, setUpdatesOn] = useState(false);

    useEffect(() => {
        updatesOn &&
            Geolocation.requestPermissions({ permissions: ["location"] }).then(
                () => {
                    const watchId = Geolocation.watchPosition(
                        {
                            enableHighAccuracy: true,
                            timeout: 1000,
                            maximumAge: 0,
                        },
                        (newPos, err) => {
                            err && console.error("Error updating position:", err);
                            console.log("position updated " + Date.now(), newPos);
                            setPosition(newPos ?? undefined);
                            setUpdateCounter((c) => c + 1);
                        }
                    );

                    return () => {
                        (async () => Geolocation.clearWatch({ id: await watchId }))();
                    };
                },
                (err) => {
                    console.error("Error requesting permission:", err);
                }
            );
    }, [updatesOn]);

    return (
        <div>
            <button onClick={() => setUpdatesOn(!updatesOn)}>Turn updates {updatesOn ? "off" : "on"}</button>
            {position ? <pre>{JSON.stringify(position, null, 2)}</pre> : <p>Click update to load location.</p>}
            <p>Update: {updateCounter}</p>
        </div>
    );
}
