import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import StepIndicator from "@/components/sos2a/step-indicator";
import QuestionnaireForm from "@/components/sos2a/questionnaire-form";
import MatrixForm from "@/components/sos2a/matrix-form";
import PreliminaryReport from "@/components/sos2a/preliminary-report";
import ComprehensiveReport from "@/components/sos2a/comprehensive-report";
import { Sos2aFormData } from "@/lib/sos2a-types";

export default function Sos2aTool() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Sos2aFormData>({
    businessName: "",
    industry: "",
    employeeCount: "",
    securityMeasures: [],
    primaryConcerns: [],
    contactInfo: {
      name: "",
      email: "",
      phone: ""
    },
    matrixData: null,
    reportType: "preliminary"
  });

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const updateFormData = (data: Partial<Sos2aFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold font-heading text-chart-4 mb-4">SMB Organizational and System Security Analysis (SOS2A) Tool</h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Complete the assessment process to receive a comprehensive security analysis for your business.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <StepIndicator currentStep={currentStep} />
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {currentStep === 1 && (
            <QuestionnaireForm 
              formData={formData} 
              updateFormData={updateFormData} 
              onNext={handleNextStep} 
            />
          )}
          
          {currentStep === 2 && (
            <MatrixForm 
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}
          
          {currentStep === 3 && (
            <PreliminaryReport 
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}
          
          {currentStep === 4 && (
            <ComprehensiveReport 
              formData={formData}
              onPrev={handlePrevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
