import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import "./BreadCrumb.css";

type BreadcrumbPageConfig = {
  title: string;
  parent: string;
  current: string;
};

const breadcrumbConfig: Record<string, BreadcrumbPageConfig> = {
  "/": {
    title: "MIS Executive Dashboard",
    parent: "MIS & Analytics",
    current: "Executive Dashboard",
  },

  "/daily-mis": {
    title: "Daily MIS Center",
    parent: "MIS & Analytics",
    current: "Daily MIS Center",
  },

  "/monthly-mis": {
    title: "Monthly MIS Center",
    parent: "MIS & Analytics",
    current: "Monthly MIS Center",
  },

  "/revenue-analysis": {
    title: "Revenue Analytics",
    parent: "MIS & Analytics",
    current: "Revenue Analytics",
  },

  "/department-summary": {
    title: "Department Summary",
    parent: "MIS & Analytics",
    current: "Department Summary",
  },

  "/variance-analysis": {
    title: "Variance Analysis",
    parent: "MIS & Analytics",
    current: "Variance Analysis",
  },
};

function formatPathName(pathname: string) {
  const lastPath = pathname.split("/").filter(Boolean).pop();

  if (!lastPath) {
    return "Dashboard";
  }

  return lastPath
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function DashboardBreadcrumb() {
  const location = useLocation();

  const pageTitle = location.pathname
      .split("/")
      .filter(Boolean)
      .pop()
  ?.replace(/([a-z])([A-Z])/g, "$1 $2") || "Dashboard";

  const currentPage = breadcrumbConfig[location.pathname] ?? {
    title: formatPathName(location.pathname),
    parent: "MIS & Analytics",
    current: formatPathName(location.pathname),
  };

  return (
    <div className="dashboard-breadcrumb-wrapper">
      <h1 className="dashboard-page-title">
        {pageTitle}
      </h1>

      <Breadcrumb>
        <BreadcrumbList className="dashboard-breadcrumb-list">
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/" className="dashboard-breadcrumb-link">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="dashboard-breadcrumb-separator">
            <ChevronRight />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/" className="dashboard-breadcrumb-link">
                {currentPage.parent}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="dashboard-breadcrumb-separator">
            <ChevronRight />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbPage className="dashboard-breadcrumb-current">
              {pageTitle}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default DashboardBreadcrumb;