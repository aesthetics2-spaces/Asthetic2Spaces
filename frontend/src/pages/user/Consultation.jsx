import React, { useState } from "react";
import BannerSection from "../../components/consultation/BannerSection";
import ConsultationOptions from "../../components/consultation/ConsultationOptions";
import BenefitsSection from "../../components/consultation/BenefitsSection";
import BookingForm from "../../components/consultation/BookingForm";

const ConsultationPage = () => {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    consultationType: "",
    propertyType: "",
    date: "",
    time: "",
    additional: ""
  });

  return (
    <div className="min-h-screen bg-light">
      <BannerSection />

      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ConsultationOptions 
              selectedConsultation={selectedConsultation} 
              setSelectedConsultation={setSelectedConsultation} 
              formData={formData} 
              setFormData={setFormData} 
            />
            <BenefitsSection />
          </div>

          <BookingForm 
            selectedConsultation={selectedConsultation} 
            formData={formData} 
            setFormData={setFormData} 
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
