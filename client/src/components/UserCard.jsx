import { SlTrash, SlNote } from "react-icons/sl"
import { IoMdHeart } from "react-icons/io"
import { MdEditCalendar } from "react-icons/md"
import { useState } from "react"

const UserCard = ({ user, lastUserRef = null }) => {
  const [selected, setSelected] = useState(false)

  return (
    <li
      ref={lastUserRef}
      className={`relative bg-white flex flex-col justify-between items-center border ${
        selected ? "border-blue-500" : "border-gray-300"
      }  shadow hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150`}
    >
      <div className="w-full p-[10px] flex flex-col gap-2">
        <div className="flex items-center gap-1">
          {user.available && (
            <input
              type="checkbox"
              name=""
              id={user._id}
              onChange={() => setSelected(!selected)}
              className="outline-none m-0 h-[14px]"
            />
          )}
          <span
            className={`px-3 border text-xs rounded-full flex items-center ${
              user.available
                ? "bg-green-200 border-green-600"
                : "bg-red-200 border-red-600"
            }`}
          >
            {user.available === true ? "Available" : "Not Available"}
          </span>
        </div>

        <div className="flex items-center mt-[10px] space-x-3">
          <div>
            <img
              src={user.avatar}
              alt=""
              className="rounded-full border"
            />
          </div>
          <div className="flex flex-col justify-center space-x-1">
            <h3 className="font-semibold text-heading m-0 text-md text-left sm:text-md truncate capitalize">
              {user.first_name + " " + user.last_name}
            </h3>
            <p className="font-semibold text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex self-start gap-2 flex-wrap">
          <span className="px-3 border text-xs rounded-full flex items-center">
            {user.domain}
          </span>

          <span
            className={`px-3 border text-xs rounded-full flex items-center`}
          >
            {user.gender}
          </span>
        </div>
      </div>
    </li>
  )
}

export default UserCard
