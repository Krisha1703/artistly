// Default Button

import Link from "next/link";

const DefaultButton = ({href, text, icon}) => {
  return (
    <Link
        href={href}
        aria-label="Click to explore"
        className="bg-purple-600 hover:bg-purple-700 transition-all text-white md:px-8 md:py-2 p-2 px-6 md:max-w-none md:mx-0 max-w-full mx-auto rounded-lg shadow-md text-center font-semibold flex items-center gap-2 justify-center"
        >
        {icon}
        {text}
    </Link>
  )
}

export default DefaultButton