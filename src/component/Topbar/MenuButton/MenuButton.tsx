import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";

import { useSidebar } from "@/context/SidebarContext";
import './MenuButton.css';

function MenuButton() {
  const {
    isCollapsed,
    toggleSidebar,
    mobileOpen,
    setMobileOpen,
  } = useSidebar();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleMenuClick = () => {
    if (isDesktop) {
      toggleSidebar();
    } else {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleMenuClick}
    >
      <motion.div
        animate={{
          rotate: isDesktop
            ? (isCollapsed ? 0 : 180)
            : (mobileOpen ? 180 : 0),
        }}
        transition={{ duration: 0.3 }}
      >
        {isDesktop ? (
          isCollapsed ? <Menu /> : <X />
        ) : (
          mobileOpen ? <X /> : <Menu />
        )}
      </motion.div>
    </Button>
  );
}

export default MenuButton;