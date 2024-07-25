import ChangePassword from "./ChangePassword";
import CurrentSubscription from "./CurrentSubscription";
import Invoices from "./Invoices";
import PlanChangeHistory from "./PlanChangeHistory";
import SubscriptionHistory from "./SubscriptionHistory";

function UserProfile() {
  return (
    <>
      <div className="grid md:grid-cols-2 items-start gap-6">
        <CurrentSubscription />
        <ChangePassword />
        <PlanChangeHistory />
        <SubscriptionHistory />
      </div>
      <Invoices />
    </>
  );
}

export default UserProfile;
