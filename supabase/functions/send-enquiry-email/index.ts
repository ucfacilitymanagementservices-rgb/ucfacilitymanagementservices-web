import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EnquiryData {
  name: string;
  phone: string;
  email: string;
  message: string;
  type: string;
  position?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const enquiry: EnquiryData = await req.json();

    const emailContent = `
    <h2>New Enquiry Received</h2>
    <p><strong>Name:</strong> ${enquiry.name}</p>
    <p><strong>Phone:</strong> ${enquiry.phone}</p>
    <p><strong>Email:</strong> ${enquiry.email}</p>
    <p><strong>Type:</strong> ${enquiry.type === "career" ? "Job Application" : "General Enquiry"}</p>
    ${enquiry.position ? `<p><strong>Position:</strong> ${enquiry.position}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${enquiry.message.replace(/\n/g, "<br>")}</p>
    `;

    const mailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "noreply@ucfacilities.com",
        to: "ucfacilitymanagementservices@gmail.com",
        reply_to: enquiry.email,
        subject: `New ${enquiry.type === "career" ? "Application" : "Enquiry"} from ${enquiry.name}`,
        html: emailContent,
      }),
    });

    if (!mailResponse.ok) {
      throw new Error(`Email send failed: ${mailResponse.statusText}`);
    }

    const confirmationEmail = `
    <h2>Thank You for Your Enquiry</h2>
    <p>Dear ${enquiry.name},</p>
    <p>We have received your ${enquiry.type === "career" ? "application" : "enquiry"} and will get back to you shortly.</p>
    <p>Our team typically responds within 24 hours.</p>
    <p>Best regards,<br>UC Facility Management Services</p>
    `;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "noreply@ucfacilities.com",
        to: enquiry.email,
        subject: "We received your enquiry - UC Facility Management Services",
        html: confirmationEmail,
      }),
    });

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
