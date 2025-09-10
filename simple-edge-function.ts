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
    console.log('Token:', token)

    // For now, just log the email details
    const inviteLink = `http://localhost:5173/invite/${token}`
    console.log('Invite link:', inviteLink)

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email logged successfully (Resend integration pending)' 
      }),
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