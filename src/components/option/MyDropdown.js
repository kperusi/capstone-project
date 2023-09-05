import { Menu } from "@headlessui/react";
import "./optionstyle/optionsytle.css";

export default function MyDropdown(props) {
  return (
    <Menu as="div" className="menu relative ">
      <Menu.Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </Menu.Button>
      <Menu.Items
        as="div"
        className="menu-item"
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          width: "200px",
        }}
      >
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && "bg-blue-500"}`}
              onClick={() => {
                props.handleDelete(props.id, props.img);
              }}
            >
              Delete
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && "bg-blue-500"}`}
              onClick={() => {
                props.handleEdit(props.id);
              }}
            >
              Edit
            </button>
          )}
        </Menu.Item>
        {props.unpublish&& <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && "bg-blue-500"}`}
              onClick={() => {
                // props.handleEdit(props.id);
              }}
            >
              Unpublish
            </button>
          )}
          
          </Menu.Item>}
      </Menu.Items>
    </Menu>
  );
}
