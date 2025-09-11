import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, circleName, inviterName, token } = await req.json()
    
    console.log('Sending email to:', email)
    console.log('Circle:', circleName)
    console.log('Inviter:', inviterName)

    const inviteLink = `http://localhost:5173/invite/${token}`
    
    // Create HTML email template
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Circle Invitation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #B45309 0%, #7C2D12 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">GlobalRoots</h1>
      <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 16px;">Mentorship Circle Invitation</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 20px;">
      <h2 style="color: #503314; margin: 0 0 16px 0; font-size: 24px;">You're Invited!</h2>
      
      <p style="color: #7C2D12; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        <strong>${inviterName}</strong> has invited you to join the <strong>"${circleName}"</strong> mentorship circle on GlobalRoots.
      </p>

      <p style="color: #7C2D12; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
        Join this circle to connect with mentors and fellow learners, participate in discussions, and accelerate your growth journey.
      </p>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${inviteLink}" style="display: inline-block; background: linear-gradient(135deg, #B45309 0%, #7C2D12 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(180, 83, 9, 0.3);">
          Join Circle
        </a>
      </div>

      <!-- Expiration Notice -->
      <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; border-radius: 6px; padding: 16px; margin: 30px 0;">
        <p style="color: #92400E; font-size: 14px; margin: 0; text-align: center;">
          ⏰ This invitation expires in 7 days
        </p>
      </div>

      <!-- Alternative Link -->
      <p style="color: #6B7280; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0; text-align: center;">
        Can't click the button? Copy and paste this link into your browser:<br>
        <a href="${inviteLink}" style="color: #B45309; word-break: break-all;">${inviteLink}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
      <p style="color: #6B7280; font-size: 12px; margin: 0;">
        This invitation was sent by ${inviterName} via GlobalRoots<br>
        If you didn't expect this invitation, you can safely ignore this email.
      </p>
    </div>
  </div>
</body>
</html>`

    // Send email via Resend
    const resendApiKey = Deno.env.get('VITE_RESEND_API_KEY')
    
    if (!resendApiKey) {
      console.log('Resend API key not found, logging email instead')
      console.log('Email HTML:', emailHtml)
      return new Response(
        JSON.stringify({ success: true, message: 'Email logged (Resend API key missing)' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GlobalRoots <onboarding@resend.dev>',
        to: [email],
        subject: `You're invited to join "${circleName}" on GlobalRoots`,
        html: emailHtml,
      }),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text()
      console.error('Resend API error:', errorData)
      throw new Error(`Resend API error: ${errorData}`)
    }

    const resendResult = await resendResponse.json()
    console.log('Email sent successfully via Resend:', resendResult)

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully via Resend!' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})