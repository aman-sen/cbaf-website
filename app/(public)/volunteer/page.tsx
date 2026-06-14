"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { VolunteerSchema } from "@/lib/validations/volunteer";
import { useState } from "react";
import { CheckCircle, Users, Heart, Globe } from "lucide-react";
import type { z } from "zod";

type FormData = z.infer<typeof VolunteerSchema>;

const SKILLS = ["Teaching/Training", "Medical/Healthcare", "Legal Aid", "Engineering/Technical", "Photography/Videography", "Social Media/Content", "Event Management", "Counselling", "Translation/Language", "Fundraising", "Driving/Logistics", "Other"];
const INTERESTS = ["Education", "Women Empowerment", "Healthcare", "Environment", "Emergency Relief", "Child Welfare", "Livelihood", "Youth Development"];

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(VolunteerSchema),
    defaultValues: { skills: [], interests: [], availability: "FLEXIBLE" },
  });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/volunteers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
      reset();
    }
  }

  const stats = [
    { icon: Users, value: "320+", label: "Active Volunteers" },
    { icon: Heart, value: "12K+", label: "Lives Impacted" },
    { icon: Globe, value: "18", label: "States Active" },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-green-950 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4 border border-green-500/30">
            Volunteer
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Join Our Volunteer Family
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Your skills, time, and passion can transform lives. Join 320+ volunteers making real change across India.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm mx-auto">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <div className="font-display text-xl font-bold text-white">{value}</div>
                <div className="text-xs text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {submitted ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-center bg-green-50 border border-green-200 rounded-3xl p-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-5" />
            <h2 className="font-display text-2xl font-bold text-green-900 mb-3">Application Submitted!</h2>
            <p className="text-green-700">Thank you for signing up! Our team will review your application and reach out within 3–5 working days.</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Volunteer Registration</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input {...register("name")} placeholder="Your full name"
                      className="w-full border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input {...register("email")} type="email" placeholder="your@email.com"
                      className="w-full border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number *</label>
                    <input {...register("phone")} placeholder="10-digit mobile number"
                      className="w-full border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                    <input {...register("city")} placeholder="Your city"
                      className="w-full border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                  <input {...register("state")} placeholder="Your state"
                    className="w-full border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills * (select all that apply)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SKILLS.map((skill) => (
                      <label key={skill} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" value={skill} {...register("skills")} className="accent-green-600 w-4 h-4" />
                        <span className="text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                  {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest * (select all that apply)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {INTERESTS.map((interest) => (
                      <label key={interest} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" value={interest} {...register("interests")} className="accent-green-600 w-4 h-4" />
                        <span className="text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                  {errors.interests && <p className="text-red-500 text-xs mt-1">{errors.interests.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability *</label>
                  <select {...register("availability")} className="w-full border border-gray-200 focus:border-green-500 rounded-xl px-4 py-2.5 text-sm outline-none bg-white">
                    <option value="WEEKDAYS">Weekdays</option>
                    <option value="WEEKENDS">Weekends</option>
                    <option value="BOTH">Both Weekdays & Weekends</option>
                    <option value="FLEXIBLE">Flexible</option>
                  </select>
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                  {isSubmitting ? "Submitting..." : "Submit Volunteer Application →"}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
