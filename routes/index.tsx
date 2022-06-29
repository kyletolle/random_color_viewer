/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";

interface RandomColor {
  color: string;
}

export const handler: Handlers<RandomColor> = {
  async GET(_, ctx) {
    const randomColorPayload = await fetch('https://kyletolle-random-color-api.deno.dev/');
    if (randomColorPayload.status !== 200) {
      return ctx.render({color: '#FFF'});
    }

    const randomColor = await randomColorPayload.text();
    console.info('randomColor', randomColor);
    return ctx.render({ color: randomColor });
  }
}

export default function Home({ data }: PageProps<RandomColor>) {
  if (!data.color) {
    return <h1>Fetching color...</h1>;
  }

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
      <Counter start={3} />
      <div style={{height: '20px', width: '20px', backgroundColor: data.color}}></div>
    </div>
  );
}
