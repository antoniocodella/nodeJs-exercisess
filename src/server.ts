import "dotenv/config";

import app from "./app";

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`[server]: Server in running at http://localhost${port}!`);
});
