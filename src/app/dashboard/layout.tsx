
// import { AuthContextWrapper } from '../../context/AuthContext';
import { GrantsContextWrapper } from '@/context/GrantsContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <AuthContextWrapper>
      <GrantsContextWrapper>
        <main>{children}</main>
      </GrantsContextWrapper>
    // </AuthContextWrapper>
  );
}
