import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { Send, Phone, MessageSquare, CheckCircle, AlertCircle, Loader2, Lock } from 'lucide-react';

interface MembershipEnquiryProps {
  selectedInterest: 'Membership' | 'Personal Training' | 'General Enquiry';
  onInterestChange: (interest: 'Membership' | 'Personal Training' | 'General Enquiry') => void;
}

interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  consent?: string;
}

export const MembershipEnquiry: React.FC<MembershipEnquiryProps> = ({
  selectedInterest,
  onInterestChange,
}) => {
  const { clubData, addInquiry } = useGymData();

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long.';
    }

    // Phone validation (UAE / International)
    const cleanPhone = formData.phoneNumber.replace(/[\s\-()]/g, '');
    if (!cleanPhone) {
      newErrors.phoneNumber = 'Please enter your contact phone number.';
    } else if (!/^\+?[0-9]{8,15}$/.test(cleanPhone)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (e.g., +971 54 727 4777).';
    }

    // Email validation (optional)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address or leave blank.';
      }
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'You must consent to be contacted regarding this enquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmissionId = addInquiry({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email || undefined,
        message: formData.message || undefined,
        interestedIn: selectedInterest,
      });

      setSubmissionId(newSubmissionId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  // Generate pre-filled WhatsApp message for immediate dispatch
  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello ${clubData.name}!\n\n` +
      `I would like to enquire about: ${selectedInterest}\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phoneNumber}\n` +
      (formData.email ? `Email: ${formData.email}\n` : '') +
      (formData.message ? `Message: ${formData.message}\n` : '') +
      `Ref: ${submissionId}`
    );
    return `https://wa.me/${clubData.whatsappNumber}?text=${text}`;
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      message: '',
      consent: false,
    });
    onInterestChange('Membership');
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="membership-enquiry" className="py-24 sm:py-32 bg-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context & Direct Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-lime" />
                <span>MEMBERSHIP ENQUIRY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
                YOUR NEXT CHAPTER STARTS HERE.
              </h2>
              <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
                Ready to make your move? Get in touch with <strong className="text-white font-semibold">Fitness Zone – City Walk Dubai</strong> to explore membership options.
              </p>
            </div>

            {/* Direct Connect Options */}
            <div className="p-6 rounded-xl bg-[#181818] border border-white/10 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gray">
                Prefer to speak directly?
              </h3>
              
              <a
                href={clubData.links.telDirect}
                className="flex items-center space-x-3 p-3 rounded-lg bg-black/40 border border-white/5 hover:border-brand-lime/40 transition-colors group"
              >
                <div className="w-9 h-9 rounded bg-white/5 flex items-center justify-center text-brand-lime group-hover:bg-brand-lime group-hover:text-black transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-brand-gray">Direct Phone Call</div>
                  <div className="text-sm font-bold text-white font-mono">{clubData.phone}</div>
                </div>
              </a>

              <a
                href={clubData.links.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg bg-black/40 border border-white/5 hover:border-brand-lime/40 transition-colors group"
              >
                <div className="w-9 h-9 rounded bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-black transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-brand-gray">Direct WhatsApp Chat</div>
                  <div className="text-sm font-bold text-white">Message Reception</div>
                </div>
              </a>
            </div>

            <div className="flex items-center space-x-2 text-xs text-brand-gray/70">
              <Lock className="w-3.5 h-3.5 text-brand-lime" />
              <span>Your details are held confidentially and strictly used for club enquiries.</span>
            </div>
          </div>

          {/* Right Column: Form or Success Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#171717] rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl relative">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Category Selection Tabs */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-3">
                      Interested In <span className="text-brand-lime">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(['Membership', 'Personal Training', 'General Enquiry'] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => onInterestChange(option)}
                          className={`py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider transition-all text-center border ${
                            selectedInterest === option
                              ? 'bg-brand-lime text-black border-brand-lime shadow-md'
                              : 'bg-black/30 text-brand-gray border-white/10 hover:border-white/30'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
                      Full Name <span className="text-brand-lime">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="e.g. Tariq Al Mansoor"
                      className={`w-full px-4 py-3.5 rounded bg-black/50 border text-sm text-white placeholder-brand-gray/40 focus:outline-none focus:border-brand-lime transition-colors ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                      }`}
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'name-error' : undefined}
                    />
                    {errors.fullName && (
                      <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
                        Phone Number <span className="text-brand-lime">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, phoneNumber: e.target.value });
                          if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                        }}
                        placeholder="+971 54 727 4777"
                        className={`w-full px-4 py-3.5 rounded bg-black/50 border text-sm text-white placeholder-brand-gray/40 focus:outline-none focus:border-brand-lime transition-colors ${
                          errors.phoneNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                        }`}
                        aria-required="true"
                        aria-invalid={!!errors.phoneNumber}
                        aria-describedby={errors.phoneNumber ? 'phone-error' : undefined}
                      />
                      {errors.phoneNumber && (
                        <p id="phone-error" className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.phoneNumber}</span>
                        </p>
                      )}
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
                        Email Address <span className="text-white/40 lowercase font-normal">(optional)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="you@domain.com"
                        className={`w-full px-4 py-3.5 rounded bg-black/50 border text-sm text-white placeholder-brand-gray/40 focus:outline-none focus:border-brand-lime transition-colors ${
                          errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">
                      Additional Message <span className="text-white/40 lowercase font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your fitness background or specific queries..."
                      className="w-full px-4 py-3 rounded bg-black/50 border border-white/10 text-sm text-white placeholder-brand-gray/40 focus:outline-none focus:border-brand-lime transition-colors resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => {
                          setFormData({ ...formData, consent: e.target.checked });
                          if (errors.consent) setErrors({ ...errors, consent: undefined });
                        }}
                        className="mt-1 w-4 h-4 rounded bg-black/60 border-white/30 text-brand-lime focus:ring-brand-lime focus:ring-offset-black accent-[#C6FF3D]"
                        aria-required="true"
                      />
                      <span className="text-xs text-brand-gray leading-relaxed">
                        I consent to Fitness Zone – City Walk Dubai contacting me via phone, WhatsApp, or email regarding my enquiry.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded bg-brand-lime hover:bg-brand-lime-hover disabled:opacity-60 text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl shadow-brand-lime/15 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>PROCESSING ENQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT ENQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success State with Actionable WhatsApp Link */
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-brand-lime/10 text-brand-lime flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-mono font-semibold text-brand-lime tracking-widest uppercase">
                      Reference #{submissionId}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight mt-1 mb-2">
                      ENQUIRY RECORDED
                    </h3>
                    <p className="text-sm text-brand-gray max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{formData.fullName}</strong>. We have logged your enquiry regarding{' '}
                      <span className="text-brand-lime font-medium">{selectedInterest}</span>.
                    </p>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="p-5 rounded-xl bg-black/40 border border-white/5 space-y-3 max-w-md mx-auto">
                    <p className="text-xs text-brand-gray">
                      Want an instant reply? Send your pre-filled enquiry straight to the club reception WhatsApp:
                    </p>

                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
                    >
                      <MessageSquare className="w-4 h-4 fill-black" />
                      <span>CONTINUE ON WHATSAPP</span>
                    </a>

                    <a
                      href={clubData.links.telDirect}
                      className="w-full py-3 px-4 rounded border border-white/15 hover:border-white/40 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-lime" />
                      <span>CALL RECEPTION ({clubData.phone})</span>
                    </a>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs text-brand-gray hover:text-white underline underline-offset-4 transition-colors"
                  >
                    Submit another enquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
