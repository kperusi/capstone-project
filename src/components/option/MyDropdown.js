import { Menu } from '@headlessui/react'
import './optionstyle/optionsytle.css'

export default function MyDropdown(props) {
  return (
    <Menu  as="div" className="menu relative ">
      <Menu.Button>More</Menu.Button>
      <Menu.Items as="div" className="menu-item" style={{display:'flex', flexDirection:'column', position:'absolute',width:'200px'}}>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && 'bg-blue-500'}`}
            onClick={()=>{props.handleDelete(props.id,props.img)}}
            >
              Delete
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && 'bg-blue-500'}`}
             onClick={()=>{props.handleEdit(props.id)}}
            >
              Edit
            </button>
          )}
        </Menu.Item>
        
      </Menu.Items>
    </Menu>
  )
}