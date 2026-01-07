export function FlowersBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">

      <svg
        className="absolute -left-20 -top-20 h-80 w-80 opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="60" r="25" fill="#fce7f3" />
        <circle cx="75" cy="85" r="25" fill="#fbcfe8" />
        <circle cx="125" cy="85" r="25" fill="#fbcfe8" />
        <circle cx="80" cy="115" r="25" fill="#fce7f3" />
        <circle cx="120" cy="115" r="25" fill="#fce7f3" />
        <circle cx="100" cy="90" r="15" fill="#f9a8d4" />
      </svg>

   
      <svg
        className="absolute -right-10 top-20 h-60 w-60 opacity-15"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="100" cy="50" rx="20" ry="35" fill="#fce7f3" />
        <ellipse cx="60" cy="80" rx="20" ry="35" fill="#fff1f2" transform="rotate(-45 60 80)" />
        <ellipse cx="140" cy="80" rx="20" ry="35" fill="#fff1f2" transform="rotate(45 140 80)" />
        <ellipse cx="70" cy="120" rx="20" ry="35" fill="#fce7f3" transform="rotate(-20 70 120)" />
        <ellipse cx="130" cy="120" rx="20" ry="35" fill="#fce7f3" transform="rotate(20 130 120)" />
        <circle cx="100" cy="85" r="12" fill="#fda4af" />
      </svg>

      {/* Flores inferiores izquierda */}
      <svg
        className="absolute -left-10 bottom-10 h-72 w-72 opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="60" r="22" fill="#fff1f2" />
        <circle cx="78" cy="82" r="22" fill="#fce7f3" />
        <circle cx="122" cy="82" r="22" fill="#fce7f3" />
        <circle cx="78" cy="108" r="22" fill="#fff1f2" />
        <circle cx="122" cy="108" r="22" fill="#fff1f2" />
        <circle cx="100" cy="85" r="12" fill="#f472b6" />
      </svg>

     
      <svg
        className="absolute -bottom-16 -right-16 h-96 w-96 opacity-15"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="100" cy="45" rx="18" ry="30" fill="#fce7f3" />
        <ellipse cx="65" cy="70" rx="18" ry="30" fill="#fbcfe8" transform="rotate(-50 65 70)" />
        <ellipse cx="135" cy="70" rx="18" ry="30" fill="#fbcfe8" transform="rotate(50 135 70)" />
        <ellipse cx="65" cy="110" rx="18" ry="30" fill="#fce7f3" transform="rotate(-30 65 110)" />
        <ellipse cx="135" cy="110" rx="18" ry="30" fill="#fce7f3" transform="rotate(30 135 110)" />
        <ellipse cx="100" cy="130" rx="18" ry="30" fill="#fff1f2" />
        <circle cx="100" cy="80" r="14" fill="#ec4899" />
      </svg>

      
      <svg
        className="absolute left-1/4 top-1/3 h-16 w-16 opacity-30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="25" cy="25" rx="12" ry="20" fill="#fce7f3" transform="rotate(15 25 25)" />
      </svg>

      <svg
        className="absolute right-1/3 top-2/3 h-12 w-12 opacity-25"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="25" cy="25" rx="10" ry="18" fill="#fbcfe8" transform="rotate(-20 25 25)" />
      </svg>

      <svg
        className="absolute left-2/3 bottom-1/3 h-14 w-14 opacity-20"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="25" cy="25" rx="11" ry="19" fill="#fff1f2" transform="rotate(35 25 25)" />
      </svg>
    </div>
  )
}
