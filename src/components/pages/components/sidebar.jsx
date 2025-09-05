import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  RiDashboardLine,
  RiArrowDownSLine,
  RiArrowRightSLine
} from '@remixicon/react'

const Sidebar = ({ 
  isOpen, 
  onClose,
  sidebarItems = [
    { name: 'Dashboard', icon: RiDashboardLine, href: '/' },
  ]
}) => {
  const location = useLocation()
  const [openDropdowns, setOpenDropdowns] = useState({})

  // Toggle dropdown open/close
  const toggleDropdown = (itemName) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }))
  }

  // Check if any sub-item is active
  const isDropdownActive = (subItems) => {
    return subItems?.some(subItem => location.pathname === subItem.href)
  }

  // Render sidebar item (regular or dropdown)
  const renderSidebarItem = (item, index) => {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isDropdownOpen = openDropdowns[item.name]
    const isActive = location.pathname === item.href
    const isSubItemActive = hasSubItems && isDropdownActive(item.subItems)

    return (
      <li key={index}>
        {hasSubItems ? (
          // Dropdown item
          <>
            <button
              onClick={() => toggleDropdown(item.name)}
              className={`flex ps-5 items-center p-2 w-full text-left text-gray-900 group border-white ${
                isSubItemActive
                  ? 'bg-[#5893A2] border-r-4' 
                  : 'hover:bg-[#5893A2] hover:border-r-4'
              }`}
            >
              <item.icon className={`w-5 h-5 transition duration-75 ${
                isSubItemActive
                  ? 'text-[var(--white)]' 
                  : 'text-[var(--icon)] group-hover:text-[var(--white)]'
              }`} />
              <span className={`flex-1 ms-3 whitespace-nowrap ${
                isSubItemActive
                  ? 'text-[var(--white)]' 
                  : 'text-[#C8C8C8] group-hover:text-[var(--white)]'
              }`}>
                {item.name}
              </span>
              
              {/* Dropdown arrow */}
              {isDropdownOpen ? (
                <RiArrowDownSLine className={`w-4 h-4 transition duration-75 ${
                  isSubItemActive
                    ? 'text-[var(--white)]' 
                    : 'text-[var(--icon)] group-hover:text-[var(--white)]'
                }`} />
              ) : (
                <RiArrowRightSLine className={`w-4 h-4 transition duration-75 ${
                  isSubItemActive
                    ? 'text-[var(--white)]' 
                    : 'text-[var(--icon)] group-hover:text-[var(--white)]'
                }`} />
              )}
              
              {/* Badges */}
              {item.badge && (
                <span
                  className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${
                    item.badgeColor === 'blue'
                      ? 'text-blue-800 bg-blue-100 w-3 h-3 p-3'
                      : 'text-gray-800 bg-gray-100'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
            
            {/* Dropdown sub-items */}
            {isDropdownOpen && (
              <ul className="pl-8 mt-1 space-y-1">
                {item.subItems.map((subItem, subIndex) => {
                  const isSubActive = location.pathname === subItem.href
                  
                  return (
                    <li key={subIndex}>
                      <Link
                        to={subItem.href}
                        className={`flex items-center p-2 text-gray-900 rounded-lg group ${
                          isSubActive 
                            ? 'bg-[#4A7C89] text-[var(--white)]' 
                            : 'text-[#C8C8C8] hover:bg-[#4A7C89] hover:text-[var(--white)]'
                        }`}
                      >
                        {subItem.icon && (
                          <subItem.icon className={`w-4 h-4 transition duration-75 ${
                            isSubActive 
                              ? 'text-[var(--white)]' 
                              : 'text-[var(--icon)] group-hover:text-[var(--white)]'
                          }`} />
                        )}
                        <span className={`ms-3 whitespace-nowrap text-sm ${
                          isSubActive 
                            ? 'text-[var(--white)]' 
                            : 'text-[#C8C8C8] group-hover:text-[var(--white)]'
                        }`}>
                          {subItem.name}
                        </span>
                        
                        {/* Sub-item badges */}
                        {subItem.badge && (
                          <span
                            className={`inline-flex items-center justify-center px-2 ms-3 text-xs font-medium rounded-full ${
                              subItem.badgeColor === 'blue'
                                ? 'text-blue-800 bg-blue-100 w-3 h-3 p-2'
                                : 'text-gray-800 bg-gray-100'
                            }`}
                          >
                            {subItem.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </>
        ) : (
          // Regular item
          <Link
            to={item.href}
            className={`flex ps-5 items-center p-2 text-gray-900 group border-white ${
              isActive 
                ? 'bg-[#5893A2] border-r-4' 
                : 'hover:bg-[#5893A2] hover:border-r-4'
            }`}
          >
            <item.icon className={`w-5 h-5 transition duration-75 ${
              isActive 
                ? 'text-[var(--white)]' 
                : 'text-[var(--icon)] group-hover:text-[var(--white)]'
            }`} />
            <span className={`flex-1 ms-3 whitespace-nowrap ${
              isActive 
                ? 'text-[var(--white)]' 
                : 'text-[#C8C8C8] group-hover:text-[var(--white)]'
            }`}>
              {item.name}
            </span>
            
            {/* Badges */}
            {item.badge && (
              <span
                className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${
                  item.badgeColor === 'blue'
                    ? 'text-blue-800 bg-blue-100 w-3 h-3 p-3'
                    : 'text-gray-800 bg-gray-100'
                }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        )}
      </li>
    )
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen pt-5 transition-transform bg-[var(--primary)] border-r border-gray-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
      >
        <div className="h-full pb-4 overflow-hidden bg-transparent">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center pb-8 ms-2 w-full">
            {/* <img src={LogoWhite} width={80} alt="" /> */}
          </Link>
          
          <ul className="space-y-2 font-medium max-h-screen overflow-x-hidden overflow-y-auto no_scroll pb-5">
            {sidebarItems?.map((item, index) => renderSidebarItem(item, index))}
          </ul>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
          onClick={onClose}
        />
      )}
    </>
  )
}

export default Sidebar