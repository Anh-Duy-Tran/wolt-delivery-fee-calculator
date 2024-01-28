import { expect, it, describe, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OrderDetailsForm } from '.';

type FormFields =
  | 'cartValue'
  | 'deliveryDistance'
  | 'numberOfItems'
  | 'orderTime';

const VALID_FORM_DATA: Record<FormFields, string> = {
  cartValue: '100',
  deliveryDistance: '500',
  numberOfItems: '3',
  orderTime: '2024-01-22T12:00',
};

const INVALID_FORM_DATA: Record<FormFields, string> = {
  cartValue: '-100',
  deliveryDistance: '500.5',
  numberOfItems: '0',
  orderTime: '2024-02-31T12:00',
};

describe('OrderDetailsForm Component', () => {
  const mockHandleResult = vi.fn();
  const mockSaveCalculatedOrderDetails = vi.fn();

  beforeEach(() => {
    render(
      <OrderDetailsForm
        handleResult={mockHandleResult}
        saveCalculatedOrderDetails={mockSaveCalculatedOrderDetails}
      />
    );
  });

  it('should render correct to the snapshot', () => {
    const { asFragment } = render(
      <OrderDetailsForm
        handleResult={mockHandleResult}
        saveCalculatedOrderDetails={mockSaveCalculatedOrderDetails}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all input fields', () => {
    expect(screen.getByTestId('cartValue')).toBeInTheDocument();
    expect(screen.getByTestId('deliveryDistance')).toBeInTheDocument();
    expect(screen.getByTestId('numberOfItems')).toBeInTheDocument();
    expect(screen.getByTestId('orderTime')).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', async () => {
    fireEvent.click(screen.getByText(/calculate fee/i));
    await waitFor(() => {
      expect(screen.getByText(/cart value is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/delivery distance is required/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/number of items is required/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/please enter a valid time/i)
      ).toBeInTheDocument();
    });
  });

  it('should not submit form with invalid data', async () => {
    // Try to set one of the field in the form to the invalid data and tried to submit the form
    Object.entries(INVALID_FORM_DATA).forEach(
      ([invalidDataField, invalidData]) => {
        // Set the form field to the valid data except for one of the field with invalid data
        Object.entries(VALID_FORM_DATA).forEach(([dataField, data]) =>
          fireEvent.change(screen.getByTestId(dataField), {
            target: {
              value: dataField === invalidDataField ? invalidData : data,
            },
          })
        );

        fireEvent.click(screen.getByText(/calculate fee/i));
      }
    );

    await waitFor(() => {
      expect(mockSaveCalculatedOrderDetails).not.toHaveBeenCalled();
      expect(mockHandleResult).not.toHaveBeenCalled();
    });
  });

  it('should submits form with valid data', async () => {
    fireEvent.change(screen.getByTestId('cartValue'), {
      target: { value: VALID_FORM_DATA.cartValue },
    });
    fireEvent.change(screen.getByTestId('deliveryDistance'), {
      target: { value: VALID_FORM_DATA.deliveryDistance },
    });
    fireEvent.change(screen.getByTestId('numberOfItems'), {
      target: { value: VALID_FORM_DATA.numberOfItems },
    });
    fireEvent.change(screen.getByTestId('orderTime'), {
      target: { value: VALID_FORM_DATA.orderTime },
    });

    fireEvent.click(screen.getByText(/calculate fee/i));

    await waitFor(() => {
      expect(mockSaveCalculatedOrderDetails).toHaveBeenCalledWith({
        cartValue: parseFloat(VALID_FORM_DATA.cartValue),
        deliveryDistance: parseInt(VALID_FORM_DATA.deliveryDistance, 10),
        numberOfItems: parseInt(VALID_FORM_DATA.numberOfItems, 10),
        orderTime: new Date(VALID_FORM_DATA.orderTime),
      });
      expect(mockHandleResult).toHaveBeenCalledTimes(1);
    });
  });
});
