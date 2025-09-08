interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  // Middleware handles authentication, so we just render children
  return <>{children}</>;
}
