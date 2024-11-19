import Auth from "@/components/shared/services/auth/auth";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Auth>
      {children}
    </Auth>
  )
}
