import React from "react";
import "./game.scss";
import { createGame } from "../../game/game";
import Page from "../../components/page/page";

export default function Game() {
  const canvas = React.useRef();
  const game = React.useRef({});
  const page = React.useRef({});

  React.useEffect(() => {
    game.current = createGame();
    page.current.appendChild(game.current.canvas.element);
  }, [canvas]);

  React.useEffect(() => {
    return () => game.current.destroy();
  }, [game]);

  return <Page name="game" ref={page} />;
}
