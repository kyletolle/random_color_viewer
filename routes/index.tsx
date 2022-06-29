/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import ColorTile from "../components/ColorTile.tsx";

interface RandomColor {
  colors: string[];
}

const NUM_COLORS = 5;

export const handler: Handlers<RandomColor> = {
  async GET(_, ctx) {
    const colors = [];
    for(let i = 0; i < NUM_COLORS; i++) {
      const randomColorPayload = await fetch('https://kyletolle-random-color-api.deno.dev/');
      if (randomColorPayload.status !== 200) {
        const defaultColor = '#FFF';
        colors.push(defaultColor);
        continue;
      }

      const randomColor = await randomColorPayload.text();
      // console.info('randomColor', randomColor);
      colors.push(randomColor);
    }

    return ctx.render({ colors });
  }
}

export default function Home({ data }: PageProps<RandomColor>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
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
