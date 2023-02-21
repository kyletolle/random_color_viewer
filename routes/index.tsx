import { Handlers, PageProps } from "$fresh/server.ts";
// import Counter from "../islands/Counter.tsx";
import { config } from "https://deno.land/std@0.145.0/dotenv/mod.ts";
import { Client,
  ConnectionError,
  PostgresError,
  TransactionError, } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import ColorTile from "../components/ColorTile.tsx";

const envConfig = await config();
const databaseUrl = envConfig.DATABASE_URL || Deno.env.get('DATABASE_URL');
const client = new Client(databaseUrl);

interface RandomColor {
  colors: string[];
  now: string;
}

const NUM_COLORS = 5;

(async () => {
})();

export const handler: Handlers<RandomColor> = {
  async GET(_, ctx) {
    const colors = [];
    for(let i = 0; i < NUM_COLORS; i++) {
      const randomColorPayload = await fetch('https://kyletolle-random-color-api.deno.dev/');
      if (randomColorPayload.status !== 200) {
        const defaultColor = '#FFF';
        console.warn('Color fetch did not work; falling back to white');
        colors.push(defaultColor);
        continue;
      }

      const randomColor = await randomColorPayload.text();
      colors.push(randomColor);
    }

    let now = "DB query didn't work";
    await client.connect();

    // TODO: Create the database, catch error if created?
    // TODO: Create the table, catch error if created?

    try {
      const results = await client.queryArray<[Date]>("SELECT NOW()");
      now = results.rows[0][0].toLocaleString();
      console.log('Now is', now);
    } catch (err) {
      console.error("error executing query:", err);
    } finally {
      await client.end();
    }

    return ctx.render({ colors, now });
  }
}

export default function Home({ data }: PageProps<RandomColor>) {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <p class="my-6">
        Welcome to random_color_viewer!
      </p>
      {/* <Counter start={3} /> */}
      <p>Here should be {NUM_COLORS} color tiles...</p>
      <div style={{display: 'flex'}}>
        {data.colors.map(color => <ColorTile color={color} />)}
      </div>
      <p>The time is currently {data.now}</p>
    </div>
  );
}
