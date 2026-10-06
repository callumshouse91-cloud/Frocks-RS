import Image from "next/image";
import { isPlaceholder } from "@/lib/site";

type Props = {
  image: string;
  alt: string;
  /** e.g. "16 / 9" or "4 / 5" – the frame the photo sits in. */
  ratio: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Shows a photo from public/images, or a visible "Image TBC" slot when the
 * data file says "TBC". The photo is never cropped: the frame matches its shape.
 */
export default function Photo({ image, alt, ratio, sizes, priority }: Props) {
  if (isPlaceholder(image)) {
    return (
      <div className="photo photo--tbc" style={{ aspectRatio: ratio }}>
        <span>Image TBC</span>
      </div>
    );
  }
  return (
    <div className="photo" style={{ aspectRatio: ratio }}>
      <Image src={`/images/${image}`} alt={alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}
