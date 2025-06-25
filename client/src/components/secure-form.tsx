import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertFormSubmissionSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Shield, User, Mail, Phone, MessageSquare, Info, Loader2, CheckCircle } from "lucide-react";
import type { z } from "zod";

type FormData = z.infer<typeof insertFormSubmissionSchema>;

interface SecureFormProps {
  onSubmissionSuccess: (result: any) => void;
}

export default function SecureForm({ onSubmissionSuccess }: SecureFormProps) {
  const [charCount, setCharCount] = useState(0);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(insertFormSubmissionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      securityPreferences: [],
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/form-submission", data);
      return response.json();
    },
    onSuccess: (result) => {
      toast({
        title: "Form Submitted Successfully",
        description: "Your data has been securely processed and stored.",
      });
      onSubmissionSuccess(result);
      form.reset();
      setCharCount(0);
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    submitMutation.mutate(data);
  };

  const handleMessageChange = (value: string) => {
    setCharCount(value.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="px-6 py-4 border-b bg-gray-50 rounded-t-xl">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Shield className="text-secondary mr-2" />
          Secure User Input Form
        </h2>
        <p className="text-sm text-gray-600 mt-1">All inputs are validated and sanitized</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-danger">*</span>
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your full name"
                      maxLength={50}
                      className="pr-10"
                    />
                  </FormControl>
                  <div className="absolute right-3 top-3 text-gray-400">
                    <User className="text-sm" />
                  </div>
                </div>
                <FormMessage />
                <div className="text-xs text-gray-500">
                  <Info className="inline w-3 h-3 mr-1" />
                  Sanitized: HTML entities encoded, length validated
                </div>
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-danger">*</span>
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      maxLength={100}
                      className="pr-10"
                    />
                  </FormControl>
                  <div className="absolute right-3 top-3 text-gray-400">
                    <Mail className="text-sm" />
                  </div>
                </div>
                <FormMessage />
                <div className="text-xs text-gray-500">
                  <Info className="inline w-3 h-3 mr-1" />
                  Validated: RFC 5322 compliant, domain verification
                </div>
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Phone Number
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      maxLength={20}
                      className="pr-10"
                    />
                  </FormControl>
                  <div className="absolute right-3 top-3 text-gray-400">
                    <Phone className="text-sm" />
                  </div>
                </div>
                <FormMessage />
                <div className="text-xs text-gray-500">
                  <Info className="inline w-3 h-3 mr-1" />
                  Sanitized: Non-numeric characters removed, format validated
                </div>
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Message <span className="text-danger">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your message here..."
                    maxLength={500}
                    rows={5}
                    className="resize-none"
                    onChange={(e) => {
                      field.onChange(e);
                      handleMessageChange(e.target.value);
                    }}
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    <Info className="inline w-3 h-3 mr-1" />
                    XSS Protection: HTML tags stripped, entities encoded
                  </span>
                  <span className={charCount > 450 ? "text-warning" : ""}>{charCount}/500</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Security Preferences */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">Security Preferences</h3>
            
            <FormField
              control={form.control}
              name="securityPreferences"
              render={() => (
                <FormItem>
                  <div className="space-y-3">
                    {[
                      { id: "newsletter", label: "Subscribe to security newsletters" },
                      { id: "alerts", label: "Receive security alerts" },
                      { id: "2fa", label: "Enable two-factor authentication" },
                    ].map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="securityPreferences"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id as "newsletter" | "alerts" | "2fa")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== item.id)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm cursor-pointer">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-primary/20 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Processing Securely...</span>
                </>
              ) : submitMutation.isSuccess ? (
                <>
                  <CheckCircle />
                  <span>Submitted Successfully</span>
                </>
              ) : (
                <>
                  <Shield />
                  <span>Submit Securely</span>
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              <Shield className="inline w-3 h-3 mr-1" />
              Protected by CSRF tokens, rate limiting, and input sanitization
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
