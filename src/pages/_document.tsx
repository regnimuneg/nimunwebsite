import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0d1117" />
        <link rel="shortcut icon" href="/favicon2.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          html {
            touch-action: pan-y pinch-zoom !important;
            overscroll-behavior-y: auto;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          body {
            touch-action: pan-y pinch-zoom !important;
            overscroll-behavior-y: auto;
            -webkit-user-select: text;
            user-select: text;
          }
          * {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }
          /* Disable zoom cursor and drag on images only - but allow page zoom */
          img, image, [role="img"] {
            cursor: default !important;
            -webkit-user-drag: none;
            user-drag: none;
            -webkit-user-select: none;
            user-select: none;
            /* Allow page zoom to work even when tapping on images */
            touch-action: pan-y pinch-zoom;
          }
          /* Prevent Lenis from blocking zoom gestures */
          .lenis.lenis-smooth {
            touch-action: pan-y pinch-zoom !important;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
