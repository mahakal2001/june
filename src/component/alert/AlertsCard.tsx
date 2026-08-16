import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { criticalAlerts } from "@/data/criticalAlerts";
import AlertsDialog from "./AlertsDialog";


import "./AlertsCard.css"


export default function AlertsCard() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="alerts-card rounded-sm shadow-sm border">

        <CardHeader className="pb-2">

          <div className="card-header flex items-center justify-between">

            <CardTitle className="text-lg font-semibold text-red-600">

              Alerts & Notifications

            </CardTitle>

            <Button
              variant="link"
              className="p-0 h-auto text-blue-600 font-medium
                hover:text-blue-800 transition-all duration-300 ease-in"
              onClick={() => setOpen(true)}
            >
              View All Alerts
            </Button>

          </div>

        </CardHeader>

        <CardContent className="p-0">

          {criticalAlerts.slice(0, 3).map((alert, index) => {

            const Icon = alert.icon;

            return (

              <div key={alert.id}>

                <div className="alert-row flex">

                  <div className="alert-left flex">

                    <div
                      className={`alert-icon ${alert.bgColor}`}
                    >

                      <Icon
                        className={`h-5 w-5 ${alert.iconColor}`}
                      />

                    </div>

                    <div>

                      <p className="alert-title">

                        {alert.title}

                      </p>

                    </div>

                  </div>

                  <span className="alert-time">

                    {alert.time}

                  </span>

                </div>

                {index !== 2 && (
                  <div className="alert-divider" />
                )}

              </div>

            );

          })}

        </CardContent>

      

      </Card>

        <AlertsDialog
        open={open}
        onOpenChange={setOpen}
      />

    </>
  );
}