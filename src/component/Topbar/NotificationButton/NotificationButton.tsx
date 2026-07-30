import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import './NotificationButton.css';

function NotificationButton() {
  return (

    <div className="relative">

      <Button className={`text-slate-500`}
        size="icon"
        variant="ghost"
      >
        <Bell className="bell h-5 w-5"/>
      </Button>

      <Badge
        className="bg-red-600
        absolute
        -right-1
        -top-1
        h-4
        w-4
        rounded-full
        p-0
        flex
        items-center
        justify-center
        "
      >
        5
      </Badge>

    </div>

  );
}

export default NotificationButton;