import { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle2, Loader2, Mail, MapPin, MessageSquareText, Phone, Send, Truck, User } from 'lucide-react';

const DEFAULT_VEHICLE_TYPES = ['Mini Truck', 'Container Truck', 'Trailer', 'Refrigerated Truck'];

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  pickupLocation: '',
  dropLocation: '',
  vehicleType: '',
  message: '',
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function ErrorText({ errors, field }) {
  return errors[field] ? <p className="text-xs font-medium text-red-500">{errors[field]}</p> : null;
}

export default function QuoteCalculator() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState(DEFAULT_VEHICLE_TYPES);

  useEffect(() => {
    const fetchFleetTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/fleet`);
        if (response.data?.success && Array.isArray(response.data?.data)) {
          const fleetData = response.data.data;
          const uniqueTypes = [
            ...new Set(
              fleetData
                .map((item) => item.vehicleType)
                .filter((type) => typeof type === 'string' && type.trim() !== '')
            ),
          ];
          if (uniqueTypes.length > 0) {
            setVehicleTypes(uniqueTypes);
          }
        }
      } catch (err) {
        console.error('Failed to load fleet vehicle types, falling back to defaults:', err.message);
      }
    };
    fetchFleetTypes();
  }, []);

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\-\s()]{7,20}$/;

    if (!formData.name.trim()) nextErrors.name = 'Full name is required.';
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!phonePattern.test(formData.phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number.';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formData.pickupLocation.trim()) nextErrors.pickupLocation = 'Pickup location is required.';
    if (!formData.dropLocation.trim()) nextErrors.dropLocation = 'Drop location is required.';
    if (!formData.vehicleType) nextErrors.vehicleType = 'Choose a vehicle type.';
    if (!formData.message.trim()) nextErrors.message = 'Message is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setServerError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/quotes`, formData);
      setSuccessMessage(response.data?.message || 'Quote submitted successfully');
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Unable to submit your quote request right now. Please try again.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (fieldName) =>
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-navy-950 text-navy-900 dark:text-white rounded-xl text-xs sm:text-sm border ${
      errors[fieldName] ? 'border-red-400' : 'border-navy-200 dark:border-navy-800'
    } focus:border-orange-primary focus:outline-none`;

  return (
    <section id="quote" className="py-14 sm:py-20 bg-white dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start text-left">
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 lg:sticky lg:top-28">
            <h2 className="font-heading font-extrabold text-[11px] sm:text-xs uppercase tracking-widest text-orange-primary">
              Get Quote
            </h2>
            <p className="font-heading font-extrabold text-2xl sm:text-4xl text-navy-900 dark:text-white tracking-tight">
              Request a Transport Quote
            </p>
            <p className="text-navy-600 dark:text-navy-300 text-sm sm:text-base font-normal leading-relaxed">
              Share your route, vehicle preference, and shipment notes. Our dispatch team will review the request and respond with the best-fit logistics plan.
            </p>

            <div className="grid gap-3 sm:gap-4">
              {[
                { icon: Truck, title: 'Fleet Matched', text: 'Mini trucks, containers, trailers, and refrigerated vehicles available.' },
                { icon: Phone, title: 'Fast Follow-up', text: 'A logistics coordinator can confirm pricing, timing, and vehicle availability.' },
                { icon: CheckCircle2, title: 'Stored Securely', text: 'Every request is saved to MongoDB with pending status for review.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-navy-50 dark:bg-navy-900 border border-navy-200/40 dark:border-navy-800">
                  <div className="p-2 sm:p-2.5 bg-orange-light dark:bg-orange-primary/10 text-orange-primary rounded-lg shrink-0 flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-900 dark:text-white">{title}</h4>
                    <p className="text-xs text-navy-500 mt-0.5">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-navy-200/30 dark:border-navy-800 shadow-xl">
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="flex items-center gap-1.5 text-xs font-bold text-navy-450 uppercase tracking-wide">
                      <User className="w-3.5 h-3.5" />
                      Full Name
                    </label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={inputClass('name')} placeholder="Your full name" />
                    <ErrorText errors={errors} field="name" />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="flex items-center gap-1.5 text-xs font-bold text-navy-450 uppercase tracking-wide">
                      <Phone className="w-3.5 h-3.5" />
                      Phone Number
                    </label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+1 800 555 0199" />
                    <ErrorText errors={errors} field="phone" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="flex items-center gap-1.5 text-xs font-bold text-navy-450 uppercase tracking-wide">
                    <Mail className="w-3.5 h-3.5" />
                    Email Address
                  </label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="you@company.com" />
                  <ErrorText errors={errors} field="email" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="pickupLocation" className="flex items-center gap-1.5 text-xs font-bold text-navy-450 uppercase tracking-wide">
                      <MapPin className="w-3.5 h-3.5" />
                      Pickup Location
                    </label>
                    <input id="pickupLocation" name="pickupLocation" type="text" value={formData.pickupLocation} onChange={handleChange} className={inputClass('pickupLocation')} placeholder="City, warehouse, or address" />
                    <ErrorText errors={errors} field="pickupLocation" />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="dropLocation" className="flex items-center gap-1.5 text-xs font-bold text-navy-450 uppercase tracking-wide">
                      <MapPin className="w-3.5 h-3.5" />
                      Drop Location
                    </label>
                    <input id="dropLocation" name="dropLocation" type="text" value={formData.dropLocation} onChange={handleChange} className={inputClass('dropLocation')} placeholder="Destination address" />
                    <ErrorText errors={errors} field="dropLocation" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="vehicleType" className="flex items-center gap-1.5 text-xs font-bold text-navy-450 uppercase tracking-wide">
                    <Truck className="w-3.5 h-3.5" />
                    Vehicle Type
                  </label>
                  <select id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className={inputClass('vehicleType')}>
                    <option value="">Select vehicle type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ErrorText errors={errors} field="vehicleType" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="flex items-center gap-1.5 text-xs font-bold text-navy-450 uppercase tracking-wide">
                    <MessageSquareText className="w-3.5 h-3.5" />
                    Message
                  </label>
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className={`${inputClass('message')} resize-none`} placeholder="Cargo type, weight, pickup timing, special handling, or delivery notes" />
                  <ErrorText errors={errors} field="message" />
                </div>

                {successMessage && (
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {serverError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-orange-primary hover:bg-orange-dark disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Quote
                    </>
                  ) : (
                    <>
                      Submit Quote Request
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
