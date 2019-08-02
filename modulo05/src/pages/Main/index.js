import React from 'react';

import { Title } from './styles';

export default function Main() {
  return (
    <>
      <Title error>
        Main
        <small>Menor</small>
      </Title>
      <Title error={false}>
        Main
        <small>Menor</small>
      </Title>
    </>
  );
}
