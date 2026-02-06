import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PopularSection } from '@/components/PopularSection';
import { PizzaConstructor } from '@/components/PizzaConstructor';
import { MenuSection } from '@/components/MenuSection';
import { PromotionsSection } from '@/components/PromotionsSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { MobileCartButton } from '@/components/MobileCartButton';
import { CookieConsent } from '@/components/CookieConsent';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';
import { HomeSEO } from '@/components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeSEO />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularSection />
        <PizzaConstructor />
        <MenuSection />
        <PromotionsSection />
        <ReviewsSection />
      </main>
      <Footer />
      <CartSidebar />
      <MobileCartButton />
      <CookieConsent />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
