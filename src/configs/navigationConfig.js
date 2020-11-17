import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["Alumni", "Admin", "Student"],
    navLink: "/dashboard",
  },
  {
    id: "chat",
    title: "Chat",
    type: "item",
    icon: <Icon.MessageSquare size={20} />,
    permissions: ["Alumni", "Admin", "Student"],
    navLink: "/chat"
  },
  {
    id: "accountSettings",
    title: "Account Settings",
    type: "item",
    icon: <Icon.Settings size={20} />,
    permissions: ["Alumni", "Student"],
    navLink: "/account-settings"
  },
  {
    id: "userlist",
    title: "Users",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["Admin"],
    navLink: "/userlist"
  },
  // {
  //   id: "docs",
  //   title: "Docs",
  //   type: "collapse",
  //   permissions: ["Alumni", "Admin", "Student"],
  //   icon: <Icon.FileText size={20} />,
  //   children: [
  //     {
  //       id: "servers",
  //       title: "Servers",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/docs/servers",
  //       collapsed: true
  //     },
  //     {
  //       id: "inventory",
  //       title: "Inventory",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/docs/inventory",
  //     },
  //     {
  //       id: "search",
  //       title: "Search",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/docs/search",
  //       collapsed: true
  //     },
  //     {
  //       id: "resources",
  //       title: "Resources",
  //       type: "collapse",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Manager"],
  //       children: [
  //         {
  //           id: "inventory-resources",
  //           title: "Inv - Resources",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin", "Manager"],
  //           navLink: "/docs/resources/inventory-resources"
  //         },
  //         {
  //           id: "server-resources",
  //           title: "Server - Resources",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin", "Manager"],
  //           navLink: "/docs/resources/server-resources"
  //         },
  //       ]
  //     },
  //     {
  //       id: "settings",
  //       title: "Settings",
  //       type: "collapse",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       children: [
  //         {
  //           id: "locations",
  //           title: "Locations",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin"],
  //           navLink: "/docs/settings/locations"
  //         },
  //         {
  //           id: "switches",
  //           title: "Switches",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin"],
  //           navLink: "/docs/settings/switches"
  //         },
  //         {
  //           id: "pdu",
  //           title: "PDU",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin"],
  //           navLink: "/docs/settings/pdu"
  //         },
  //       ]
  //     },
  //     {
  //       id: "kbase",
  //       title: "Old K-Base",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       navLink: "/docs/kbase",
  //     },
  //   ]
  // },
  // {
  //   id: "ipwatch",
  //   title: "Ipwatch",
  //   type: "collapse",
  //   icon: <Icon.Eye size={20} />,
  //   children: [
  //     {
  //       id: "search",
  //       title: "Search",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/ipwatch/search",
  //       collapsed: false
  //     },
  //     {
  //       id: "null_routes",
  //       title: "Null Routes",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/ipwatch/null-routes",
  //       collapsed: false
  //     },
  //     {
  //       id: "shipments",
  //       title: "Shipments",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/ipwatch/shipment",
  //       collapsed: false
  //     },
  //   ]
  // },
  // {
  //   id: "webfinder",
  //   title: "WebFinder",
  //   type: "collapse",
  //   icon: <Icon.CheckCircle size={20} />,
  //   children: [
  //     {
  //       id: "shopping_list",
  //       title: "Shopping List",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/webfinder/shopping-list",
  //       collapsed: false
  //     },
  //   ]
  // },
  // {
  //   id: "petersmith",
  //   title: "Petersmith",
  //   type: "collapse",
  //   icon: <Icon.Slack size={20} />,
  //   permissions: ["Admin", "Support", "Remote", "Manager"],
  //   children: [
  //     {
  //       id: "tickets",
  //       title: "Tickets",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/tickets"
  //     },
  //     {
  //       id: "order_manager",
  //       title: "Order Manager",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/order_manager"
  //     },
  //     {
  //       id: "crm_search",
  //       title: "CRM Search",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/crm_search"
  //     },
  //     {
  //       id: "password_generator",
  //       title: "Password",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/password-generator"
  //     }, 
  //     {
  //       id: "cpanel",
  //       title: "Cpanel Audit",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/cpanel"
  //     },
  //     {
  //       id: "pts-settings",
  //       title: "Settings",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/settings"
  //     }
  //   ]
  // },
  // {
  //   id: "vps",
  //   title: "VPS",
  //   type: "collapse",
  //   icon: <Icon.PieChart size={20} />,
  //   permissions: ["Admin", "Support", "Remote", "Manager"],
  //   children: [
  //     {
  //       id: "vps_statistics",
  //       title: "VPS Statistics",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/vps/statistics",
  //       collapsed: true
  //     },
  //   ]
  // },
  // {
  //   id: "main-settings",
  //   title: "Settings",
  //   type: "collapse",
  //   icon: <Icon.Settings size={20} />,
  //   permissions: ["Admin"],
  //   children: [
  //     {
  //       id: "locations",
  //       title: "Locations",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       navLink: "/settings/locations"
  //     },
  //     {
  //       id: "users",
  //       title: "Users",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       navLink: "/settings/users"
  //     }
  //   ]
  // }
]

export default navigationConfig
