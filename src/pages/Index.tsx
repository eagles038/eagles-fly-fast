import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PopularSection } from '@/components/PopularSection';
import { MenuSection } from '@/components/MenuSection';
import { PromotionsSection } from '@/components/PromotionsSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { MobileCartButton } from '@/components/MobileCartButton';
import { CookieConsent } from '@/components/CookieConsent';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';
import { PizzaBuilder } from '@/components/PizzaBuilder';

const Index = () => {
  const [isPizzaBuilderOpen, setIsPizzaBuilderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularSection />
        <MenuSection onOpenPizzaBuilder={() => setIsPizzaBuilderOpen(true)} />
        <PromotionsSection />
        <ReviewsSection />
      </main>
      <Footer />
      <CartSidebar />
      <MobileCartButton />
      <CookieConsent />
      <ExitIntentPopup />
      <PizzaBuilder isOpen={isPizzaBuilderOpen} onClose={() => setIsPizzaBuilderOpen(false)} />
    </div>
  );
};

export default Index;
