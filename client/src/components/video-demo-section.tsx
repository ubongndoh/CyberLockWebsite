import { Link } from "wouter";

export default function VideoDemoSection() {
  return (
    <section id="video-demo" className="py-16 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Animated security shield background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-secondary/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/5 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              EXCLUSIVE DEMO
            </span>
          </div>
          <h2 className="text-3xl font-bold font-heading text-primary mb-4">See CyberLockX in Action</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Watch our DataShieldAI technology demonstrating real-time security protection and advanced encryption capabilities.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
          <div className="aspect-w-16 aspect-h-9 relative">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              poster="/assets/video-poster.svg"
            >
              <source src="/assets/DatashieldAI2025.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-primary mb-2">DataShieldAI Demo 2025</h3>
            <p className="text-neutral-600 mb-4">
              This video demonstrates how our patent-protected technology prevents security breaches in real-time while 
              maintaining full encryption throughout the data lifecycle.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Triple-patented Technology
              </span>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                Real-time Threat Prevention
              </span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                Cell-level Encryption
              </span>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="bg-secondary hover:bg-green-600 text-white py-3 px-6 rounded-md shadow-md transition duration-150 ease-in-out font-medium flex items-center gap-2">
                <i className="fas fa-calendar-alt"></i>
                Schedule a Personal Demo
              </a>
              <Link href="/sos2a-tool" className="bg-white border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-md shadow-md transition duration-150 ease-in-out font-medium flex items-center gap-2">
                <i className="fas fa-shield-alt"></i>
                Try SOS²A Assessment
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 text-sm text-neutral-500">
          <p>Our demos are conducted by cybersecurity experts who can answer all your technical questions.</p>
        </div>
      </div>
    </section>
  );
}