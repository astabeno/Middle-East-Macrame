// import pieceList from '../../data/pieces.json'

import Piece from "../../components/piece/piece.component";

export default function PieceInfo({ piece }) {
  return (
    <div className="centered">
      <Piece piece={piece} />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/pieces");
  const pieces = await res.json();

  const paths = pieces.map((piece) => ({
    params: { id: piece.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/pieces");
  const pieces = await res.json();

  const piece = pieces.find((item) => item.id == context.params.id);

  return { props: { piece } };
}
