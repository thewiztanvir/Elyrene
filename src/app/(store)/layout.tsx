import { Navbar } from '@/components/store/Navbar';
import { Footer } from '@/components/store/Footer';
import { CartDrawer } from '@/components/store/CartDrawer';
import { ToastProvider } from '@/components/ui/Toast';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1 pt-[80px]">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <ToastProvider />
    </div>
  );
}
