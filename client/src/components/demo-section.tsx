export default function DemoSection() {
  return (
    <section id="demo" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-primary mb-4">See CyberLockX in Action</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Watch how our secure browser protects your business from threats in real-time.</p>
        </div>
        
        <div className="bg-neutral-50 rounded-xl shadow-lg overflow-hidden">
          <div className="h-96 bg-neutral-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-blue-600 transition-colors">
                <i className="fas fa-play text-white text-2xl"></i>
              </div>
              <p className="text-neutral-600 font-medium">Watch Demo: Phishing Protection in Action</p>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold font-heading mb-4 text-primary">Enhanced Security Demo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
                <h4 className="font-medium text-lg mb-2">Scene 1: Phishing Prevention</h4>
                <p className="text-neutral-600 text-sm">See how our AFAAI browser blocks sophisticated phishing attempts while SOS²A logs the attempt for PCI DSS compliance.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
                <h4 className="font-medium text-lg mb-2">Scene 2: Automated Response</h4>
                <p className="text-neutral-600 text-sm">Watch how our Hybrid SOC detects and revokes attacker access automatically while updating your SOC 2 compliance report.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
                <h4 className="font-medium text-lg mb-2">Scene 3: Cell-Level Protection</h4>
                <p className="text-neutral-600 text-sm">Experience our patented encryption that protects individual cells in Google Sheets and words in Google Docs.</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <a href="#contact" className="inline-block bg-secondary hover:bg-orange-600 text-white py-3 px-6 rounded-md shadow-sm transition duration-150 ease-in-out font-medium">
                Schedule a Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
