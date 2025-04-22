export default function PatentSection() {
  return (
    <section id="patents" className="py-16 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Protected by U.S. Patents
          </div>
          <h2 className="text-3xl font-bold font-heading text-primary mb-4">Triple-Patented Security Technology</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">CyberLockX's security is built on three groundbreaking patents that provide unbreakable protection, court-ready compliance, and self-learning threat prevention.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary text-white p-4">
            <h3 className="text-lg font-semibold">Patent-Powered Differentiators</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="py-3 px-6 text-left text-sm font-semibold text-neutral-700">Component</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-neutral-700">Patented Innovation</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-neutral-700">Competitor Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="py-4 px-6 font-medium">AFA Browser</td>
                  <td className="py-4 px-6">
                    <ul className="list-disc list-inside text-neutral-700">
                      <li>ECSMID: Quantum-proof encryption (Claim 2)</li>
                      <li>DLSeT: Self-learning threat detection (Claim 5)</li>
                    </ul>
                  </td>
                  <td className="py-4 px-6 text-neutral-700">Others rely on signature-based detection</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">SOS2A AI Agent</td>
                  <td className="py-4 px-6">
                    <ul className="list-disc list-inside text-neutral-700">
                      <li>DsTC: Immutable compliance chains (Claim 4)</li>
                      <li>DLSeT: Adaptive mitigation strategies (Claim 7)</li>
                    </ul>
                  </td>
                  <td className="py-4 px-6 text-neutral-700">Manual policy updates required elsewhere</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Hybrid SOC</td>
                  <td className="py-4 px-6">
                    <ul className="list-disc list-inside text-neutral-700">
                      <li>DLSeT: AI that evolves with attacker TTPs (Claim 9)</li>
                    </ul>
                  </td>
                  <td className="py-4 px-6 text-neutral-700">Static AI models (Cynet, CrowdStrike)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <i className="fas fa-shield-alt text-3xl text-primary"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">U.S. Patent 10,911,217</h3>
            <p className="text-neutral-600 mb-3">ECSMID: Enhanced Cryptographic Secure Mechanism for ID</p>
            <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">Quantum-Resistant Encryption</span>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <i className="fas fa-link text-3xl text-primary"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">U.S. Patent 10,999,276</h3>
            <p className="text-neutral-600 mb-3">DsTC: Dynamic secure Transaction Chains</p>
            <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">Court-Ready Compliance</span>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <i className="fas fa-brain text-3xl text-primary"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">U.S. Patent 11,367,065</h3>
            <p className="text-neutral-600 mb-3">DLSeT: Deep Learning Security Threat Detection</p>
            <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">Self-Learning Threat Prevention</span>
          </div>
        </div>
      </div>
    </section>
  );
}
