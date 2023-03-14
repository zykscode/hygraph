import React from 'react';

const HeadMeta = () => {
  console.log({ Todo: ' We need a Yandex, Google analytics' });
  return (
    <>
      <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
      <link href="/static/favicons/site.webmanifest" rel="manifest" />
      <link
        href="/static/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/static/favicons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/static/favicons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />

      <meta content="#ffffff" name="theme-color" />
      <meta content="#ffffff" name="msapplication-TileColor" />
      <meta
        content="/static/favicons/browserconfig.xml"
        name="msapplication-config"
      />

      <meta
        content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        name="robots"
      />
    </>
  );
};

export default HeadMeta;
