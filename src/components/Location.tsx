import { Geolocation, Position } from "@capacitor/geolocation";
import { useState } from "react";

export function Location() {
    const [position, setPosition] = useState<Position>();

    async function update() {
        setPosition(await Geolocation.getCurrentPosition());
    }

    return (
        <div>
            <button onClick={update}>Update</button>

            {position ? <pre>{JSON.stringify(position, null, 2)}</pre> : <p>Click update to load location.</p>}
        </div>
    );
}
