import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

function ResetButton() {
  return (
    <Button
      variant="outline"
    >

      <RotateCcw
        className="mr-2 h-4 w-4"
      />

      Reset

    </Button>
  );
}

export default ResetButton;