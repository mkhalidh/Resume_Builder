// html2canvas doesn't apply CSS `object-fit`/`object-cover` consistently for
// a non-square source image — every template's circular (or square) avatar
// box was rendering as a squashed oval in the exported PDF even though it
// looks correct on screen. Pre-cropping to a square in canvas ourselves
// removes the need for html2canvas to get object-fit right at all: the
// output image already matches the display box's aspect ratio.
//
// Also optionally bakes in a grayscale conversion, since html2canvas
// doesn't apply CSS `filter` either (used by the Minimal template).
export function toCroppedDataUrl(src, { grayscale = false } = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const size = Math.min(img.naturalWidth, img.naturalHeight);
      const sx = (img.naturalWidth - size) / 2;
      const sy = (img.naturalHeight - size) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (grayscale) ctx.filter = "grayscale(1)";
      ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
      try {
        resolve(canvas.toDataURL("image/png"));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
    img.src = src;
  });
}
