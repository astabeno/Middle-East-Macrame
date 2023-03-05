import { getPiecesCollection } from "../../../utils/firebase.utils"

export default async function handler(req, res) {
    const piecesCollection = await getPiecesCollection()
        const pieces = piecesCollection.map( piece => ({
            ...piece,
            auctionEnd: piece.auctionEnd.toDate().toString()
        }))

    res.status(200).json(pieces)

  }

