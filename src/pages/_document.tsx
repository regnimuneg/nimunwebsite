import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0d1117" />
        <link rel="shortcut icon" href="/favicon2.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <style>{`
          html {
            touch-action: manipulation;
            overscroll-behavior-y: auto;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          body {
            touch-action: manipulation;
            overscroll-behavior-y: auto;
            -webkit-user-select: text;
            user-select: text;
          }
          * {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }
          /* Prevent double-tap zoom on interactive elements */
          button, a, input, select, textarea, label, [role="button"] {
            touch-action: manipulation;
          }
          /* Disable zoom cursor and drag on images only */
          img, image, [role="img"] {
            cursor: default !important;
            -webkit-user-drag: none;
            user-drag: none;
            -webkit-user-select: none;
            user-select: none;
            touch-action: manipulation;
          }
          /* Prevent Lenis from blocking zoom gestures */
          .lenis.lenis-smooth {
            touch-action: manipulation !important;
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
