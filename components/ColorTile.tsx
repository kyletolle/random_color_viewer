interface ColorTileProps {
  color: string;
}
export default function ColorTile({ color }: ColorTileProps) {
  const styles = {
    height: '40px',
    width: '40px',
    backgroundColor: color
  };

  return (
    <div style={styles}></div>
  )
}
