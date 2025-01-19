import { NextResponse } from 'next/server';
import { languageConfigs } from '@/utils/languages';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    
    // Find the language config that matches the pistonId
    const langConfig = Object.values(languageConfigs).find(
      config => config.pistonId === body.language
    );

    if (!langConfig) {
      return NextResponse.json(
        { error: `Unsupported language: ${body.language}` },
        { status: 400 }
      );
    }
    
    const pistonPayload = {
      language: body.language,
      version: "*", // Latest version
      files: [
        {
          name: `main${langConfig.extension}`,
          content: body.code,
        }
      ],
      stdin: "",
      args: [],
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1
    };

    console.log('Sending request to Piston:', pistonPayload);

    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pistonPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Piston API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Compilation error: ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('Piston response:', result);

    // Format the response to match our existing structure
    const formattedResult = {
      output: result.run.stdout || result.run.stderr,
      error: result.run.stderr || null,
      statusCode: result.run.code,
    };

    if (result.run.stderr) {
      return NextResponse.json(
        { error: result.run.stderr },
        { status: 400 }
      );
    }

    return NextResponse.json(formattedResult);
  } catch (error) {
    console.error('Execute API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to execute code',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 