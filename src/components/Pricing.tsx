import React, { useState } from 'react';
import { Check, Star, Shield, Award, Users, Database, Brain, ChevronRight } from 'lucide-react';
// import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with a fallback empty string to prevent undefined errors
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? '');

interface PricingPlan {
  id: string;
  name: string;
  basePrice: number; // Base monthly price
  description: string;
  highlighted: boolean;
  icon: React.ElementType;
  features: string[];
  benefits: string[];
}

export default function Pricing() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState(false);
  
  // Define plans with base monthly prices
  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      basePrice: 49,
      description: 'Perfect for individuals starting their job search',
      highlighted: false,
      icon: Star,
      features: [
        'Basic AI resume analysis',
        'Limited job matches',
        'Standard assessments',
        'Email support',
        'Basic analytics',
        '1 resume template'
      ],
      benefits: [
        'Flexibility to cancel anytime',
        'Try all features',
        'No long-term commitment'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      basePrice: 99,
      description: 'Best value for active job seekers',
      highlighted: true,
      icon: Award,
      features: [
        'Advanced AI resume optimization',
        'Unlimited job matches',
        'Priority assessments',
        'Priority support',
        'Advanced analytics',
        'All resume templates',
        'Interview preparation',
        'Career coaching session'
      ],
      benefits: [
        'Save 40% vs monthly',
        'Dedicated support',
        'Quarterly career strategy session'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      basePrice: 199,
      description: 'Maximum features for long-term career growth',
      highlighted: false,
      icon: Shield,
      features: [
        'Everything in Professional',
        'Personal career coach',
        'Custom assessments',
        '24/7 priority support',
        'Executive resume review',
        'LinkedIn optimization',
        'Salary negotiation support',
        'Industry networking events'
      ],
      benefits: [
        'Save 80% vs monthly',
        'Annual career planning',
        'VIP support & features'
      ]
    }
  ];

  // Function to calculate price based on interval
  const calculatePrice = (basePrice: number): string => {
    switch (billingInterval) {
      case 'monthly':
        return basePrice.toFixed(2);
      case 'quarterly':
        // 40% discount on quarterly (multiply by 3 months, then discount)
        return (basePrice * 3 * 0.6).toFixed(2);
      case 'yearly':
        // 80% discount on yearly (multiply by 12 months, then discount)
        return (basePrice * 12 * 0.2).toFixed(2);
      default:
        return basePrice.toFixed(2);
    }
  };
  
  // Calculate display text for billing period
  const getBillingPeriodText = (): string => {
    switch (billingInterval) {
      case 'monthly':
        return '/month';
      case 'quarterly':
        return '/quarter';
      case 'yearly':
        return '/year';
      default:
        return '/month';
    }
  };

  // Handle subscription
  const handleSubscribe = (planId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const selectedPlan = plans.find(plan => plan.id === planId);
      const price = calculatePrice(selectedPlan?.basePrice || 0);
      alert(`Subscribed to ${selectedPlan?.name} plan for $${price} ${getBillingPeriodText()}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div id="pricing" className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-4">
            <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Select the perfect subscription for your recruitment needs
          </p>
        </div>

        {/* Billing interval selector */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 flex shadow-sm border border-gray-200 dark:border-gray-700">
            {['monthly', 'quarterly', 'yearly'].map((interval) => (
              <button
                key={interval}
                onClick={() => setBillingInterval(interval as any)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  billingInterval === interval
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                disabled={isLoading}
              >
                {interval.charAt(0).toUpperCase() + interval.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl transition-all duration-300 hover:shadow-2xl ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xl lg:scale-105 z-10 border border-purple-400'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xl border border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3">
                  <div className="inline-flex items-center rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-gray-900 shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-2xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {plan.name}
                    </h3>
                    <p className={`mt-2 text-sm ${plan.highlighted ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {plan.description}
                    </p>
                  </div>
                  <div className={`p-2 rounded-full ${plan.highlighted ? 'bg-white/20' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
                    <plan.icon className={`h-6 w-6 ${plan.highlighted ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`} />
                  </div>
                </div>

                <div className="mt-6 flex items-baseline">
                  <span className={`text-4xl font-bold tracking-tight ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    ${calculatePrice(plan.basePrice)}
                  </span>
                  <span className={`ml-1 text-sm ${plan.highlighted ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {getBillingPeriodText()}
                  </span>
                </div>

                {/* Savings callout for non-monthly plans */}
                {billingInterval !== 'monthly' && (
                  <div className={`mt-2 inline-flex text-xs ${
                    plan.highlighted ? 'bg-white/20 text-white' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                  } rounded-full px-2 py-0.5`}>
                    {billingInterval === 'quarterly' ? 'Save 40%' : 'Save 80%'} vs monthly
                  </div>
                )}

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className={`h-5 w-5 shrink-0 ${plan.highlighted ? 'text-purple-200' : 'text-purple-600 dark:text-purple-400'}`} />
                      <span className={`ml-3 text-sm ${plan.highlighted ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <h4 className={`text-sm font-semibold mb-3 ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    Plan Benefits:
                  </h4>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center text-sm">
                        <ChevronRight className={`h-4 w-4 mr-2 ${plan.highlighted ? 'text-purple-200' : 'text-purple-600 dark:text-purple-400'}`} />
                        <span className={plan.highlighted ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'}>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading}
                  className={`mt-8 w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Processing...' : 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise section */}
        <div className="mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Enterprise Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Users, title: 'Team Management', description: 'Manage multiple recruiters and hiring managers' },
                { icon: Database, title: 'Custom Integration', description: 'Connect with your existing HR systems' },
                { icon: Brain, title: 'Custom AI Models', description: 'Tailored AI solutions for your industry' },
                { icon: Shield, title: 'Advanced Security', description: 'Enterprise-grade security and compliance' }
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 inline-block mb-4">
                    <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}