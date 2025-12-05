import PlanCard from "./PlanCard";

function Plan() {
  return (
    <main className="px-4 py-24 flex justify-center gap-6">
      <PlanCard />
      <PlanCard billingPeriod="yearly" isPopular />
    </main>
  );
}

export default Plan;
