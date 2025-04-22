export default function VideoDemoSection() {
  return (
    <section id="video-demo" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-primary mb-4">See CyberLockX in Action</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Watch our DataShieldAI technology demonstrating real-time security protection and advanced encryption capabilities.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 relative">
            <video 
              className="w-full h-full object-cover"
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
          </div>
        </div>
      </div>
    </section>
  );
}