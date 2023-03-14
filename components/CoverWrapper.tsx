import Image, { StaticImageData } from 'next/image';
import React from 'react';

type Props = {
  img: {
    base64: string;
    img: {
      src: string;
      height: number;
      width: number;
    };
    blurDataURL?: string;
  }|StaticImageData;
};

const CoverWrapper = ({ img }: Props) => {
  return (
    <div className="page-cover-wrapper">
      {'base64' in img ? (
        <Image
          priority={true}
          className="page-cover"
          src={img.img.src}
          alt="page cover wrapper"
          height={img.img.height}
          width={img.img.width}
          placeholder="blur"
          blurDataURL={img.base64}
        />
      ) : (
        <Image
          priority={true}
          className="page-cover"
          src={img}
          alt="page cover wrapper"
        />
      )}
    </div>
  );
};

export default CoverWrapper;
