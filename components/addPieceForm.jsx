import React from 'react'

export default function AddPieceForm() {

  function handleSubmit(e) {
    e.preventDefault()

    alert('form submitted')
  }

  return (
    <div className='mx-auto p-8 rounded bg-gray-200'>
      <h1 className='text-center border' >ADD PIECE FORM</h1>
      <div className='mt-8 border w-1/2 border-red-600'>
        <form onSubmit={handleSubmit}>
            <div className='my-4'>
                <label className ="mr-4" for="name">Name:</label>
                <input name="name" type="text" />
            </div>
            <div className='my-4'>
                <label className ="mr-4" for="picture">Image:</label>
                <input name="picture" type="file" />
            </div>
            <div className='my-4'>
                <label className ="mr-4" for="dimensions">Dimension:</label>
                <input name="dimensions" type="text" />
            </div>
            <button className='p-2 border border-black rounded-lg bg-white text-black hover:bg-black hover:text-white'
                type='submit'>
                    Add Piece
                </button>
        </form>
      </div>
    </div>
  )
}
