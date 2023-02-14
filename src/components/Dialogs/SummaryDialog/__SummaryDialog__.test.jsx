import { render, screen } from '@testing-library/react';
import SummaryDialog from './SummaryDialog';

describe('SummaryDialog', () => {
  it('Should render correctly when open', () => {
    render(<SummaryDialog open={true} setOpen={jest.fn()} />);
    expect(screen.getByText('Matches summary')).toBeInTheDocument();
  });


  it('calls the setOpen function when the Close button is clicked', () => {
    const setOpen = jest.fn();
    render(<SummaryDialog open={true} setOpen={setOpen} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    closeButton.click();
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});