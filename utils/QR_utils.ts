const drawBackground = (elem: HTMLImageElement) => {
  // create a new canvas
  const c = document.createElement('canvas')
  // set its width&height to the required ones
  // draw our canvas to the new one
  c.height = elem.height + 9
  c.width = elem.width + 9
  const ctx = c.getContext('2d') as CanvasRenderingContext2D
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, elem.width + 9, elem.height + 9)

  ctx.drawImage(elem, 0, 0, elem.width + 9, elem.height + 9, 7, 7, elem.width, elem.height)
  // return the resized canvas dataURL
  return c.toDataURL('image/jpeg')
}

export const download_qr = (id: string, name: string) => {
  const canvas = (document.getElementById(id) as HTMLElement).firstChild as HTMLCanvasElement
  const img = new Image()
  img.src = canvas.toDataURL('image/jpeg')
  img.onload = () => {
    const imageData = drawBackground(img)
    const downloadLink = document.createElement('a')
    downloadLink.href = imageData
    downloadLink.download = `${name}.jpeg`
    downloadLink.click()
  }
}
