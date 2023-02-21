import { Handlers, PageProps } from "$fresh/server.ts";
import { Model } from "https://deno.land/x/denodb/mod.ts";
import ColorTile from "../components/ColorTile.tsx";
import db from "../database/db.ts";
import Color from '../database/models/Color.ts';

const client = db.getClient();

interface RandomColor {
  colors: Model[];
}

const NUM_COLORS = 5;

(async () => {
})();

export const handler: Handlers<RandomColor> = {
  async GET(_, ctx) {
    for (let i = 0; i < NUM_COLORS; i++) {
      const randomColorPayload = await fetch(
        "https://kyletolle-random-color-api.deno.dev/",
      );
      if (randomColorPayload.status !== 200) {
        console.warn("Color fetch did not work");
        continue;
      }

      const randomColor = await randomColorPayload.text();
      Color.create([{ hex_value: randomColor }])
    }

     let colors: Model[] = [];
     try {
      colors = await Color.all();
     } catch (error) {
      console.warn('Could not get colors from DB');
     }

    return ctx.render({ colors });
  },
};

export default function Home({ data }: PageProps<RandomColor>) {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <p class="my-6">
        Welcome to random_color_viewer!
      </p>
      {/* <Counter start={3} /> */}
      <p>Here should be {NUM_COLORS} color tiles...</p>
      <div style={{ display: "flex" }}>
        {data.colors.map((color) => <ColorTile color={color.hex_value as string} />)}
      </div>
      <p>The time is currently {data.now}</p>
    </div>
  );
}
