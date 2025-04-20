export default function Footer() {
  const socialLinks = [
    { name: 'LinkedIn', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'Instagram', url: '#' },
    // Add more social links as needed
  ]

  return (
    <footer className="bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center space-x-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="text-white hover:text-gray-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-4">
          © {new Date().getFullYear()} PineSaga Studios. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 