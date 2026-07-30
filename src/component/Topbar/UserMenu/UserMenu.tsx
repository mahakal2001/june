import {
  ChevronDown,
} from "lucide-react";

import {

Avatar,

AvatarFallback,

AvatarImage,

} from "@/components/ui/avatar";

import {

DropdownMenu,

DropdownMenuContent,

DropdownMenuItem,

DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";

import './UserMenu.css'

function UserMenu() {

return (

<DropdownMenu>

<DropdownMenuTrigger>

<div className="dropdown-menu flex items-center px-2 pt-1 pb-1 gap-3 cursor-pointer">

  <Avatar>

    <AvatarImage src="https://i.pravatar.cc/100"/>

    <AvatarFallback>AD</AvatarFallback>

  </Avatar>

  <div>

   <p className="dropdown-txt1 font-medium"> Front Desk</p>

    <p className="submenu-txt text-xs text-slate-500">

      Receptionist

     </p>

  </div>

 <ChevronDown className="arrow relative left-3" size={18}/>

</div>

</DropdownMenuTrigger>

<DropdownMenuContent>

<DropdownMenuItem>

Profile

</DropdownMenuItem>

<DropdownMenuItem>

Settings

</DropdownMenuItem>

<DropdownMenuItem>

Logout

</DropdownMenuItem>

</DropdownMenuContent>

</DropdownMenu>

);

}

export default UserMenu;