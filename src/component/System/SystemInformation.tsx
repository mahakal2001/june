import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Clock3,
  Building2,
  CircleCheckBig,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";

import "./SystemInformation.css";


interface SystemInformationProps {
  lastSync: string;
  dataSource: string;
  systemStatus: string;
  version: string;
}

export default function SystemInformation({
  lastSync,
  dataSource,
  systemStatus,
  version,
}: SystemInformationProps) {

    const [currentLastSync, setCurrentLastSync] = useState(lastSync);

  useEffect(() => {
    const update = () => {
      setCurrentLastSync(
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    update();

    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="systemInformation rounded-sm border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800">
          System Information
        </CardTitle>
      </CardHeader>

      <CardContent className="systemcontent space-y-5">

        {/* Last Sync */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-600">
            <Clock3 className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-medium">
              Last Data Sync
            </span>
          </div>

          <span className="text-sm font-semibold text-slate-700">
            {currentLastSync}
          </span>
        </div>

        {/* Data Source */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-600">
            <Building2 className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-medium">
              Data Source
            </span>
          </div>

          <span className="text-sm font-semibold text-slate-700">
            {dataSource}
          </span>
        </div>

        {/* Status */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-600">
            <CircleCheckBig className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-medium">
              System Status
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />

            <span className="text-sm font-semibold text-emerald-600">
              {systemStatus}
            </span>
          </div>
        </div>

        {/* Version */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-600">
            <Info className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-medium">
              Version
            </span>
          </div>

          <span className="text-sm font-semibold text-slate-700">
            {version}
          </span>
        </div>

      </CardContent>
    </Card>
  );
}