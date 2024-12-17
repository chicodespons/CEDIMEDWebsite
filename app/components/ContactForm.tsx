'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

enum MessageType {
  CLINICAL_CARE = 'klinischeZorg',
  EDUCATION = 'onderwijs',
  RESEARCH = 'onderzoek',
  INNOVATION = 'innovatie',
}

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  tel: string; // Optional
  messageType: MessageType;
  message: string;
  recaptchaToken: string;
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    tel: '', // Not required
    messageType: MessageType.CLINICAL_CARE,
    message: '',
    recaptchaToken: '',
  });

  const t = useTranslations();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecaptchaChange = (token: string | null) => {
    setFormData({
      ...formData,
      recaptchaToken: token || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.recaptchaToken) {
      alert('Please complete the reCAPTCHA.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 uppercase tracking-wider">{t('contacteerOns')}</h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name Input */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                {t('voorNaam')}
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('voorNaam')}
              />
            </div>

            {/* Last Name Input */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              {t('familieNaam')}
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('familieNaam')}
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('email2')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('email2')}
              />
            </div>

            {/* Telephone Input (Optional) */}
            <div>
              <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
              {t('tel2')}
              </label>
              <input
                type="tel"
                name="tel"
                id="tel"
                value={formData.tel}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="tel"
              />
            </div>

            {/* Message Type Dropdown */}
            <div>
              <label htmlFor="messageType" className="block text-sm font-medium text-gray-700">
              {t('onderwerp')}
              </label>
              <select
                name="messageType"
                id="messageType"
                value={formData.messageType}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={MessageType.CLINICAL_CARE}>{t('klinischeZorg')}</option>
                <option value={MessageType.EDUCATION}>{t('onderwijs')}</option>
                <option value={MessageType.RESEARCH}>{t('onderzoek')}</option>
                <option value={MessageType.INNOVATION}>{t('innovatie')}</option>
              </select>
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t('bericht')}
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('bericht')}
              />
            </div>

            {/* reCAPTCHA */}
            <div className="pt-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleRecaptchaChange}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-uzGreen hover:bg-uzGray text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                {t('verzendBericht')}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-lg font-medium text-green-600">{t('bedanktVoorBericht')}</h3>
            <p>{t('weZullenContactOpnemen')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
