import { Hero } from '../components/sections/Hero';
import { FeaturedReport } from '../components/sections/FeaturedReport';
import { ReportsArchive } from '../components/sections/ReportsArchive';
import { WhyInsight } from '../components/sections/WhyInsight';
import { MarketSnapshot } from '../components/sections/MarketSnapshot';
import { ClosingReportsCTA } from '../components/sections/ClosingReportsCTA';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedReport />
      <ReportsArchive />
      <WhyInsight />
      <MarketSnapshot />
      <ClosingReportsCTA />
    </div>
  );
};
