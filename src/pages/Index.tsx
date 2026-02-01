import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PopularSection } from '@/components/PopularSection';
import { MenuSection } from '@/components/MenuSection';
import { PromotionsSection } from '@/components/PromotionsSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularSection />
        <MenuSection />
        <PromotionsSection />
        <ReviewsSection />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Index;
