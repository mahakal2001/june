import { useMemo } from "react";

import 
{ 
    Card} 
from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import QuickLinkCard from "./QuickLinkCard";
import "./QuickLinks.css";


import {
  quickLinks,
  type UserRole,
} from "@/data/quickLinks";

import { useQuickLinks } from "@/hooks/useQuickLinks";



export default function QuickLinks() {
  /*
    Replace this later with your logged-in user's role
    fetched from authentication.
  */
  const currentUserRole: UserRole = "Admin";

  const {
    pinned,
    usage,
    togglePin,
    openLink,
  } = useQuickLinks();

  /*
    Store IDs of pinned links
  */
  

  /*
    Load from LocalStorage
  */
  
  /*
    Save whenever changed
  */
  
  /*
    Toggle Pin
  */
  

  /*
    Only show modules user has permission for
  */
  const visibleLinks = useMemo(() => {
    return quickLinks.filter((item) =>
      item.permissions.includes(currentUserRole)
    );
  }, [currentUserRole]);




  /*
    Pinned First
  */
  const sortedLinks = useMemo(() => {
    return [...visibleLinks].sort((a, b) => {
      const aPinned = pinned.includes(a.id);
      const bPinned = pinned.includes(b.id);

      if (aPinned === bPinned) return 0;

      return aPinned ? -1 : 1;
    });
  }, [visibleLinks, pinned]);

  return (
    <Card className="qickCard rounded-sm mx-6 mb-6 border bg-white shadow-sm">

      {/* Header */}

      <div className="flex text-center items-center justify-center pt-2">

        <div>

          <h2 className="text-lg font-semibold">
            Quick Links
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Frequently used hospital modules
          </p>

        </div>

      </div>

     

      <Separator />

      {/* Grid */}

      <div
        className="quickGrid
          grid
          gap-6
          p-6

          grid-cols-2

          sm:grid-cols-3

          lg:grid-cols-4

          xl:grid-cols-6
        "
      >
        {sortedLinks.map((item) => (
          <QuickLinkCard
                key={item.id}
                link={item}
                isPinned={pinned.includes(item.id)}
                usageCount={usage[item.id] || 0}
                onTogglePin={togglePin}
                onOpen={openLink} />
        ))}
      </div>

    </Card>
  );
}