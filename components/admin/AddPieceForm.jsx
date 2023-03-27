import { useState, useEffect, useMemo } from 'react'

import { imageUpload, addPiece } from '../../utils/firebase.utils'

import Input from '../form/Input'

const defaultPieceInfo = {
   name: '',
   dimensions: '',
   file: null,
   startingBid: '',
   auctionEnd: '',
   imageUrl: null,
}

export default function AddPieceForm() {
   const [pieceInfo, setPieceInfo] = useState(defaultPieceInfo)
   const { name, dimensions, file, startingBid, auctionEnd } = pieceInfo

   function changeHandler(event) {
      const { name, value } = event.target
      setPieceInfo({ ...pieceInfo, [name]: value })
   }

   async function handleSubmit(event) {
      event.preventDefault()
      let url = ''
      try {
         url = await imageUpload(file)
         if (!url) {
            throw new Error('Url is not defined')
         }
         setPieceInfo({ ...pieceInfo, imageUrl: url })
      } catch (error) {
         alert(error)
      }
   }

   useEffect(() => {
      if (pieceInfo.imageUrl) {
         console.log(pieceInfo.imageUrl)
         addPiece(pieceInfo)
         setPieceInfo(defaultPieceInfo)
      }
   }, [pieceInfo.imageUrl])

   return (
      <div className="mx-auto w-3/4 rounded-xl bg-white p-8 shadow-2xl">
         <h1 className="text-center">Add a Piece</h1>
         <div className="mx-auto flex w-auto">
            <form onSubmit={handleSubmit} className="mt-5 w-1/2 space-y-4">
               <Input
                  name="name"
                  label="Name of Piece"
                  type="text"
                  value={name}
                  placeholder=" "
                  onChange={changeHandler}
                  isRequired={true}
               />
               <Input
                  name="dimensions"
                  label="Dimensions in Feet"
                  type="text"
                  value={dimensions}
                  placeholder=" "
                  onChange={changeHandler}
                  isRequired={true}
               />
               <Input
                  name="file"
                  label="Select an Image"
                  type="file"
                  accept="image/*"
                  placeholder=" "
                  onChange={(event) =>
                     setPieceInfo({
                        ...pieceInfo,
                        file: event.target.files[0],
                     })
                  }
                  isRequired={true}
               />
               <Input
                  name="startingBid"
                  label="Starting Price"
                  type="number"
                  value={startingBid}
                  placeholder=" "
                  onChange={changeHandler}
                  isRequired={true}
               />
               <Input
                  name="auctionEnd"
                  label="Auction End Date"
                  type="date"
                  value={auctionEnd}
                  placeholder=" "
                  onChange={changeHandler}
                  isRequired={true}
               />

               <button
                  className="rounded-lg border border-black bg-white p-2 text-black hover:bg-black hover:text-white"
                  type="submit">
                  Add Piece
               </button>
            </form>
            <div className="m-5 grid w-1/2 content-center rounded-lg border border-gray-300 bg-gray-200 text-center">
               {!file ? (
                  <span className="inline-block align-middle text-3xl text-gray-400">
                     Upload Image Here
                  </span>
               ) : (
                  <img src={URL.createObjectURL(file)} className="max-w-full" />
               )}
            </div>
         </div>
      </div>
   )
}
