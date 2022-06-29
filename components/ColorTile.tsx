/** @jsx h */
import { h } from "preact";

interface ColorTileProps {
  color: string;
}
export default function ColorTile({ color }: ColorTileProps) {
  const styles = {
    height: '20px',
    width: '20px',
    backgroundColor: color
  };

  return (
    <div style={styles}></div>
  )
}