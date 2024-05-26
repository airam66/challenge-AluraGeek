export default function isImage(field) {
  const urlImage = field.value;

   
  const regex = /\.(gif|jpe?p|tiff?|png|webp|bmp)$/i;
    const isValid= regex.test(urlImage); 
    console.log(isValid);
    if (!isValid) {
      field.setCustomValidity('La URL no es válida. Debe ser una URL de imagen con una extensión válida.');
  }
  
}
