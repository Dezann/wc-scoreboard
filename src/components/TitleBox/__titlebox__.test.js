import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TitleBox from './TitleBox';
 
afterEach(cleanup);
 
describe('TitleBox component', () => {
  it('renders title', () => {
    const title = 'Test Title';
    const { getByText } = render(<TitleBox title={title} />);
 
    expect(getByText(title)).toBeInTheDocument();
  });
 
  it('renders button with text', () => {
    const buttonText = 'Test Button';
    const { getByText } = render(<TitleBox buttonText={buttonText} />);
 
    expect(getByText(buttonText)).toBeInTheDocument();
  });
 
  it('calls button action on click', () => {
    const buttonText = 'Test Button';
    const buttonAction = jest.fn();
    const { getByText } = render(
      <TitleBox buttonText={buttonText} buttonAction={buttonAction} />
    );
 
    fireEvent.click(getByText(buttonText));
 
    expect(buttonAction).toHaveBeenCalled();
  });
 
  it('renders children', () => {
    const children = <p>Test Children</p>;
    const { getByText } = render(<TitleBox>{children}</TitleBox>);
 
    expect(getByText('Test Children')).toBeInTheDocument();
  });
})