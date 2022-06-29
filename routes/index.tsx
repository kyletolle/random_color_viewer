/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
// import Counter from "../islands/Counter.tsx";
import { config } from "https://deno.land/std@0.145.0/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import ColorTile from "../components/ColorTile.tsx";

const envConfig = await config();
const databaseUrl = envConfig.DATABASE_URL;
const client = new Client(databaseUrl);

interface RandomColor {
  colors: string[];
}

const NUM_COLORS = 5;


(async () => {
  await client.connect();
  try {
    const results = await client.queryArray("SELECT NOW()");
    console.log(results.rows[0][0]);
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    await client.end();
  }
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

    return ctx.render({ colors });
  }
}

export default function Home({ data }: PageProps<RandomColor>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <p class={tw`my-6`}>
        Welcome to random_color_viewer!
      </p>
      {/* <Counter start={3} /> */}
      <p>Here should be {NUM_COLORS} color tiles...</p>
      <div style={{display: 'flex'}}>
        {data.colors.map(color => <ColorTile color={color} />)}
      </div>
    </div>
  );
}
