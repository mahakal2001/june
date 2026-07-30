import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import './BreadCrumb.css';

function DashboardBreadcrumb() {
  return (
    <Breadcrumb>

      <BreadcrumbList className="breadcrumblist">

        <BreadcrumbItem>

          <BreadcrumbPage className="breadcrumb text-lg">

            MIS Executive Dashboard

          </BreadcrumbPage>

        </BreadcrumbItem>

        <p className="sub-crumbs">Home {">"} MIS & Analytics {">"} Executive Dashboard</p> 

      </BreadcrumbList>

    </Breadcrumb>
  );
}

export default DashboardBreadcrumb;