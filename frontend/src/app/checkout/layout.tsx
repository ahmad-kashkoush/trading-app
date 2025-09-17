import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - Trading App',
  description: 'Choose your trading package and get started with premium trading tools',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
