import { CircleHelp } from "lucide-react";

import { Button } from "@/components/ui/button";
import './SettingButton.css';

function SettingsButton() {
  return (

    <Button className={`text-slate-500`}

      size="icon"

      variant="ghost"

    >

       <CircleHelp className="help h-5 w-5" />

    </Button>

  );
}

export default SettingsButton;