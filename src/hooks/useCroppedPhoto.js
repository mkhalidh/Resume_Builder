import { useEffect, useState } from "react";
import { toCroppedDataUrl } from "../lib/toCroppedDataUrl";

// Returns a photo URL pre-cropped to a square (and optionally grayscaled),
// falling back to the original URL until the conversion finishes or if it
// fails. See toCroppedDataUrl for why templates need this instead of just
// CSS object-cover/filter.
export function useCroppedPhoto(imageUrl, { grayscale = false } = {}) {
  const [displayUrl, setDisplayUrl] = useState(imageUrl);

  useEffect(() => {
    if (!imageUrl) return;
    let cancelled = false;

    toCroppedDataUrl(imageUrl, { grayscale })
      .then((dataUrl) => {
        if (!cancelled) setDisplayUrl(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setDisplayUrl(imageUrl);
      });

    return () => {
      cancelled = true;
    };
  }, [imageUrl, grayscale]);

  return displayUrl;
}
