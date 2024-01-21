import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FeeResult } from './FeeResult';
import { OrderDetailFormType } from '../OrderDetailsForm/OrderDetailsForm';
import { FeeCalculatorReturnType } from '../../utils/deliveryFeeCaculator';

const mockOrderDetails: OrderDetailFormType = {
  cartValue: 100,
  deliveryDistance: 2000,
  numberOfItems: 3,
  orderTime: new Date('2024-01-21T12:00:00'),
};

const mockResult: FeeCalculatorReturnType = {
  deliveryFee: 15,
  subjectedRules: [
    { message: 'Base fee', amount: '5€' },
    { message: 'Distance fee', amount: '10€' },
  ],
};

describe('FeeResult Component', () => {
  // Test for rendering with no props
  it('renders with default message when no props are provided', () => {
    render(<FeeResult />);
    expect(
      screen.getByText(
        'Fill in order details and press calculate to get result.'
      )
    ).toBeInTheDocument();
  });

  // Test for rendering with props
  it('renders order details and fee result when props are provided', () => {
    render(<FeeResult orderDetails={mockOrderDetails} result={mockResult} />);
    expect(screen.getByTestId('submittedCartValue')).toHaveTextContent(
      '• Cart Value: 100.00€'
    );
    expect(screen.getByTestId('submittedDeliveryDistance')).toHaveTextContent(
      '• Distance: 2000m'
    );
    expect(screen.getByTestId('submittedNumberOfItems')).toHaveTextContent(
      '• Number of items: 3'
    );
    expect(screen.getByTestId('submittedOrderTime')).toHaveTextContent(
      `• Time: ${mockOrderDetails.orderTime.toDateString()} at ${mockOrderDetails.orderTime.toLocaleTimeString()}`
    );
    expect(screen.getByTestId('fee')).toHaveTextContent('15.00€');
  });

  // Test for tooltip content in FeeResult
  it('passes correct tooltip content to InfoTooltip', () => {
    render(<FeeResult orderDetails={mockOrderDetails} result={mockResult} />);

    const infoIcon = screen.getByTestId('info-icon');
    fireEvent.mouseOver(infoIcon);

    // Check if the content passed to InfoTooltip is rendered
    mockResult.subjectedRules.forEach((rule) => {
      expect(
        screen.getByText(`${rule.message} ( ${rule.amount} )`)
      ).toBeInTheDocument();
    });
  });

  it('displays tooltip with fee calculation rules on hover', () => {
    render(<FeeResult orderDetails={mockOrderDetails} result={mockResult} />);
    const infoIcon = screen.getByTestId('info-icon');
    fireEvent.mouseOver(infoIcon);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  it('displays tooltip with fee calculation rules on focus', () => {
    render(<FeeResult orderDetails={mockOrderDetails} result={mockResult} />);
    const infoIcon = screen.getByTestId('info-icon');
    fireEvent.focus(infoIcon);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeInTheDocument();
  });
});
