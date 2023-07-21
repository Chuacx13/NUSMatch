import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ScrollToTop from '../scrolltotop';

window.scrollTo = jest.fn();

describe('ScrollToTop', () => {
  test('should scroll the window to the top when location changes', () => {
    
    const history = createMemoryHistory();
    
    render(
      <Router history={history}>
        <ScrollToTop />
      </Router>
    );

    history.push('/some-route');

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('should not scroll the window to the top when location does not change', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ScrollToTop />
      </Router>
    );

    setTimeout(() => {
        expect(mockScrollTo).not.toHaveBeenCalled();
    }, 100);
  });
});
