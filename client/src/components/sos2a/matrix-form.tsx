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
    // Using a simplified matrix structure based on SOS2A assessment matrix
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
    { key: "email_usage", name: "Email Use" },
    { key: "network_security", name: "Network Security" },
    { key: "endpoint_security", name: "Endpoint Security" },
    { key: "data_storage", name: "Data Storage and Backup" }
  ];

  const complianceStandards = [
    { key: "pci_dss", name: "PCI-DSS" },
    { key: "hipaa", name: "HIPAA" },
    { key: "gdpr", name: "GDPR" },
    { key: "ccpa", name: "CCPA" },
    { key: "nist", name: "NIST CSF" },
    { key: "iso27001", name: "ISO 27001" }
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-primary">Step 2: Interview & Matrix</h2>
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

              <div>
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
