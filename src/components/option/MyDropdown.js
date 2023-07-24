import { Menu } from '@headlessui/react'
import './optionstyle/optionsytle.css'

export default function MyDropdown() {
  return (
    <Menu  as="div" className="menu relative ">
      <Menu.Button>More</Menu.Button>
      <Menu.Items as="div" className="menu-item" style={{display:'flex', flexDirection:'column', position:'absolute',width:'200px'}}>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Delete
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Edit
            </a>
          )}
        </Menu.Item>
        
      </Menu.Items>
    </Menu>
  )
}