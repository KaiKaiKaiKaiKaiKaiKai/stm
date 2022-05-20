import Link from 'next/link'

function HeaderItem({ title, Icon, href, green}) {
  return (
    <Link href={href}>
      <a>
          <div className={`ml-3 inline-flex items-center ${green == 'true' ? 'text-green-400' : 'text-blue-400'} align-middle`}>
              <Icon className="h-4 mr-1"/>
              <span className="text-sm">{title}</span>
          </div>
      </a>
    </Link>
  )
}

export default HeaderItem