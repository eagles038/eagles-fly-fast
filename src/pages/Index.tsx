import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PopularSection } from '@/components/PopularSection';
import { FeaturesSection } from '@/components/FeaturesSection';
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
        <PopularSection />
        <FeaturesSection />
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
