import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Function called with method:', req.method)
    console.log('Headers:', Object.fromEntries(req.headers.entries()))
    
    const body = await req.json()
    console.log('Request body:', body)

    const { email, circleName, inviterName, token } = body
    
    if (!email || !circleName || !token) {
      throw new Error('Missing required fields: email, circleName, or token')
    }

    console.log('Processing invitation:', { email, circleName, inviterName })

    // For now, just return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Invitation processed successfully',
        data: { email, circleName, inviterName, token }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    )
  }
})