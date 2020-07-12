import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/loader.css"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
