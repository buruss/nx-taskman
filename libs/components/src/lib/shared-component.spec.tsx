import React from 'react';
import { render } from '@testing-library/react';

import SharedComponent from './shared-component';

describe(' SharedComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedComponent />);
    expect(baseElement).toBeTruthy();
  });
});
