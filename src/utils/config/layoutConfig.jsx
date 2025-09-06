// config/layoutConfig.js

import {
  RiLayoutGridFill,
  RiUserAddLine,
  RiDeleteBin6Line,
  RiRecycleLine,
  RiShoppingCart2Fill,
  RiUser3Fill,
  RiTruckFill,
  RiStackFill,
  RiMoneyDollarCircleLine,
  RiSettings3Fill,
  RiToolsFill,
  RiShieldCheckLine,
  RiFileTextLine,
  RiAddLine,
  RiListCheck,
} from '@remixicon/react'

// Routes where dashboard layout (header + sidebar) should be shown
export const dashboardRoutes = [
  '/dashboard',
  '/qr-codes',
  '/funds',
  '/history',
  '/users',
  '/account',
  '/production',
  '/inventory',
  '/quality',
  '/labour',
  '/machinery',
  '/waste',
  '/recycling',
  '/sales',
  '/purchases',
  '/buyers',
  '/supplier',
  '/accounts',
  '/reports',
  '/materials',
  '/settings',
  '/quality',
  
]

// Auth routes where mainScreen class should be applied
export const authRoutes = [
  '/',
  '/signup',
  '/verification',
  '/get-started',
  '/success',
  '/qr-setup',
  '/onboarding',
  '/home',
]

// Routes where NO layout should be shown (clean layout)
export const cleanRoutes = [
  '/', // landing page
  ...authRoutes // Include all auth routes in clean routes
]

// Sidebar navigation items
export const sidebarItems = [
  {
    name: 'Dashboard',
    icon: RiLayoutGridFill,
    href: '/dashboard'
  },
  {
    name: 'Production',
    icon: RiStackFill,
    href: '/production'
  },
  {
    name: 'Inventory',
    icon: RiStackFill,
    href: '/inventory'
  },
  {
    name: 'Quality Control',
    icon: RiShieldCheckLine,
    href: '/quality',
    //  subItems: [
    //   {
    //     name: 'Add Quality Details',
    //     icon: RiAddLine,
    //     href: '/quality/add'
    //   },
    //   {
    //     name: 'purchases Detail',
    //     icon: RiListCheck,
    //     href: '/purchases/list'
    //   },
     
    // ]
  },
  {
    name: 'Labour',
    icon: RiUserAddLine,
    href: '/labour',
    subItems: [
      {
        name: 'Add Labour',
        icon: RiAddLine,
        href: '/labour/add'
      },
      {
        name: 'Labour List',
        icon: RiListCheck,
        href: '/labour/list'
      },
      {
        name: 'Salaries Management',
        icon: RiListCheck,
        href: '/labour/salaries'
      }
     
    ]
  },
  {
    name: 'Machinery',
    icon: RiToolsFill,
    href: '/machinery'
  },
  {
    name: 'Waste Management',
    icon: RiDeleteBin6Line,
    href: '/waste'
  },
  {
    name: 'Recycling',
    icon: RiRecycleLine,
    href: '/recycling'
  },
  {
    name: 'Sales',
    icon: RiShoppingCart2Fill,
    href: '/sales'
  },
  {
    name: 'Purchases',
    icon: RiTruckFill,
    // href: '/purchases'
     href: '/purchases',
    subItems: [
      {
        name: 'Add purchases',
        icon: RiAddLine,
        href: '/purchases/add'
      },
      {
        name: 'purchases Detail',
        icon: RiListCheck,
        href: '/purchases/list'
      },
     
    ]
  },
  {
    name: 'Buyers',
    icon: RiUser3Fill,
    href: '/buyers'
  },
  {
    name: 'Materials',
    icon: RiUser3Fill,
    href: '/materials',
    subItems: [
      {
        name: 'Add Raw Materials',
        icon: RiAddLine,
        href: '/materials/add'
      },
    ]
  },
  {
    name: 'Suppliers',
    icon: RiUser3Fill,
    href: '/supplier',
    subItems: [
      {
        name: 'Add Suppliers',
        icon: RiAddLine,
        href: '/supplier/add'
      },
      {
        name: 'Suppliers List',
        icon: RiListCheck,
        href: '/supplier/list'
      },
    ]
  },
  {
    name: 'Accounts',
    icon: RiMoneyDollarCircleLine,
    href: '/accounts'
  },
  {
    name: 'Reports',
    icon: RiFileTextLine,
    href: '/reports'
  },
  {
    name: 'Settings',
    icon: RiSettings3Fill,
    href: '/settings'
  }
]

// Helper function to check if current path should show dashboard layout
export const shouldShowDashboardLayout = (pathname) => {
  return dashboardRoutes.some(route => pathname.startsWith(route))
}

// FIXED: Helper function to check if current path is auth route (should have mainScreen class)
export const isAuthRoute = (pathname) => {
  return authRoutes?.some(route => {
    if (route === '/') {
      return pathname === '/' // Exact match for root route
    }
    return pathname.startsWith(route)
  })
}

// Helper function to check if current path should show clean layout
export const shouldShowCleanLayout = (pathname) => {
  return cleanRoutes.some(route => {
    if (route === '/') {
      return pathname === '/' // Exact match for root route
    }
    return pathname === route || pathname.startsWith(route + '/')
  })
}

// Helper function to get layout type
export const getLayoutType = (pathname) => {
  if (shouldShowDashboardLayout(pathname)) {
    return 'dashboard' // Shows header + sidebar
  } else if (shouldShowCleanLayout(pathname)) {
    return 'clean'     // Shows nothing
  } else {
    return 'clean'     // Default fallback
  }
}

// Default user data structure
export const defaultUser = {
  name: 'Guest User',
  email: 'guest@itip.com',
  avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
}