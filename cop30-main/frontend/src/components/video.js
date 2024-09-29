import React from 'react'

const video = () => {
  return (
    <div>
        <video width="600" controls>
        <source src="/economizar.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  )
}

export default video