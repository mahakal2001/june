import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";

type Doctor = {
  id: number;
  name: string;
  department: string;
  patients: number;
  revenue: number;
  rating: number;
  avatar: string;
};

type Props = {
  doctor: Doctor;
  onView: (doctor: Doctor) => void;
};

export default function DoctorMobileCard({
  doctor,
}: Props) {
  return (
    <Card className="rounded-xl p-5 space-y-4 shadow-sm">

      <div className="flex items-center gap-3">

        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold">
            {doctor.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {doctor.department}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-muted-foreground">
            Patients
          </p>

          <strong>{doctor.patients}</strong>
        </div>

        <div>
          <p className="text-muted-foreground">
            Revenue
          </p>

          <strong>
            ₹{doctor.revenue.toLocaleString("en-IN")}
          </strong>
        </div>

        <div>
          <p className="text-muted-foreground">
            Rating
          </p>

          <div className="flex items-center gap-1">

            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>

            {doctor.rating}

          </div>

        </div>

      </div>


    </Card>
  );
}