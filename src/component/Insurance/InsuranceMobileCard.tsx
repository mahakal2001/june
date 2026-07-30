import { Card } from "@/components/ui/card";

type Claim = {
  id: number;
  title: string;
  value: number;
  icon: any;
  iconBg: string;
  iconColor: string;
};

type Props = {
  claim: Claim;
};

export default function InsuranceClaimMobileCard({
  claim,
}: Props) {

  const ClaimIcon = claim.icon;

  const percentage = (
    (claim.value / 42) * 100
  ).toFixed(1);

  return (

    <Card className="rounded-xl p-5 space-y-4 shadow-sm">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${claim.iconBg}`}
        >
          <ClaimIcon
            className={`h-5 w-5 ${claim.iconColor}`}
          />
        </div>

        <div>

          <h3 className="font-semibold">
            {claim.title}
          </h3>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">

        <div>

          <p className="text-muted-foreground">
            Claims
          </p>

          <strong>{claim.value}</strong>

        </div>

        <div>

          <p className="text-muted-foreground">
            Percentage
          </p>

          <strong>{percentage}%</strong>

        </div>

      </div>

    </Card>

  );
}