export default async function handler(req, res) {
    const { uid } = req.query;

    if (!uid || uid.length < 8 || uid.length > 12) {
        return res.status(400).json({ error: "Invalid UID! Must be 8 to 12 digits." });
    }

    const apiUrl = `https://freefire-virusteam.vercel.app/ind/visit?key=Virus&uid=${uid}&sl=50`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.message) {
            return res.status(500).json({ error: "Unexpected API response." });
        }

        res.status(200).json({
            success: true,
            player: {
                name: data.message.Name,
                uid: data.message.UID,
                successful_visits: data.message.Successful,
                failed_visits: data.message.Failed,
                time_taken: data.message.Time,
                speed: data.message.Speed
            }
        });

    } catch (error) {
        res.status(500).json({ error: "API request failed.", details: error.message });
    }
}
