import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Star } from "lucide-react";

import { useNavigate } from "react-router-dom";

import type { QuickLinkItem } from "@/data/quickLinks";


type Props = {
  link: QuickLinkItem;
  isPinned: boolean;
  usageCount: number;
  onTogglePin: (id: number) => void;
  onOpen: (id: number) => void;
};

export default function QuickLinkCard({
  link,
  isPinned,
  usageCount,
  onTogglePin,
   onOpen,
}: Props) {
  const navigate = useNavigate();

  const Icon = link.icon;

  const navigateToPage = () => {
    onOpen(link.id);
    navigate(link.path);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToPage();
    }
  };

  return (
    <TooltipProvider>

      <Tooltip>

        <TooltipTrigger>

          <Card
            role="button"
            tabIndex={0}
            aria-label={link.title}
            onClick={navigateToPage}
            onKeyDown={handleKeyDown}
            className="
            relative
            group
            cursor-pointer
            rounded-sm
            bg-white
            p-4
            transition-all
            duration-300

            hover:-translate-y-1
            hover:shadow-lg

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            "
          >

            {/* Pin Button */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(link.id);
              }}
              aria-label="Toggle Favorite"
              className="
              absolute
              top-2
              right-2
              rounded-full
              p-1
              transition
              hover:bg-slate-100
              "
            >
              <Star
                className={`
                h-4
                w-4
                transition

                ${
                  isPinned
                    ? "fill-yellow-400 text-yellow-500"
                    : "text-slate-300"
                }
                `}
              />
            </button>

            {/* Notification Badge */}

            {link.badge !== undefined && link.badge > 0 && (
              <Badge
                className="
                absolute
                top-2
                left-2
                rounded-full
                px-2
                text-[10px]
                "
              >
                {link.badge}
              </Badge>
            )}

            {/* Icon */}

            <div
              className={`
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl

              ${link.color}

              transition-transform
              duration-300

              group-hover:scale-110
              `}
            >
              <Icon className="h-7 w-7" />
            </div>

            {/* Title */}

            <h3
              className="
              mt-4
              text-center
              text-[12.2px]
              font-semibold
              text-slate-800
              "
            >
              {link.title}
            </h3>

            {/* Shortcut */}

            {link.keyboardShortcut && (
              <p
                className="Qlink-shortcut
                mt-1
                text-center
                text-[11px]
                text-slate-400
                "
              >
                {link.keyboardShortcut}
              </p>
            )}

            {/* Usage Analytics */}
            <p className="Qlink-usage mt-2 text-center text-xs text-muted-foreground">
              Opened {usageCount}{" "}
              {usageCount === 1 ? "time" : "times"}
            </p>

          </Card>

        </TooltipTrigger>

        <TooltipContent side="bottom">

          <div className="space-y-1">

            <p className="font-medium">

              {link.tooltip}

            </p>

            <p className="text-xs text-muted-foreground">

              {link.description}

            </p>

          </div>

        </TooltipContent>

      </Tooltip>

    </TooltipProvider>
  );
}