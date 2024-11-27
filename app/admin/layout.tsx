import AdminAuth from "@/components/shared/services/auth/admin-auth";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminAuth>
      {children}
    </AdminAuth>
  )
}
