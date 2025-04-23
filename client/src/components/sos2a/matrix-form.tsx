import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sos2aFormData } from "@/lib/sos2a-types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface MatrixFormProps {
  formData: Sos2aFormData;
  updateFormData: (data: Partial<Sos2aFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function MatrixForm({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: MatrixFormProps) {
  const [matrixData, setMatrixData] = useState<any>({
    // Using a simplified matrix structure based on SOS²A assessment matrix
    internet_presence: {
      risks: [
        "Phishing & Spoofing",
        "Social Engineering",
        "Data Privacy Violation",
        "Data Breaches",
        "DDoS Attacks"
      ],
      vulnerabilities: [
        "Weak Authentication",
        "Unpatched Software",
        "Insecure File Uploads",
        "Cross-Site Scripting"
      ],
      compliance: {
        pci_dss: true,
        hipaa: false,
        gdpr: true,
        ccpa: true
      }
    },
    email_usage: {
      risks: [
        "Phishing",
        "Malware",
        "Data Leakage"
      ],
      vulnerabilities: [
        "Lack of Encryption",
        "No Multi-Factor Authentication",
        "Insufficient Spam Filtering"
      ],
      compliance: {
        pci_dss: true,
        hipaa: false,
        gdpr: true,
        ccpa: false
      }
    },
    network_security: {
      risks: [
        "Unauthorized Access",
        "Man-in-the-Middle Attacks",
        "Lateral Movement"
      ],
      vulnerabilities: [
        "Weak Network Segmentation",
        "Outdated Firewall Rules",
        "Insufficient Logging"
      ],
      compliance: {
        pci_dss: false,
        hipaa: false,
        gdpr: false,
        ccpa: false
      }
    }
  });

  const infrastructureTypes = [
    { key: "internet_presence", name: "Internet Presence (Website and social media)" },
    { key: "internet_presence_cloud", name: "Internet Presence with VM (Cloud-Based)" },
    { key: "pos_system_no_internet", name: "POS System Cellular Data Network: No ISP Internet Footprint" },
    { key: "pos_system_with_internet", name: "POS System Cellular Data Network: ISP Internet Footprint" },
    { key: "email_usage", name: "Email Use" },
    { key: "email_social_only", name: "Email Use without Website (Social media only)" },
    { key: "internet_access_isp", name: "Internet Access via ISP" },
    { key: "internet_access_mobile", name: "Internet Access Mobile Data/Hotspots" },
    { key: "ai_applications", name: "AI applications (ChatGPT, Copilot, etc.)" },
    { key: "firewall_vpn", name: "Firewall and VPN Solutions" },
    { key: "endpoint_security", name: "Endpoint and Device Security (EDR, MDM)" },
    { key: "network_segmentation", name: "Network Segmentation" },
    { key: "backup_disaster_recovery", name: "Backup and Disaster Recovery" },
    { key: "email_filtering", name: "Email Filtering and Anti-Phishing Tools" },
    { key: "mfa", name: "Multi-Factor Authentication (MFA)" },
    { key: "dns_filtering", name: "DNS Filtering and Secure DNS" },
    { key: "cloud_security", name: "Cloud Security Tools (CASB, WAF)" },
    { key: "incident_response", name: "Incident Response Plan" },
    { key: "employee_training", name: "Employee Training on Cybersecurity Threats" },
    { key: "data_encryption", name: "Data Encryption and DLP Tools" }
  ];

  const complianceStandards = [
    { key: "pci_dss", name: "PCI-DSS" },
    { key: "hipaa", name: "HIPAA" },
    { key: "cmmc", name: "CMMC" },
    { key: "gdpr", name: "GDPR" },
    { key: "ccpa", name: "CCPA" },
    { key: "soc2", name: "SOC 2" },
    { key: "iso27001", name: "ISO 27001" },
    { key: "cyber_essentials", name: "Cyber Essentials (UK)" },
    { key: "ferpa", name: "FERPA" },
    { key: "glba", name: "GLBA" },
    { key: "pipeda", name: "PIPEDA" },
    { key: "ftc", name: "FTC Safeguard Rules" },
    { key: "sba_csg", name: "SBA CSG" },
    { key: "fisma", name: "FISMA" },
    { key: "dfars", name: "DFARS" }
  ];
  
  const mitreTactics = [
    { key: "initial_access", name: "Initial Access (TA0001)" },
    { key: "execution", name: "Execution (TA0002)" },
    { key: "persistence", name: "Persistence (TA0003)" },
    { key: "privilege_escalation", name: "Privilege Escalation (TA0004)" },
    { key: "defense_evasion", name: "Defense Evasion (TA0005)" },
    { key: "credential_access", name: "Credential Access (TA0006)" },
    { key: "discovery", name: "Discovery (TA0007)" },
    { key: "lateral_movement", name: "Lateral Movement (TA0008)" },
    { key: "collection", name: "Collection (TA0009)" },
    { key: "exfiltration", name: "Exfiltration (TA0010)" },
    { key: "command_and_control", name: "Command and Control (TA0011)" }
  ];
  
  const mitreTechniques = [
    { key: "t1566", name: "Phishing (T1566)" },
    { key: "t1595", name: "Active Scanning (T1595)" },
    { key: "t1583", name: "Acquire Infrastructure (T1583)" },
    { key: "t1580", name: "Obtain Capabilities (T1580)" },
    { key: "t1592", name: "Gather Victim Host Information (T1592)" }
  ];
  
  const policies = [
    { key: "acceptable_use", name: "Acceptable Use Policy (AUP)" },
    { key: "access_control", name: "Access Control Policy" },
    { key: "incident_response", name: "Incident Response Policy" },
    { key: "remote_work", name: "Remote Work Policy" },
    { key: "email_communication", name: "Email and Communication Policy" },
    { key: "vendor_management", name: "Vendor Management Policy" },
    { key: "information_security", name: "Information Security Policy" }
  ];
  
  const procedures = [
    { key: "access_control_procedures", name: "Access Control Procedures" },
    { key: "data_protection_procedures", name: "Data Protection Procedures" },
    { key: "incident_response_procedures", name: "Incident Response Procedures" }
  ];
  
  const plans = [
    { key: "business_continuity", name: "Business Continuity Plan (BCP)" },
    { key: "disaster_recovery", name: "Disaster Recovery Plan (DRP)" },
    { key: "incident_response_plan", name: "Incident Response Plan (IRP)" },
    { key: "employee_training", name: "Employee Training Plan" },
    { key: "audit_plan", name: "Audit Plan" },
    { key: "technology_lifecycle", name: "Technology Lifecycle Plan" },
    { key: "soc_monitoring", name: "SOC Monitoring Plan" }
  ];

  const handleSubmit = () => {
    updateFormData({ matrixData });
    onNext();
  };

  const handleAddRisk = (infraKey: string, risk: string) => {
    if (!risk.trim()) return;
    
    setMatrixData((prev: any) => ({
      ...prev,
      [infraKey]: {
        ...prev[infraKey],
        risks: [...(prev[infraKey]?.risks || []), risk]
      }
    }));
  };

  const handleAddVulnerability = (infraKey: string, vulnerability: string) => {
    if (!vulnerability.trim()) return;
    
    setMatrixData((prev: any) => ({
      ...prev,
      [infraKey]: {
        ...prev[infraKey],
        vulnerabilities: [...(prev[infraKey]?.vulnerabilities || []), vulnerability]
      }
    }));
  };

  const handleComplianceChange = (infraKey: string, complianceKey: string, checked: boolean) => {
    setMatrixData((prev: any) => ({
      ...prev,
      [infraKey]: {
        ...prev[infraKey],
        compliance: {
          ...(prev[infraKey]?.compliance || {}),
          [complianceKey]: checked
        }
      }
    }));
  };
  
  const handleMitreTacticChange = (infraKey: string, tacticKey: string, checked: boolean) => {
    setMatrixData((prev: any) => ({
      ...prev,
      [infraKey]: {
        ...prev[infraKey],
        mitreTactics: {
          ...(prev[infraKey]?.mitreTactics || {}),
          [tacticKey]: checked
        }
      }
    }));
  };
  
  const handleMitreTechniqueChange = (infraKey: string, techniqueKey: string, checked: boolean) => {
    setMatrixData((prev: any) => ({
      ...prev,
      [infraKey]: {
        ...prev[infraKey],
        mitreTechniques: {
          ...(prev[infraKey]?.mitreTechniques || {}),
          [techniqueKey]: checked
        }
      }
    }));
  };
  
  const handlePolicyChange = (infraKey: string, policyKey: string, checked: boolean) => {
    setMatrixData((prev: any) => ({
      ...prev,
      [infraKey]: {
        ...prev[infraKey],
        policies: {
          ...(prev[infraKey]?.policies || {}),
          [policyKey]: checked
        }
      }
    }));
  };
  
  const handleProcedureChange = (infraKey: string, procedureKey: string, checked: boolean) => {
    setMatrixData((prev: any) => ({
      ...prev,
      [infraKey]: {
        ...prev[infraKey],
        procedures: {
          ...(prev[infraKey]?.procedures || {}),
          [procedureKey]: checked
        }
      }
    }));
  };
  
  const handlePlanChange = (infraKey: string, planKey: string, checked: boolean) => {
    setMatrixData((prev: any) => ({
      ...prev,
      [infraKey]: {
        ...prev[infraKey],
        plans: {
          ...(prev[infraKey]?.plans || {}),
          [planKey]: checked
        }
      }
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-primary">Step 2: Interview & Matrix Population</h2>
      <p className="mb-6 text-neutral-600">
        Use this matrix to document the organization's security posture across different infrastructure areas.
        This information will be used to generate your preliminary report.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
        <div className="flex items-start">
          <div className="mr-3 text-blue-500">
            <i className="fas fa-info-circle text-xl"></i>
          </div>
          <div>
            <h4 className="font-medium text-blue-700">Interview Guidance</h4>
            <p className="text-sm text-blue-600">
              During the interview, ask the client about their infrastructure, current security measures, 
              and known risks. Use this information to populate the matrix below. The matrix will help identify 
              gaps in their security posture and compliance requirements.
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[500px] rounded-md border p-4">
        <div className="space-y-8">
          {infrastructureTypes.map((infra) => (
            <div key={infra.key} className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4">{infra.name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Potential Security Risks</h4>
                  <div className="space-y-2">
                    {matrixData[infra.key]?.risks?.map((risk: string, idx: number) => (
                      <div key={idx} className="flex items-center bg-white p-2 border rounded">
                        <span className="flex-grow">{risk}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setMatrixData((prev: any) => ({
                              ...prev,
                              [infra.key]: {
                                ...prev[infra.key],
                                risks: prev[infra.key].risks.filter((_: any, i: number) => i !== idx)
                              }
                            }));
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Add new risk" 
                        id={`new-risk-${infra.key}`}
                        className="flex-grow"
                      />
                      <Button 
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById(`new-risk-${infra.key}`) as HTMLInputElement;
                          handleAddRisk(infra.key, input.value);
                          input.value = '';
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Potential Vulnerabilities</h4>
                  <div className="space-y-2">
                    {matrixData[infra.key]?.vulnerabilities?.map((vuln: string, idx: number) => (
                      <div key={idx} className="flex items-center bg-white p-2 border rounded">
                        <span className="flex-grow">{vuln}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setMatrixData((prev: any) => ({
                              ...prev,
                              [infra.key]: {
                                ...prev[infra.key],
                                vulnerabilities: prev[infra.key].vulnerabilities.filter((_: any, i: number) => i !== idx)
                              }
                            }));
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Add new vulnerability" 
                        id={`new-vuln-${infra.key}`}
                        className="flex-grow"
                      />
                      <Button 
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById(`new-vuln-${infra.key}`) as HTMLInputElement;
                          handleAddVulnerability(infra.key, input.value);
                          input.value = '';
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Compliance Requirements</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {complianceStandards.map((compliance) => (
                    <div key={compliance.key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${infra.key}-${compliance.key}`}
                        checked={!!matrixData[infra.key]?.compliance?.[compliance.key]}
                        onCheckedChange={(checked) => 
                          handleComplianceChange(infra.key, compliance.key, !!checked)
                        }
                      />
                      <label 
                        htmlFor={`${infra.key}-${compliance.key}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {compliance.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">MITRE ATT&CK Tactics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mitreTactics.map((tactic) => (
                      <div key={tactic.key} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`${infra.key}-tactic-${tactic.key}`}
                          checked={!!matrixData[infra.key]?.mitreTactics?.[tactic.key]}
                          onCheckedChange={(checked) => 
                            handleMitreTacticChange(infra.key, tactic.key, !!checked)
                          }
                        />
                        <label 
                          htmlFor={`${infra.key}-tactic-${tactic.key}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {tactic.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">MITRE ATT&CK Techniques</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mitreTechniques.map((technique) => (
                      <div key={technique.key} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`${infra.key}-technique-${technique.key}`}
                          checked={!!matrixData[infra.key]?.mitreTechniques?.[technique.key]}
                          onCheckedChange={(checked) => 
                            handleMitreTechniqueChange(infra.key, technique.key, !!checked)
                          }
                        />
                        <label 
                          htmlFor={`${infra.key}-technique-${technique.key}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {technique.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>
          Back to Questionnaire
        </Button>
        <Button onClick={handleSubmit} className="bg-secondary hover:bg-orange-600">
          Generate Preliminary Report
        </Button>
      </div>
    </div>
  );
}
